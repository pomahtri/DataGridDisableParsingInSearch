import _extends from "@babel/runtime/helpers/esm/extends";
import { equalByValue } from '../../core/utils/common';
import VerticalAppointmentsStrategy from './appointments/rendering_strategies/strategy_vertical';
import HorizontalAppointmentsStrategy from './appointments/rendering_strategies/strategy_horizontal';
import HorizontalMonthLineAppointmentsStrategy from './appointments/rendering_strategies/strategy_horizontal_month_line';
import HorizontalMonthAppointmentsStrategy from './appointments/rendering_strategies/strategy_horizontal_month';
import AgendaAppointmentsStrategy from './appointments/rendering_strategies/strategy_agenda';
import { getModelProvider } from './instanceFactory';
var RENDERING_STRATEGIES = {
  'horizontal': HorizontalAppointmentsStrategy,
  'horizontalMonth': HorizontalMonthAppointmentsStrategy,
  'horizontalMonthLine': HorizontalMonthLineAppointmentsStrategy,
  'vertical': VerticalAppointmentsStrategy,
  'agenda': AgendaAppointmentsStrategy
};

class AppointmentLayoutManager {
  constructor(instance) {
    this.instance = instance;
  }

  get modelProvider() {
    return getModelProvider(this.instance.key);
  }

  get viewRenderingStrategyName() {
    return this.modelProvider.getViewRenderingStrategyName();
  }

  getCellDimensions(options) {
    if (this.instance._workSpace) {
      return {
        width: this.instance._workSpace.getCellWidth(),
        height: this.instance._workSpace.getCellHeight(),
        allDayHeight: this.instance._workSpace.getAllDayHeight()
      };
    }
  }

  getGroupOrientation(options) {
    if (this.instance._workSpace) {
      options.callback(this.instance._workSpace._getRealGroupOrientation());
    }
  }

  _initRenderingStrategy() {
    var Strategy = RENDERING_STRATEGIES[this.viewRenderingStrategyName];
    var workspace = this.instance.getWorkSpace();
    this._renderingStrategyInstance = new Strategy({
      instance: this.instance,
      key: this.instance.key,
      adaptivityEnabled: this.modelProvider.adaptivityEnabled,
      rtlEnabled: this.modelProvider.rtlEnabled,
      startDayHour: this.modelProvider.startDayHour,
      endDayHour: this.modelProvider.endDayHour,
      maxAppointmentsPerCell: this.modelProvider.maxAppointmentsPerCell,
      agendaDuration: workspace.option('agendaDuration'),
      currentDate: this.modelProvider.currentDate,
      isVirtualScrolling: () => this.instance.isVirtualScrolling,
      getIsGroupedByDate: () => workspace.isGroupedByDate(),
      getCellWidth: () => workspace.getCellWidth(),
      getCellHeight: () => workspace.getCellHeight(),
      getAllDayHeight: () => workspace.getAllDayHeight(),
      getResizableStep: () => workspace.positionHelper.getResizableStep(),
      getVisibleDayDuration: () => workspace.getVisibleDayDuration()
    });
  }

  createAppointmentsMap(items) {
    var {
      allDayHeight
    } = this.getCellDimensions();
    this.instance._allDayCellHeight = allDayHeight;
    this.getGroupOrientation({
      callback: groupOrientation => this.instance._groupOrientation = groupOrientation
    });
    var appointments = items ? items.slice() : [];

    this._initRenderingStrategy();

    this._positionMap = this.getRenderingStrategyInstance().createTaskPositionMap(appointments);
    return this._createAppointmentsMapCore(appointments, this._positionMap);
  }

