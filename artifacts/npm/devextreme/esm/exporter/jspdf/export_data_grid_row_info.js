/**
* DevExtreme (esm/exporter/jspdf/export_data_grid_row_info.js)
* Version: 21.2.0
* Build date: Wed Jul 28 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../core/utils/type';

function createRowInfo(_ref) {
  var {
    dataProvider,
    rowIndex,
    prevRowInfo
  } = _ref;
  var rowType = dataProvider.getCellData(rowIndex, 0, true).cellSourceData.rowType;
  var indentLevel = rowType !== 'header' ? dataProvider.getGroupLevel(rowIndex) : 0;

  if (rowType === 'groupFooter' && (prevRowInfo === null || prevRowInfo === void 0 ? void 0 : prevRowInfo.rowType) === 'groupFooter') {
    indentLevel = prevRowInfo.indentLevel - 1;
  }

  var startNewTableWithIndent = (prevRowInfo === null || prevRowInfo === void 0 ? void 0 : prevRowInfo.indentLevel) !== undefined && prevRowInfo.indentLevel !== indentLevel;
  var columns = dataProvider.getColumns();
  var rowInfo = {
    rowType: rowType,
    indentLevel: indentLevel,
    startNewTableWithIndent,
    cellsInfo: [],
    rowIndex
  };

  _fillRowCellsInfo({
    rowInfo,
    dataProvider,
    columns
  });

  return rowInfo;
}

function createPdfCell(cellInfo) {
  return {
    text: cellInfo.text,
    rowSpan: cellInfo.rowSpan,
    colSpan: cellInfo.colSpan,
    drawLeftBorder: cellInfo.drawLeftBorder,
    drawRightBorder: cellInfo.drawRightBorder
  };
}

function _createCellInfo(_ref2) {
  var {
    rowInfo,
    dataProvider,
    cellIndex
  } = _ref2;
  var cellData = dataProvider.getCellData(rowInfo.rowIndex, cellIndex, true);
  var cellInfo = {
    value: cellData.value,
    text: cellData.value
  };

  if (rowInfo.rowType === 'header') {
    var cellMerging = dataProvider.getCellMerging(rowInfo.rowIndex, cellIndex);

    if (cellMerging && cellMerging.rowspan > 0) {
      cellInfo.rowSpan = cellMerging.rowspan;
    }

    if (cellMerging && cellMerging.colspan > 0) {
      cellInfo.colSpan = cellMerging.colspan;
    }
  } else if (rowInfo.rowType === 'group') {
    cellInfo.drawLeftBorder = false;
    cellInfo.drawRightBorder = false;

    if (cellIndex > 0) {
      var isEmptyCellsExceptFirst = rowInfo.cellsInfo.slice(1).reduce((accumulate, pdfCell) => {
        return accumulate && !isDefined(pdfCell.text);
      }, true);

      if (!isDefined(cellInfo.text) && isEmptyCellsExceptFirst) {
        for (var i = 0; i < rowInfo.cellsInfo.length; i++) {
          rowInfo.cellsInfo[i].colSpan = rowInfo.cellsInfo.length;
        }

        cellInfo.colSpan = rowInfo.cellsInfo.length;
      }
    }
  }

  return cellInfo;
}

function _fillRowCellsInfo(_ref3) {
  var {
    rowInfo,
    dataProvider,
    columns
  } = _ref3;

  for (var cellIndex = 0; cellIndex < columns.length; cellIndex++) {
    rowInfo.cellsInfo.push(_createCellInfo({
      rowInfo,
      dataProvider,
      cellIndex
    }));
  }

  if (rowInfo.rowType === 'group') {
    rowInfo.cellsInfo[0].drawLeftBorder = true;

    if (rowInfo.cellsInfo[0].colSpan === rowInfo.cellsInfo.length - 1) {
      rowInfo.cellsInfo[0].drawRightBorder = true;
    }

    var lastCell = rowInfo.cellsInfo[rowInfo.cellsInfo.length - 1];

    if (!isDefined(lastCell.colSpan)) {
      lastCell.drawRightBorder = true;
    }
  }
}

export { createRowInfo, createPdfCell };
