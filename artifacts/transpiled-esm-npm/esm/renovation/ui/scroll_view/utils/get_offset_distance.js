import { ensureDefined } from "../../../../core/utils/common";
import { convertToLocation } from "./convert_location";
export function getOffsetDistance(targetLocation, direction, scrollOffset) {
  var location = convertToLocation(targetLocation, direction);
  var top = -scrollOffset.top - ensureDefined(location.top, -scrollOffset.top);
  var left = -scrollOffset.left - ensureDefined(location.left, -scrollOffset.left);
  return {
    top,
    left
  };
}