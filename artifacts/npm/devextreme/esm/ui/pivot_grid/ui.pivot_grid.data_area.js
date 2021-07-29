/**
* DevExtreme (esm/ui/pivot_grid/ui.pivot_grid.data_area.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["useNative"];
import $ from '../../core/renderer';
import { AreaItem } from './ui.pivot_grid.area_item';
var PIVOTGRID_AREA_CLASS = 'dx-pivotgrid-area';
var PIVOTGRID_AREA_DATA_CLASS = 'dx-pivotgrid-area-data';
var PIVOTGRID_TOTAL_CLASS = 'dx-total';
var PIVOTGRID_GRAND_TOTAL_CLASS = 'dx-grandtotal';
var PIVOTGRID_ROW_TOTAL_CLASS = 'dx-row-total';
export var DataArea = AreaItem.inherit({
  _getAreaName: function _getAreaName() {
    return 'data';
  },
  _createGroupElement: function _createGroupElement() {
    return $('<div>').addClass(PIVOTGRID_AREA_CLASS).addClass(PIVOTGRID_AREA_DATA_CLASS).css('borderTopWidth', 0);
  },
  _applyCustomStyles: function _applyCustomStyles(options) {
    var cell = options.cell;
    var classArray = options.classArray;

    if (cell.rowType === 'T' || cell.columnType === 'T') {
      classArray.push(PIVOTGRID_TOTAL_CLASS);
    }

    if (cell.rowType === 'GT' || cell.columnType === 'GT') {
      classArray.push(PIVOTGRID_GRAND_TOTAL_CLASS);
    }

    if (cell.rowType === 'T' || cell.rowType === 'GT') {
      classArray.push(PIVOTGRID_ROW_TOTAL_CLASS);
    }

    if (options.rowIndex === options.rowsCount - 1) {
      options.cssArray.push('border-bottom: 0px');
    }

    this.callBase(options);
  },
  _moveFakeTable: function _moveFakeTable(scrollPos) {
    this._moveFakeTableHorizontally(scrollPos.x);

    this._moveFakeTableTop(scrollPos.y);

    this.callBase();
  },
  renderScrollable: function renderScrollable() {
    this._groupElement.dxScrollable({
      rtlEnabled: this.component.option('rtlEnabled'),
      bounceEnabled: false,
      updateManually: true
    });
  },
  updateScrollableOptions: function updateScrollableOptions(_ref) {
    var {
      useNative
    } = _ref,
        restOptions = _objectWithoutPropertiesLoose(_ref, _excluded);

    var scrollable = this._getScrollable();

    scrollable.option('useNative', useNative);
    scrollable.option(restOptions);
  },
  getScrollableDirection: function getScrollableDirection(horizontal, vertical) {
    if (horizontal && !vertical) {
      return 'horizontal';
    } else if (!horizontal && vertical) {
      return 'vertical';
    }

    return 'both';
  },
  reset: function reset() {
    this.callBase();

    if (this._virtualContent) {
      this._virtualContent.parent().css('height', 'auto');
    }
  },
  setVirtualContentParams: function setVirtualContentParams(params) {
    this.callBase(params);

    this._virtualContent.parent().css('height', params.height);

    this._setTableCss({
      top: params.top,
      left: params.left
    });
  }
});
