/**
* DevExtreme (esm/ui/scheduler/workspaces/helpers/positionHelper.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { isDefined } from '../../../../core/utils/type';
import dateUtils from '../../../../core/utils/date';

var getCellSize = DOMMetaData => {
  var {
    dateTableCellsMeta
  } = DOMMetaData;
  var length = dateTableCellsMeta === null || dateTableCellsMeta === void 0 ? void 0 : dateTableCellsMeta.length;

  if (!length) {
    return {
      width: 0,
      height: 0
    };
  }

  var cellIndex = length > 1 ? 1 : 0;
  var cellSize = dateTableCellsMeta[cellIndex][0];
  return {
    width: cellSize.width,
    height: cellSize.height
  };
};

var getMaxAllowedHorizontalPosition = (groupIndex, viewDataProvider, isRtlEnabled, DOMMetaData) => {
  var {
    dateTableCellsMeta
  } = DOMMetaData;
  var firstRow = dateTableCellsMeta[0];
  if (!firstRow) return 0;
  var {
    columnIndex
  } = viewDataProvider.getLastGroupCellPosition(groupIndex);
  var cellPosition = firstRow[columnIndex];
  if (!cellPosition) return 0;
  return !isRtlEnabled ? cellPosition.left + cellPosition.width : cellPosition.left;
};

export var getCellHeight = DOMMetaData => {
  return getCellSize(DOMMetaData).height;
};
export var getCellWidth = DOMMetaData => {
  return getCellSize(DOMMetaData).width;
};
export var getAllDayHeight = (isShowAllDayPanel, isVerticalGrouped, DOMMetaData) => {
  if (!isShowAllDayPanel) {
    return 0;
  }

  if (isVerticalGrouped) {
    var {
      dateTableCellsMeta
    } = DOMMetaData;
    var length = dateTableCellsMeta === null || dateTableCellsMeta === void 0 ? void 0 : dateTableCellsMeta.length;
    return length ? dateTableCellsMeta[0][0].height : 0;
  }

  var {
    allDayPanelCellsMeta
  } = DOMMetaData;
  return allDayPanelCellsMeta !== null && allDayPanelCellsMeta !== void 0 && allDayPanelCellsMeta.length ? allDayPanelCellsMeta[0].height : 0;
};
export var getMaxAllowedPosition = (groupIndex, viewDataProvider, isRtlEnabled, DOMMetaData) => {
  var validGroupIndex = groupIndex || 0;
  return getMaxAllowedHorizontalPosition(validGroupIndex, viewDataProvider, isRtlEnabled, DOMMetaData);
};
export var getMaxAllowedVerticalPosition = _ref => {
  var {
    groupIndex,
    viewDataProvider,
    isShowAllDayPanel,
    isGroupedAllDayPanel,
    isVerticalGrouped,
    DOMMetaData
  } = _ref;
  var {
    rowIndex
  } = viewDataProvider.getLastGroupCellPosition(groupIndex);
  var {
    dateTableCellsMeta
  } = DOMMetaData;
  var lastGroupRow = dateTableCellsMeta[rowIndex];
  if (!lastGroupRow) return 0;
  var result = lastGroupRow[0].top + lastGroupRow[0].height; // TODO remove while refactoring dual calculcations.
  // Should decrease allDayPanel amount due to the dual calculation corrections.

  if (isGroupedAllDayPanel) {
    result -= (groupIndex + 1) * getAllDayHeight(isShowAllDayPanel, isVerticalGrouped, DOMMetaData);
  }

  return result;
};
export class PositionHelper {
  constructor(options) {
    this.options = options;
  }

  get key() {
    return this.options.key;
  }

  get viewDataProvider() {
    return this.options.viewDataProvider;
  }

  get viewStartDayHour() {
    return this.options.viewStartDayHour;
  }

  get viewEndDayHour() {
    return this.options.viewEndDayHour;
  }

  get cellDuration() {
    return this.options.cellDuration;
  }

  get groupedStrategy() {
    return this.options.groupedStrategy;
  }

  get isGroupedByDate() {
    return this.options.isGroupedByDate;
  }

  get isRtlEnabled() {
    return this.options.isRtlEnabled;
  }

  get startViewDate() {
    return this.options.startViewDate;
  }

  get isVerticalGroupedWorkSpace() {
    return this.options.isVerticalGroupedWorkSpace;
  }

  get groupCount() {
    return this.options.groupCount;
  }

  get isVirtualScrolling() {
    return this.options.isVirtualScrolling;
  }

  get isSkippedData() {
    return this.options.isSkippedDataCallback;
  }

  get getPositionShift() {
    return this.options.getPositionShiftCallback;
  }

  get getDOMMetaData() {
    return this.options.getDOMMetaDataCallback;
  }

  getCoordinatesByDate(date, groupIndex, inAllDayRow) {
    var validGroupIndex = groupIndex || 0;
    var cellInfo = {
      groupIndex: validGroupIndex,
      startDate: date,
      isAllDay: inAllDayRow
    };
    var positionByMap = this.viewDataProvider.findCellPositionInMap(cellInfo);

    if (!positionByMap) {
      return undefined;
    }

    var position = this.getCellPosition(positionByMap, inAllDayRow && !this.isVerticalGroupedWorkSpace);
    var timeShift = inAllDayRow ? 0 : this.getTimeShift(date);
    var shift = this.getPositionShift(timeShift, inAllDayRow);
    var horizontalHMax = this.getHorizontalMax(validGroupIndex, date);
    return {
      cellPosition: position.left + shift.cellPosition,
      top: position.top + shift.top,
      left: position.left + shift.left,
      rowIndex: position.rowIndex,
      columnIndex: position.columnIndex,
      hMax: horizontalHMax,
      vMax: this.getVerticalMax(validGroupIndex),
      groupIndex: validGroupIndex
    };
  }

  getVerticalMax(groupIndex) {
    return this.groupedStrategy.getVerticalMax(groupIndex);
  }

  getCoordinatesByDateInGroup(startDate, groupIndices, inAllDayRow, groupIndex) {
    var result = [];

    if (this.isSkippedData(startDate)) {
      return result;
    }

    var validGroupIndices = [groupIndex];

    if (!isDefined(groupIndex)) {
      validGroupIndices = this.groupCount ? groupIndices : [0];
    }

    validGroupIndices.forEach(groupIndex => {
      var coordinates = this.getCoordinatesByDate(startDate, groupIndex, inAllDayRow);

      if (coordinates) {
        result.push(coordinates);
      }
    });
    return result;
  }

  getCellPosition(cellCoordinates, isAllDayPanel) {
    var {
      dateTableCellsMeta,
      allDayPanelCellsMeta
    } = this.getDOMMetaData();
    var {
      columnIndex,
      rowIndex
    } = cellCoordinates;
    var position = isAllDayPanel ? allDayPanelCellsMeta[columnIndex] : dateTableCellsMeta[rowIndex][columnIndex];

    var validPosition = _extends({}, position);

    if (this.isRtlEnabled) {
      validPosition.left += position.width;
    }

    if (validPosition) {
      validPosition.rowIndex = cellCoordinates.rowIndex;
      validPosition.columnIndex = cellCoordinates.columnIndex;
    }

    return validPosition;
  }

  getTimeShift(date) {
    var currentDayStart = new Date(date);
    var currentDayEndHour = new Date(new Date(date).setHours(this.viewEndDayHour, 0, 0));

    if (date.getTime() <= currentDayEndHour.getTime()) {
      currentDayStart.setHours(this.viewStartDayHour, 0, 0, 0);
    }

    var timeZoneDifference = dateUtils.getTimezonesDifference(date, currentDayStart);
    var currentDateTime = date.getTime();
    var currentDayStartTime = currentDayStart.getTime();
    var minTime = this.startViewDate.getTime();
    return currentDateTime > minTime ? (currentDateTime - currentDayStartTime + timeZoneDifference) % this.cellDuration / this.cellDuration : 0;
  }

  getHorizontalMax(groupIndex) {
    var getMaxPosition = groupIndex => {
      return getMaxAllowedPosition(groupIndex, this.viewDataProvider, this.isRtlEnabled, this.getDOMMetaData());
    };

    if (this.isGroupedByDate) {
      return Math.max(getMaxPosition(groupIndex), getMaxPosition(this.groupCount - 1));
    }

    return getMaxPosition(groupIndex);
  }

  getResizableStep() {
    var cellWidth = getCellWidth(this.getDOMMetaData());

    if (this.isGroupedByDate) {
      return this.groupCount * cellWidth;
    }

    return cellWidth;
  }

}
