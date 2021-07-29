"use strict";

exports.getElementPaddingBottom = getElementPaddingBottom;

var _get_element_computed_style = require("./get_element_computed_style");

var _type_conversion = require("../../../utils/type_conversion");

function getElementPaddingBottom(element) {
  return (0, _type_conversion.toNumber)((0, _get_element_computed_style.getElementComputedStyle)(element).paddingBottom);
}