/**
* DevExtreme (cjs/ui/overlay/resize_observer.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;

var _window = require("../../core/utils/window");

var window = (0, _window.getWindow)();

var ResizeObserver = /*#__PURE__*/function () {
  function ResizeObserver(options) {
    var _this = this;

    if (!(0, _window.hasWindow)()) {
      return;
    }

    this._observer = new window.ResizeObserver(function () {
      var _options$shouldSkipCa;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var shouldSkip = ((_options$shouldSkipCa = options.shouldSkipCallback) === null || _options$shouldSkipCa === void 0 ? void 0 : _options$shouldSkipCa.call.apply(_options$shouldSkipCa, [options].concat(args))) || _this._shouldSkipNextResize;

      if (!shouldSkip) {
        options.callback.apply(options, args);
      }

      _this._shouldSkipNextResize = false;
    });
  }

  var _proto = ResizeObserver.prototype;

  _proto.skipNextResize = function skipNextResize() {
    this._shouldSkipNextResize = true;
  };

  _proto.observe = function observe(element) {
    var _this$_observer;

    (_this$_observer = this._observer) === null || _this$_observer === void 0 ? void 0 : _this$_observer.observe(element);
  };

  _proto.unobserve = function unobserve(element) {
    var _this$_observer2;

    (_this$_observer2 = this._observer) === null || _this$_observer2 === void 0 ? void 0 : _this$_observer2.unobserve(element);
  };

  _proto.disconnect = function disconnect() {
    var _this$_observer3;

    (_this$_observer3 = this._observer) === null || _this$_observer3 === void 0 ? void 0 : _this$_observer3.disconnect();
  };

  return ResizeObserver;
}();

var _default = ResizeObserver;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
