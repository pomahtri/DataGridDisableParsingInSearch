/**
* DevExtreme (esm/renovation/ui/scheduler/workspaces/base/work_space.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["allDayPanelExpanded", "allowMultipleCellSelection", "crossScrollingEnabled", "currentDate", "dataCellTemplate", "dateCellTemplate", "dateTableTemplate", "endDayHour", "firstDayOfWeek", "groupByDate", "groupOrientation", "groupPanelClassName", "groups", "headerPanelTemplate", "hoursInterval", "indicatorTime", "indicatorUpdateInterval", "intervalCount", "isAllDayPanelSupported", "resourceCellTemplate", "scrolling", "selectedCellData", "shadeUntilCurrentTime", "showAllDayPanel", "startDate", "startDayHour", "timeCellTemplate", "timePanelTemplate"];
import { createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { OrdinaryLayout } from "./ordinary_layout";
import dateUtils from "../../../../../core/utils/date";
import { HeaderPanelLayout } from "./header_panel/layout";
import { DateTableLayoutBase } from "./date_table/layout";
export var viewFunction = _ref => {
  var {
    dateHeaderData,
    isAllDayPanelVisible,
    layout: Layout,
    props: {
      allDayPanelExpanded,
      dataCellTemplate,
      dateCellTemplate,
      dateTableTemplate,
      groupByDate,
      groupOrientation,
      groups,
      headerPanelTemplate,
      isAllDayPanelSupported,
      resourceCellTemplate,
      timeCellTemplate,
      timePanelTemplate
    },
    timePanelData,
    viewData
  } = _ref;
  return createComponentVNode(2, Layout, {
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
export var WorkSpaceBaseProps = {
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
  indicatorUpdateInterval: 5 * dateUtils.dateToMilliseconds("minute"),
  shadeUntilCurrentTime: true,
  selectedCellData: [],
  scrolling: {
    mode: "standard"
  },
  headerPanelTemplate: HeaderPanelLayout,
  dateTableTemplate: DateTableLayoutBase,
  isAllDayPanelSupported: false
};

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class WorkSpaceBase extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get layout() {
    return this.props.crossScrollingEnabled ? OrdinaryLayout : OrdinaryLayout;
  }

  get isAllDayPanelVisible() {
    var {
      isAllDayPanelSupported,
      showAllDayPanel
    } = this.props;
    return isAllDayPanelSupported && showAllDayPanel;
  }

  get viewData() {
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

  get dateHeaderData() {
    return {
      dataMap: [[]],
      leftVirtualCellCount: 0,
      rightVirtualCellCount: 0,
      leftVirtualCellWidth: 0,
      rightVirtualCellWidth: 0
    };
  }

  get timePanelData() {
    return {
      groupedData: [],
      leftVirtualCellCount: 0,
      rightVirtualCellCount: 0,
      topVirtualRowCount: 0,
      bottomVirtualRowCount: 0
    };
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);

    return restProps;
  }

  render() {
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
  }

}
WorkSpaceBase.defaultProps = _extends({}, WorkSpaceBaseProps);