  _createAppointmentsMapCore(list, positionMap) {
    var {
      virtualScrollingDispatcher
    } = this.instance.getWorkSpace();
    var {
      cellCountInsideLeftVirtualCell,
      cellCountInsideTopVirtualRow
    } = virtualScrollingDispatcher;
    return list.map((data, index) => {
      if (!this.getRenderingStrategyInstance().keepAppointmentSettings()) {
        delete data.settings;
      }

      var appointmentSettings = positionMap[index];
      appointmentSettings.forEach(settings => {
        settings.direction = this.viewRenderingStrategyName === 'vertical' && !settings.allDay ? 'vertical' : 'horizontal';
        settings.topVirtualCellCount = cellCountInsideTopVirtualRow;
        settings.leftVirtualCellCount = cellCountInsideLeftVirtualCell;
      });
      return {
        itemData: data,
        settings: appointmentSettings,
        needRepaint: true,
        needRemove: false
      };
    });
  }

  _isDataChanged(data) {
    var appointmentDataProvider = this.instance.fire('getAppointmentDataProvider');
    var updatedData = appointmentDataProvider.getUpdatedAppointment();
    return updatedData === data || appointmentDataProvider.getUpdatedAppointmentKeys().some(item => data[item.key] === item.value);
  }

  _isAppointmentShouldAppear(currentAppointment, sourceAppointment) {
    return currentAppointment.needRepaint && sourceAppointment.needRemove;
  }

  _isSettingChanged(settings, sourceSetting) {
    if (settings.length !== sourceSetting.length) {
      return true;
    }

    var createSettingsToCompare = (settings, index) => {
      var currentSetting = settings[index];
      var leftVirtualCellCount = currentSetting.leftVirtualCellCount || 0;
      var topVirtualCellCount = currentSetting.topVirtualCellCount || 0;
      var columnIndex = currentSetting.columnIndex + leftVirtualCellCount;
      var rowIndex = currentSetting.rowIndex + topVirtualCellCount;
      var hMax = currentSetting.reduced ? currentSetting.hMax : undefined;
      var vMax = currentSetting.reduced ? currentSetting.vMax : undefined;
      return _extends({}, currentSetting, {
        columnIndex,
        rowIndex,
        topVirtualCellCount: undefined,
        leftVirtualCellCount: undefined,
        hMax,
        vMax,
        info: {}
      });
    };

    for (var i = 0; i < settings.length; i++) {
      var newSettings = createSettingsToCompare(settings, i);
      var oldSettings = createSettingsToCompare(sourceSetting, i);

      if (oldSettings) {
        // exclude sortedIndex property for comparison in commonUtils.equalByValue
        oldSettings.sortedIndex = newSettings.sortedIndex;
      }

      if (!equalByValue(newSettings, oldSettings)) {
        return true;
      }
    }

    return false;
  }

  _getAssociatedSourceAppointment(currentAppointment, sourceAppointments) {
    for (var i = 0; i < sourceAppointments.length; i++) {
      var item = sourceAppointments[i];

      if (item.itemData === currentAppointment.itemData) {
        return item;
      }
    }

    return null;
  }

  _getDeletedAppointments(currentAppointments, sourceAppointments) {
    var result = [];

    for (var i = 0; i < sourceAppointments.length; i++) {
      var sourceAppointment = sourceAppointments[i];

      var currentAppointment = this._getAssociatedSourceAppointment(sourceAppointment, currentAppointments);

      if (!currentAppointment) {
        sourceAppointment.needRemove = true;
        result.push(sourceAppointment);
      }
    }

    return result;
  }

  getRepaintedAppointments(currentAppointments, sourceAppointments) {
    if (sourceAppointments.length === 0 || this.viewRenderingStrategyName === 'agenda') {
      return currentAppointments;
    }

    currentAppointments.forEach(appointment => {
      var sourceAppointment = this._getAssociatedSourceAppointment(appointment, sourceAppointments);

      if (sourceAppointment) {
        appointment.needRepaint = this._isDataChanged(appointment.itemData) || this._isSettingChanged(appointment.settings, sourceAppointment.settings) || this._isAppointmentShouldAppear(appointment, sourceAppointment);
      }
    });
    return currentAppointments.concat(this._getDeletedAppointments(currentAppointments, sourceAppointments));
  }

  getRenderingStrategyInstance() {
    if (!this._renderingStrategyInstance) {
      this._initRenderingStrategy();
    }

    return this._renderingStrategyInstance;
  }

}

export default AppointmentLayoutManager;