/**
* DevExtreme (esm/renovation/ui/scroll_view/utils/get_offset_distance.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
