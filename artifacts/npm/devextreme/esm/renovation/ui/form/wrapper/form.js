/**
* DevExtreme (esm/renovation/ui/form/wrapper/form.js)
* Version: 21.2.0
* Build date: Wed Jul 28 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["accessKey", "activeStateEnabled", "className", "disabled", "focusStateEnabled", "formData", "height", "hint", "hoverStateEnabled", "items", "labelLocation", "onClick", "onKeyDown", "rtlEnabled", "scrollingEnabled", "showColonAfterLabel", "showValidationSummary", "tabIndex", "visible", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { InfernoWrapperComponent } from "@devextreme/vdom";
import LegacyForm from "../../../../ui/form";
import { DomComponentWrapper } from "../../common/dom_component_wrapper";
import { FormProps } from "./form_props";
export var viewFunction = _ref => {
  var {
    props,
    restAttributes
  } = _ref;
  return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
    "componentType": LegacyForm,
    "componentProps": props
  }, restAttributes)));
};
import { createReRenderEffect } from "@devextreme/vdom";
export class Form extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createEffects() {
    return [createReRenderEffect()];
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      restAttributes: this.restAttributes
    });
  }

}
Form.defaultProps = _extends({}, FormProps);
