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