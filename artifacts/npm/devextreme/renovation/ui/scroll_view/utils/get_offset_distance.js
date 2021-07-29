/**
* DevExtreme (renovation/ui/scroll_view/utils/get_offset_distance.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getOffsetDistance = getOffsetDistance;

var _common = require("../../../../core/utils/common");

var _convert_location = require("./convert_location");

function getOffsetDistance(targetLocation, direction, scrollOffset) {
  var location = (0, _convert_location.convertToLocation)(targetLocation, direction);
  var top = -scrollOffset.top - (0, _common.ensureDefined)(location.top, -scrollOffset.top);
  var left = -scrollOffset.left - (0, _common.ensureDefined)(location.left, -scrollOffset.left);
  return {
    top: top,
    left: left
  };
}
