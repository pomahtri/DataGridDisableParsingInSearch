/**
* DevExtreme (cjs/ui/scheduler/appointments/cellPositionCalculator.js)
* Version: 21.2.0
* Build date: Wed Jul 28 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.CellPositionCalculator = void 0;

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseStrategy = /*#__PURE__*/function () {
  function BaseStrategy(options) {
    this.options = options;
  }

  var _proto = BaseStrategy.prototype;

  _proto.calculateCellPositions = function calculateCellPositions(groupIndices, isAllDayRowAppointment, isRecurrentAppointment) {
    var _this = this;

    var result = [];
    this.appointments.forEach(function (dateSetting, index) {
      var coordinates = _this.getCoordinateInfos({
        appointment: dateSetting,
        groupIndices: groupIndices,
        isAllDayRowAppointment: isAllDayRowAppointment,
        isRecurrentAppointment: isRecurrentAppointment
      });

      coordinates.forEach(function (item) {
        !!item && result.push(_this._prepareObject(item, index));
      });
    });
    return result;
  };

  _proto.getCoordinateInfos = function getCoordinateInfos(options) {
    var appointment = options.appointment,
        isAllDayRowAppointment = options.isAllDayRowAppointment,
        groupIndices = options.groupIndices,
        recurrent = options.recurrent;
    var startDate = appointment.startDate;
    var groupIndex = !recurrent ? appointment.source.groupIndex : undefined;
    return this.positionHelper.getCoordinatesByDateInGroup(startDate, groupIndices, isAllDayRowAppointment, groupIndex);
  };

  _proto._prepareObject = function _prepareObject(position, dateSettingIndex) {
    position.dateSettingIndex = dateSettingIndex;
    return {
      coordinates: position,
      dateSettingIndex: dateSettingIndex
    };
  };

  _createClass(BaseStrategy, [{
    key: "DOMMetaData",
    get: function get() {
      return this.options.DOMMetaData;
    }
  }, {
    key: "appointments",
    get: function get() {
      return this.options.dateSettings;
    } // TODO rename appoitments -> dateSettings

  }, {
    key: "viewDataProvider",
    get: function get() {
      return this.options.viewDataProvider;
    }
  }, {
    key: "positionHelper",
    get: function get() {
      return this.options.positionHelper;
    }
  }]);

  return BaseStrategy;
}();

var VirtualStrategy = /*#__PURE__*/function (_BaseStrategy) {
  _inheritsLoose(VirtualStrategy, _BaseStrategy);

  function VirtualStrategy() {
    return _BaseStrategy.apply(this, arguments) || this;
  }

  var _proto2 = VirtualStrategy.prototype;

  _proto2.calculateCellPositions = function calculateCellPositions(groupIndices, isAllDayRowAppointment, isRecurrentAppointment) {
    var _this2 = this;

    var appointments = isAllDayRowAppointment ? this.appointments : this.appointments.filter(function (_ref) {
      var source = _ref.source,
          startDate = _ref.startDate,
          endDate = _ref.endDate;
      return _this2.viewDataProvider.isGroupIntersectDateInterval(source.groupIndex, startDate, endDate);
    });

    if (isRecurrentAppointment) {
      return this.createRecurrentAppointmentInfos(appointments, isAllDayRowAppointment);
    }

    return _BaseStrategy.prototype.calculateCellPositions.call(this, groupIndices, isAllDayRowAppointment, isRecurrentAppointment);
  };

  _proto2.createRecurrentAppointmentInfos = function createRecurrentAppointmentInfos(dateSettings, isAllDayRowAppointment) {
    var _this3 = this;

    var result = [];
    dateSettings.forEach(function (_ref2, index) {
      var source = _ref2.source,
          startDate = _ref2.startDate;

      var coordinate = _this3.positionHelper.getCoordinatesByDate(startDate, source.groupIndex, isAllDayRowAppointment);

      if (coordinate) {
        result.push(_this3._prepareObject(coordinate, index));
      }
    });
    return result;
  };

  return VirtualStrategy;
}(BaseStrategy);

var CellPositionCalculator = /*#__PURE__*/function () {
  function CellPositionCalculator(options) {
    this.options = options;
  }

  var _proto3 = CellPositionCalculator.prototype;

  _proto3.calculateCellPositions = function calculateCellPositions(groupIndices, isAllDayRowAppointment, isRecurrentAppointment) {
    var strategy = this.options.isVirtualScrolling ? new VirtualStrategy(this.options) : new BaseStrategy(this.options);
    return strategy.calculateCellPositions(groupIndices, isAllDayRowAppointment, isRecurrentAppointment);
  };

  return CellPositionCalculator;
}();

exports.CellPositionCalculator = CellPositionCalculator;
