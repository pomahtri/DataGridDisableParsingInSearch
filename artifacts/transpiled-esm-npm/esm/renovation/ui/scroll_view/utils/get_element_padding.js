import { getElementComputedStyle } from "./get_element_computed_style";
import { toNumber } from "../../../utils/type_conversion";
export function getElementPaddingBottom(element) {
  return toNumber(getElementComputedStyle(element).paddingBottom);
}