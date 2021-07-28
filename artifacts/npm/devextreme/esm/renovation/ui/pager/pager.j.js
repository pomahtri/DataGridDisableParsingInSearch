/**
* DevExtreme (esm/renovation/ui/pager/pager.j.js)
* Version: 21.2.0
* Build date: Wed Jul 28 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from "../../../core/component_registrator";
import { GridPagerWrapper } from "../../component_wrapper/grid_pager";
import { Pager as PagerComponent } from "./pager";
export default class Pager extends GridPagerWrapper {
  getProps() {
    var props = super.getProps();
    props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
    return props;
  }

  get _propsInfo() {
    return {
      twoWay: [["pageIndex", "defaultPageIndex", "pageIndexChange"], ["pageSize", "defaultPageSize", "pageSizeChange"]],
      allowNull: [],
      elements: [],
      templates: [],
      props: ["gridCompatibility", "className", "showInfo", "infoText", "lightModeEnabled", "displayMode", "maxPagesCount", "pageCount", "pagesCountText", "visible", "hasKnownLastPage", "pagesNavigatorVisible", "pageIndexChange", "pageSizeChange", "showPageSizes", "pageSizes", "rtlEnabled", "showNavigationButtons", "totalCount", "onKeyDown", "defaultPageIndex", "defaultPageSize", "pageIndex", "pageSize"]
    };
  }

  get _viewComponent() {
    return PagerComponent;
  }

}
registerComponent("dxPager", Pager);
