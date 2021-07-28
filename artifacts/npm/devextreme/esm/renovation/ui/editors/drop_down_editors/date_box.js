/**
* DevExtreme (esm/renovation/ui/editors/drop_down_editors/date_box.js)
* Version: 21.2.0
* Build date: Wed Jul 28 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["accessKey", "activeStateEnabled", "calendarOptions", "className", "defaultValue", "disabled", "field", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "onClick", "onKeyDown", "rtlEnabled", "tabIndex", "type", "value", "valueChange", "visible", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import LegacyDateBox from "../../../../ui/date_box";
import { DomComponentWrapper } from "../../common/dom_component_wrapper";
import { BaseWidgetProps } from "../../common/base_props";
export var viewFunction = _ref => {
  var {
    props,
    restAttributes
  } = _ref;
  return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
    "componentType": LegacyDateBox,
    "componentProps": props
  }, restAttributes)));
};
export var DateBoxProps = _extends({}, BaseWidgetProps, {
  defaultValue: null
});
export class DateBox extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value !== undefined ? this.props.value : this.props.defaultValue
    };
  }

  get restAttributes() {
    var _this$props$value = _extends({}, this.props, {
      value: this.props.value !== undefined ? this.props.value : this.state.value
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$value, _excluded);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      }),
      restAttributes: this.restAttributes
    });
  }

}
DateBox.defaultProps = _extends({}, DateBoxProps);
