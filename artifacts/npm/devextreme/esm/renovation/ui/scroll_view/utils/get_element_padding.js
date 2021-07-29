/**
* DevExtreme (esm/renovation/ui/scroll_view/utils/get_element_padding.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getElementComputedStyle } from "./get_element_computed_style";
import { toNumber } from "../../../utils/type_conversion";
export function getElementPaddingBottom(element) {
  return toNumber(getElementComputedStyle(element).paddingBottom);
}
