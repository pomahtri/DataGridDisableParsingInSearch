/**
* DevExtreme (esm/renovation/ui/scheduler/workspaces/base/ordinary_layout.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["addDateTableClass", "bottomVirtualRowHeight", "className", "columnCountPerGroup", "dataCellTemplate", "dateCellTemplate", "dateHeaderData", "dateTableTemplate", "groupByDate", "groupOrientation", "groupPanelCellBaseColSpan", "groupPanelClassName", "groups", "headerPanelTemplate", "intervalCount", "isAllDayPanelCollapsed", "isAllDayPanelSupported", "isAllDayPanelVisible", "isRenderDateHeader", "isWorkSpaceWithOddCells", "leftVirtualCellWidth", "resourceCellTemplate", "rightVirtualCellWidth", "timeCellTemplate", "timePanelData", "timePanelTemplate", "topVirtualRowHeight", "viewData"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoComponent } from "@devextreme/vdom";
import { combineClasses } from "../../../../utils/combine_classes";
import { Widget } from "../../../common/widget";
import { Scrollable } from "../../../scroll_view/scrollable";
import { isHorizontalGroupingApplied, isVerticalGroupingApplied } from "../utils";
import { GroupPanel } from "./group_panel/group_panel";
import { LayoutProps } from "./layout_props";
import { AllDayPanelTitle } from "./date_table/all_day_panel/title";
import { AllDayPanelLayout } from "./date_table/all_day_panel/layout";
export var viewFunction = _ref => {
  var {
    classes,
    dateTableRef,
    groupPanelHeight,
    isRenderGroupPanel,
    isSetAllDayTitleClass,
    isStandaloneAllDayPanel,
    props: {
      columnCountPerGroup,
      dataCellTemplate,
      dateCellTemplate,
      dateHeaderData,
      dateTableTemplate: DateTable,
      groupByDate,
      groupOrientation,
      groupPanelCellBaseColSpan,
      groupPanelClassName,
      groups,
      headerPanelTemplate: HeaderPanel,
      isAllDayPanelSupported,
      isRenderDateHeader,
      resourceCellTemplate,
      timeCellTemplate,
      timePanelData,
      timePanelTemplate: TimePanel,
      viewData
    }
  } = _ref;
  return createComponentVNode(2, Widget, {
    "className": classes,
    children: [isAllDayPanelSupported && createComponentVNode(2, AllDayPanelTitle, {
      "visible": isStandaloneAllDayPanel,
      "isSetTitleClass": isSetAllDayTitleClass
    }), createVNode(1, "table", "dx-scheduler-header-panel", HeaderPanel({
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
    }), 0), isAllDayPanelSupported && createComponentVNode(2, AllDayPanelLayout, {
      "visible": isStandaloneAllDayPanel,
      "viewData": viewData,
      "dataCellTemplate": dataCellTemplate
    }), createComponentVNode(2, Scrollable, {
      "useKeyboard": false,
      "bounceEnabled": false,
      "className": "dx-scheduler-date-table-scrollable",
      children: [isRenderGroupPanel && createComponentVNode(2, GroupPanel, {
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
export var OrdinaryLayoutProps = _extends({}, LayoutProps, {
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
import { createRef as infernoCreateRef } from "inferno";

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class OrdinaryLayout extends InfernoComponent {
  constructor(props) {
    super(props);
    this.dateTableRef = infernoCreateRef();
    this.state = {
      groupPanelHeight: undefined
    };
    this.groupPanelHeightEffect = this.groupPanelHeightEffect.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.groupPanelHeightEffect, [])];
  }

  updateEffects() {
    var _this$_effects$;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([]);
  }

  groupPanelHeightEffect() {
    this.setState(state => {
      var _this$dateTableRef$cu;

      return _extends({}, state, {
        groupPanelHeight: (_this$dateTableRef$cu = this.dateTableRef.current) === null || _this$dateTableRef$cu === void 0 ? void 0 : _this$dateTableRef$cu.getBoundingClientRect().height
      });
    });
  }

  get classes() {
    var {
      className,
      groupByDate,
      groupOrientation,
      groups,
      intervalCount,
      isAllDayPanelCollapsed,
      isAllDayPanelVisible,
      isWorkSpaceWithOddCells
    } = this.props;
    return combineClasses({
      [className]: !!className,
      "dx-scheduler-work-space-count": intervalCount > 1,
      "dx-scheduler-work-space-odd-cells": !!isWorkSpaceWithOddCells,
      "dx-scheduler-work-space-all-day-collapsed": isAllDayPanelCollapsed && isAllDayPanelVisible,
      "dx-scheduler-work-space-all-day": isAllDayPanelVisible,
      "dx-scheduler-work-space-group-by-date": groupByDate,
      "dx-scheduler-work-space-grouped": groups.length > 0,
      "dx-scheduler-work-space-vertical-grouped": isVerticalGroupingApplied(groups, groupOrientation),
      "dx-scheduler-group-row-count-one": isHorizontalGroupingApplied(groups, groupOrientation) && groups.length === 1,
      "dx-scheduler-group-row-count-two": isHorizontalGroupingApplied(groups, groupOrientation) && groups.length === 2,
      "dx-scheduler-group-row-count-three": isHorizontalGroupingApplied(groups, groupOrientation) && groups.length === 3,
      "dx-scheduler-group-column-count-one": isVerticalGroupingApplied(groups, groupOrientation) && groups.length === 1,
      "dx-scheduler-group-column-count-two": isVerticalGroupingApplied(groups, groupOrientation) && groups.length === 2,
      "dx-scheduler-group-column-count-three": isVerticalGroupingApplied(groups, groupOrientation) && groups.length === 3,
      "dx-scheduler-work-space": true
    });
  }

  get isRenderGroupPanel() {
    var {
      groupOrientation,
      groups
    } = this.props;
    return isVerticalGroupingApplied(groups, groupOrientation);
  }

  get isStandaloneAllDayPanel() {
    var {
      groupOrientation,
      groups,
      isAllDayPanelVisible
    } = this.props;
    return !isVerticalGroupingApplied(groups, groupOrientation) && isAllDayPanelVisible;
  }

  get isSetAllDayTitleClass() {
    var {
      groupOrientation,
      groups
    } = this.props;
    return !isVerticalGroupingApplied(groups, groupOrientation);
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
  }

}
OrdinaryLayout.defaultProps = _extends({}, OrdinaryLayoutProps);
