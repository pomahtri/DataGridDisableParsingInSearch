"use strict";

exports.getTranslateValues = getTranslateValues;

var _get_element_computed_style = require("./get_element_computed_style");

function getTranslateValues(element) {
  var _getElementComputedSt;

  if (!element) return {
    left: 0,
    top: 0
  };
  var matrix = (_getElementComputedSt = (0, _get_element_computed_style.getElementComputedStyle)(element).transform) !== null && _getElementComputedSt !== void 0 ? _getElementComputedSt : "";
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