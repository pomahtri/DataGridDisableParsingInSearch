/**
* DevExtreme (cjs/ui/scheduler/workspaces/helpers/positionHelper.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.PositionHelper = exports.getMaxAllowedVerticalPosition = exports.getMaxAllowedPosition = exports.getAllDayHeight = exports.getCellWidth = exports.getCellHeight = void 0;

var _type = require("../../../../core/utils/type");

var _date = _interopRequireDefault(require("../../../../core/utils/date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var getCellSize = function getCellSize(DOMMetaData) {
  var dateTableCellsMeta = DOMMetaData.dateTableCellsMeta;
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

var getMaxAllowedHorizontalPosition = function getMaxAllowedHorizontalPosition(groupIndex, viewDataProvider, isRtlEnabled, DOMMetaData) {
  var dateTableCellsMeta = DOMMetaData.dateTableCellsMeta;
  var firstRow = dateTableCellsMeta[0];
  if (!firstRow) return 0;

  var _viewDataProvider$get = viewDataProvider.getLastGroupCellPosition(groupIndex),
      columnIndex = _viewDataProvider$get.columnIndex;

  var cellPosition = firstRow[columnIndex];
  if (!cellPosition) return 0;
  return !isRtlEnabled ? cellPosition.left + cellPosition.width : cellPosition.left;
};

var getCellHeight = function getCellHeight(DOMMetaData) {
  return getCellSize(DOMMetaData).height;
};

exports.getCellHeight = getCellHeight;

var getCellWidth = function getCellWidth(DOMMetaData) {
  return getCellSize(DOMMetaData).width;
};

exports.getCellWidth = getCellWidth;

var getAllDayHeight = function getAllDayHeight(isShowAllDayPanel, isVerticalGrouped, DOMMetaData) {
  if (!isShowAllDayPanel) {
    return 0;
  }

  if (isVerticalGrouped) {
    var dateTableCellsMeta = DOMMetaData.dateTableCellsMeta;
    var length = dateTableCellsMeta === null || dateTableCellsMeta === void 0 ? void 0 : dateTableCellsMeta.length;
    return length ? dateTableCellsMeta[0][0].height : 0;
  }

  var allDayPanelCellsMeta = DOMMetaData.allDayPanelCellsMeta;
  return allDayPanelCellsMeta !== null && allDayPanelCellsMeta !== void 0 && allDayPanelCellsMeta.length ? allDayPanelCellsMeta[0].height : 0;
};

exports.getAllDayHeight = getAllDayHeight;

var getMaxAllowedPosition = function getMaxAllowedPosition(groupIndex, viewDataProvider, isRtlEnabled, DOMMetaData) {
  var validGroupIndex = groupIndex || 0;
  return getMaxAllowedHorizontalPosition(validGroupIndex, viewDataProvider, isRtlEnabled, DOMMetaData);
};

exports.getMaxAllowedPosition = getMaxAllowedPosition;

var getMaxAllowedVerticalPosition = function getMaxAllowedVerticalPosition(_ref) {
  var groupIndex = _ref.groupIndex,
      viewDataProvider = _ref.viewDataProvider,
      isShowAllDayPanel = _ref.isShowAllDayPanel,
      isGroupedAllDayPanel = _ref.isGroupedAllDayPanel,
      isVerticalGrouped = _ref.isVerticalGrouped,
      DOMMetaData = _ref.DOMMetaData;

  var _viewDataProvider$get2 = viewDataProvider.getLastGroupCellPosition(groupIndex),
      rowIndex = _viewDataProvider$get2.rowIndex;

  var dateTableCellsMeta = DOMMetaData.dateTableCellsMeta;
  var lastGroupRow = dateTableCellsMeta[rowIndex];
  if (!lastGroupRow) return 0;
  var result = lastGroupRow[0].top + lastGroupRow[0].height; // TODO remove while refactoring dual calculcations.
  // Should decrease allDayPanel amount due to the dual calculation corrections.

  if (isGroupedAllDayPanel) {
    result -= (groupIndex + 1) * getAllDayHeight(isShowAllDayPanel, isVerticalGrouped, DOMMetaData);
  }

  return result;
};

exports.getMaxAllowedVerticalPosition = getMaxAllowedVerticalPosition;

var PositionHelper = /*#__PURE__*/function () {
  function PositionHelper(options) {
    this.options = options;
  }

  var _proto = PositionHelper.prototype;

  _proto.getCoordinatesByDate = function getCoordinatesByDate(date, groupIndex, inAllDayRow) {
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
  };

  _proto.getVerticalMax = function getVerticalMax(groupIndex) {
    return this.groupedStrategy.getVerticalMax(groupIndex);
  };

  _proto.getCoordinatesByDateInGroup = function getCoordinatesByDateInGroup(startDate, groupIndices, inAllDayRow, groupIndex) {
    var _this = this;

    var result = [];

    if (this.isSkippedData(startDate)) {
      return result;
    }

    var validGroupIndices = [groupIndex];

    if (!(0, _type.isDefined)(groupIndex)) {
      validGroupIndices = this.groupCount ? groupIndices : [0];
    }

    validGroupIndices.forEach(function (groupIndex) {
      var coordinates = _this.getCoordinatesByDate(startDate, groupIndex, inAllDayRow);

      if (coordinates) {
        result.push(coordinates);
      }
    });
    return result;
  };

  _proto.getCellPosition = function getCellPosition(cellCoordinates, isAllDayPanel) {
    var _this$getDOMMetaData = this.getDOMMetaData(),
        dateTableCellsMeta = _this$getDOMMetaData.dateTableCellsMeta,
        allDayPanelCellsMeta = _this$getDOMMetaData.allDayPanelCellsMeta;

    var columnIndex = cellCoordinates.columnIndex,
        rowIndex = cellCoordinates.rowIndex;
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
  };

  _proto.getTimeShift = function getTimeShift(date) {
    var currentDayStart = new Date(date);
    var currentDayEndHour = new Date(new Date(date).setHours(this.viewEndDayHour, 0, 0));

    if (date.getTime() <= currentDayEndHour.getTime()) {
      currentDayStart.setHours(this.viewStartDayHour, 0, 0, 0);
    }

    var timeZoneDifference = _date.default.getTimezonesDifference(date, currentDayStart);

    var currentDateTime = date.getTime();
    var currentDayStartTime = currentDayStart.getTime();
    var minTime = this.startViewDate.getTime();
    return currentDateTime > minTime ? (currentDateTime - currentDayStartTime + timeZoneDifference) % this.cellDuration / this.cellDuration : 0;
  };

  _proto.getHorizontalMax = function getHorizontalMax(groupIndex) {
    var _this2 = this;

    var getMaxPosition = function getMaxPosition(groupIndex) {
      return getMaxAllowedPosition(groupIndex, _this2.viewDataProvider, _this2.isRtlEnabled, _this2.getDOMMetaData());
    };

    if (this.isGroupedByDate) {
      return Math.max(getMaxPosition(groupIndex), getMaxPosition(this.groupCount - 1));
    }

    return getMaxPosition(groupIndex);
  };

  _proto.getResizableStep = function getResizableStep() {
    var cellWidth = getCellWidth(this.getDOMMetaData());

    if (this.isGroupedByDate) {
      return this.groupCount * cellWidth;
    }

    return cellWidth;
  };

  _createClass(PositionHelper, [{
    key: "key",
    get: function get() {
      return this.options.key;
    }
  }, {
    key: "viewDataProvider",
    get: function get() {
      return this.options.viewDataProvider;
    }
  }, {
    key: "viewStartDayHour",
    get: function get() {
      return this.options.viewStartDayHour;
    }
  }, {
    key: "viewEndDayHour",
    get: function get() {
      return this.options.viewEndDayHour;
    }
  }, {
    key: "cellDuration",
    get: function get() {
      return this.options.cellDuration;
    }
  }, {
    key: "groupedStrategy",
    get: function get() {
      return this.options.groupedStrategy;
    }
  }, {
    key: "isGroupedByDate",
    get: function get() {
      return this.options.isGroupedByDate;
    }
  }, {
    key: "isRtlEnabled",
    get: function get() {
      return this.options.isRtlEnabled;
    }
  }, {
    key: "startViewDate",
    get: function get() {
      return this.options.startViewDate;
    }
  }, {
    key: "isVerticalGroupedWorkSpace",
    get: function get() {
      return this.options.isVerticalGroupedWorkSpace;
    }
  }, {
    key: "groupCount",
    get: function get() {
      return this.options.groupCount;
    }
  }, {
    key: "isVirtualScrolling",
    get: function get() {
      return this.options.isVirtualScrolling;
    }
  }, {
    key: "isSkippedData",
    get: function get() {
      return this.options.isSkippedDataCallback;
    }
  }, {
    key: "getPositionShift",
    get: function get() {
      return this.options.getPositionShiftCallback;
    }
  }, {
    key: "getDOMMetaData",
    get: function get() {
      return this.options.getDOMMetaDataCallback;
    }
  }]);

  return PositionHelper;
}();

exports.PositionHelper = PositionHelper;
