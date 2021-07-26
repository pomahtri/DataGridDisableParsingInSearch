/**
* DevExtreme (cjs/ui/scheduler/appointments.layout_manager.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var RENDERING_STRATEGIES = {
  'horizontal': _strategy_horizontal.default,
  'horizontalMonth': _strategy_horizontal_month.default,
  'horizontalMonthLine': _strategy_horizontal_month_line.default,
  'vertical': _strategy_vertical.default,
  'agenda': _strategy_agenda.default
};

var AppointmentLayoutManager = /*#__PURE__*/function () {
  function AppointmentLayoutManager(instance, renderingStrategy) {
    this.instance = instance;
    renderingStrategy && this.initRenderingStrategy(renderingStrategy);
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

  _proto.initRenderingStrategy = function initRenderingStrategy(renderingStrategy) {
    var _this = this;

    var Strategy = RENDERING_STRATEGIES[renderingStrategy];
    this._renderingStrategyInstance = new Strategy({
      key: this.instance.key,
      instance: this.instance,
      isAdaptive: this.instance.option('adaptivityEnabled'),
      rtlEnabled: this.instance.option('rtlEnabled'),
      isVirtualScrolling: function isVirtualScrolling() {
        return _this.instance.isVirtualScrolling;
      },
      getIsGroupedByDate: function getIsGroupedByDate() {
        return _this.instance._workSpace ? _this.instance._workSpace.isGroupedByDate() : false;
      },
      getCellWidth: function getCellWidth() {
        return _this.instance._workSpace ? _this.instance._workSpace.getCellWidth() : 0;
      },
      getCellHeight: function getCellHeight() {
        return _this.instance._workSpace ? _this.instance._workSpace.getCellHeight() : 0;
      },
      getAllDayHeight: function getAllDayHeight() {
        return _this.instance._workSpace ? _this.instance._workSpace.getAllDayHeight() : 0;
      },
      getResizableStep: function getResizableStep() {
        return _this.instance._workSpace ? _this.instance._workSpace.positionHelper.getResizableStep() : 0;
      }
    });
    this.renderingStrategy = renderingStrategy;
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
    this._positionMap = this._renderingStrategyInstance.createTaskPositionMap(appointments);
    return this._createAppointmentsMapCore(appointments, this._positionMap);
  };

  _proto._createAppointmentsMapCore = function _createAppointmentsMapCore(list, positionMap) {
    var _this3 = this;

    var _this$instance$getWor = this.instance.getWorkSpace(),
        virtualScrollingDispatcher = _this$instance$getWor.virtualScrollingDispatcher;

    var virtualCellCount = virtualScrollingDispatcher.leftVirtualCellsCount;
    var virtualRowCount = virtualScrollingDispatcher.topVirtualRowsCount;
    return list.map(function (data, index) {
      if (!_this3._renderingStrategyInstance.keepAppointmentSettings()) {
        delete data.settings;
      }

      var appointmentSettings = positionMap[index];
      appointmentSettings.forEach(function (settings) {
        settings.direction = _this3.renderingStrategy === 'vertical' && !settings.allDay ? 'vertical' : 'horizontal';
      });
      return {
        itemData: data,
        settings: appointmentSettings,
        needRepaint: true,
        needRemove: false,
        virtualCellCount: virtualCellCount,
        virtualRowCount: virtualRowCount
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
      var virtualCellCount = settings.virtualCellCount || 0;
      var virtualRowCount = settings.virtualRowCount || 0;
      var columnIndex = settings[index].columnIndex + virtualCellCount;
      var rowIndex = settings[index].rowIndex + virtualRowCount;
      return _extends({}, settings[index], {
        columnIndex: columnIndex,
        rowIndex: rowIndex,
        virtualCellCount: -1,
        virtualRowCount: -1
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

    if (sourceAppointments.length === 0 || this.renderingStrategy === 'agenda') {
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
    return this._renderingStrategyInstance;
  };

  return AppointmentLayoutManager;
}();

var _default = AppointmentLayoutManager;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
