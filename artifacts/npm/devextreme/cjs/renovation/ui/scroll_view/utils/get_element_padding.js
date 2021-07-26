/**
* DevExtreme (cjs/renovation/ui/scroll_view/utils/get_element_padding.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getElementStyle = getElementStyle;
exports.getElementPaddingBottom = getElementPaddingBottom;

var _get_computed_style = _interopRequireDefault(require("../../../utils/get_computed_style"));

var _type_conversion = require("../../../utils/type_conversion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getElementStyle(name, element) {
  var _getElementComputedSt;

  var computedStyle = (_getElementComputedSt = (0, _get_computed_style.default)(element)) !== null && _getElementComputedSt !== void 0 ? _getElementComputedSt : {};
  return (0, _type_conversion.toNumber)(computedStyle[name]);
}

function getElementPaddingBottom(element) {
  return getElementStyle("paddingBottom", element);
}
