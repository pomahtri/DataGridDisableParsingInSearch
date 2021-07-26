/**
* DevExtreme (esm/ui/scheduler/workspaces/utils/week.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../../../core/utils/date';
import dateLocalization from '../../../../localization/date';
import { getCalculatedFirstDayOfWeek, getStartViewDateTimeOffset, getViewStartByOptions, setOptionHour } from './base';
import timeZoneUtils from '../../utils.timeZone';
export var getIntervalDuration = intervalCount => {
  return dateUtils.dateToMilliseconds('day') * 7 * intervalCount;
};
export var getValidStartDate = (startDate, firstDayOfWeek) => {
  return startDate ? dateUtils.getFirstWeekDate(startDate, firstDayOfWeek) : undefined;
};
export var calculateStartViewDate = (currentDate, startDayHour, startDate, intervalDuration, firstDayOfWeekOption) => {
  var firstDayOfWeek = getCalculatedFirstDayOfWeek(firstDayOfWeekOption);
  var viewStart = getViewStartByOptions(startDate, currentDate, intervalDuration, getValidStartDate(startDate, firstDayOfWeek));
  var firstViewDate = dateUtils.getFirstWeekDate(viewStart, firstDayOfWeek);
  return setOptionHour(firstViewDate, startDayHour);
};
export var calculateViewStartDate = (startDateOption, firstDayOfWeek) => {
  var validFirstDayOfWeek = firstDayOfWeek || dateLocalization.firstDayOfWeekIndex();
  return dateUtils.getFirstWeekDate(startDateOption, validFirstDayOfWeek);
};

var getTimeCellDate = (rowIndex, date, startViewDate, cellDuration, startDayHour) => {
  if (!timeZoneUtils.isTimezoneChangeInDate(date)) {
    return date;
  }

  var startViewDateWithoutDST = timeZoneUtils.getDateWithoutTimezoneChange(startViewDate);
  var result = new Date(startViewDateWithoutDST);
  var timeCellDuration = Math.round(cellDuration);
  var startViewDateOffset = getStartViewDateTimeOffset(startViewDate, startDayHour);
  result.setMilliseconds(result.getMilliseconds() + timeCellDuration * rowIndex - startViewDateOffset);
  return result;
}; // T410490: incorrectly displaying time slots on Linux


export var getTimePanelCellText = (rowIndex, date, startViewDate, cellDuration, startDayHour) => {
  if (rowIndex % 2 === 0) {
    var validDate = getTimeCellDate(rowIndex, date, startViewDate, cellDuration, startDayHour);
    return dateLocalization.format(validDate, 'shorttime');
  }

  return '';
};
