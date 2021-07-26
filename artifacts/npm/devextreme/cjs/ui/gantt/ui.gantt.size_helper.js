/**
* DevExtreme (cjs/ui/gantt/ui.gantt.size_helper.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.GanttSizeHelper = void 0;

var _window = require("../../core/utils/window");

var GanttSizeHelper = /*#__PURE__*/function () {
  function GanttSizeHelper(gantt) {
    this._gantt = gantt;
  }

  var _proto = GanttSizeHelper.prototype;

  _proto._setTreeListDimension = function _setTreeListDimension(dimension, value) {
    var _this$_gantt$_ganttTr;

    this._gantt._$treeListWrapper[dimension](value);

    (_this$_gantt$_ganttTr = this._gantt._ganttTreeList) === null || _this$_gantt$_ganttTr === void 0 ? void 0 : _this$_gantt$_ganttTr.setOption(dimension, this._gantt._$treeListWrapper[dimension]());
  };

  _proto._setGanttViewDimension = function _setGanttViewDimension(dimension, value) {
    this._gantt._$ganttView[dimension](value);

    this._gantt._setGanttViewOption(dimension, this._gantt._$ganttView[dimension]());
  };

  _proto._getPanelsWidthByOption = function _getPanelsWidthByOption() {
    return {
      leftPanelWidth: this._gantt.option('taskListWidth'),
      rightPanelWidth: this._gantt._$element.width() - this._gantt.option('taskListWidth')
    };
  };

  _proto.onAdjustControl = function onAdjustControl() {
    var elementHeight = this._gantt._$element.height();

    this.updateGanttWidth();
    this.setGanttHeight(elementHeight);
  };

  _proto.onApplyPanelSize = function onApplyPanelSize(e) {
    this.setInnerElementsWidth(e);
    this.updateGanttRowHeights();
  };

  _proto.updateGanttRowHeights = function updateGanttRowHeights() {
    var rowHeight = this._gantt._ganttTreeList.getRowHeight();

    if (this._gantt._getGanttViewOption('rowHeight') !== rowHeight) {
      var _this$_gantt$_ganttVi;

      this._gantt._setGanttViewOption('rowHeight', rowHeight);

      (_this$_gantt$_ganttVi = this._gantt._ganttView) === null || _this$_gantt$_ganttVi === void 0 ? void 0 : _this$_gantt$_ganttVi._ganttViewCore.updateRowHeights(rowHeight);
    }
  };

  _proto.adjustHeight = function adjustHeight() {
    if (!this._gantt._hasHeight) {
      this._gantt._setGanttViewOption('height', 0);

      this._gantt._setGanttViewOption('height', this._gantt._ganttTreeList.getOffsetHeight());
    }
  };

  _proto.setInnerElementsWidth = function setInnerElementsWidth(widths) {
    if (!(0, _window.hasWindow)()) {
      return;
    }

    if (!widths) {
      widths = this._getPanelsWidthByOption();
    }

    this._setTreeListDimension('width', widths.leftPanelWidth);

    this._setGanttViewDimension('width', widths.rightPanelWidth);
  };

  _proto.updateGanttWidth = function updateGanttWidth() {
    this._gantt._splitter._dimensionChanged();
  };

  _proto.setGanttHeight = function setGanttHeight(height) {
    var _this$_gantt$_ganttVi2;

    var toolbarHeightOffset = this._gantt._$toolbarWrapper.get(0).offsetHeight;

    var mainWrapperHeight = height - toolbarHeightOffset;

    this._setTreeListDimension('height', mainWrapperHeight);

    this._setGanttViewDimension('height', mainWrapperHeight);

    (_this$_gantt$_ganttVi2 = this._gantt._ganttView) === null || _this$_gantt$_ganttVi2 === void 0 ? void 0 : _this$_gantt$_ganttVi2._ganttViewCore.resetAndUpdate();
  };

  return GanttSizeHelper;
}();

exports.GanttSizeHelper = GanttSizeHelper;
