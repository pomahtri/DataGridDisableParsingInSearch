/**
* DevExtreme (esm/renovation/ui/scroll_view/utils/get_element_padding.js)
* Version: 21.2.0
* Build date: Wed Jul 28 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import getElementComputedStyle from "../../../utils/get_computed_style";
import { toNumber } from "../../../utils/type_conversion";
export function getElementStyle(name, element) {
  var _getElementComputedSt;

  var computedStyle = (_getElementComputedSt = getElementComputedStyle(element)) !== null && _getElementComputedSt !== void 0 ? _getElementComputedSt : {};
  return toNumber(computedStyle[name]);
}
export function getElementPaddingBottom(element) {
  return getElementStyle("paddingBottom", element);
}
