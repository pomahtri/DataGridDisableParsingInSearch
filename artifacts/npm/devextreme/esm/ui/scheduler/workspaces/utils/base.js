/**
* DevExtreme (esm/ui/scheduler/workspaces/utils/base.js)
* Version: 21.2.0
* Build date: Wed Jul 28 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import errors from '../../../widget/ui.errors';
import dateUtils from '../../../../core/utils/date';
import { isDefined } from '../../../../core/utils/type';
import dateLocalization from '../../../../localization/date';
import timeZoneUtils from '../../utils.timeZone';
import { VERTICAL_GROUP_COUNT_CLASSES } from '../../classes';
import { VIEWS } from '../../constants';
import { getGroupCount } from '../../resources/utils';
import { isVerticalGroupingApplied } from '../../../../renovation/ui/scheduler/workspaces/utils';
export var isDateInRange = (date, startDate, endDate, diff) => {
  return diff > 0 ? dateUtils.dateInRange(date, startDate, new Date(endDate.getTime() - 1)) : dateUtils.dateInRange(date, endDate, startDate, 'date');
};
export var setOptionHour = (date, startDayHour) => {
  var nextDate = new Date(date);

  if (!isDefined(startDayHour)) {
    return nextDate;
  }

  nextDate.setHours(startDayHour, startDayHour % 1 * 60, 0, 0);
  return nextDate;
};
export var getViewStartByOptions = (startDate, currentDate, intervalDuration, startViewDate) => {
  if (!startDate) {
    return new Date(currentDate);
  } else {
    var _startDate = dateUtils.trimTime(startViewDate);

    var diff = _startDate.getTime() <= currentDate.getTime() ? 1 : -1;
    var endDate = new Date(_startDate.getTime() + intervalDuration * diff);

    while (!isDateInRange(currentDate, _startDate, endDate, diff)) {
      _startDate = endDate;
      endDate = new Date(_startDate.getTime() + intervalDuration * diff);
    }

    return diff > 0 ? _startDate : endDate;
  }
};
export var getCalculatedFirstDayOfWeek = firstDayOfWeekOption => {
  return isDefined(firstDayOfWeekOption) ? firstDayOfWeekOption : dateLocalization.firstDayOfWeekIndex();
};
export var getFirstDayOfWeek = firstDayOfWeekOption => firstDayOfWeekOption;
export var calculateViewStartDate = startDateOption => startDateOption;
export var calculateCellIndex = (rowIndex, columnIndex, rowCount, columnCount) => {
  return columnIndex * rowCount + rowIndex;
};

var getTimeOffsetByColumnIndex = (columnIndex, columnsInDay, firstDayOfWeek) => {
  var firstDayOfWeekDiff = Math.max(0, firstDayOfWeek - 1);
  var weekendCount = Math.floor((columnIndex + firstDayOfWeekDiff) / (5 * columnsInDay));
  return dateUtils.dateToMilliseconds('day') * weekendCount * 2;
};

export var getStartViewDateWithoutDST = (startViewDate, startDayHour) => {
  var newStartViewDate = timeZoneUtils.getDateWithoutTimezoneChange(startViewDate);
  newStartViewDate.setHours(startDayHour);
  return newStartViewDate;
};

var getMillisecondsOffset = (cellIndex, interval, hiddenIntervalBase, cellCountInDay) => {
  var dayIndex = Math.floor(cellIndex / cellCountInDay);
  var hiddenInterval = dayIndex * hiddenIntervalBase;
  return interval * cellIndex + hiddenInterval;
};

export var getDateByCellIndices = (options, rowIndex, columnIndex, calculateCellIndex, cellCountInDay) => {
  var startViewDate = options.startViewDate;
  var {
    startDayHour,
    isWorkView,
    columnsInDay,
    hiddenInterval,
    interval,
    rowCountBase,
    columnCountBase,
    firstDayOfWeek
  } = options;
  var isStartViewDateDuringDST = startViewDate.getHours() !== Math.floor(startDayHour);

  if (isStartViewDateDuringDST) {
    var dateWithCorrectHours = getStartViewDateWithoutDST(startViewDate, startDayHour);
    startViewDate = new Date(dateWithCorrectHours - dateUtils.dateToMilliseconds('day'));
  }

  var cellIndex = calculateCellIndex(rowIndex, columnIndex, rowCountBase, columnCountBase);
  var millisecondsOffset = getMillisecondsOffset(cellIndex, interval, hiddenInterval, cellCountInDay);
  var offsetByCount = isWorkView ? getTimeOffsetByColumnIndex(columnIndex, columnsInDay, firstDayOfWeek) : 0;
  var startViewDateTime = startViewDate.getTime();
  var currentDate = new Date(startViewDateTime + millisecondsOffset + offsetByCount);
  var timeZoneDifference = isStartViewDateDuringDST ? 0 : dateUtils.getTimezonesDifference(startViewDate, currentDate);
  currentDate.setTime(currentDate.getTime() + timeZoneDifference);
  return currentDate;
};
export var getHeaderCellText = (headerIndex, date, headerCellTextFormat, getDateForHeaderText, additionalOptions) => {
  var validDate = getDateForHeaderText(headerIndex, date, additionalOptions);
  return dateLocalization.format(validDate, headerCellTextFormat);
};
export var validateDayHours = (startDayHour, endDayHour) => {
  if (startDayHour >= endDayHour) {
    throw errors.Error('E1058');
  }
};
export var getStartViewDateTimeOffset = (startViewDate, startDayHour) => {
  var validStartDayHour = Math.floor(startDayHour);
  var isDSTChange = timeZoneUtils.isTimezoneChangeInDate(startViewDate);

  if (isDSTChange && validStartDayHour !== startViewDate.getHours()) {
    return dateUtils.dateToMilliseconds('hour');
  }

  return 0;
};
export var formatWeekday = function formatWeekday(date) {
  return dateLocalization.getDayNames('abbreviated')[date.getDay()];
};
export var formatWeekdayAndDay = date => {
  return formatWeekday(date) + ' ' + dateLocalization.format(date, 'day');
};
export var getToday = (indicatorTime, timeZoneCalculator) => {
  var todayDate = indicatorTime || new Date();
  return (timeZoneCalculator === null || timeZoneCalculator === void 0 ? void 0 : timeZoneCalculator.createDate(todayDate, {
    path: 'toGrid'
  })) || todayDate;
};
export var getVerticalGroupCountClass = groups => {
  switch (groups === null || groups === void 0 ? void 0 : groups.length) {
    case 1:
      return VERTICAL_GROUP_COUNT_CLASSES[0];

    case 2:
      return VERTICAL_GROUP_COUNT_CLASSES[1];

    case 3:
      return VERTICAL_GROUP_COUNT_CLASSES[2];

    default:
      return undefined;
  }
};
export var isDateAndTimeView = viewType => {
  return viewType !== VIEWS.TIMELINE_MONTH && viewType !== VIEWS.MONTH;
};
export var getHorizontalGroupCount = (groups, groupOrientation) => {
  var groupCount = getGroupCount(groups) || 1;
  var isVerticalGrouping = isVerticalGroupingApplied(groups, groupOrientation);
  return isVerticalGrouping ? 1 : groupCount;
};
export var calculateIsGroupedAllDayPanel = (groups, groupOrientation, isAllDayPanelVisible) => {
  return isVerticalGroupingApplied(groups, groupOrientation) && isAllDayPanelVisible;
};
export var calculateDayDuration = (startDayHour, endDayHour) => {
  return endDayHour - startDayHour;
};
export var isHorizontalView = viewType => {
  switch (viewType) {
    case VIEWS.TIMELINE_DAY:
    case VIEWS.TIMELINE_WEEK:
    case VIEWS.TIMELINE_WORK_WEEK:
    case VIEWS.TIMELINE_MONTH:
    case VIEWS.MONTH:
      return true;

    default:
      return false;
  }
};
