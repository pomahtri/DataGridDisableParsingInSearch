/**
* DevExtreme (esm/ui/pivot_grid/utils/get_scrollbar_info.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
var scrollBarInfoCache = {};
export function getScrollBarInfo(useNativeScrolling) {
  if (scrollBarInfoCache[useNativeScrolling]) {
    return scrollBarInfoCache[useNativeScrolling];
  }

  var scrollBarWidth = 0;
  var options = {};
  var container = $('<div>').css({
    position: 'absolute',
    visibility: 'hidden',
    top: -1000,
    left: -1000,
    width: 100,
    height: 100
  }).appendTo('body');
  var content = $('<p>').css({
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
