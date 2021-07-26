"use strict";

exports.Scrollbar = exports.ScrollbarPropsType = exports.viewFunction = exports.THUMB_MIN_SIZE = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _widget = require("../common/widget");

var _combine_classes = require("../../utils/combine_classes");

var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));

var _type = require("../../../core/utils/type");

var _index = require("../../../events/utils/index");

var _scrollbar_props = require("./scrollbar_props");

var _consts = require("./common/consts");

var _short = require("../../../events/short");

var _scrollable_simulated_props = require("./scrollable_simulated_props");

var _scrollable_props = require("./scrollable_props");

var _math = require("../../../core/utils/math");

var _excluded = ["activeStateEnabled", "bottomPocketSize", "bounceEnabled", "containerSize", "contentPaddingBottom", "contentSize", "contentTranslateOffsetChange", "direction", "forceGeneratePockets", "forceVisibility", "hoverStateEnabled", "isScrollableHovered", "onAnimatorCancel", "onAnimatorStart", "onEnd", "onLock", "onPullDown", "onReachBottom", "onRelease", "onScroll", "onUnlock", "pocketState", "pocketStateChange", "pullDownEnabled", "reachBottomEnabled", "rtlEnabled", "scrollByThumb", "scrollLocation", "scrollLocationChange", "scrollableOffset", "showScrollbar", "topPocketSize"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var OUT_BOUNDS_ACCELERATION = 0.5;
var THUMB_MIN_SIZE = 15;
exports.THUMB_MIN_SIZE = THUMB_MIN_SIZE;

var viewFunction = function viewFunction(viewModel) {
  var cssClasses = viewModel.cssClasses,
      hoverStateEnabled = viewModel.hoverStateEnabled,
      isVisible = viewModel.isVisible,
      onHoverEnd = viewModel.onHoverEnd,
      onHoverStart = viewModel.onHoverStart,
      activeStateEnabled = viewModel.props.activeStateEnabled,
      scrollRef = viewModel.scrollRef,
      scrollStyles = viewModel.scrollStyles,
      scrollbarRef = viewModel.scrollbarRef;
  return (0, _inferno.createComponentVNode)(2, _widget.Widget, {
    "rootElementRef": scrollbarRef,
    "classes": cssClasses,
    "activeStateEnabled": activeStateEnabled,
    "hoverStateEnabled": hoverStateEnabled,
    "visible": isVisible,
    "onHoverStart": onHoverStart,
    "onHoverEnd": onHoverEnd,
    children: (0, _inferno.createVNode)(1, "div", viewModel.scrollClasses, (0, _inferno.createVNode)(1, "div", _consts.SCROLLABLE_SCROLL_CONTENT_CLASS), 2, {
      "style": (0, _vdom.normalizeStyles)(scrollStyles)
    }, null, scrollRef)
  });
};

exports.viewFunction = viewFunction;
var ScrollbarPropsType = {
  activeStateEnabled: _scrollbar_props.ScrollbarProps.activeStateEnabled,
  containerSize: _scrollbar_props.ScrollbarProps.containerSize,
  contentSize: _scrollbar_props.ScrollbarProps.contentSize,
  topPocketSize: _scrollbar_props.ScrollbarProps.topPocketSize,
  bottomPocketSize: _scrollbar_props.ScrollbarProps.bottomPocketSize,
  contentPaddingBottom: _scrollbar_props.ScrollbarProps.contentPaddingBottom,
  scrollableOffset: _scrollbar_props.ScrollbarProps.scrollableOffset,
  isScrollableHovered: _scrollbar_props.ScrollbarProps.isScrollableHovered,
  forceVisibility: _scrollbar_props.ScrollbarProps.forceVisibility,
  scrollLocation: _scrollbar_props.ScrollbarProps.scrollLocation,
  pocketState: _scrollbar_props.ScrollbarProps.pocketState,
  direction: _scrollable_props.ScrollableProps.direction,
  showScrollbar: _scrollable_props.ScrollableProps.showScrollbar,
  scrollByThumb: _scrollable_props.ScrollableProps.scrollByThumb,
  pullDownEnabled: _scrollable_props.ScrollableProps.pullDownEnabled,
  reachBottomEnabled: _scrollable_props.ScrollableProps.reachBottomEnabled,
  forceGeneratePockets: _scrollable_props.ScrollableProps.forceGeneratePockets,
  bounceEnabled: _scrollable_simulated_props.ScrollableSimulatedProps.bounceEnabled
};
exports.ScrollbarPropsType = ScrollbarPropsType;

var Scrollbar = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(Scrollbar, _InfernoComponent);

  function Scrollbar(props) {
    var _this;

    _this = _InfernoComponent.call(this, props) || this;
    _this.thumbScrolling = false;
    _this.crossThumbScrolling = false;
    _this.initialTopPocketSize = 0;
    _this.rightScrollLocation = 0;
    _this.prevScrollLocation = 0;
    _this.prevContainerSize = 0;
    _this.prevContentSize = 0;
    _this.scrollbarRef = (0, _inferno.createRef)();
    _this.scrollRef = (0, _inferno.createRef)();
    _this.state = {
      wasInit: false,
      onReachBottomWasFiredOnce: false,
      onPullDownWasFiredOnce: false,
      pendingReachBottom: false,
      pendingInertiaAnimator: false,
      pendingBounceAnimator: false,
      pendingPullDown: false,
      pendingRelease: false,
      needRiseEnd: false,
      showOnScrollByWheel: undefined,
      forceAnimationToBottomBound: false,
      hovered: false,
      expanded: false,
      visibility: false,
      isScrolling: false,
      wasScrollComplete: false,
      maxOffset: 0
    };
    _this.pointerDownEffect = _this.pointerDownEffect.bind(_assertThisInitialized(_this));
    _this.pointerUpEffect = _this.pointerUpEffect.bind(_assertThisInitialized(_this));
    _this.isThumb = _this.isThumb.bind(_assertThisInitialized(_this));
    _this.isScrollbar = _this.isScrollbar.bind(_assertThisInitialized(_this));
    _this.validateEvent = _this.validateEvent.bind(_assertThisInitialized(_this));
    _this.getLocationWithinRange = _this.getLocationWithinRange.bind(_assertThisInitialized(_this));
    _this.getMinOffset = _this.getMinOffset.bind(_assertThisInitialized(_this));
    _this.getMaxOffset = _this.getMaxOffset.bind(_assertThisInitialized(_this));
    _this.initHandler = _this.initHandler.bind(_assertThisInitialized(_this));
    _this.startHandler = _this.startHandler.bind(_assertThisInitialized(_this));
    _this.moveHandler = _this.moveHandler.bind(_assertThisInitialized(_this));
    _this.disposeHideScrollbarTimer = _this.disposeHideScrollbarTimer.bind(_assertThisInitialized(_this));
    _this.endHandler = _this.endHandler.bind(_assertThisInitialized(_this));
    _this.stopHandler = _this.stopHandler.bind(_assertThisInitialized(_this));
    _this.scrollByHandler = _this.scrollByHandler.bind(_assertThisInitialized(_this));
    _this.stopScrolling = _this.stopScrolling.bind(_assertThisInitialized(_this));
    _this.stopAnimator = _this.stopAnimator.bind(_assertThisInitialized(_this));
    _this.scrollStep = _this.scrollStep.bind(_assertThisInitialized(_this));
    _this.risePullDown = _this.risePullDown.bind(_assertThisInitialized(_this));
    _this.riseReachBottom = _this.riseReachBottom.bind(_assertThisInitialized(_this));
    _this.riseEnd = _this.riseEnd.bind(_assertThisInitialized(_this));
    _this.bounceAnimatorStart = _this.bounceAnimatorStart.bind(_assertThisInitialized(_this));
    _this.updateMaxOffset = _this.updateMaxOffset.bind(_assertThisInitialized(_this));
    _this.updateLockedState = _this.updateLockedState.bind(_assertThisInitialized(_this));
    _this.updateContentTranslate = _this.updateContentTranslate.bind(_assertThisInitialized(_this));
    _this.moveTo = _this.moveTo.bind(_assertThisInitialized(_this));
    _this.releaseHandler = _this.releaseHandler.bind(_assertThisInitialized(_this));
    _this.moveToBoundaryOnSizeChange = _this.moveToBoundaryOnSizeChange.bind(_assertThisInitialized(_this));
    _this.hide = _this.hide.bind(_assertThisInitialized(_this));
    _this.clearHideScrollbarTimer = _this.clearHideScrollbarTimer.bind(_assertThisInitialized(_this));
    _this.onInertiaAnimatorStart = _this.onInertiaAnimatorStart.bind(_assertThisInitialized(_this));
    _this.onBounceAnimatorStart = _this.onBounceAnimatorStart.bind(_assertThisInitialized(_this));
    _this.startRefreshing = _this.startRefreshing.bind(_assertThisInitialized(_this));
    _this.startLoading = _this.startLoading.bind(_assertThisInitialized(_this));
    _this.resetThumbScrolling = _this.resetThumbScrolling.bind(_assertThisInitialized(_this));
    _this.scrollBy = _this.scrollBy.bind(_assertThisInitialized(_this));
    _this.cancelScrolling = _this.cancelScrolling.bind(_assertThisInitialized(_this));
    _this.onAnimatorCancel = _this.onAnimatorCancel.bind(_assertThisInitialized(_this));
    _this.prepareThumbScrolling = _this.prepareThumbScrolling.bind(_assertThisInitialized(_this));
    _this.moveToMouseLocation = _this.moveToMouseLocation.bind(_assertThisInitialized(_this));
    _this.updateContent = _this.updateContent.bind(_assertThisInitialized(_this));
    _this.onRelease = _this.onRelease.bind(_assertThisInitialized(_this));
    _this.setPocketState = _this.setPocketState.bind(_assertThisInitialized(_this));
    _this.expand = _this.expand.bind(_assertThisInitialized(_this));
    _this.collapse = _this.collapse.bind(_assertThisInitialized(_this));
    _this.onHoverStart = _this.onHoverStart.bind(_assertThisInitialized(_this));
    _this.onHoverEnd = _this.onHoverEnd.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Scrollbar.prototype;

  _proto.createEffects = function createEffects() {
    return [new _vdom.InfernoEffect(this.pointerDownEffect, []), new _vdom.InfernoEffect(this.pointerUpEffect, []), new _vdom.InfernoEffect(this.disposeHideScrollbarTimer, []), new _vdom.InfernoEffect(this.risePullDown, [this.props.forceGeneratePockets, this.state.wasInit, this.state.isScrolling, this.props.scrollLocation, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.contentSize, this.props.bottomPocketSize, this.props.topPocketSize, this.props.contentPaddingBottom, this.props.containerSize, this.state.maxOffset, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.props.pullDownEnabled, this.props.bounceEnabled, this.state.pendingPullDown, this.state.onPullDownWasFiredOnce, this.props.pocketStateChange, this.props.onPullDown]), new _vdom.InfernoEffect(this.riseReachBottom, [this.props.forceGeneratePockets, this.state.wasInit, this.state.isScrolling, this.props.scrollLocation, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.contentSize, this.props.bottomPocketSize, this.props.topPocketSize, this.props.contentPaddingBottom, this.props.containerSize, this.state.maxOffset, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingReachBottom, this.state.onReachBottomWasFiredOnce, this.props.onReachBottom]), new _vdom.InfernoEffect(this.riseEnd, [this.state.isScrolling, this.props.scrollLocation, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.contentSize, this.props.bottomPocketSize, this.props.topPocketSize, this.props.contentPaddingBottom, this.props.containerSize, this.state.maxOffset, this.state.needRiseEnd, this.state.wasScrollComplete, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingReachBottom, this.state.pendingPullDown, this.state.showOnScrollByWheel, this.props.showScrollbar, this.props.onUnlock, this.props.onEnd, this.props.direction]), new _vdom.InfernoEffect(this.bounceAnimatorStart, [this.props.scrollLocation, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.contentSize, this.props.bottomPocketSize, this.props.topPocketSize, this.props.contentPaddingBottom, this.props.containerSize, this.state.maxOffset, this.state.isScrolling, this.state.wasScrollComplete, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingPullDown, this.state.pendingReachBottom, this.props.onAnimatorStart]), new _vdom.InfernoEffect(this.updateMaxOffset, [this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.bounceEnabled, this.props.scrollLocation, this.props.topPocketSize, this.props.pocketStateChange]), new _vdom.InfernoEffect(this.updateLockedState, [this.state.pendingBounceAnimator, this.state.pendingPullDown, this.props.onLock]), new _vdom.InfernoEffect(this.updateContentTranslate, [this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.topPocketSize, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.contentSize, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.containerSize, this.props.contentTranslateOffsetChange, this.props.direction, this.props.scrollLocation]), new _vdom.InfernoEffect(this.moveToBoundaryOnSizeChange, [this.props.contentSize, this.props.containerSize, this.props.scrollLocation, this.state.maxOffset, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.bottomPocketSize, this.props.topPocketSize, this.props.contentPaddingBottom, this.props.direction, this.props.rtlEnabled, this.props.scrollLocationChange, this.props.pullDownEnabled, this.props.contentTranslateOffsetChange, this.props.onScroll])];
  };

  _proto.updateEffects = function updateEffects() {
    var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5, _this$_effects$6, _this$_effects$7, _this$_effects$8, _this$_effects$9, _this$_effects$10;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([]);
    (_this$_effects$3 = this._effects[3]) === null || _this$_effects$3 === void 0 ? void 0 : _this$_effects$3.update([this.props.forceGeneratePockets, this.state.wasInit, this.state.isScrolling, this.props.scrollLocation, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.contentSize, this.props.bottomPocketSize, this.props.topPocketSize, this.props.contentPaddingBottom, this.props.containerSize, this.state.maxOffset, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.props.pullDownEnabled, this.props.bounceEnabled, this.state.pendingPullDown, this.state.onPullDownWasFiredOnce, this.props.pocketStateChange, this.props.onPullDown]);
    (_this$_effects$4 = this._effects[4]) === null || _this$_effects$4 === void 0 ? void 0 : _this$_effects$4.update([this.props.forceGeneratePockets, this.state.wasInit, this.state.isScrolling, this.props.scrollLocation, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.contentSize, this.props.bottomPocketSize, this.props.topPocketSize, this.props.contentPaddingBottom, this.props.containerSize, this.state.maxOffset, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingReachBottom, this.state.onReachBottomWasFiredOnce, this.props.onReachBottom]);
    (_this$_effects$5 = this._effects[5]) === null || _this$_effects$5 === void 0 ? void 0 : _this$_effects$5.update([this.state.isScrolling, this.props.scrollLocation, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.contentSize, this.props.bottomPocketSize, this.props.topPocketSize, this.props.contentPaddingBottom, this.props.containerSize, this.state.maxOffset, this.state.needRiseEnd, this.state.wasScrollComplete, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingReachBottom, this.state.pendingPullDown, this.state.showOnScrollByWheel, this.props.showScrollbar, this.props.onUnlock, this.props.onEnd, this.props.direction]);
    (_this$_effects$6 = this._effects[6]) === null || _this$_effects$6 === void 0 ? void 0 : _this$_effects$6.update([this.props.scrollLocation, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.contentSize, this.props.bottomPocketSize, this.props.topPocketSize, this.props.contentPaddingBottom, this.props.containerSize, this.state.maxOffset, this.state.isScrolling, this.state.wasScrollComplete, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingPullDown, this.state.pendingReachBottom, this.props.onAnimatorStart]);
    (_this$_effects$7 = this._effects[7]) === null || _this$_effects$7 === void 0 ? void 0 : _this$_effects$7.update([this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.bounceEnabled, this.props.scrollLocation, this.props.topPocketSize, this.props.pocketStateChange]);
    (_this$_effects$8 = this._effects[8]) === null || _this$_effects$8 === void 0 ? void 0 : _this$_effects$8.update([this.state.pendingBounceAnimator, this.state.pendingPullDown, this.props.onLock]);
    (_this$_effects$9 = this._effects[9]) === null || _this$_effects$9 === void 0 ? void 0 : _this$_effects$9.update([this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.topPocketSize, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.contentSize, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.containerSize, this.props.contentTranslateOffsetChange, this.props.direction, this.props.scrollLocation]);
    (_this$_effects$10 = this._effects[10]) === null || _this$_effects$10 === void 0 ? void 0 : _this$_effects$10.update([this.props.contentSize, this.props.containerSize, this.props.scrollLocation, this.state.maxOffset, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.bottomPocketSize, this.props.topPocketSize, this.props.contentPaddingBottom, this.props.direction, this.props.rtlEnabled, this.props.scrollLocationChange, this.props.pullDownEnabled, this.props.contentTranslateOffsetChange, this.props.onScroll]);
  };

  _proto.pointerDownEffect = function pointerDownEffect() {
    var _this2 = this;

    var namespace = "dxScrollbar";

    _short.dxPointerDown.on(this.scrollRef.current, function () {
      _this2.expand();
    }, {
      namespace: namespace
    });

    return function () {
      return _short.dxPointerDown.off(_this2.scrollRef.current, {
        namespace: namespace
      });
    };
  };

  _proto.pointerUpEffect = function pointerUpEffect() {
    var _this3 = this;

    var namespace = "dxScrollbar";

    _short.dxPointerUp.on(_dom_adapter.default.getDocument(), function () {
      _this3.collapse();
    }, {
      namespace: namespace
    });

    return function () {
      return _short.dxPointerUp.off(_this3.scrollRef.current, {
        namespace: namespace
      });
    };
  };

  _proto.disposeHideScrollbarTimer = function disposeHideScrollbarTimer() {
    var _this4 = this;

    return function () {
      return _this4.clearHideScrollbarTimer();
    };
  };

  _proto.risePullDown = function risePullDown() {
    if (this.props.forceGeneratePockets && this.state.wasInit && !this.state.isScrolling && this.inRange && !(this.state.pendingBounceAnimator || this.state.pendingInertiaAnimator) && this.isPullDown && !this.state.pendingPullDown && !this.state.onPullDownWasFiredOnce) {
      this.setState(function (state) {
        return _extends({}, state, {
          onPullDownWasFiredOnce: true
        });
      });
      this.startRefreshing();
    }
  };

  _proto.riseReachBottom = function riseReachBottom() {
    if (this.props.forceGeneratePockets && this.state.wasInit && !this.state.isScrolling && this.inRange && !(this.state.pendingBounceAnimator || this.state.pendingInertiaAnimator) && this.isReachBottom && !this.state.pendingReachBottom && !this.state.onReachBottomWasFiredOnce) {
      this.setState(function (state) {
        return _extends({}, state, {
          onReachBottomWasFiredOnce: true
        });
      });
      this.startLoading();
    }
  };

  _proto.riseEnd = function riseEnd() {
    if (!this.state.isScrolling && this.inRange && this.state.needRiseEnd && this.state.wasScrollComplete && !this.state.pendingBounceAnimator && !this.state.pendingInertiaAnimator && !this.state.pendingReachBottom && !this.state.pendingPullDown && this.props.scrollLocation <= 0 && this.props.scrollLocation >= -this.visibleScrollAreaSize) {
      var _this$props$onUnlock, _this$props, _this$props$onEnd, _this$props2;

      this.setState(function (state) {
        return _extends({}, state, {
          wasScrollComplete: false
        });
      });
      this.setState(function (state) {
        return _extends({}, state, {
          forceAnimationToBottomBound: false
        });
      });
      this.setState(function (state) {
        return _extends({}, state, {
          needRiseEnd: false
        });
      });
      this.hide();
      (_this$props$onUnlock = (_this$props = this.props).onUnlock) === null || _this$props$onUnlock === void 0 ? void 0 : _this$props$onUnlock.call(_this$props);
      (_this$props$onEnd = (_this$props2 = this.props).onEnd) === null || _this$props$onEnd === void 0 ? void 0 : _this$props$onEnd.call(_this$props2, this.props.direction);
    }
  };

  _proto.bounceAnimatorStart = function bounceAnimatorStart() {
    if (!this.inRange && !this.state.isScrolling && this.state.wasScrollComplete && !(this.state.pendingBounceAnimator || this.state.pendingInertiaAnimator) && !this.state.pendingPullDown && !this.state.pendingReachBottom) {
      this.setState(function (state) {
        return _extends({}, state, {
          wasScrollComplete: false
        });
      });
      this.onBounceAnimatorStart();
    }
  };

  _proto.updateMaxOffset = function updateMaxOffset() {
    var _this5 = this;

    if (this.props.forceGeneratePockets) {
      if (this.isPullDown) {
        this.setState(function (state) {
          return _extends({}, state, {
            maxOffset: _this5.props.topPocketSize
          });
        });
        this.setPocketState(_consts.TopPocketState.STATE_READY);
      } else {
        this.setState(function (state) {
          return _extends({}, state, {
            maxOffset: 0
          });
        });
        this.setPocketState(_consts.TopPocketState.STATE_RELEASED);
      }
    }
  };

  _proto.updateLockedState = function updateLockedState() {
    if (this.state.pendingBounceAnimator || this.state.pendingPullDown) {
      var _this$props$onLock, _this$props3;

      (_this$props$onLock = (_this$props3 = this.props).onLock) === null || _this$props$onLock === void 0 ? void 0 : _this$props$onLock.call(_this$props3);
    }
  };

  _proto.updateContentTranslate = function updateContentTranslate() {
    if (this.props.forceGeneratePockets && this.props.pullDownEnabled) {
      if (this.initialTopPocketSize !== this.props.topPocketSize) {
        this.updateContent(this.props.scrollLocation);
        this.initialTopPocketSize = this.props.topPocketSize;
      }
    }
  };

  _proto.moveToBoundaryOnSizeChange = function moveToBoundaryOnSizeChange() {
    var contentSizeChanged = this.props.contentSize !== this.prevContentSize;
    var containerSizeChanged = this.props.containerSize !== this.prevContainerSize;

    if (contentSizeChanged || containerSizeChanged) {
      this.prevContentSize = this.props.contentSize;
      this.prevContainerSize = this.props.containerSize;

      if (this.props.scrollLocation <= this.state.maxOffset) {
        var newScrollLocation = this.getLocationWithinRange(this.props.scrollLocation);

        if (this.isHorizontal && this.props.rtlEnabled) {
          newScrollLocation = this.minOffset - this.rightScrollLocation;

          if (newScrollLocation >= 0) {
            newScrollLocation = 0;
          }
        }

        this.moveTo(newScrollLocation);
      }
    }
  };

  _proto.hide = function hide() {
    var _this6 = this;

    this.setState(function (state) {
      return _extends({}, state, {
        visibility: false
      });
    });

    if ((0, _type.isDefined)(this.state.showOnScrollByWheel) && this.props.showScrollbar === "onScroll") {
      this.hideScrollbarTimer = setTimeout(function () {
        _this6.setState(function (state) {
          return _extends({}, state, {
            showOnScrollByWheel: undefined
          });
        });
      }, _consts.HIDE_SCROLLBAR_TIMEOUT);
    }
  };

  _proto.clearHideScrollbarTimer = function clearHideScrollbarTimer() {
    clearTimeout(this.hideScrollbarTimer);
    this.hideScrollbarTimer = undefined;
  };

  _proto.onInertiaAnimatorStart = function onInertiaAnimatorStart(velocity) {
    var _this$props$onAnimato, _this$props4;

    this.setState(function (state) {
      return _extends({}, state, {
        pendingInertiaAnimator: true
      });
    });
    (_this$props$onAnimato = (_this$props4 = this.props).onAnimatorStart) === null || _this$props$onAnimato === void 0 ? void 0 : _this$props$onAnimato.call(_this$props4, "inertia", velocity, this.thumbScrolling, this.crossThumbScrolling);
  };

  _proto.onBounceAnimatorStart = function onBounceAnimatorStart() {
    var _this$props$onAnimato2, _this$props5;

    this.setState(function (state) {
      return _extends({}, state, {
        pendingBounceAnimator: true
      });
    });
    (_this$props$onAnimato2 = (_this$props5 = this.props).onAnimatorStart) === null || _this$props$onAnimato2 === void 0 ? void 0 : _this$props$onAnimato2.call(_this$props5, "bounce");
  };

  _proto.startRefreshing = function startRefreshing() {
    var _this$props$onPullDow, _this$props6;

    this.setState(function (state) {
      return _extends({}, state, {
        maxOffset: 0
      });
    });
    this.setPocketState(_consts.TopPocketState.STATE_REFRESHING);
    this.setState(function (state) {
      return _extends({}, state, {
        pendingPullDown: true
      });
    });
    (_this$props$onPullDow = (_this$props6 = this.props).onPullDown) === null || _this$props$onPullDow === void 0 ? void 0 : _this$props$onPullDow.call(_this$props6);
  };

  _proto.startLoading = function startLoading() {
    var _this$props$onReachBo, _this$props7;

    this.setState(function (state) {
      return _extends({}, state, {
        pendingReachBottom: true
      });
    });
    (_this$props$onReachBo = (_this$props7 = this.props).onReachBottom) === null || _this$props$onReachBo === void 0 ? void 0 : _this$props$onReachBo.call(_this$props7);
  };

  _proto.resetThumbScrolling = function resetThumbScrolling() {
    this.thumbScrolling = false;
    this.crossThumbScrolling = false;
  };

  _proto.scrollBy = function scrollBy(delta) {
    var distance = delta[this.axis];

    if (!this.inRange) {
      distance *= OUT_BOUNDS_ACCELERATION;
    }

    this.scrollStep(distance);
  };

  _proto.cancelScrolling = function cancelScrolling() {
    this.setState(function (state) {
      return _extends({}, state, {
        isScrolling: false
      });
    });
    this.hide();
    this.onAnimatorCancel();
  };

  _proto.onAnimatorCancel = function onAnimatorCancel() {
    var _this$props$onAnimato3, _this$props8;

    this.setState(function (state) {
      return _extends({}, state, {
        pendingBounceAnimator: false
      });
    });
    this.setState(function (state) {
      return _extends({}, state, {
        pendingInertiaAnimator: false
      });
    });
    (_this$props$onAnimato3 = (_this$props8 = this.props).onAnimatorCancel) === null || _this$props$onAnimato3 === void 0 ? void 0 : _this$props$onAnimato3.call(_this$props8);
  };

  _proto.prepareThumbScrolling = function prepareThumbScrolling(event, currentCrossThumbScrolling) {
    if ((0, _index.isDxMouseWheelEvent)(event.originalEvent)) {
      if (this.props.showScrollbar === "onScroll") {
        this.setState(function (state) {
          return _extends({}, state, {
            showOnScrollByWheel: true
          });
        });
      }

      return;
    }

    var target = event.originalEvent.target;
    var scrollbarClicked = this.props.scrollByThumb && this.isScrollbar(target);

    if (scrollbarClicked) {
      this.moveToMouseLocation(event);
    }

    var currentThumbScrolling = scrollbarClicked || this.props.scrollByThumb && this.isThumb(target);
    this.thumbScrolling = currentThumbScrolling;
    this.crossThumbScrolling = !currentThumbScrolling && currentCrossThumbScrolling;

    if (currentThumbScrolling) {
      this.expand();
    }
  };

  _proto.moveToMouseLocation = function moveToMouseLocation(event) {
    var mouseLocation = event["page".concat(this.axis.toUpperCase())] - this.props.scrollableOffset;
    var delta = mouseLocation / this.containerToContentRatio - this.props.containerSize / 2;
    this.setState(function (state) {
      return _extends({}, state, {
        visibility: true
      });
    });
    this.moveTo(Math.round(Math.max(Math.min(-delta, 0), -this.visibleScrollAreaSize)));
  };

  _proto.updateContent = function updateContent(location) {
    var _this$props$contentTr, _this$props9;

    var contentTranslateOffset = Number.NaN;

    if (location > 0) {
      contentTranslateOffset = location;
    } else if (location <= this.minOffset) {
      contentTranslateOffset = location - this.minOffset;
    } else {
      contentTranslateOffset = location % 1;
    }

    this.setState(function (state) {
      return _extends({}, state, {
        wasInit: true
      });
    });

    if (this.props.forceGeneratePockets && this.props.pullDownEnabled) {
      contentTranslateOffset -= this.props.topPocketSize;
    }

    (_this$props$contentTr = (_this$props9 = this.props).contentTranslateOffsetChange) === null || _this$props$contentTr === void 0 ? void 0 : _this$props$contentTr.call(_this$props9, this.scrollProp, contentTranslateOffset);
  };

  _proto.onRelease = function onRelease() {
    var _this$props$onRelease, _this$props10;

    this.setPocketState(_consts.TopPocketState.STATE_RELEASED);
    (_this$props$onRelease = (_this$props10 = this.props).onRelease) === null || _this$props$onRelease === void 0 ? void 0 : _this$props$onRelease.call(_this$props10);
    this.setState(function (state) {
      return _extends({}, state, {
        pendingPullDown: false
      });
    });
    this.setState(function (state) {
      return _extends({}, state, {
        pendingReachBottom: false
      });
    });

    if (this.props.scrollLocation <= -this.visibleScrollAreaSize && this.inRange) {
      this.setState(function (state) {
        return _extends({}, state, {
          forceAnimationToBottomBound: true
        });
      });
    }

    this.stopScrolling();
  };

  _proto.setPocketState = function setPocketState(newState) {
    var _this$props$pocketSta, _this$props11;

    (_this$props$pocketSta = (_this$props11 = this.props).pocketStateChange) === null || _this$props$pocketSta === void 0 ? void 0 : _this$props$pocketSta.call(_this$props11, newState);
  };

  _proto.expand = function expand() {
    this.setState(function (state) {
      return _extends({}, state, {
        expanded: true
      });
    });
  };

  _proto.collapse = function collapse() {
    this.setState(function (state) {
      return _extends({}, state, {
        expanded: false
      });
    });
  };

  _proto.onHoverStart = function onHoverStart() {
    if (this.props.showScrollbar === "onHover") {
      this.setState(function (state) {
        return _extends({}, state, {
          hovered: true
        });
      });
    }
  };

  _proto.onHoverEnd = function onHoverEnd() {
    if (this.props.showScrollbar === "onHover") {
      this.setState(function (state) {
        return _extends({}, state, {
          hovered: false
        });
      });
    }
  };

  _proto.isThumb = function isThumb(element) {
    var _this$scrollbarRef$cu, _this$scrollbarRef$cu2;

    return ((_this$scrollbarRef$cu = this.scrollbarRef.current) === null || _this$scrollbarRef$cu === void 0 ? void 0 : _this$scrollbarRef$cu.querySelector(".".concat(_consts.SCROLLABLE_SCROLL_CLASS))) === element || ((_this$scrollbarRef$cu2 = this.scrollbarRef.current) === null || _this$scrollbarRef$cu2 === void 0 ? void 0 : _this$scrollbarRef$cu2.querySelector(".".concat(_consts.SCROLLABLE_SCROLL_CONTENT_CLASS))) === element;
  };

  _proto.isScrollbar = function isScrollbar(element) {
    return element === this.scrollbarRef.current;
  };

  _proto.validateEvent = function validateEvent(event) {
    var target = event.originalEvent.target;
    return this.isThumb(target) || this.isScrollbar(target);
  };

  _proto.getLocationWithinRange = function getLocationWithinRange(value) {
    return Math.max(Math.min(value, this.state.maxOffset), this.minOffset);
  };

  _proto.getMinOffset = function getMinOffset() {
    return this.minOffset;
  };

  _proto.getMaxOffset = function getMaxOffset() {
    return this.state.maxOffset;
  };

  _proto.initHandler = function initHandler(event, crossThumbScrolling) {
    this.cancelScrolling();
    this.setState(function (state) {
      return _extends({}, state, {
        isScrolling: true
      });
    });
    this.setState(function (state) {
      return _extends({}, state, {
        onReachBottomWasFiredOnce: false
      });
    });
    this.setState(function (state) {
      return _extends({}, state, {
        onPullDownWasFiredOnce: false
      });
    });
    this.prepareThumbScrolling(event, crossThumbScrolling);
  };

  _proto.startHandler = function startHandler() {
    this.setState(function (state) {
      return _extends({}, state, {
        visibility: true
      });
    });
  };

  _proto.moveHandler = function moveHandler(delta) {
    if (this.crossThumbScrolling) {
      return;
    }

    var distance = delta;

    if (this.thumbScrolling) {
      distance[this.axis] = -Math.round(distance[this.axis] / this.containerToContentRatio);
    }

    this.scrollBy(distance);
  };

  _proto.endHandler = function endHandler(velocity, needRiseEnd) {
    this.setState(function (state) {
      return _extends({}, state, {
        needRiseEnd: needRiseEnd
      });
    });
    this.onInertiaAnimatorStart(velocity[this.axis]);
    this.setState(function (state) {
      return _extends({}, state, {
        isScrolling: false
      });
    });
    this.resetThumbScrolling();
  };

  _proto.stopHandler = function stopHandler() {
    if (this.thumbScrolling) {
      this.stopScrolling();
    }

    this.resetThumbScrolling();
  };

  _proto.scrollByHandler = function scrollByHandler(delta) {
    this.scrollBy(delta);
    this.setState(function (state) {
      return _extends({}, state, {
        needRiseEnd: true
      });
    });
    this.stopScrolling();
  };

  _proto.stopScrolling = function stopScrolling() {
    this.setState(function (state) {
      return _extends({}, state, {
        isScrolling: false
      });
    });
    this.setState(function (state) {
      return _extends({}, state, {
        wasScrollComplete: true
      });
    });
  };

  _proto.stopAnimator = function stopAnimator(animator) {
    if (animator === "bounce") {
      this.setState(function (state) {
        return _extends({}, state, {
          pendingBounceAnimator: false
        });
      });
    }

    if (animator === "inertia") {
      this.setState(function (state) {
        return _extends({}, state, {
          pendingInertiaAnimator: false
        });
      });
    }

    this.setState(function (state) {
      return _extends({}, state, {
        wasScrollComplete: true
      });
    });
  };

  _proto.scrollStep = function scrollStep(delta) {
    if (this.props.bounceEnabled) {
      this.moveTo(this.props.scrollLocation + delta);
    } else {
      this.moveTo(this.getLocationWithinRange(this.props.scrollLocation + delta));
    }
  };

  _proto.moveTo = function moveTo(location) {
    var _this$props$scrollLoc, _this$props12;

    var scrollDelta = Math.abs(this.prevScrollLocation - location);
    (_this$props$scrollLoc = (_this$props12 = this.props).scrollLocationChange) === null || _this$props$scrollLoc === void 0 ? void 0 : _this$props$scrollLoc.call(_this$props12, this.fullScrollProp, location);
    this.updateContent(location);

    if (scrollDelta >= 1) {
      var _this$props$onScroll, _this$props13;

      (_this$props$onScroll = (_this$props13 = this.props).onScroll) === null || _this$props$onScroll === void 0 ? void 0 : _this$props$onScroll.call(_this$props13);
    }

    this.prevScrollLocation = location;
    this.rightScrollLocation = this.minOffset - location;
  };

  _proto.releaseHandler = function releaseHandler() {
    this.onRelease();
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      wasInit: this.state.wasInit,
      onReachBottomWasFiredOnce: this.state.onReachBottomWasFiredOnce,
      onPullDownWasFiredOnce: this.state.onPullDownWasFiredOnce,
      pendingReachBottom: this.state.pendingReachBottom,
      pendingInertiaAnimator: this.state.pendingInertiaAnimator,
      pendingBounceAnimator: this.state.pendingBounceAnimator,
      pendingPullDown: this.state.pendingPullDown,
      pendingRelease: this.state.pendingRelease,
      needRiseEnd: this.state.needRiseEnd,
      showOnScrollByWheel: this.state.showOnScrollByWheel,
      forceAnimationToBottomBound: this.state.forceAnimationToBottomBound,
      hovered: this.state.hovered,
      expanded: this.state.expanded,
      visibility: this.state.visibility,
      isScrolling: this.state.isScrolling,
      wasScrollComplete: this.state.wasScrollComplete,
      maxOffset: this.state.maxOffset,
      scrollbarRef: this.scrollbarRef,
      scrollRef: this.scrollRef,
      hide: this.hide,
      inRange: this.inRange,
      axis: this.axis,
      scrollProp: this.scrollProp,
      fullScrollProp: this.fullScrollProp,
      dimension: this.dimension,
      isHorizontal: this.isHorizontal,
      clearHideScrollbarTimer: this.clearHideScrollbarTimer,
      onInertiaAnimatorStart: this.onInertiaAnimatorStart,
      onBounceAnimatorStart: this.onBounceAnimatorStart,
      startRefreshing: this.startRefreshing,
      startLoading: this.startLoading,
      resetThumbScrolling: this.resetThumbScrolling,
      scrollBy: this.scrollBy,
      cancelScrolling: this.cancelScrolling,
      onAnimatorCancel: this.onAnimatorCancel,
      prepareThumbScrolling: this.prepareThumbScrolling,
      moveToMouseLocation: this.moveToMouseLocation,
      updateContent: this.updateContent,
      onRelease: this.onRelease,
      setPocketState: this.setPocketState,
      isPullDown: this.isPullDown,
      isReachBottom: this.isReachBottom,
      visibleContentAreaSize: this.visibleContentAreaSize,
      visibleScrollAreaSize: this.visibleScrollAreaSize,
      minOffset: this.minOffset,
      scrollSize: this.scrollSize,
      scrollRatio: this.scrollRatio,
      containerToContentRatio: this.containerToContentRatio,
      expand: this.expand,
      collapse: this.collapse,
      onHoverStart: this.onHoverStart,
      onHoverEnd: this.onHoverEnd,
      cssClasses: this.cssClasses,
      scrollStyles: this.scrollStyles,
      scrollTransform: this.scrollTransform,
      scrollClasses: this.scrollClasses,
      isVisible: this.isVisible,
      visible: this.visible,
      hoverStateEnabled: this.hoverStateEnabled,
      restAttributes: this.restAttributes
    });
  };

  _createClass(Scrollbar, [{
    key: "inRange",
    get: function get() {
      return (0, _math.inRange)(this.props.scrollLocation, this.minOffset, this.state.maxOffset);
    }
  }, {
    key: "axis",
    get: function get() {
      return this.isHorizontal ? "x" : "y";
    }
  }, {
    key: "scrollProp",
    get: function get() {
      return this.isHorizontal ? "left" : "top";
    }
  }, {
    key: "fullScrollProp",
    get: function get() {
      return this.isHorizontal ? "scrollLeft" : "scrollTop";
    }
  }, {
    key: "dimension",
    get: function get() {
      return this.isHorizontal ? "width" : "height";
    }
  }, {
    key: "isHorizontal",
    get: function get() {
      return this.props.direction === _consts.DIRECTION_HORIZONTAL;
    }
  }, {
    key: "isPullDown",
    get: function get() {
      return this.props.pullDownEnabled && this.props.bounceEnabled && this.props.scrollLocation - this.props.topPocketSize >= 0;
    }
  }, {
    key: "isReachBottom",
    get: function get() {
      return this.props.reachBottomEnabled && this.props.scrollLocation + this.visibleScrollAreaSize <= 0.5;
    }
  }, {
    key: "visibleContentAreaSize",
    get: function get() {
      var size = this.props.contentSize - this.props.bottomPocketSize - this.props.topPocketSize;

      if (this.props.forceGeneratePockets && this.props.reachBottomEnabled) {
        return Math.max(size - this.props.contentPaddingBottom, 0);
      }

      return Math.max(size, 0);
    }
  }, {
    key: "visibleScrollAreaSize",
    get: function get() {
      return Math.max(this.visibleContentAreaSize - this.props.containerSize, 0);
    }
  }, {
    key: "minOffset",
    get: function get() {
      if (this.props.forceGeneratePockets && this.props.reachBottomEnabled && !this.state.forceAnimationToBottomBound) {
        return -Math.max(this.visibleScrollAreaSize + this.props.bottomPocketSize + this.props.contentPaddingBottom, 0);
      }

      return -Math.max(this.visibleScrollAreaSize, 0);
    }
  }, {
    key: "scrollSize",
    get: function get() {
      return Math.max(this.props.containerSize * this.containerToContentRatio, THUMB_MIN_SIZE);
    }
  }, {
    key: "scrollRatio",
    get: function get() {
      if (this.visibleScrollAreaSize) {
        return (this.props.containerSize - this.scrollSize) / this.visibleScrollAreaSize;
      }

      return 1;
    }
  }, {
    key: "containerToContentRatio",
    get: function get() {
      return this.visibleContentAreaSize ? this.props.containerSize / this.visibleContentAreaSize : this.props.containerSize;
    }
  }, {
    key: "cssClasses",
    get: function get() {
      var _classesMap;

      var direction = this.props.direction;
      var classesMap = (_classesMap = {}, _defineProperty(_classesMap, _consts.SCROLLABLE_SCROLLBAR_CLASS, true), _defineProperty(_classesMap, "dx-scrollbar-".concat(direction), true), _defineProperty(_classesMap, _consts.SCROLLABLE_SCROLLBAR_ACTIVE_CLASS, !!this.state.expanded), _defineProperty(_classesMap, _consts.HOVER_ENABLED_STATE, !!this.hoverStateEnabled), _classesMap);
      return (0, _combine_classes.combineClasses)(classesMap);
    }
  }, {
    key: "scrollStyles",
    get: function get() {
      var _ref;

      return _ref = {}, _defineProperty(_ref, this.dimension, this.scrollSize || THUMB_MIN_SIZE), _defineProperty(_ref, "transform", this.scrollTransform), _ref;
    }
  }, {
    key: "scrollTransform",
    get: function get() {
      if (this.props.showScrollbar === "never") {
        return "none";
      }

      var translateValue = -this.props.scrollLocation * this.scrollRatio;

      if (this.isHorizontal) {
        return "translate(".concat(translateValue, "px, 0px)");
      }

      return "translate(0px, ".concat(translateValue, "px)");
    }
  }, {
    key: "scrollClasses",
    get: function get() {
      var _combineClasses;

      return (0, _combine_classes.combineClasses)((_combineClasses = {}, _defineProperty(_combineClasses, _consts.SCROLLABLE_SCROLL_CLASS, true), _defineProperty(_combineClasses, "dx-state-invisible", !this.visible), _combineClasses));
    }
  }, {
    key: "isVisible",
    get: function get() {
      return this.props.showScrollbar !== "never" && this.containerToContentRatio < 1 && this.props.containerSize > 15;
    }
  }, {
    key: "visible",
    get: function get() {
      var _this$props14 = this.props,
          forceVisibility = _this$props14.forceVisibility,
          showScrollbar = _this$props14.showScrollbar;

      if (!this.isVisible) {
        return false;
      }

      if (showScrollbar === "onHover") {
        return this.state.visibility || this.props.isScrollableHovered || this.state.hovered;
      }

      if (showScrollbar === "always") {
        return true;
      }

      return forceVisibility || this.state.visibility || !!this.state.showOnScrollByWheel;
    }
  }, {
    key: "hoverStateEnabled",
    get: function get() {
      var _this$props15 = this.props,
          scrollByThumb = _this$props15.scrollByThumb,
          showScrollbar = _this$props15.showScrollbar;
      return (showScrollbar === "onHover" || showScrollbar === "always") && scrollByThumb;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props16 = this.props,
          activeStateEnabled = _this$props16.activeStateEnabled,
          bottomPocketSize = _this$props16.bottomPocketSize,
          bounceEnabled = _this$props16.bounceEnabled,
          containerSize = _this$props16.containerSize,
          contentPaddingBottom = _this$props16.contentPaddingBottom,
          contentSize = _this$props16.contentSize,
          contentTranslateOffsetChange = _this$props16.contentTranslateOffsetChange,
          direction = _this$props16.direction,
          forceGeneratePockets = _this$props16.forceGeneratePockets,
          forceVisibility = _this$props16.forceVisibility,
          hoverStateEnabled = _this$props16.hoverStateEnabled,
          isScrollableHovered = _this$props16.isScrollableHovered,
          onAnimatorCancel = _this$props16.onAnimatorCancel,
          onAnimatorStart = _this$props16.onAnimatorStart,
          onEnd = _this$props16.onEnd,
          onLock = _this$props16.onLock,
          onPullDown = _this$props16.onPullDown,
          onReachBottom = _this$props16.onReachBottom,
          onRelease = _this$props16.onRelease,
          onScroll = _this$props16.onScroll,
          onUnlock = _this$props16.onUnlock,
          pocketState = _this$props16.pocketState,
          pocketStateChange = _this$props16.pocketStateChange,
          pullDownEnabled = _this$props16.pullDownEnabled,
          reachBottomEnabled = _this$props16.reachBottomEnabled,
          rtlEnabled = _this$props16.rtlEnabled,
          scrollByThumb = _this$props16.scrollByThumb,
          scrollLocation = _this$props16.scrollLocation,
          scrollLocationChange = _this$props16.scrollLocationChange,
          scrollableOffset = _this$props16.scrollableOffset,
          showScrollbar = _this$props16.showScrollbar,
          topPocketSize = _this$props16.topPocketSize,
          restProps = _objectWithoutProperties(_this$props16, _excluded);

      return restProps;
    }
  }]);

  return Scrollbar;
}(_vdom.InfernoComponent);

exports.Scrollbar = Scrollbar;
Scrollbar.defaultProps = _extends({}, ScrollbarPropsType);