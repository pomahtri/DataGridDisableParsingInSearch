/**
* DevExtreme (cjs/renovation/ui/scheduler/workspaces/base/work_space.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.WorkSpaceBase = exports.WorkSpaceBaseProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _ordinary_layout = require("./ordinary_layout");

var _date = _interopRequireDefault(require("../../../../../core/utils/date"));

var _layout = require("./header_panel/layout");

var _layout2 = require("./date_table/layout");

var _excluded = ["allDayPanelExpanded", "allowMultipleCellSelection", "crossScrollingEnabled", "currentDate", "dataCellTemplate", "dateCellTemplate", "dateTableTemplate", "endDayHour", "firstDayOfWeek", "groupByDate", "groupOrientation", "groupPanelClassName", "groups", "headerPanelTemplate", "hoursInterval", "indicatorTime", "indicatorUpdateInterval", "intervalCount", "isAllDayPanelSupported", "resourceCellTemplate", "scrolling", "selectedCellData", "shadeUntilCurrentTime", "showAllDayPanel", "startDate", "startDayHour", "timeCellTemplate", "timePanelTemplate"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(_ref) {
  var dateHeaderData = _ref.dateHeaderData,
      isAllDayPanelVisible = _ref.isAllDayPanelVisible,
      Layout = _ref.layout,
      _ref$props = _ref.props,
      allDayPanelExpanded = _ref$props.allDayPanelExpanded,
      dataCellTemplate = _ref$props.dataCellTemplate,
      dateCellTemplate = _ref$props.dateCellTemplate,
      dateTableTemplate = _ref$props.dateTableTemplate,
      groupByDate = _ref$props.groupByDate,
      groupOrientation = _ref$props.groupOrientation,
      groups = _ref$props.groups,
      headerPanelTemplate = _ref$props.headerPanelTemplate,
      isAllDayPanelSupported = _ref$props.isAllDayPanelSupported,
      resourceCellTemplate = _ref$props.resourceCellTemplate,
      timeCellTemplate = _ref$props.timeCellTemplate,
      timePanelTemplate = _ref$props.timePanelTemplate,
      timePanelData = _ref.timePanelData,
      viewData = _ref.viewData;
  return (0, _inferno.createComponentVNode)(2, Layout, {
    "viewData": viewData,
    "dateHeaderData": dateHeaderData,
    "timePanelData": timePanelData,
    "dataCellTemplate": dataCellTemplate,
    "dateCellTemplate": dateCellTemplate,
    "timeCellTemplate": timeCellTemplate,
    "resourceCellTemplate": resourceCellTemplate,
    "groups": groups,
    "groupByDate": groupByDate,
    "groupOrientation": groupOrientation,
    "headerPanelTemplate": headerPanelTemplate,
    "dateTableTemplate": dateTableTemplate,
    "timePanelTemplate": timePanelTemplate,
    "isAllDayPanelCollapsed": !allDayPanelExpanded,
    "isAllDayPanelSupported": isAllDayPanelSupported,
    "isAllDayPanelVisible": isAllDayPanelVisible
  });
};

exports.viewFunction = viewFunction;
var WorkSpaceBaseProps = {
  intervalCount: 1,
  groups: [],
  groupByDate: false,
  groupOrientation: "horizontal",
  crossScrollingEnabled: false,
  startDayHour: 0,
  endDayHour: 24,
  firstDayOfWeek: 0,
  hoursInterval: 0.5,
  showAllDayPanel: false,
  allDayPanelExpanded: false,
  allowMultipleCellSelection: true,
  indicatorTime: new Date(),
  indicatorUpdateInterval: 5 * _date.default.dateToMilliseconds("minute"),
  shadeUntilCurrentTime: true,
  selectedCellData: [],
  scrolling: {
    mode: "standard"
  },
  headerPanelTemplate: _layout.HeaderPanelLayout,
  dateTableTemplate: _layout2.DateTableLayoutBase,
  isAllDayPanelSupported: false
};
exports.WorkSpaceBaseProps = WorkSpaceBaseProps;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};

var WorkSpaceBase = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(WorkSpaceBase, _BaseInfernoComponent);

  function WorkSpaceBase(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = WorkSpaceBase.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        dataCellTemplate: getTemplate(props.dataCellTemplate),
        dateCellTemplate: getTemplate(props.dateCellTemplate),
        timeCellTemplate: getTemplate(props.timeCellTemplate),
        resourceCellTemplate: getTemplate(props.resourceCellTemplate),
        headerPanelTemplate: getTemplate(props.headerPanelTemplate),
        dateTableTemplate: getTemplate(props.dateTableTemplate),
        timePanelTemplate: getTemplate(props.timePanelTemplate)
      }),
      layout: this.layout,
      isAllDayPanelVisible: this.isAllDayPanelVisible,
      viewData: this.viewData,
      dateHeaderData: this.dateHeaderData,
      timePanelData: this.timePanelData,
      restAttributes: this.restAttributes
    });
  };

  _createClass(WorkSpaceBase, [{
    key: "layout",
    get: function get() {
      return this.props.crossScrollingEnabled ? _ordinary_layout.OrdinaryLayout : _ordinary_layout.OrdinaryLayout;
    }
  }, {
    key: "isAllDayPanelVisible",
    get: function get() {
      var _this$props = this.props,
          isAllDayPanelSupported = _this$props.isAllDayPanelSupported,
          showAllDayPanel = _this$props.showAllDayPanel;
      return isAllDayPanelSupported && showAllDayPanel;
    }
  }, {
    key: "viewData",
    get: function get() {
      return {
        groupedData: [{
          dateTable: [[{
            startDate: new Date(),
            endDate: new Date(),
            index: 0,
            isFirstGroupCell: true,
            isLastGroupCell: true,
            key: 0,
            groupIndex: 0
          }]],
          groupIndex: 0
        }],
        leftVirtualCellCount: 0,
        rightVirtualCellCount: 0,
        topVirtualRowCount: 0,
        bottomVirtualRowCount: 0
      };
    }
  }, {
    key: "dateHeaderData",
    get: function get() {
      return {
        dataMap: [[]],
        leftVirtualCellCount: 0,
        rightVirtualCellCount: 0,
        leftVirtualCellWidth: 0,
        rightVirtualCellWidth: 0
      };
    }
  }, {
    key: "timePanelData",
    get: function get() {
      return {
        groupedData: [],
        leftVirtualCellCount: 0,
        rightVirtualCellCount: 0,
        topVirtualRowCount: 0,
        bottomVirtualRowCount: 0
      };
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props2 = this.props,
          allDayPanelExpanded = _this$props2.allDayPanelExpanded,
          allowMultipleCellSelection = _this$props2.allowMultipleCellSelection,
          crossScrollingEnabled = _this$props2.crossScrollingEnabled,
          currentDate = _this$props2.currentDate,
          dataCellTemplate = _this$props2.dataCellTemplate,
          dateCellTemplate = _this$props2.dateCellTemplate,
          dateTableTemplate = _this$props2.dateTableTemplate,
          endDayHour = _this$props2.endDayHour,
          firstDayOfWeek = _this$props2.firstDayOfWeek,
          groupByDate = _this$props2.groupByDate,
          groupOrientation = _this$props2.groupOrientation,
          groupPanelClassName = _this$props2.groupPanelClassName,
          groups = _this$props2.groups,
          headerPanelTemplate = _this$props2.headerPanelTemplate,
          hoursInterval = _this$props2.hoursInterval,
          indicatorTime = _this$props2.indicatorTime,
          indicatorUpdateInterval = _this$props2.indicatorUpdateInterval,
          intervalCount = _this$props2.intervalCount,
          isAllDayPanelSupported = _this$props2.isAllDayPanelSupported,
          resourceCellTemplate = _this$props2.resourceCellTemplate,
          scrolling = _this$props2.scrolling,
          selectedCellData = _this$props2.selectedCellData,
          shadeUntilCurrentTime = _this$props2.shadeUntilCurrentTime,
          showAllDayPanel = _this$props2.showAllDayPanel,
          startDate = _this$props2.startDate,
          startDayHour = _this$props2.startDayHour,
          timeCellTemplate = _this$props2.timeCellTemplate,
          timePanelTemplate = _this$props2.timePanelTemplate,
          restProps = _objectWithoutProperties(_this$props2, _excluded);

      return restProps;
    }
  }]);

  return WorkSpaceBase;
}(_vdom.BaseInfernoComponent);

exports.WorkSpaceBase = WorkSpaceBase;
WorkSpaceBase.defaultProps = _extends({}, WorkSpaceBaseProps);
