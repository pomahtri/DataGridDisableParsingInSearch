/**
* DevExtreme (esm/ui/scheduler/workspaces/view_model/view_data_generator.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import dateUtils from '../../../../core/utils/date';
import { HORIZONTAL_GROUP_ORIENTATION } from '../../constants';
import { getAllGroups, getGroupCount } from '../../resources/utils';
import { getDateByCellIndices, calculateCellIndex, calculateDayDuration, isHorizontalView } from '../utils/base';
var HOUR_MS = dateUtils.dateToMilliseconds('hour');
export class ViewDataGenerator {
  get daysInInterval() {
    return 1;
  }

  getCompleteViewDataMap(options) {
    var {
      groups,
      isGroupedByDate,
      isHorizontalGrouping,
      isVerticalGrouping,
      intervalCount,
      currentDate,
      viewType,
      startDayHour,
      endDayHour,
      hoursInterval
    } = options;

    this._setVisibilityDates(options);

    var groupsList = getAllGroups(groups);
    var cellCountInGroupRow = this.getCellCount({
      intervalCount,
      currentDate,
      viewType,
      startDayHour,
      endDayHour,
      hoursInterval
    });
    var rowCountInGroup = this.getRowCount({
      intervalCount,
      currentDate,
      viewType,
      hoursInterval,
      startDayHour,
      endDayHour
    });
    var viewDataMap = [];

    var allDayPanelData = this._generateAllDayPanelData(options, rowCountInGroup, cellCountInGroupRow);

    var viewCellsData = this._generateViewCellsData(options, rowCountInGroup, cellCountInGroupRow);

    allDayPanelData && viewDataMap.push(allDayPanelData);
    viewDataMap.push(...viewCellsData);

    if (isHorizontalGrouping && !isGroupedByDate) {
      viewDataMap = this._transformViewDataMapForHorizontalGrouping(viewDataMap, groupsList);
    }

    if (isVerticalGrouping) {
      viewDataMap = this._transformViewDataMapForVerticalGrouping(viewDataMap, groupsList);
    }

    if (isGroupedByDate) {
      viewDataMap = this._transformViewDataMapForGroupingByDate(viewDataMap, groupsList);
    }

    var completeViewDataMap = this._addKeysToCells(viewDataMap);

    return completeViewDataMap;
  }

  _transformViewDataMapForHorizontalGrouping(viewDataMap, groupsList) {
    var result = viewDataMap.map(row => row.slice());
    groupsList.slice(1).forEach((groups, index) => {
      var groupIndex = index + 1;
      viewDataMap.forEach((row, rowIndex) => {
        var nextGroupRow = row.map(cellData => {
          return _extends({}, cellData, {
            groups,
            groupIndex
          });
        });
        result[rowIndex].push(...nextGroupRow);
      });
    });
    return result;
  }

  _transformViewDataMapForVerticalGrouping(viewDataMap, groupsList) {
    var result = viewDataMap.map(row => row.slice());
    groupsList.slice(1).forEach((groups, index) => {
      var groupIndex = index + 1;
      var nextGroupMap = viewDataMap.map(cellsRow => {
        var nextRow = cellsRow.map(cellData => {
          return _extends({}, cellData, {
            groupIndex,
            groups
          });
        });
        return nextRow;
      });
      result.push(...nextGroupMap);
    });
    return result;
  }

  _transformViewDataMapForGroupingByDate(viewDataMap, groupsList) {
    var correctedGroupList = groupsList.slice(1);
    var correctedGroupCount = correctedGroupList.length;
    var result = viewDataMap.map(cellsRow => {
      var groupedByDateCellsRow = cellsRow.reduce((currentRow, cell) => {
        var rowWithCurrentCell = [...currentRow, _extends({}, cell, {
          isFirstGroupCell: true,
          isLastGroupCell: correctedGroupCount === 0
        }), ...correctedGroupList.map((groups, index) => _extends({}, cell, {
          groups,
          groupIndex: index + 1,
          isFirstGroupCell: false,
          isLastGroupCell: index === correctedGroupCount - 1
        }))];
        return rowWithCurrentCell;
      }, []);
      return groupedByDateCellsRow;
    });
    return result;
  }

  _addKeysToCells(viewDataMap) {
    var totalColumnCount = viewDataMap[0].length;
    var {
      currentViewDataMap: result
    } = viewDataMap.reduce((_ref, row, rowIndex) => {
      var {
        allDayPanelsCount,
        currentViewDataMap
      } = _ref;
      var isAllDay = row[0].allDay;
      var keyBase = (rowIndex - allDayPanelsCount) * totalColumnCount;
      var currentAllDayPanelsCount = isAllDay ? allDayPanelsCount + 1 : allDayPanelsCount;
      currentViewDataMap[rowIndex].forEach((cell, columnIndex) => {
        cell.key = keyBase + columnIndex;
      });
      return {
        allDayPanelsCount: currentAllDayPanelsCount,
        currentViewDataMap
      };
    }, {
      allDayPanelsCount: 0,
      currentViewDataMap: viewDataMap
    });
    return result;
  }

  generateViewDataMap(completeViewDataMap, options) {
    var {
      rowCount,
      startCellIndex,
      startRowIndex,
      cellCount,
      isVerticalGrouping,
      isAllDayPanelVisible
    } = options;

    var sliceCells = (row, rowIndex, startIndex, count) => {
      var sliceToIndex = count !== undefined ? startIndex + count : undefined;
      return row.slice(startIndex, sliceToIndex).map((cellData, columnIndex) => ({
        cellData,
        position: {
          rowIndex,
          columnIndex
        }
      }));
    };

    var correctedStartRowIndex = startRowIndex;
    var allDayPanelMap = [];

    if (this._isStandaloneAllDayPanel(isVerticalGrouping, isAllDayPanelVisible)) {
      correctedStartRowIndex++;
      allDayPanelMap = sliceCells(completeViewDataMap[0], 0, startCellIndex, cellCount);
    }

    var dateTableMap = completeViewDataMap.slice(correctedStartRowIndex, correctedStartRowIndex + rowCount).map((row, rowIndex) => sliceCells(row, rowIndex, startCellIndex, cellCount));
    return {
      allDayPanelMap,
      dateTableMap
    };
  }

  _isStandaloneAllDayPanel(isVerticalGrouping, isAllDayPanelVisible) {
    return !isVerticalGrouping && isAllDayPanelVisible;
  }

  getViewDataFromMap(viewDataMap, options) {
    var {
      topVirtualRowHeight,
      bottomVirtualRowHeight,
      leftVirtualCellWidth,
      rightVirtualCellWidth,
      totalCellCount,
      totalRowCount,
      cellCount,
      rowCount,
      startRowIndex,
      startCellIndex,
      isProvideVirtualCellsWidth,
      isGroupedAllDayPanel,
      isVerticalGrouping,
      isAllDayPanelVisible
    } = options;
    var {
      allDayPanelMap,
      dateTableMap
    } = viewDataMap;
    var {
      previousGroupedData: groupedData
    } = dateTableMap.reduce((_ref2, cellsRow) => {
      var {
        previousGroupIndex,
        previousGroupedData
      } = _ref2;
      var cellDataRow = cellsRow.map(_ref3 => {
        var {
          cellData
        } = _ref3;
        return cellData;
      });
      var firstCell = cellDataRow[0];
      var isAllDayRow = firstCell.allDay;
      var currentGroupIndex = firstCell.groupIndex;

      if (currentGroupIndex !== previousGroupIndex) {
        previousGroupedData.push({
          dateTable: [],
          isGroupedAllDayPanel,
          groupIndex: currentGroupIndex
        });
      }

      if (isAllDayRow) {
        previousGroupedData[previousGroupedData.length - 1].allDayPanel = cellDataRow;
      } else {
        previousGroupedData[previousGroupedData.length - 1].dateTable.push(cellDataRow);
      }

      return {
        previousGroupedData,
        previousGroupIndex: currentGroupIndex
      };
    }, {
      previousGroupIndex: -1,
      previousGroupedData: []
    });

    if (this._isStandaloneAllDayPanel(isVerticalGrouping, isAllDayPanelVisible)) {
      groupedData[0].allDayPanel = allDayPanelMap.map(_ref4 => {
        var {
          cellData
        } = _ref4;
        return cellData;
      });
    }

    return {
      groupedData,
      topVirtualRowHeight,
      bottomVirtualRowHeight,
      leftVirtualCellWidth: isProvideVirtualCellsWidth ? leftVirtualCellWidth : undefined,
      rightVirtualCellWidth: isProvideVirtualCellsWidth ? rightVirtualCellWidth : undefined,
      isGroupedAllDayPanel,
      leftVirtualCellCount: startCellIndex,
      rightVirtualCellCount: cellCount === undefined ? 0 : totalCellCount - startCellIndex - cellCount,
      topVirtualRowCount: startRowIndex,
      bottomVirtualRowCount: totalRowCount - startRowIndex - rowCount
    };
  }

  _generateViewCellsData(options, rowCount, cellCountInGroupRow) {
    var viewCellsData = [];

    for (var rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
      viewCellsData.push(this._generateCellsRow(options, false, rowIndex, rowCount, cellCountInGroupRow));
    }

    return viewCellsData;
  }

  _generateAllDayPanelData(options, rowCount, columnCount) {
    if (!options.isAllDayPanelVisible) {
      return null;
    }

    return this._generateCellsRow(options, true, 0, rowCount, columnCount);
  }

  _generateCellsRow(options, allDay, rowIndex, rowCount, columnCount) {
    var cellsRow = [];

    for (var columnIndex = 0; columnIndex < columnCount; ++columnIndex) {
      var cellDataValue = this.getCellData(rowIndex, columnIndex, options, allDay);
      cellDataValue.index = rowIndex * columnCount + columnIndex;
      cellDataValue.isFirstGroupCell = this._isFirstGroupCell(rowIndex, columnIndex, options, rowCount, columnCount);
      cellDataValue.isLastGroupCell = this._isLastGroupCell(rowIndex, columnIndex, options, rowCount, columnCount);
      cellsRow.push(cellDataValue);
    }

    return cellsRow;
  }

  getCellData(rowIndex, columnIndex, options, allDay) {
    return allDay ? this.prepareAllDayCellData(options, rowIndex, columnIndex) : this.prepareCellData(options, rowIndex, columnIndex);
  }

  prepareCellData(options, rowIndex, columnIndex) {
    var {
      groups,
      tableAllDay,
      startDayHour,
      endDayHour,
      interval,
      hoursInterval
    } = options;
    var groupsList = getAllGroups(groups);
    var startDate = getDateByCellIndices(options, rowIndex, columnIndex, this._calculateCellIndex, this.getCellCountInDay(startDayHour, endDayHour, hoursInterval));
    var endDate = this.calculateEndDate(startDate, interval, endDayHour);
    var data = {
      startDate: startDate,
      endDate: endDate,
      allDay: tableAllDay,
      groupIndex: 0
    };

    if (groupsList.length > 0) {
      data.groups = groupsList[0];
    }

    return data;
  }

  prepareAllDayCellData(options, rowIndex, columnIndex) {
    var data = this.prepareCellData(options, rowIndex, columnIndex);
    var startDate = dateUtils.trimTime(data.startDate);
    return _extends({}, data, {
      startDate,
      endDate: startDate,
      allDay: true
    });
  }

  calculateEndDate(startDate, interval, endDayHour) {
    var result = new Date(startDate);
    result.setMilliseconds(result.getMilliseconds() + Math.round(interval));
    return result;
  }

  _calculateCellIndex(rowIndex, columnIndex, rowCount, columnCount) {
    return calculateCellIndex(rowIndex, columnIndex, rowCount, columnCount);
  }

  generateGroupedDataMap(viewDataMap) {
    var {
      allDayPanelMap,
      dateTableMap
    } = viewDataMap;
    var {
      previousGroupedDataMap: dateTableGroupedMap
    } = dateTableMap.reduce((previousOptions, cellsRow) => {
      var {
        previousGroupedDataMap,
        previousRowIndex,
        previousGroupIndex
      } = previousOptions;
      var {
        groupIndex: currentGroupIndex
      } = cellsRow[0].cellData;
      var currentRowIndex = currentGroupIndex === previousGroupIndex ? previousRowIndex + 1 : 0;
      cellsRow.forEach(cell => {
        var {
          groupIndex
        } = cell.cellData;

        if (!previousGroupedDataMap[groupIndex]) {
          previousGroupedDataMap[groupIndex] = [];
        }

        if (!previousGroupedDataMap[groupIndex][currentRowIndex]) {
          previousGroupedDataMap[groupIndex][currentRowIndex] = [];
        }

        previousGroupedDataMap[groupIndex][currentRowIndex].push(cell);
      });
      return {
        previousGroupedDataMap,
        previousRowIndex: currentRowIndex,
        previousGroupIndex: currentGroupIndex
      };
    }, {
      previousGroupedDataMap: [],
      previousRowIndex: -1,
      previousGroupIndex: -1
    });
    var allDayPanelGroupedMap = [];
    allDayPanelMap === null || allDayPanelMap === void 0 ? void 0 : allDayPanelMap.forEach(cell => {
      var {
        groupIndex
      } = cell.cellData;

      if (!allDayPanelGroupedMap[groupIndex]) {
        allDayPanelGroupedMap[groupIndex] = [];
      }

      allDayPanelGroupedMap[groupIndex].push(cell);
    });
    return {
      allDayPanelGroupedMap,
      dateTableGroupedMap
    };
  }

  _isFirstGroupCell(rowIndex, columnIndex, options, rowCount, columnCount) {
    var {
      groupOrientation,
      groups,
      isGroupedByDate
    } = options;
    var groupCount = getGroupCount(groups);

    if (isGroupedByDate) {
      return columnIndex % groupCount === 0;
    }

    if (groupOrientation === HORIZONTAL_GROUP_ORIENTATION) {
      return columnIndex % columnCount === 0;
    }

    return rowIndex % rowCount === 0;
  }

  _isLastGroupCell(rowIndex, columnIndex, options, rowCount, columnCount) {
    var {
      groupOrientation,
      groups,
      isGroupedByDate
    } = options;
    var groupCount = getGroupCount(groups);

    if (isGroupedByDate) {
      return (columnIndex + 1) % groupCount === 0;
    }

    if (groupOrientation === HORIZONTAL_GROUP_ORIENTATION) {
      return (columnIndex + 1) % columnCount === 0;
    }

    return (rowIndex + 1) % rowCount === 0;
  }

  markSelectedAndFocusedCells(viewDataMap, renderOptions) {
    var {
      selectedCells,
      focusedCell
    } = renderOptions;

    if (!selectedCells && !focusedCell) {
      return viewDataMap;
    }

    var {
      allDayPanelMap,
      dateTableMap
    } = viewDataMap;
    var nextDateTableMap = dateTableMap.map(row => {
      return this._markSelectedAndFocusedCellsInRow(row, selectedCells, focusedCell);
    });

    var nextAllDayMap = this._markSelectedAndFocusedCellsInRow(allDayPanelMap, selectedCells, focusedCell);

    return {
      allDayPanelMap: nextAllDayMap,
      dateTableMap: nextDateTableMap
    };
  }

  _markSelectedAndFocusedCellsInRow(dataRow, selectedCells, focusedCell) {
    return dataRow.map(cell => {
      var {
        index,
        groupIndex,
        allDay,
        startDate
      } = cell.cellData;
      var indexInSelectedCells = selectedCells.findIndex(_ref5 => {
        var {
          index: selectedCellIndex,
          groupIndex: selectedCellGroupIndex,
          allDay: selectedCellAllDay,
          startDate: selectedCellStartDate
        } = _ref5;
        return groupIndex === selectedCellGroupIndex && (index === selectedCellIndex || selectedCellIndex === undefined && startDate.getTime() === selectedCellStartDate.getTime()) && !!allDay === !!selectedCellAllDay;
      });
      var isFocused = !!focusedCell && index === focusedCell.cellData.index && groupIndex === focusedCell.cellData.groupIndex && allDay === focusedCell.cellData.allDay;

      if (!isFocused && indexInSelectedCells === -1) {
        return cell;
      }

      return _extends({}, cell, {
        cellData: _extends({}, cell.cellData, {
          isSelected: indexInSelectedCells > -1,
          isFocused
        })
      });
    });
  }

  getInterval(hoursInterval) {
    if (this._interval === undefined) {
      this._interval = hoursInterval * HOUR_MS;
    }

    return this._interval;
  }

  _getIntervalDuration(intervalCount) {
    return dateUtils.dateToMilliseconds('day') * intervalCount;
  }

  _setVisibilityDates() {}

  getCellCountInDay(startDayHour, endDayHour, hoursInterval) {
    var result = calculateDayDuration(startDayHour, endDayHour) / hoursInterval;
    return Math.ceil(result);
  }

  getCellCount(options) {
    var {
      intervalCount,
      viewType,
      startDayHour,
      endDayHour,
      hoursInterval
    } = options;
    var cellCountInDay = this.getCellCountInDay(startDayHour, endDayHour, hoursInterval);
    var columnCountInDay = isHorizontalView(viewType) ? cellCountInDay : 1;
    return this.daysInInterval * intervalCount * columnCountInDay;
  }

  getRowCount(options) {
    var {
      viewType,
      startDayHour,
      endDayHour,
      hoursInterval
    } = options;
    var cellCountInDay = this.getCellCountInDay(startDayHour, endDayHour, hoursInterval);
    var rowCountInDay = !isHorizontalView(viewType) ? cellCountInDay : 1;
    return rowCountInDay;
  }

}
