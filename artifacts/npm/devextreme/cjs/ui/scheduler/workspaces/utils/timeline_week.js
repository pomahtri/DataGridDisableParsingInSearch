/**
* DevExtreme (cjs/ui/scheduler/workspaces/utils/timeline_week.js)
* Version: 21.2.0
* Build date: Wed Jul 28 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getDateForHeaderText = void 0;

var _utils = _interopRequireDefault(require("../../utils.timeZone"));

var _base = require("./base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDateForHeaderText = function getDateForHeaderText(index, date, options) {
  if (!_utils.default.isTimezoneChangeInDate(date)) {
    return date;
  }

  var startDayHour = options.startDayHour,
      startViewDate = options.startViewDate,
      cellCountInDay = options.cellCountInDay,
      interval = options.interval;
  var result = (0, _base.getStartViewDateWithoutDST)(startViewDate, startDayHour);
  var validIndex = index % cellCountInDay;
  result.setTime(result.getTime() + validIndex * interval);
  return result;
};

exports.getDateForHeaderText = getDateForHeaderText;
