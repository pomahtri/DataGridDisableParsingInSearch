/**
* DevExtreme (esm/renovation/ui/scroll_view/utils/get_translate_values.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getElementComputedStyle } from "./get_element_computed_style";
export function getTranslateValues(element) {
  var _getElementComputedSt;

  if (!element) return {
    left: 0,
    top: 0
  };
  var matrix = (_getElementComputedSt = getElementComputedStyle(element).transform) !== null && _getElementComputedSt !== void 0 ? _getElementComputedSt : "";
  var regex = /matrix.*\((.+)\)/;
  var matrixValues = regex.exec(matrix);

  if (matrixValues) {
    var result = matrixValues[1].split(", ");
    return {
      left: Number(result[4]),
      top: Number(result[5])
    };
  }

  return {
    left: 0,
    top: 0
  };
}
