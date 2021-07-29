import { getWindow, hasWindow } from '../../core/utils/window';
var window = getWindow();

class ResizeObserver {
  constructor(options) {
    if (!hasWindow()) {
      return;
    }

    this._observer = new window.ResizeObserver(function () {
      var _options$shouldSkipCa;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var shouldSkip = (_options$shouldSkipCa = options.shouldSkipCallback) === null || _options$shouldSkipCa === void 0 ? void 0 : _options$shouldSkipCa.call(options, ...args);

      if (!shouldSkip) {
        options.callback(...args);
      }
    });
  }

  observe(element) {
    var _this$_observer;

    (_this$_observer = this._observer) === null || _this$_observer === void 0 ? void 0 : _this$_observer.observe(element);
  }

  unobserve(element) {
    var _this$_observer2;

    (_this$_observer2 = this._observer) === null || _this$_observer2 === void 0 ? void 0 : _this$_observer2.unobserve(element);
  }

  disconnect() {
    var _this$_observer3;

    (_this$_observer3 = this._observer) === null || _this$_observer3 === void 0 ? void 0 : _this$_observer3.disconnect();
  }

}

export default ResizeObserver;