"use strict";

exports.ScrollbarProps = void 0;

var _consts = require("./common/consts");

var ScrollbarProps = {
  activeStateEnabled: false,
  containerSize: 0,
  contentSize: 0,
  topPocketSize: 0,
  bottomPocketSize: 0,
  contentPaddingBottom: 0,
  scrollableOffset: 0,
  isScrollableHovered: false,
  forceVisibility: false,
  scrollLocation: 0,
  pocketState: _consts.TopPocketState.STATE_RELEASED
};
exports.ScrollbarProps = ScrollbarProps;