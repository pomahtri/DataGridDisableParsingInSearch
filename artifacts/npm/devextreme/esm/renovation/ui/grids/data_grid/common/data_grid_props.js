/**
* DevExtreme (esm/renovation/ui/grids/data_grid/common/data_grid_props.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { BaseWidgetProps } from "../../../common/base_props";
import messageLocalization from "../../../../../localization/message";
export var DataGridColumnButton = {};
export var DataGridColumnHeaderFilter = {};
export var DataGridColumnLookup = {};
export var DataGridColumn = {};
export var DataGridEditingTexts = {};
export var DataGridEditing = {
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
  texts: {
    editRow: messageLocalization.format("dxDataGrid-editingEditRow"),
    saveAllChanges: messageLocalization.format("dxDataGrid-editingSaveAllChanges"),
    saveRowChanges: messageLocalization.format("dxDataGrid-editingSaveRowChanges"),
    cancelAllChanges: messageLocalization.format("dxDataGrid-editingCancelAllChanges"),
    cancelRowChanges: messageLocalization.format("dxDataGrid-editingCancelRowChanges"),
    addRow: messageLocalization.format("dxDataGrid-editingAddRow"),
    deleteRow: messageLocalization.format("dxDataGrid-editingDeleteRow"),
    undeleteRow: messageLocalization.format("dxDataGrid-editingUndeleteRow"),
    confirmDeleteMessage: messageLocalization.format("dxDataGrid-editingConfirmDeleteMessage"),
    confirmDeleteTitle: "",
    validationCancelChanges: messageLocalization.format("dxDataGrid-validationCancelChanges")
  },
  useIcons: false,
  defaultChanges: [],
  changesChange: () => {},
  defaultEditRowKey: null,
  editRowKeyChange: () => {},
  defaultEditColumnName: null,
  editColumnNameChange: () => {}
};
export var DataGridScrolling = {};
export var DataGridSelection = {};
export var DataGridPaging = {};
export var DataGridSortByGroupSummaryInfoItem = {};
export var DataGridGroupPanel = {};
export var DataGridGrouping = {};
export var DataGridSummaryGroupItem = {};
export var DataGridSummaryTotalItem = {};
export var DataGridSummary = {};
export var DataGridPager = {};
export var DataGridMasterDetail = {};
export var DataGridRowDragging = {};
export var DataGridColumnChooser = {};
export var DataGridColumnFixing = {};
export var DataGridSearchPanel = {};
export var DataGridSorting = {};
export var DataGridStateStoring = {};
export var DataGridFilterPanel = {};
export var DataGridFilterRow = {};
export var DataGridHeaderFilter = {};
export var DataGridKeyboardNavigation = {};
export var DataGridLoadPanel = {};
export var DataGridExport = {};
export var DataGridCommonColumnSettings = {};
export var DataGridToolbar = {};
export var DataGridProps = _extends({}, BaseWidgetProps, {
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
    changes: [],
    texts: {
      editRow: messageLocalization.format("dxDataGrid-editingEditRow"),
      saveAllChanges: messageLocalization.format("dxDataGrid-editingSaveAllChanges"),
      saveRowChanges: messageLocalization.format("dxDataGrid-editingSaveRowChanges"),
      cancelAllChanges: messageLocalization.format("dxDataGrid-editingCancelAllChanges"),
      cancelRowChanges: messageLocalization.format("dxDataGrid-editingCancelRowChanges"),
      addRow: messageLocalization.format("dxDataGrid-editingAddRow"),
      deleteRow: messageLocalization.format("dxDataGrid-editingDeleteRow"),
      undeleteRow: messageLocalization.format("dxDataGrid-editingUndeleteRow"),
      confirmDeleteMessage: messageLocalization.format("dxDataGrid-editingConfirmDeleteMessage"),
      confirmDeleteTitle: "",
      validationCancelChanges: messageLocalization.format("dxDataGrid-validationCancelChanges")
    }
  },
  export: {
    enabled: false,
    fileName: "DataGrid",
    excelFilterEnabled: false,
    allowExportSelectedData: false,
    ignoreExcelErrors: true,
    customizeExcelCell: undefined,
    texts: {
      exportTo: messageLocalization.format("dxDataGrid-exportTo"),
      exportAll: messageLocalization.format("dxDataGrid-exportAll"),
      exportSelectedRows: messageLocalization.format("dxDataGrid-exportSelectedRows")
    }
  },
  groupPanel: {
    visible: false,
    emptyPanelText: messageLocalization.format("dxDataGrid-groupPanelEmptyText"),
    allowColumnDragging: true
  },
  grouping: {
    autoExpandAll: true,
    allowCollapsing: true,
    contextMenuEnabled: false,
    expandMode: "buttonClick",
    texts: {
      groupContinuesMessage: messageLocalization.format("dxDataGrid-groupContinuesMessage"),
      groupContinuedMessage: messageLocalization.format("dxDataGrid-groupContinuedMessage"),
      groupByThisColumn: messageLocalization.format("dxDataGrid-groupHeaderText"),
      ungroup: messageLocalization.format("dxDataGrid-ungroupHeaderText"),
      ungroupAll: messageLocalization.format("dxDataGrid-ungroupAllText")
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
    useNative: "auto",
    newMode: false,
    minGap: 1
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
      sum: messageLocalization.format("dxDataGrid-summarySum"),
      sumOtherColumn: messageLocalization.format("dxDataGrid-summarySumOtherColumn"),
      min: messageLocalization.format("dxDataGrid-summaryMin"),
      minOtherColumn: messageLocalization.format("dxDataGrid-summaryMinOtherColumn"),
      max: messageLocalization.format("dxDataGrid-summaryMax"),
      maxOtherColumn: messageLocalization.format("dxDataGrid-summaryMaxOtherColumn"),
      avg: messageLocalization.format("dxDataGrid-summaryAvg"),
      avgOtherColumn: messageLocalization.format("dxDataGrid-summaryAvgOtherColumn"),
      count: messageLocalization.format("dxDataGrid-summaryCount")
    }
  },
  columnChooser: {
    enabled: false,
    allowSearch: false,
    searchTimeout: 500,
    mode: "dragAndDrop",
    width: 250,
    height: 260,
    title: messageLocalization.format("dxDataGrid-columnChooserTitle"),
    emptyPanelText: messageLocalization.format("dxDataGrid-columnChooserEmptyText")
  },
  columnFixing: {
    enabled: false,
    texts: {
      fix: messageLocalization.format("dxDataGrid-columnFixingFix"),
      unfix: messageLocalization.format("dxDataGrid-columnFixingUnfix"),
      leftPosition: messageLocalization.format("dxDataGrid-columnFixingLeftPosition"),
      rightPosition: messageLocalization.format("dxDataGrid-columnFixingRightPosition")
    }
  },
  filterPanel: {
    visible: false,
    filterEnabled: true,
    texts: {
      createFilter: messageLocalization.format("dxDataGrid-filterPanelCreateFilter"),
      clearFilter: messageLocalization.format("dxDataGrid-filterPanelClearFilter"),
      filterEnabledHint: messageLocalization.format("dxDataGrid-filterPanelFilterEnabledHint")
    }
  },
  filterRow: {
    visible: false,
    showOperationChooser: true,
    showAllText: messageLocalization.format("dxDataGrid-filterRowShowAllText"),
    resetOperationText: messageLocalization.format("dxDataGrid-filterRowResetOperationText"),
    applyFilter: "auto",
    applyFilterText: messageLocalization.format("dxDataGrid-applyFilterText"),
    operationDescriptions: {
      equal: messageLocalization.format("dxDataGrid-filterRowOperationEquals"),
      notEqual: messageLocalization.format("dxDataGrid-filterRowOperationNotEquals"),
      lessThan: messageLocalization.format("dxDataGrid-filterRowOperationLess"),
      lessThanOrEqual: messageLocalization.format("dxDataGrid-filterRowOperationLessOrEquals"),
      greaterThan: messageLocalization.format("dxDataGrid-filterRowOperationGreater"),
      greaterThanOrEqual: messageLocalization.format("dxDataGrid-filterRowOperationGreaterOrEquals"),
      startsWith: messageLocalization.format("dxDataGrid-filterRowOperationStartsWith"),
      contains: messageLocalization.format("dxDataGrid-filterRowOperationContains"),
      notContains: messageLocalization.format("dxDataGrid-filterRowOperationNotContains"),
      endsWith: messageLocalization.format("dxDataGrid-filterRowOperationEndsWith"),
      between: messageLocalization.format("dxDataGrid-filterRowOperationBetween"),
      isBlank: messageLocalization.format("dxFilterBuilder-filterOperationIsBlank"),
      isNotBlank: messageLocalization.format("dxFilterBuilder-filterOperationIsNotBlank")
    },
    betweenStartText: messageLocalization.format("dxDataGrid-filterRowOperationBetweenStartText"),
    betweenEndText: messageLocalization.format("dxDataGrid-filterRowOperationBetweenEndText")
  },
  headerFilter: {
    visible: false,
    width: 252,
    height: 325,
    allowSearch: false,
    searchTimeout: 500,
    texts: {
      emptyValue: messageLocalization.format("dxDataGrid-headerFilterEmptyValue"),
      ok: messageLocalization.format("dxDataGrid-headerFilterOK"),
      cancel: messageLocalization.format("dxDataGrid-headerFilterCancel")
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
    text: messageLocalization.format("Loading"),
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
    placeholder: messageLocalization.format("dxDataGrid-searchPanelPlaceholder"),
    highlightSearchText: true,
    highlightCaseSensitive: false,
    text: "",
    searchVisibleColumnsOnly: false
  },
  sorting: {
    mode: "single",
    ascendingText: messageLocalization.format("dxDataGrid-sortingAscendingText"),
    descendingText: messageLocalization.format("dxDataGrid-sortingDescendingText"),
    clearText: messageLocalization.format("dxDataGrid-sortingClearText"),
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
      and: messageLocalization.format("dxFilterBuilder-and"),
      or: messageLocalization.format("dxFilterBuilder-or"),
      notAnd: messageLocalization.format("dxFilterBuilder-notAnd"),
      notOr: messageLocalization.format("dxFilterBuilder-notOr")
    },
    filterOperationDescriptions: {
      between: messageLocalization.format("dxFilterBuilder-filterOperationBetween"),
      equal: messageLocalization.format("dxFilterBuilder-filterOperationEquals"),
      notEqual: messageLocalization.format("dxFilterBuilder-filterOperationNotEquals"),
      lessThan: messageLocalization.format("dxFilterBuilder-filterOperationLess"),
      lessThanOrEqual: messageLocalization.format("dxFilterBuilder-filterOperationLessOrEquals"),
      greaterThan: messageLocalization.format("dxFilterBuilder-filterOperationGreater"),
      greaterThanOrEqual: messageLocalization.format("dxFilterBuilder-filterOperationGreaterOrEquals"),
      startsWith: messageLocalization.format("dxFilterBuilder-filterOperationStartsWith"),
      contains: messageLocalization.format("dxFilterBuilder-filterOperationContains"),
      notContains: messageLocalization.format("dxFilterBuilder-filterOperationNotContains"),
      endsWith: messageLocalization.format("dxFilterBuilder-filterOperationEndsWith"),
      isBlank: messageLocalization.format("dxFilterBuilder-filterOperationIsBlank"),
      isNotBlank: messageLocalization.format("dxFilterBuilder-filterOperationIsNotBlank")
    }
  },
  filterBuilderPopup: {},
  filterSyncEnabled: "auto",
  focusedRowEnabled: false,
  highlightChanges: false,
  noDataText: messageLocalization.format("dxDataGrid-noDataText"),
  renderAsync: false,
  repaintChangesOnly: false,
  rowAlternationEnabled: false,
  showBorders: false,
  showColumnHeaders: true,
  showColumnLines: true,
  showRowLines: false,
  twoWayBindingEnabled: true,
  wordWrapEnabled: false,
  loadingTimeout: 0,
  commonColumnSettings: {
    allowExporting: true,
    allowFiltering: true,
    allowHiding: true,
    allowSorting: true,
    allowEditing: true,
    encodeHtml: true,
    trueText: messageLocalization.format("dxDataGrid-trueText"),
    falseText: messageLocalization.format("dxDataGrid-falseText")
  },
  adaptColumnWidthByRatio: true,
  regenerateColumnsByVisibleItems: false,
  useLegacyKeyboardNavigation: false,
  defaultFilterValue: null,
  filterValueChange: () => {},
  defaultFocusedColumnIndex: -1,
  focusedColumnIndexChange: () => {},
  defaultFocusedRowIndex: -1,
  focusedRowIndexChange: () => {},
  defaultFocusedRowKey: null,
  focusedRowKeyChange: () => {},
  defaultSelectedRowKeys: [],
  selectedRowKeysChange: () => {},
  defaultSelectionFilter: [],
  selectionFilterChange: () => {}
});
