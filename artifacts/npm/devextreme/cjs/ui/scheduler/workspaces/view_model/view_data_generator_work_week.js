/**
* DevExtreme (cjs/ui/scheduler/workspaces/view_model/view_data_generator_work_week.js)
* Version: 21.2.0
* Build date: Wed Jul 28 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.ViewDataGeneratorWorkWeek = void 0;

var _work_week = require("../utils/work_week");

var _view_data_generator_week = require("./view_data_generator_week");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ViewDataGeneratorWorkWeek = /*#__PURE__*/function (_ViewDataGeneratorWee) {
  _inheritsLoose(ViewDataGeneratorWorkWeek, _ViewDataGeneratorWee);

  function ViewDataGeneratorWorkWeek() {
    return _ViewDataGeneratorWee.apply(this, arguments) || this;
  }

  var _proto = ViewDataGeneratorWorkWeek.prototype;

  _proto._calculateStartViewDate = function _calculateStartViewDate(options) {
    return (0, _work_week.calculateStartViewDate)(options.currentDate, options.startDayHour, options.startDate, this._getIntervalDuration(options.intervalCount), options.firstDayOfWeek);
  };

  _createClass(ViewDataGeneratorWorkWeek, [{
    key: "daysInInterval",
    get: function get() {
      return 5;
    }
  }]);

  return ViewDataGeneratorWorkWeek;
}(_view_data_generator_week.ViewDataGeneratorWeek);

exports.ViewDataGeneratorWorkWeek = ViewDataGeneratorWorkWeek;
