"use strict";

exports.getScrollBarInfo = getScrollBarInfo;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scrollBarInfoCache = {};

function getScrollBarInfo(useNativeScrolling) {
  if (scrollBarInfoCache[useNativeScrolling]) {
    return scrollBarInfoCache[useNativeScrolling];
  }

  var scrollBarWidth = 0;
  var options = {};
  var container = (0, _renderer.default)('<div>').css({
    position: 'absolute',
    visibility: 'hidden',
    top: -1000,
    left: -1000,
    width: 100,
    height: 100
  }).appendTo('body');
  var content = (0, _renderer.default)('<p>').css({
    width: '100%',
    height: 200
  }).appendTo(container);

  if (useNativeScrolling !== 'auto') {
    options.useNative = !!useNativeScrolling;
    options.useSimulatedScrollbar = !useNativeScrolling;
  }

  container.dxScrollable(options);
  var scrollBarUseNative = container.dxScrollable('instance').option('useNative');
  scrollBarWidth = scrollBarUseNative ? container.width() - content.width() : 0;
  container.remove();
  scrollBarInfoCache[useNativeScrolling] = {
    scrollBarWidth: scrollBarWidth,
    scrollBarUseNative: scrollBarUseNative
  };
  return scrollBarInfoCache[useNativeScrolling];
}