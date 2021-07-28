/**
* DevExtreme (esm/renovation/ui/editors/number_box.js)
* Version: 21.2.0
* Build date: Wed Jul 28 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["accessKey", "activeStateEnabled", "className", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "invalidValueMessage", "max", "min", "mode", "onClick", "onKeyDown", "rtlEnabled", "showSpinButtons", "step", "tabIndex", "useLargeSpinButtons", "value", "valueChange", "visible", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import LegacyNumberBox from "../../../ui/number_box";
import { DomComponentWrapper } from "../common/dom_component_wrapper";
import { BaseWidgetProps } from "../common/base_props";
var DEFAULT_VALUE = 0;
export var viewFunction = _ref => {
  var {
    props,
    restAttributes
  } = _ref;
  return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
    "componentType": LegacyNumberBox,
    "componentProps": props
  }, restAttributes)));
};
export var NumberBoxProps = _extends({}, BaseWidgetProps, {
  focusStateEnabled: true,
  hoverStateEnabled: true,
  defaultValue: DEFAULT_VALUE
});
export class NumberBox extends BaseInfernoComponent {
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
NumberBox.defaultProps = _extends({}, NumberBoxProps);
