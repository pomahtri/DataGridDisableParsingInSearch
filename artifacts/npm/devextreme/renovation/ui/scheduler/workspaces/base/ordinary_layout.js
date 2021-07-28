/**
* DevExtreme (renovation/ui/scheduler/workspaces/base/ordinary_layout.js)
* Version: 21.2.0
* Build date: Wed Jul 28 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.OrdinaryLayout = exports.OrdinaryLayoutProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _combine_classes = require("../../../../utils/combine_classes");

var _widget = require("../../../common/widget");

var _scrollable = require("../../../scroll_view/scrollable");

var _utils = require("../utils");

var _group_panel = require("./group_panel/group_panel");

var _layout_props = require("./layout_props");

var _title = require("./date_table/all_day_panel/title");

var _layout = require("./date_table/all_day_panel/layout");

var _excluded = ["addDateTableClass", "bottomVirtualRowHeight", "className", "columnCountPerGroup", "dataCellTemplate", "dateCellTemplate", "dateHeaderData", "dateTableTemplate", "groupByDate", "groupOrientation", "groupPanelCellBaseColSpan", "groupPanelClassName", "groups", "headerPanelTemplate", "intervalCount", "isAllDayPanelCollapsed", "isAllDayPanelSupported", "isAllDayPanelVisible", "isRenderDateHeader", "isWorkSpaceWithOddCells", "leftVirtualCellWidth", "resourceCellTemplate", "rightVirtualCellWidth", "timeCellTemplate", "timePanelData", "timePanelTemplate", "topVirtualRowHeight", "viewData"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(_ref) {
  var classes = _ref.classes,
      dateTableRef = _ref.dateTableRef,
      groupPanelHeight = _ref.groupPanelHeight,
      isRenderGroupPanel = _ref.isRenderGroupPanel,
      isSetAllDayTitleClass = _ref.isSetAllDayTitleClass,
      isStandaloneAllDayPanel = _ref.isStandaloneAllDayPanel,
      _ref$props = _ref.props,
      columnCountPerGroup = _ref$props.columnCountPerGroup,
      dataCellTemplate = _ref$props.dataCellTemplate,
      dateCellTemplate = _ref$props.dateCellTemplate,
      dateHeaderData = _ref$props.dateHeaderData,
      DateTable = _ref$props.dateTableTemplate,
      groupByDate = _ref$props.groupByDate,
      groupOrientation = _ref$props.groupOrientation,
      groupPanelCellBaseColSpan = _ref$props.groupPanelCellBaseColSpan,
      groupPanelClassName = _ref$props.groupPanelClassName,
      groups = _ref$props.groups,
      HeaderPanel = _ref$props.headerPanelTemplate,
      isAllDayPanelSupported = _ref$props.isAllDayPanelSupported,
      isRenderDateHeader = _ref$props.isRenderDateHeader,
      resourceCellTemplate = _ref$props.resourceCellTemplate,
      timeCellTemplate = _ref$props.timeCellTemplate,
      timePanelData = _ref$props.timePanelData,
      TimePanel = _ref$props.timePanelTemplate,
      viewData = _ref$props.viewData;
  return (0, _inferno.createComponentVNode)(2, _widget.Widget, {
    "className": classes,
    children: [isAllDayPanelSupported && (0, _inferno.createComponentVNode)(2, _title.AllDayPanelTitle, {
      "visible": isStandaloneAllDayPanel,
      "isSetTitleClass": isSetAllDayTitleClass
    }), (0, _inferno.createVNode)(1, "table", "dx-scheduler-header-panel", HeaderPanel({
      dateHeaderData: dateHeaderData,
      timeCellTemplate: timeCellTemplate,
      dateCellTemplate: dateCellTemplate,
      isRenderDateHeader: isRenderDateHeader,
      groupPanelCellBaseColSpan: groupPanelCellBaseColSpan,
      groupOrientation: groupOrientation,
      groupByDate: groupByDate,
      groups: groups,
      columnCountPerGroup: columnCountPerGroup,
      resourceCellTemplate: resourceCellTemplate
    }), 0), isAllDayPanelSupported && (0, _inferno.createComponentVNode)(2, _layout.AllDayPanelLayout, {
      "visible": isStandaloneAllDayPanel,
      "viewData": viewData,
      "dataCellTemplate": dataCellTemplate
    }), (0, _inferno.createComponentVNode)(2, _scrollable.Scrollable, {
      "useKeyboard": false,
      "bounceEnabled": false,
      "className": "dx-scheduler-date-table-scrollable",
      children: [isRenderGroupPanel && (0, _inferno.createComponentVNode)(2, _group_panel.GroupPanel, {
        "baseColSpan": groupPanelCellBaseColSpan,
        "className": groupPanelClassName,
        "groupOrientation": groupOrientation,
        "groupByDate": groupByDate,
        "groups": groups,
        "columnCountPerGroup": columnCountPerGroup,
        "resourceCellTemplate": resourceCellTemplate,
        "height": groupPanelHeight
      }), !!TimePanel && TimePanel({
        timePanelData: timePanelData,
        timeCellTemplate: timeCellTemplate,
        groupOrientation: groupOrientation
      }), DateTable({
        tableRef: dateTableRef,
        viewData: viewData,
        groupOrientation: groupOrientation,
        dataCellTemplate: dataCellTemplate
      })]
    })]
  });
};

exports.viewFunction = viewFunction;

var OrdinaryLayoutProps = _extends({}, _layout_props.LayoutProps, {
  timePanelData: {
    groupedData: [],
    leftVirtualCellCount: 0,
    rightVirtualCellCount: 0,
    topVirtualRowCount: 0,
    bottomVirtualRowCount: 0
  },
  intervalCount: 1,
  className: "",
  isRenderDateHeader: true,
  groupPanelCellBaseColSpan: 1,
  groups: [],
  groupByDate: false,
  columnCountPerGroup: 1,
  groupPanelClassName: "dx-scheduler-work-space-vertical-group-table",
  isAllDayPanelCollapsed: true,
  isAllDayPanelSupported: false,
  isAllDayPanelVisible: false
});

exports.OrdinaryLayoutProps = OrdinaryLayoutProps;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};

var OrdinaryLayout = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(OrdinaryLayout, _InfernoComponent);

  function OrdinaryLayout(props) {
    var _this;

    _this = _InfernoComponent.call(this, props) || this;
    _this.dateTableRef = (0, _inferno.createRef)();
    _this.state = {
      groupPanelHeight: undefined
    };
    _this.groupPanelHeightEffect = _this.groupPanelHeightEffect.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = OrdinaryLayout.prototype;

  _proto.createEffects = function createEffects() {
    return [new _vdom.InfernoEffect(this.groupPanelHeightEffect, [])];
  };

  _proto.updateEffects = function updateEffects() {
    var _this$_effects$;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([]);
  };

  _proto.groupPanelHeightEffect = function groupPanelHeightEffect() {
    var _this2 = this;

    this.setState(function (state) {
      var _this2$dateTableRef$c;

      return _extends({}, state, {
        groupPanelHeight: (_this2$dateTableRef$c = _this2.dateTableRef.current) === null || _this2$dateTableRef$c === void 0 ? void 0 : _this2$dateTableRef$c.getBoundingClientRect().height
      });
    });
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        headerPanelTemplate: getTemplate(props.headerPanelTemplate),
        dateTableTemplate: getTemplate(props.dateTableTemplate),
        timePanelTemplate: getTemplate(props.timePanelTemplate),
        resourceCellTemplate: getTemplate(props.resourceCellTemplate),
        timeCellTemplate: getTemplate(props.timeCellTemplate),
        dateCellTemplate: getTemplate(props.dateCellTemplate),
        dataCellTemplate: getTemplate(props.dataCellTemplate)
      }),
      groupPanelHeight: this.state.groupPanelHeight,
      dateTableRef: this.dateTableRef,
      classes: this.classes,
      isRenderGroupPanel: this.isRenderGroupPanel,
      isStandaloneAllDayPanel: this.isStandaloneAllDayPanel,
      isSetAllDayTitleClass: this.isSetAllDayTitleClass,
      restAttributes: this.restAttributes
    });
  };

  _createClass(OrdinaryLayout, [{
    key: "classes",
    get: function get() {
      var _combineClasses;

      var _this$props = this.props,
          className = _this$props.className,
          groupByDate = _this$props.groupByDate,
          groupOrientation = _this$props.groupOrientation,
          groups = _this$props.groups,
          intervalCount = _this$props.intervalCount,
          isAllDayPanelCollapsed = _this$props.isAllDayPanelCollapsed,
          isAllDayPanelVisible = _this$props.isAllDayPanelVisible,
          isWorkSpaceWithOddCells = _this$props.isWorkSpaceWithOddCells;
      return (0, _combine_classes.combineClasses)((_combineClasses = {}, _defineProperty(_combineClasses, className, !!className), _defineProperty(_combineClasses, "dx-scheduler-work-space-count", intervalCount > 1), _defineProperty(_combineClasses, "dx-scheduler-work-space-odd-cells", !!isWorkSpaceWithOddCells), _defineProperty(_combineClasses, "dx-scheduler-work-space-all-day-collapsed", isAllDayPanelCollapsed && isAllDayPanelVisible), _defineProperty(_combineClasses, "dx-scheduler-work-space-all-day", isAllDayPanelVisible), _defineProperty(_combineClasses, "dx-scheduler-work-space-group-by-date", groupByDate), _defineProperty(_combineClasses, "dx-scheduler-work-space-grouped", groups.length > 0), _defineProperty(_combineClasses, "dx-scheduler-work-space-vertical-grouped", (0, _utils.isVerticalGroupingApplied)(groups, groupOrientation)), _defineProperty(_combineClasses, "dx-scheduler-group-row-count-one", (0, _utils.isHorizontalGroupingApplied)(groups, groupOrientation) && groups.length === 1), _defineProperty(_combineClasses, "dx-scheduler-group-row-count-two", (0, _utils.isHorizontalGroupingApplied)(groups, groupOrientation) && groups.length === 2), _defineProperty(_combineClasses, "dx-scheduler-group-row-count-three", (0, _utils.isHorizontalGroupingApplied)(groups, groupOrientation) && groups.length === 3), _defineProperty(_combineClasses, "dx-scheduler-group-column-count-one", (0, _utils.isVerticalGroupingApplied)(groups, groupOrientation) && groups.length === 1), _defineProperty(_combineClasses, "dx-scheduler-group-column-count-two", (0, _utils.isVerticalGroupingApplied)(groups, groupOrientation) && groups.length === 2), _defineProperty(_combineClasses, "dx-scheduler-group-column-count-three", (0, _utils.isVerticalGroupingApplied)(groups, groupOrientation) && groups.length === 3), _defineProperty(_combineClasses, "dx-scheduler-work-space", true), _combineClasses));
    }
  }, {
    key: "isRenderGroupPanel",
    get: function get() {
      var _this$props2 = this.props,
          groupOrientation = _this$props2.groupOrientation,
          groups = _this$props2.groups;
      return (0, _utils.isVerticalGroupingApplied)(groups, groupOrientation);
    }
  }, {
    key: "isStandaloneAllDayPanel",
    get: function get() {
      var _this$props3 = this.props,
          groupOrientation = _this$props3.groupOrientation,
          groups = _this$props3.groups,
          isAllDayPanelVisible = _this$props3.isAllDayPanelVisible;
      return !(0, _utils.isVerticalGroupingApplied)(groups, groupOrientation) && isAllDayPanelVisible;
    }
  }, {
    key: "isSetAllDayTitleClass",
    get: function get() {
      var _this$props4 = this.props,
          groupOrientation = _this$props4.groupOrientation,
          groups = _this$props4.groups;
      return !(0, _utils.isVerticalGroupingApplied)(groups, groupOrientation);
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props5 = this.props,
          addDateTableClass = _this$props5.addDateTableClass,
          bottomVirtualRowHeight = _this$props5.bottomVirtualRowHeight,
          className = _this$props5.className,
          columnCountPerGroup = _this$props5.columnCountPerGroup,
          dataCellTemplate = _this$props5.dataCellTemplate,
          dateCellTemplate = _this$props5.dateCellTemplate,
          dateHeaderData = _this$props5.dateHeaderData,
          dateTableTemplate = _this$props5.dateTableTemplate,
          groupByDate = _this$props5.groupByDate,
          groupOrientation = _this$props5.groupOrientation,
          groupPanelCellBaseColSpan = _this$props5.groupPanelCellBaseColSpan,
          groupPanelClassName = _this$props5.groupPanelClassName,
          groups = _this$props5.groups,
          headerPanelTemplate = _this$props5.headerPanelTemplate,
          intervalCount = _this$props5.intervalCount,
          isAllDayPanelCollapsed = _this$props5.isAllDayPanelCollapsed,
          isAllDayPanelSupported = _this$props5.isAllDayPanelSupported,
          isAllDayPanelVisible = _this$props5.isAllDayPanelVisible,
          isRenderDateHeader = _this$props5.isRenderDateHeader,
          isWorkSpaceWithOddCells = _this$props5.isWorkSpaceWithOddCells,
          leftVirtualCellWidth = _this$props5.leftVirtualCellWidth,
          resourceCellTemplate = _this$props5.resourceCellTemplate,
          rightVirtualCellWidth = _this$props5.rightVirtualCellWidth,
          timeCellTemplate = _this$props5.timeCellTemplate,
          timePanelData = _this$props5.timePanelData,
          timePanelTemplate = _this$props5.timePanelTemplate,
          topVirtualRowHeight = _this$props5.topVirtualRowHeight,
          viewData = _this$props5.viewData,
          restProps = _objectWithoutProperties(_this$props5, _excluded);

      return restProps;
    }
  }]);

  return OrdinaryLayout;
}(_vdom.InfernoComponent);

exports.OrdinaryLayout = OrdinaryLayout;
OrdinaryLayout.defaultProps = _extends({}, OrdinaryLayoutProps);
