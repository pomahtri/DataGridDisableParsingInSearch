/**
* DevExtreme (renovation/ui/scroll_view/utils/get_element_padding.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getElementPaddingBottom = getElementPaddingBottom;

var _get_element_computed_style = require("./get_element_computed_style");

var _type_conversion = require("../../../utils/type_conversion");

function getElementPaddingBottom(element) {
  return (0, _type_conversion.toNumber)((0, _get_element_computed_style.getElementComputedStyle)(element).paddingBottom);
}
