/**
* DevExtreme (cjs/ui/scheduler/appointments.layout_manager.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;

var _common = require("../../core/utils/common");

var _strategy_vertical = _interopRequireDefault(require("./appointments/rendering_strategies/strategy_vertical"));

var _strategy_horizontal = _interopRequireDefault(require("./appointments/rendering_strategies/strategy_horizontal"));

var _strategy_horizontal_month_line = _interopRequireDefault(require("./appointments/rendering_strategies/strategy_horizontal_month_line"));

var _strategy_horizontal_month = _interopRequireDefault(require("./appointments/rendering_strategies/strategy_horizontal_month"));

var _strategy_agenda = _interopRequireDefault(require("./appointments/rendering_strategies/strategy_agenda"));

var _instanceFactory = require("./instanceFactory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RENDERING_STRATEGIES = {
  'horizontal': _strategy_horizontal.default,
  'horizontalMonth': _strategy_horizontal_month.default,
  'horizontalMonthLine': _strategy_horizontal_month_line.default,
  'vertical': _strategy_vertical.default,
  'agenda': _strategy_agenda.default
};

var AppointmentLayoutManager = /*#__PURE__*/function () {
  function AppointmentLayoutManager(instance) {
    this.instance = instance;
  }

  var _proto = AppointmentLayoutManager.prototype;

  _proto.getCellDimensions = function getCellDimensions(options) {
    if (this.instance._workSpace) {
      return {
        width: this.instance._workSpace.getCellWidth(),
        height: this.instance._workSpace.getCellHeight(),
        allDayHeight: this.instance._workSpace.getAllDayHeight()
      };
    }
  };

  _proto.getGroupOrientation = function getGroupOrientation(options) {
    if (this.instance._workSpace) {
      options.callback(this.instance._workSpace._getRealGroupOrientation());
    }
  };

  _proto._initRenderingStrategy = function _initRenderingStrategy() {
    var _this = this;

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
      isVirtualScrolling: function isVirtualScrolling() {
        return _this.instance.isVirtualScrolling;
      },
      getIsGroupedByDate: function getIsGroupedByDate() {
        return workspace.isGroupedByDate();
      },
      getCellWidth: function getCellWidth() {
        return workspace.getCellWidth();
      },
      getCellHeight: function getCellHeight() {
        return workspace.getCellHeight();
      },
      getAllDayHeight: function getAllDayHeight() {
        return workspace.getAllDayHeight();
      },
      getResizableStep: function getResizableStep() {
        return workspace.positionHelper.getResizableStep();
      },
      getVisibleDayDuration: function getVisibleDayDuration() {
        return workspace.getVisibleDayDuration();
      }
    });
  };

  _proto.createAppointmentsMap = function createAppointmentsMap(items) {
    var _this2 = this;

    var _this$getCellDimensio = this.getCellDimensions(),
        allDayHeight = _this$getCellDimensio.allDayHeight;

    this.instance._allDayCellHeight = allDayHeight;
    this.getGroupOrientation({
      callback: function callback(groupOrientation) {
        return _this2.instance._groupOrientation = groupOrientation;
      }
    });
    var appointments = items ? items.slice() : [];

    this._initRenderingStrategy();

    this._positionMap = this.getRenderingStrategyInstance().createTaskPositionMap(appointments);
    return this._createAppointmentsMapCore(appointments, this._positionMap);
  };

  _proto._createAppointmentsMapCore = function _createAppointmentsMapCore(list, positionMap) {
    var _this3 = this;

    var _this$instance$getWor = this.instance.getWorkSpace(),
        virtualScrollingDispatcher = _this$instance$getWor.virtualScrollingDispatcher;

    var cellCountInsideLeftVirtualCell = virtualScrollingDispatcher.cellCountInsideLeftVirtualCell,
        cellCountInsideTopVirtualRow = virtualScrollingDispatcher.cellCountInsideTopVirtualRow;
    return list.map(function (data, index) {
      if (!_this3.getRenderingStrategyInstance().keepAppointmentSettings()) {
        delete data.settings;
      }

      var appointmentSettings = positionMap[index];
      appointmentSettings.forEach(function (settings) {
        settings.direction = _this3.viewRenderingStrategyName === 'vertical' && !settings.allDay ? 'vertical' : 'horizontal';
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
  };

  _proto._isDataChanged = function _isDataChanged(data) {
    var appointmentDataProvider = this.instance.fire('getAppointmentDataProvider');
    var updatedData = appointmentDataProvider.getUpdatedAppointment();
    return updatedData === data || appointmentDataProvider.getUpdatedAppointmentKeys().some(function (item) {
      return data[item.key] === item.value;
    });
  };

  _proto._isAppointmentShouldAppear = function _isAppointmentShouldAppear(currentAppointment, sourceAppointment) {
    return currentAppointment.needRepaint && sourceAppointment.needRemove;
  };

  _proto._isSettingChanged = function _isSettingChanged(settings, sourceSetting) {
    if (settings.length !== sourceSetting.length) {
      return true;
    }

    var createSettingsToCompare = function createSettingsToCompare(settings, index) {
      var currentSetting = settings[index];
      var leftVirtualCellCount = currentSetting.leftVirtualCellCount || 0;
      var topVirtualCellCount = currentSetting.topVirtualCellCount || 0;
      var columnIndex = currentSetting.columnIndex + leftVirtualCellCount;
      var rowIndex = currentSetting.rowIndex + topVirtualCellCount;
      var hMax = currentSetting.reduced ? currentSetting.hMax : undefined;
      var vMax = currentSetting.reduced ? currentSetting.vMax : undefined;
      return _extends({}, currentSetting, {
        columnIndex: columnIndex,
        rowIndex: rowIndex,
        topVirtualCellCount: undefined,
        leftVirtualCellCount: undefined,
        hMax: hMax,
        vMax: vMax,
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

      if (!(0, _common.equalByValue)(newSettings, oldSettings)) {
        return true;
      }
    }

    return false;
  };

  _proto._getAssociatedSourceAppointment = function _getAssociatedSourceAppointment(currentAppointment, sourceAppointments) {
    for (var i = 0; i < sourceAppointments.length; i++) {
      var item = sourceAppointments[i];

      if (item.itemData === currentAppointment.itemData) {
        return item;
      }
    }

    return null;
  };

  _proto._getDeletedAppointments = function _getDeletedAppointments(currentAppointments, sourceAppointments) {
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
  };

  _proto.getRepaintedAppointments = function getRepaintedAppointments(currentAppointments, sourceAppointments) {
    var _this4 = this;

    if (sourceAppointments.length === 0 || this.viewRenderingStrategyName === 'agenda') {
      return currentAppointments;
    }

    currentAppointments.forEach(function (appointment) {
      var sourceAppointment = _this4._getAssociatedSourceAppointment(appointment, sourceAppointments);

      if (sourceAppointment) {
        appointment.needRepaint = _this4._isDataChanged(appointment.itemData) || _this4._isSettingChanged(appointment.settings, sourceAppointment.settings) || _this4._isAppointmentShouldAppear(appointment, sourceAppointment);
      }
    });
    return currentAppointments.concat(this._getDeletedAppointments(currentAppointments, sourceAppointments));
  };

  _proto.getRenderingStrategyInstance = function getRenderingStrategyInstance() {
    if (!this._renderingStrategyInstance) {
      this._initRenderingStrategy();
    }

    return this._renderingStrategyInstance;
  };

  _createClass(AppointmentLayoutManager, [{
    key: "modelProvider",
    get: function get() {
      return (0, _instanceFactory.getModelProvider)(this.instance.key);
    }
  }, {
    key: "viewRenderingStrategyName",
    get: function get() {
      return this.modelProvider.getViewRenderingStrategyName();
    }
  }]);

  return AppointmentLayoutManager;
}();

var _default = AppointmentLayoutManager;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
