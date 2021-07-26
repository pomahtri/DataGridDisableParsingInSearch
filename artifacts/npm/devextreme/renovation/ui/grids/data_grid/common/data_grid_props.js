/**
* DevExtreme (renovation/ui/grids/data_grid/common/data_grid_props.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.DataGridProps = exports.DataGridToolbar = exports.DataGridCommonColumnSettings = exports.DataGridExport = exports.DataGridLoadPanel = exports.DataGridKeyboardNavigation = exports.DataGridHeaderFilter = exports.DataGridFilterRow = exports.DataGridFilterPanel = exports.DataGridStateStoring = exports.DataGridSorting = exports.DataGridSearchPanel = exports.DataGridColumnFixing = exports.DataGridColumnChooser = exports.DataGridRowDragging = exports.DataGridMasterDetail = exports.DataGridPager = exports.DataGridSummary = exports.DataGridSummaryTotalItem = exports.DataGridSummaryGroupItem = exports.DataGridGrouping = exports.DataGridGroupPanel = exports.DataGridSortByGroupSummaryInfoItem = exports.DataGridPaging = exports.DataGridSelection = exports.DataGridScrolling = exports.DataGridEditing = exports.DataGridEditingTexts = exports.DataGridColumn = exports.DataGridColumnLookup = exports.DataGridColumnHeaderFilter = exports.DataGridColumnButton = void 0;

var _base_props = require("../../../common/base_props");

var _message = _interopRequireDefault(require("../../../../../localization/message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DataGridColumnButton = {};
exports.DataGridColumnButton = DataGridColumnButton;
var DataGridColumnHeaderFilter = {};
exports.DataGridColumnHeaderFilter = DataGridColumnHeaderFilter;
var DataGridColumnLookup = {};
exports.DataGridColumnLookup = DataGridColumnLookup;
var DataGridColumn = {};
exports.DataGridColumn = DataGridColumn;
var DataGridEditingTexts = {};
exports.DataGridEditingTexts = DataGridEditingTexts;
var DataGridEditing = {
  allowAdding: false,
  allowDeleting: false,
  allowUpdating: false,
  confirmDelete: true,
  form: {
    colCount: 2
  },
  mode: "row",
  popup: {},
  refreshMode: "full",
  selectTextOnEditStart: false,
  startEditAction: "click",
  useIcons: false,
  defaultChanges: [],
  changesChange: function changesChange() {},
  defaultEditRowKey: null,
  editRowKeyChange: function editRowKeyChange() {},
  defaultEditColumnName: null,
  editColumnNameChange: function editColumnNameChange() {}
};
exports.DataGridEditing = DataGridEditing;
var DataGridScrolling = {};
exports.DataGridScrolling = DataGridScrolling;
var DataGridSelection = {};
exports.DataGridSelection = DataGridSelection;
var DataGridPaging = {};
exports.DataGridPaging = DataGridPaging;
var DataGridSortByGroupSummaryInfoItem = {};
exports.DataGridSortByGroupSummaryInfoItem = DataGridSortByGroupSummaryInfoItem;
var DataGridGroupPanel = {};
exports.DataGridGroupPanel = DataGridGroupPanel;
var DataGridGrouping = {};
exports.DataGridGrouping = DataGridGrouping;
var DataGridSummaryGroupItem = {};
exports.DataGridSummaryGroupItem = DataGridSummaryGroupItem;
var DataGridSummaryTotalItem = {};
exports.DataGridSummaryTotalItem = DataGridSummaryTotalItem;
var DataGridSummary = {};
exports.DataGridSummary = DataGridSummary;
var DataGridPager = {};
exports.DataGridPager = DataGridPager;
var DataGridMasterDetail = {};
exports.DataGridMasterDetail = DataGridMasterDetail;
var DataGridRowDragging = {};
exports.DataGridRowDragging = DataGridRowDragging;
var DataGridColumnChooser = {};
exports.DataGridColumnChooser = DataGridColumnChooser;
var DataGridColumnFixing = {};
exports.DataGridColumnFixing = DataGridColumnFixing;
var DataGridSearchPanel = {};
exports.DataGridSearchPanel = DataGridSearchPanel;
var DataGridSorting = {};
exports.DataGridSorting = DataGridSorting;
var DataGridStateStoring = {};
exports.DataGridStateStoring = DataGridStateStoring;
var DataGridFilterPanel = {};
exports.DataGridFilterPanel = DataGridFilterPanel;
var DataGridFilterRow = {};
exports.DataGridFilterRow = DataGridFilterRow;
var DataGridHeaderFilter = {};
exports.DataGridHeaderFilter = DataGridHeaderFilter;
var DataGridKeyboardNavigation = {};
exports.DataGridKeyboardNavigation = DataGridKeyboardNavigation;
var DataGridLoadPanel = {};
exports.DataGridLoadPanel = DataGridLoadPanel;
var DataGridExport = {};
exports.DataGridExport = DataGridExport;
var DataGridCommonColumnSettings = {};
exports.DataGridCommonColumnSettings = DataGridCommonColumnSettings;
var DataGridToolbar = {};
exports.DataGridToolbar = DataGridToolbar;

var DataGridProps = _extends({}, _base_props.BaseWidgetProps, {
  editing: {
    mode: "row",
    refreshMode: "full",
    allowAdding: false,
    allowUpdating: false,
    allowDeleting: false,
    useIcons: false,
    selectTextOnEditStart: false,
    confirmDelete: true,
    form: {
      colCount: 2
    },
    popup: {},
    startEditAction: "click",
    editRowKey: null,
    editColumnName: null,
    changes: []
  },
  export: {
    enabled: false,
    fileName: "DataGrid",
    excelFilterEnabled: false,
    allowExportSelectedData: false,
    ignoreExcelErrors: true,
    customizeExcelCell: undefined,
    texts: {
      exportTo: _message.default.format("dxDataGrid-exportTo"),
      exportAll: _message.default.format("dxDataGrid-exportAll"),
      exportSelectedRows: _message.default.format("dxDataGrid-exportSelectedRows")
    }
  },
  groupPanel: {
    visible: false,
    emptyPanelText: _message.default.format("dxDataGrid-groupPanelEmptyText"),
    allowColumnDragging: true
  },
  grouping: {
    autoExpandAll: true,
    allowCollapsing: true,
    contextMenuEnabled: false,
    expandMode: "buttonClick",
    texts: {
      groupContinuesMessage: _message.default.format("dxDataGrid-groupContinuesMessage"),
      groupContinuedMessage: _message.default.format("dxDataGrid-groupContinuedMessage"),
      groupByThisColumn: _message.default.format("dxDataGrid-groupHeaderText"),
      ungroup: _message.default.format("dxDataGrid-ungroupHeaderText"),
      ungroupAll: _message.default.format("dxDataGrid-ungroupAllText")
    }
  },
  masterDetail: {
    enabled: false,
    autoExpandAll: false
  },
  scrolling: {
    timeout: 300,
    updateTimeout: 300,
    minTimeout: 0,
    renderingThreshold: 100,
    removeInvisiblePages: true,
    rowPageSize: 5,
    mode: "standard",
    preloadEnabled: false,
    rowRenderingMode: "standard",
    loadTwoPagesOnStart: false,
    columnRenderingMode: "standard",
    columnPageSize: 5,
    columnRenderingThreshold: 300,
    useNative: "auto"
  },
  selection: {
    mode: "none",
    showCheckBoxesMode: "onClick",
    allowSelectAll: true,
    selectAllMode: "allPages",
    maxFilterLengthInRequest: 1500,
    deferred: false
  },
  summary: {
    groupItems: undefined,
    totalItems: undefined,
    calculateCustomSummary: undefined,
    skipEmptyValues: true,
    recalculateWhileEditing: false,
    texts: {
      sum: _message.default.getFormatter("dxDataGrid-summarySum")(),
      sumOtherColumn: _message.default.getFormatter("dxDataGrid-summarySumOtherColumn")(),
      min: _message.default.getFormatter("dxDataGrid-summaryMin")(),
      minOtherColumn: _message.default.getFormatter("dxDataGrid-summaryMinOtherColumn")(),
      max: _message.default.getFormatter("dxDataGrid-summaryMax")(),
      maxOtherColumn: _message.default.getFormatter("dxDataGrid-summaryMaxOtherColumn")(),
      avg: _message.default.getFormatter("dxDataGrid-summaryAvg")(),
      avgOtherColumn: _message.default.getFormatter("dxDataGrid-summaryAvgOtherColumn")(),
      count: _message.default.getFormatter("dxDataGrid-summaryCount")()
    }
  },
  columnChooser: {
    enabled: false,
    allowSearch: false,
    searchTimeout: 500,
    mode: "dragAndDrop",
    width: 250,
    height: 260,
    title: _message.default.format("dxDataGrid-columnChooserTitle"),
    emptyPanelText: _message.default.format("dxDataGrid-columnChooserEmptyText")
  },
  columnFixing: {
    enabled: false,
    texts: {
      fix: _message.default.format("dxDataGrid-columnFixingFix"),
      unfix: _message.default.format("dxDataGrid-columnFixingUnfix"),
      leftPosition: _message.default.format("dxDataGrid-columnFixingLeftPosition"),
      rightPosition: _message.default.format("dxDataGrid-columnFixingRightPosition")
    }
  },
  filterPanel: {
    visible: false,
    filterEnabled: true,
    texts: {
      createFilter: _message.default.format("dxDataGrid-filterPanelCreateFilter"),
      clearFilter: _message.default.format("dxDataGrid-filterPanelClearFilter"),
      filterEnabledHint: _message.default.format("dxDataGrid-filterPanelFilterEnabledHint")
    }
  },
  filterRow: {
    visible: false,
    showOperationChooser: true,
    showAllText: _message.default.format("dxDataGrid-filterRowShowAllText"),
    resetOperationText: _message.default.format("dxDataGrid-filterRowResetOperationText"),
    applyFilter: "auto",
    applyFilterText: _message.default.format("dxDataGrid-applyFilterText"),
    operationDescriptions: {
      equal: _message.default.format("dxDataGrid-filterRowOperationEquals"),
      notEqual: _message.default.format("dxDataGrid-filterRowOperationNotEquals"),
      lessThan: _message.default.format("dxDataGrid-filterRowOperationLess"),
      lessThanOrEqual: _message.default.format("dxDataGrid-filterRowOperationLessOrEquals"),
      greaterThan: _message.default.format("dxDataGrid-filterRowOperationGreater"),
      greaterThanOrEqual: _message.default.format("dxDataGrid-filterRowOperationGreaterOrEquals"),
      startsWith: _message.default.format("dxDataGrid-filterRowOperationStartsWith"),
      contains: _message.default.format("dxDataGrid-filterRowOperationContains"),
      notContains: _message.default.format("dxDataGrid-filterRowOperationNotContains"),
      endsWith: _message.default.format("dxDataGrid-filterRowOperationEndsWith"),
      between: _message.default.format("dxDataGrid-filterRowOperationBetween"),
      isBlank: _message.default.format("dxFilterBuilder-filterOperationIsBlank"),
      isNotBlank: _message.default.format("dxFilterBuilder-filterOperationIsNotBlank")
    },
    betweenStartText: _message.default.format("dxDataGrid-filterRowOperationBetweenStartText"),
    betweenEndText: _message.default.format("dxDataGrid-filterRowOperationBetweenEndText")
  },
  headerFilter: {
    visible: false,
    width: 252,
    height: 325,
    allowSearch: false,
    searchTimeout: 500,
    texts: {
      emptyValue: _message.default.format("dxDataGrid-headerFilterEmptyValue"),
      ok: _message.default.format("dxDataGrid-headerFilterOK"),
      cancel: _message.default.format("dxDataGrid-headerFilterCancel")
    }
  },
  keyboardNavigation: {
    enabled: true,
    enterKeyAction: "startEdit",
    enterKeyDirection: "none",
    editOnKeyPress: false
  },
  loadPanel: {
    enabled: "auto",
    text: _message.default.format("Loading"),
    width: 200,
    height: 90,
    showIndicator: true,
    indicatorSrc: "",
    showPane: true
  },
  pager: {
    visible: "auto",
    showPageSizeSelector: false,
    allowedPageSizes: "auto"
  },
  paging: {
    enabled: true
  },
  rowDragging: {
    showDragIcons: true,
    dropFeedbackMode: "indicate",
    allowReordering: false,
    allowDropInsideItem: false
  },
  searchPanel: {
    visible: false,
    width: 160,
    placeholder: _message.default.format("dxDataGrid-searchPanelPlaceholder"),
    highlightSearchText: true,
    highlightCaseSensitive: false,
    text: "",
    searchVisibleColumnsOnly: false,
    disableParsingInSearch: false
  },
  sorting: {
    mode: "single",
    ascendingText: _message.default.format("dxDataGrid-sortingAscendingText"),
    descendingText: _message.default.format("dxDataGrid-sortingDescendingText"),
    clearText: _message.default.format("dxDataGrid-sortingClearText"),
    showSortIndexes: true
  },
  stateStoring: {
    enabled: false,
    type: "localStorage",
    savingTimeout: 2000
  },
  remoteOperations: "auto",
  allowColumnReordering: false,
  allowColumnResizing: false,
  autoNavigateToFocusedRow: true,
  cacheEnabled: true,
  cellHintEnabled: true,
  columnAutoWidth: false,
  columnHidingEnabled: false,
  columnResizingMode: "nextColumn",
  errorRowEnabled: true,
  filterBuilder: {
    groupOperationDescriptions: {
      and: _message.default.format("dxFilterBuilder-and"),
      or: _message.default.format("dxFilterBuilder-or"),
      notAnd: _message.default.format("dxFilterBuilder-notAnd"),
      notOr: _message.default.format("dxFilterBuilder-notOr")
    },
    filterOperationDescriptions: {
      between: _message.default.format("dxFilterBuilder-filterOperationBetween"),
      equal: _message.default.format("dxFilterBuilder-filterOperationEquals"),
      notEqual: _message.default.format("dxFilterBuilder-filterOperationNotEquals"),
      lessThan: _message.default.format("dxFilterBuilder-filterOperationLess"),
      lessThanOrEqual: _message.default.format("dxFilterBuilder-filterOperationLessOrEquals"),
      greaterThan: _message.default.format("dxFilterBuilder-filterOperationGreater"),
      greaterThanOrEqual: _message.default.format("dxFilterBuilder-filterOperationGreaterOrEquals"),
      startsWith: _message.default.format("dxFilterBuilder-filterOperationStartsWith"),
      contains: _message.default.format("dxFilterBuilder-filterOperationContains"),
      notContains: _message.default.format("dxFilterBuilder-filterOperationNotContains"),
      endsWith: _message.default.format("dxFilterBuilder-filterOperationEndsWith"),
      isBlank: _message.default.format("dxFilterBuilder-filterOperationIsBlank"),
      isNotBlank: _message.default.format("dxFilterBuilder-filterOperationIsNotBlank")
    }
  },
  filterBuilderPopup: {},
  filterSyncEnabled: "auto",
  focusedRowEnabled: false,
  highlightChanges: false,
  noDataText: _message.default.format("dxDataGrid-noDataText"),
  renderAsync: false,
  repaintChangesOnly: false,
  rowAlternationEnabled: false,
  showBorders: false,
  showColumnHeaders: true,
  showColumnLines: true,
  showRowLines: false,
  twoWayBindingEnabled: true,
  wordWrapEnabled: false,
  loadingTimeout: 30,
  commonColumnSettings: {
    allowExporting: true,
    allowFiltering: true,
    allowHiding: true,
    allowSorting: true,
    allowEditing: true,
    encodeHtml: true,
    trueText: _message.default.format("dxDataGrid-trueText"),
    falseText: _message.default.format("dxDataGrid-falseText")
  },
  defaultFilterValue: null,
  filterValueChange: function filterValueChange() {},
  defaultFocusedColumnIndex: -1,
  focusedColumnIndexChange: function focusedColumnIndexChange() {},
  defaultFocusedRowIndex: -1,
  focusedRowIndexChange: function focusedRowIndexChange() {},
  defaultFocusedRowKey: null,
  focusedRowKeyChange: function focusedRowKeyChange() {},
  defaultSelectedRowKeys: [],
  selectedRowKeysChange: function selectedRowKeysChange() {},
  defaultSelectionFilter: [],
  selectionFilterChange: function selectionFilterChange() {}
});

exports.DataGridProps = DataGridProps;
