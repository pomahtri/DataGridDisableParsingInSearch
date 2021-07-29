/**
* DevExtreme (cjs/ui/scheduler/workspaces/utils/base.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.isHorizontalView = exports.calculateDayDuration = exports.calculateIsGroupedAllDayPanel = exports.getHorizontalGroupCount = exports.isDateAndTimeView = exports.getVerticalGroupCountClass = exports.getToday = exports.formatWeekdayAndDay = exports.formatWeekday = exports.getStartViewDateTimeOffset = exports.validateDayHours = exports.getHeaderCellText = exports.getDateByCellIndices = exports.getStartViewDateWithoutDST = exports.calculateCellIndex = exports.calculateViewStartDate = exports.getFirstDayOfWeek = exports.getCalculatedFirstDayOfWeek = exports.getViewStartByOptions = exports.setOptionHour = exports.isDateInRange = void 0;

var _ui = _interopRequireDefault(require("../../../widget/ui.errors"));

var _date = _interopRequireDefault(require("../../../../core/utils/date"));

var _type = require("../../../../core/utils/type");

var _date2 = _interopRequireDefault(require("../../../../localization/date"));

var _utils = _interopRequireDefault(require("../../utils.timeZone"));

var _classes = require("../../classes");

var _constants = require("../../constants");

var _utils2 = require("../../resources/utils");

var _utils3 = require("../../../../renovation/ui/scheduler/workspaces/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDateInRange = function isDateInRange(date, startDate, endDate, diff) {
  return diff > 0 ? _date.default.dateInRange(date, startDate, new Date(endDate.getTime() - 1)) : _date.default.dateInRange(date, endDate, startDate, 'date');
};

exports.isDateInRange = isDateInRange;

var setOptionHour = function setOptionHour(date, startDayHour) {
  var nextDate = new Date(date);

  if (!(0, _type.isDefined)(startDayHour)) {
    return nextDate;
  }

  nextDate.setHours(startDayHour, startDayHour % 1 * 60, 0, 0);
  return nextDate;
};

exports.setOptionHour = setOptionHour;

var getViewStartByOptions = function getViewStartByOptions(startDate, currentDate, intervalDuration, startViewDate) {
  if (!startDate) {
    return new Date(currentDate);
  } else {
    var _startDate = _date.default.trimTime(startViewDate);

    var diff = _startDate.getTime() <= currentDate.getTime() ? 1 : -1;
    var endDate = new Date(_startDate.getTime() + intervalDuration * diff);

    while (!isDateInRange(currentDate, _startDate, endDate, diff)) {
      _startDate = endDate;
      endDate = new Date(_startDate.getTime() + intervalDuration * diff);
    }

    return diff > 0 ? _startDate : endDate;
  }
};

exports.getViewStartByOptions = getViewStartByOptions;

var getCalculatedFirstDayOfWeek = function getCalculatedFirstDayOfWeek(firstDayOfWeekOption) {
  return (0, _type.isDefined)(firstDayOfWeekOption) ? firstDayOfWeekOption : _date2.default.firstDayOfWeekIndex();
};

exports.getCalculatedFirstDayOfWeek = getCalculatedFirstDayOfWeek;

var getFirstDayOfWeek = function getFirstDayOfWeek(firstDayOfWeekOption) {
  return firstDayOfWeekOption;
};

exports.getFirstDayOfWeek = getFirstDayOfWeek;

var calculateViewStartDate = function calculateViewStartDate(startDateOption) {
  return startDateOption;
};

exports.calculateViewStartDate = calculateViewStartDate;

var calculateCellIndex = function calculateCellIndex(rowIndex, columnIndex, rowCount, columnCount) {
  return columnIndex * rowCount + rowIndex;
};

exports.calculateCellIndex = calculateCellIndex;

var getTimeOffsetByColumnIndex = function getTimeOffsetByColumnIndex(columnIndex, columnsInDay, firstDayOfWeek) {
  var firstDayOfWeekDiff = Math.max(0, firstDayOfWeek - 1);
  var weekendCount = Math.floor((columnIndex + firstDayOfWeekDiff) / (5 * columnsInDay));
  return _date.default.dateToMilliseconds('day') * weekendCount * 2;
};

var getStartViewDateWithoutDST = function getStartViewDateWithoutDST(startViewDate, startDayHour) {
  var newStartViewDate = _utils.default.getDateWithoutTimezoneChange(startViewDate);

  newStartViewDate.setHours(startDayHour);
  return newStartViewDate;
};

exports.getStartViewDateWithoutDST = getStartViewDateWithoutDST;

var getMillisecondsOffset = function getMillisecondsOffset(cellIndex, interval, hiddenIntervalBase, cellCountInDay) {
  var dayIndex = Math.floor(cellIndex / cellCountInDay);
  var hiddenInterval = dayIndex * hiddenIntervalBase;
  return interval * cellIndex + hiddenInterval;
};

var getDateByCellIndices = function getDateByCellIndices(options, rowIndex, columnIndex, calculateCellIndex, cellCountInDay) {
  var startViewDate = options.startViewDate;
  var startDayHour = options.startDayHour,
      isWorkView = options.isWorkView,
      columnsInDay = options.columnsInDay,
      hiddenInterval = options.hiddenInterval,
      interval = options.interval,
      rowCountBase = options.rowCountBase,
      columnCountBase = options.columnCountBase,
      firstDayOfWeek = options.firstDayOfWeek;
  var isStartViewDateDuringDST = startViewDate.getHours() !== Math.floor(startDayHour);

  if (isStartViewDateDuringDST) {
    var dateWithCorrectHours = getStartViewDateWithoutDST(startViewDate, startDayHour);
    startViewDate = new Date(dateWithCorrectHours - _date.default.dateToMilliseconds('day'));
  }

  var cellIndex = calculateCellIndex(rowIndex, columnIndex, rowCountBase, columnCountBase);
  var millisecondsOffset = getMillisecondsOffset(cellIndex, interval, hiddenInterval, cellCountInDay);
  var offsetByCount = isWorkView ? getTimeOffsetByColumnIndex(columnIndex, columnsInDay, firstDayOfWeek) : 0;
  var startViewDateTime = startViewDate.getTime();
  var currentDate = new Date(startViewDateTime + millisecondsOffset + offsetByCount);
  var timeZoneDifference = isStartViewDateDuringDST ? 0 : _date.default.getTimezonesDifference(startViewDate, currentDate);
  currentDate.setTime(currentDate.getTime() + timeZoneDifference);
  return currentDate;
};

exports.getDateByCellIndices = getDateByCellIndices;

var getHeaderCellText = function getHeaderCellText(headerIndex, date, headerCellTextFormat, getDateForHeaderText, additionalOptions) {
  var validDate = getDateForHeaderText(headerIndex, date, additionalOptions);
  return _date2.default.format(validDate, headerCellTextFormat);
};

exports.getHeaderCellText = getHeaderCellText;

var validateDayHours = function validateDayHours(startDayHour, endDayHour) {
  if (startDayHour >= endDayHour) {
    throw _ui.default.Error('E1058');
  }
};

exports.validateDayHours = validateDayHours;

var getStartViewDateTimeOffset = function getStartViewDateTimeOffset(startViewDate, startDayHour) {
  var validStartDayHour = Math.floor(startDayHour);

  var isDSTChange = _utils.default.isTimezoneChangeInDate(startViewDate);

  if (isDSTChange && validStartDayHour !== startViewDate.getHours()) {
    return _date.default.dateToMilliseconds('hour');
  }

  return 0;
};

exports.getStartViewDateTimeOffset = getStartViewDateTimeOffset;

var formatWeekday = function formatWeekday(date) {
  return _date2.default.getDayNames('abbreviated')[date.getDay()];
};

exports.formatWeekday = formatWeekday;

var formatWeekdayAndDay = function formatWeekdayAndDay(date) {
  return formatWeekday(date) + ' ' + _date2.default.format(date, 'day');
};

exports.formatWeekdayAndDay = formatWeekdayAndDay;

var getToday = function getToday(indicatorTime, timeZoneCalculator) {
  var todayDate = indicatorTime || new Date();
  return (timeZoneCalculator === null || timeZoneCalculator === void 0 ? void 0 : timeZoneCalculator.createDate(todayDate, {
    path: 'toGrid'
  })) || todayDate;
};

exports.getToday = getToday;

var getVerticalGroupCountClass = function getVerticalGroupCountClass(groups) {
  switch (groups === null || groups === void 0 ? void 0 : groups.length) {
    case 1:
      return _classes.VERTICAL_GROUP_COUNT_CLASSES[0];

    case 2:
      return _classes.VERTICAL_GROUP_COUNT_CLASSES[1];

    case 3:
      return _classes.VERTICAL_GROUP_COUNT_CLASSES[2];

    default:
      return undefined;
  }
};

exports.getVerticalGroupCountClass = getVerticalGroupCountClass;

var isDateAndTimeView = function isDateAndTimeView(viewType) {
  return viewType !== _constants.VIEWS.TIMELINE_MONTH && viewType !== _constants.VIEWS.MONTH;
};

exports.isDateAndTimeView = isDateAndTimeView;

var getHorizontalGroupCount = function getHorizontalGroupCount(groups, groupOrientation) {
  var groupCount = (0, _utils2.getGroupCount)(groups) || 1;
  var isVerticalGrouping = (0, _utils3.isVerticalGroupingApplied)(groups, groupOrientation);
  return isVerticalGrouping ? 1 : groupCount;
};

exports.getHorizontalGroupCount = getHorizontalGroupCount;

var calculateIsGroupedAllDayPanel = function calculateIsGroupedAllDayPanel(groups, groupOrientation, isAllDayPanelVisible) {
  return (0, _utils3.isVerticalGroupingApplied)(groups, groupOrientation) && isAllDayPanelVisible;
};

exports.calculateIsGroupedAllDayPanel = calculateIsGroupedAllDayPanel;

var calculateDayDuration = function calculateDayDuration(startDayHour, endDayHour) {
  return endDayHour - startDayHour;
};

exports.calculateDayDuration = calculateDayDuration;

var isHorizontalView = function isHorizontalView(viewType) {
  switch (viewType) {
    case _constants.VIEWS.TIMELINE_DAY:
    case _constants.VIEWS.TIMELINE_WEEK:
    case _constants.VIEWS.TIMELINE_WORK_WEEK:
    case _constants.VIEWS.TIMELINE_MONTH:
    case _constants.VIEWS.MONTH:
      return true;

    default:
      return false;
  }
};

exports.isHorizontalView = isHorizontalView;
