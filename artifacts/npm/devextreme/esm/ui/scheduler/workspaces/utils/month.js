/**
* DevExtreme (esm/ui/scheduler/workspaces/utils/month.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../../../core/utils/date';
import dateLocalization from '../../../../localization/date';
import { getCalculatedFirstDayOfWeek, isDateInRange, setOptionHour } from './base';
export var getViewStartByOptions = (startDate, currentDate, intervalCount, startViewDate) => {
  if (!startDate) {
    return new Date(currentDate);
  } else {
    var _startDate = new Date(startViewDate);

    var validStartViewDate = new Date(startViewDate);
    var diff = _startDate.getTime() <= currentDate.getTime() ? 1 : -1;
    var endDate = new Date(new Date(validStartViewDate.setMonth(validStartViewDate.getMonth() + diff * intervalCount)));

    while (!isDateInRange(currentDate, _startDate, endDate, diff)) {
      _startDate = new Date(endDate);

      if (diff > 0) {
        _startDate.setDate(1);
      }

      endDate = new Date(new Date(endDate.setMonth(endDate.getMonth() + diff * intervalCount)));
    }

    return diff > 0 ? _startDate : endDate;
  }
};
export var calculateStartViewDate = (currentDate, startDayHour, startDate, intervalCount, firstDayOfWeekOption) => {
  var viewStart = getViewStartByOptions(startDate, currentDate, intervalCount, dateUtils.getFirstMonthDate(startDate));
  var firstMonthDate = dateUtils.getFirstMonthDate(viewStart);
  var firstDayOfWeek = getCalculatedFirstDayOfWeek(firstDayOfWeekOption);
  var firstViewDate = dateUtils.getFirstWeekDate(firstMonthDate, firstDayOfWeek);
  return setOptionHour(firstViewDate, startDayHour);
};
export var calculateCellIndex = (rowIndex, columnIndex, rowCount, columnCount) => {
  return rowIndex * columnCount + columnIndex;
};
export var isFirstCellInMonthWithIntervalCount = (cellDate, intervalCount) => {
  return cellDate.getDate() === 1 && intervalCount > 1;
};
export var getCellText = (date, intervalCount) => {
  if (isFirstCellInMonthWithIntervalCount(date, intervalCount)) {
    var monthName = dateLocalization.getMonthNames('abbreviated')[date.getMonth()];
    return [monthName, dateLocalization.format(date, 'day')].join(' ');
  }

  return dateLocalization.format(date, 'dd');
};
