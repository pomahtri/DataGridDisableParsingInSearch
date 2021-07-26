/**
* DevExtreme (esm/renovation/ui/scroll_view/scrollbar.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["activeStateEnabled", "bottomPocketSize", "bounceEnabled", "containerSize", "contentPaddingBottom", "contentSize", "contentTranslateOffsetChange", "direction", "forceGeneratePockets", "forceVisibility", "hoverStateEnabled", "isScrollableHovered", "onAnimatorCancel", "onAnimatorStart", "onEnd", "onLock", "onPullDown", "onReachBottom", "onRelease", "onScroll", "onUnlock", "pocketState", "pocketStateChange", "pullDownEnabled", "reachBottomEnabled", "rtlEnabled", "scrollByThumb", "scrollLocation", "scrollLocationChange", "scrollableOffset", "showScrollbar", "topPocketSize"];
import { createVNode, createComponentVNode } from "inferno";
import { InfernoEffect, InfernoComponent, normalizeStyles } from "@devextreme/vdom";
import { Widget } from "../common/widget";
import { combineClasses } from "../../utils/combine_classes";
import domAdapter from "../../../core/dom_adapter";
import { isDefined } from "../../../core/utils/type";
import { isDxMouseWheelEvent } from "../../../events/utils/index";
import { ScrollbarProps } from "./scrollbar_props";
import { DIRECTION_HORIZONTAL, SCROLLABLE_SCROLLBAR_CLASS, TopPocketState, SCROLLABLE_SCROLL_CLASS, SCROLLABLE_SCROLL_CONTENT_CLASS, HIDE_SCROLLBAR_TIMEOUT, SCROLLABLE_SCROLLBAR_ACTIVE_CLASS, HOVER_ENABLED_STATE } from "./common/consts";
import { dxPointerDown, dxPointerUp } from "../../../events/short";
import { ScrollableSimulatedProps } from "./scrollable_simulated_props";
import { ScrollableProps } from "./scrollable_props";
import { inRange } from "../../../core/utils/math";
var OUT_BOUNDS_ACCELERATION = 0.5;
export var THUMB_MIN_SIZE = 15;
export var viewFunction = viewModel => {
  var {
    cssClasses,
    hoverStateEnabled,
    isVisible,
    onHoverEnd,
    onHoverStart,
    props: {
      activeStateEnabled
    },
    scrollRef,
    scrollStyles,
    scrollbarRef
  } = viewModel;
  return createComponentVNode(2, Widget, {
    "rootElementRef": scrollbarRef,
    "classes": cssClasses,
    "activeStateEnabled": activeStateEnabled,
    "hoverStateEnabled": hoverStateEnabled,
    "visible": isVisible,
    "onHoverStart": onHoverStart,
    "onHoverEnd": onHoverEnd,
    children: createVNode(1, "div", viewModel.scrollClasses, createVNode(1, "div", SCROLLABLE_SCROLL_CONTENT_CLASS), 2, {
      "style": normalizeStyles(scrollStyles)
    }, null, scrollRef)
  });
};
export var ScrollbarPropsType = {
  activeStateEnabled: ScrollbarProps.activeStateEnabled,
  containerSize: ScrollbarProps.containerSize,
  contentSize: ScrollbarProps.contentSize,
  topPocketSize: ScrollbarProps.topPocketSize,
  bottomPocketSize: ScrollbarProps.bottomPocketSize,
  contentPaddingBottom: ScrollbarProps.contentPaddingBottom,
  scrollableOffset: ScrollbarProps.scrollableOffset,
  isScrollableHovered: ScrollbarProps.isScrollableHovered,
  forceVisibility: ScrollbarProps.forceVisibility,
  scrollLocation: ScrollbarProps.scrollLocation,
  pocketState: ScrollbarProps.pocketState,
  direction: ScrollableProps.direction,
  showScrollbar: ScrollableProps.showScrollbar,
  scrollByThumb: ScrollableProps.scrollByThumb,
  pullDownEnabled: ScrollableProps.pullDownEnabled,
  reachBottomEnabled: ScrollableProps.reachBottomEnabled,
  forceGeneratePockets: ScrollableProps.forceGeneratePockets,
  bounceEnabled: ScrollableSimulatedProps.bounceEnabled
};
import { createRef as infernoCreateRef } from "inferno";
export class Scrollbar extends InfernoComponent {
  constructor(props) {
    super(props);
    this.thumbScrolling = false;
    this.crossThumbScrolling = false;
    this.initialTopPocketSize = 0;
    this.rightScrollLocation = 0;
    this.prevScrollLocation = 0;
    this.prevContainerSize = 0;
    this.prevContentSize = 0;
    this.scrollbarRef = infernoCreateRef();
    this.scrollRef = infernoCreateRef();
    this.state = {
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
    this.pointerDownEffect = this.pointerDownEffect.bind(this);
    this.pointerUpEffect = this.pointerUpEffect.bind(this);
    this.isThumb = this.isThumb.bind(this);
    this.isScrollbar = this.isScrollbar.bind(this);
    this.validateEvent = this.validateEvent.bind(this);
    this.getLocationWithinRange = this.getLocationWithinRange.bind(this);
    this.getMinOffset = this.getMinOffset.bind(this);
    this.getMaxOffset = this.getMaxOffset.bind(this);
    this.initHandler = this.initHandler.bind(this);
    this.startHandler = this.startHandler.bind(this);
    this.moveHandler = this.moveHandler.bind(this);
    this.disposeHideScrollbarTimer = this.disposeHideScrollbarTimer.bind(this);
    this.endHandler = this.endHandler.bind(this);
    this.stopHandler = this.stopHandler.bind(this);
    this.scrollByHandler = this.scrollByHandler.bind(this);
    this.stopScrolling = this.stopScrolling.bind(this);
    this.stopAnimator = this.stopAnimator.bind(this);
    this.scrollStep = this.scrollStep.bind(this);
    this.risePullDown = this.risePullDown.bind(this);
    this.riseReachBottom = this.riseReachBottom.bind(this);
    this.riseEnd = this.riseEnd.bind(this);
    this.bounceAnimatorStart = this.bounceAnimatorStart.bind(this);
    this.updateMaxOffset = this.updateMaxOffset.bind(this);
    this.updateLockedState = this.updateLockedState.bind(this);
    this.updateContentTranslate = this.updateContentTranslate.bind(this);
    this.moveTo = this.moveTo.bind(this);
    this.releaseHandler = this.releaseHandler.bind(this);
    this.moveToBoundaryOnSizeChange = this.moveToBoundaryOnSizeChange.bind(this);
    this.hide = this.hide.bind(this);
    this.clearHideScrollbarTimer = this.clearHideScrollbarTimer.bind(this);
    this.onInertiaAnimatorStart = this.onInertiaAnimatorStart.bind(this);
    this.onBounceAnimatorStart = this.onBounceAnimatorStart.bind(this);
    this.startRefreshing = this.startRefreshing.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.resetThumbScrolling = this.resetThumbScrolling.bind(this);
    this.scrollBy = this.scrollBy.bind(this);
    this.cancelScrolling = this.cancelScrolling.bind(this);
    this.onAnimatorCancel = this.onAnimatorCancel.bind(this);
    this.prepareThumbScrolling = this.prepareThumbScrolling.bind(this);
    this.moveToMouseLocation = this.moveToMouseLocation.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.onRelease = this.onRelease.bind(this);
    this.setPocketState = this.setPocketState.bind(this);
    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);
    this.onHoverStart = this.onHoverStart.bind(this);
    this.onHoverEnd = this.onHoverEnd.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.pointerDownEffect, []), new InfernoEffect(this.pointerUpEffect, []), new InfernoEffect(this.disposeHideScrollbarTimer, []), new InfernoEffect(this.risePullDown, [this.props.forceGeneratePockets, this.state.wasInit, this.state.isScrolling, this.props.scrollLocation, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.contentSize, this.props.bottomPocketSize, this.props.topPocketSize, this.props.contentPaddingBottom, this.props.containerSize, this.state.maxOffset, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.props.pullDownEnabled, this.props.bounceEnabled, this.state.pendingPullDown, this.state.onPullDownWasFiredOnce, this.props.pocketStateChange, this.props.onPullDown]), new InfernoEffect(this.riseReachBottom, [this.props.forceGeneratePockets, this.state.wasInit, this.state.isScrolling, this.props.scrollLocation, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.contentSize, this.props.bottomPocketSize, this.props.topPocketSize, this.props.contentPaddingBottom, this.props.containerSize, this.state.maxOffset, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingReachBottom, this.state.onReachBottomWasFiredOnce, this.props.onReachBottom]), new InfernoEffect(this.riseEnd, [this.state.isScrolling, this.props.scrollLocation, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.contentSize, this.props.bottomPocketSize, this.props.topPocketSize, this.props.contentPaddingBottom, this.props.containerSize, this.state.maxOffset, this.state.needRiseEnd, this.state.wasScrollComplete, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingReachBottom, this.state.pendingPullDown, this.state.showOnScrollByWheel, this.props.showScrollbar, this.props.onUnlock, this.props.onEnd, this.props.direction]), new InfernoEffect(this.bounceAnimatorStart, [this.props.scrollLocation, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.contentSize, this.props.bottomPocketSize, this.props.topPocketSize, this.props.contentPaddingBottom, this.props.containerSize, this.state.maxOffset, this.state.isScrolling, this.state.wasScrollComplete, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingPullDown, this.state.pendingReachBottom, this.props.onAnimatorStart]), new InfernoEffect(this.updateMaxOffset, [this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.bounceEnabled, this.props.scrollLocation, this.props.topPocketSize, this.props.pocketStateChange]), new InfernoEffect(this.updateLockedState, [this.state.pendingBounceAnimator, this.state.pendingPullDown, this.props.onLock]), new InfernoEffect(this.updateContentTranslate, [this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.topPocketSize, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.contentSize, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.containerSize, this.props.contentTranslateOffsetChange, this.props.direction, this.props.scrollLocation]), new InfernoEffect(this.moveToBoundaryOnSizeChange, [this.props.contentSize, this.props.containerSize, this.props.scrollLocation, this.state.maxOffset, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.bottomPocketSize, this.props.topPocketSize, this.props.contentPaddingBottom, this.props.direction, this.props.rtlEnabled, this.props.scrollLocationChange, this.props.pullDownEnabled, this.props.contentTranslateOffsetChange, this.props.onScroll])];
  }

  updateEffects() {
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
  }

  pointerDownEffect() {
    var namespace = "dxScrollbar";
    dxPointerDown.on(this.scrollRef.current, () => {
      this.expand();
    }, {
      namespace
    });
    return () => dxPointerDown.off(this.scrollRef.current, {
      namespace
    });
  }

  pointerUpEffect() {
    var namespace = "dxScrollbar";
    dxPointerUp.on(domAdapter.getDocument(), () => {
      this.collapse();
    }, {
      namespace
    });
    return () => dxPointerUp.off(this.scrollRef.current, {
      namespace
    });
  }

  disposeHideScrollbarTimer() {
    return () => this.clearHideScrollbarTimer();
  }

  risePullDown() {
    if (this.props.forceGeneratePockets && this.state.wasInit && !this.state.isScrolling && this.inRange && !(this.state.pendingBounceAnimator || this.state.pendingInertiaAnimator) && this.isPullDown && !this.state.pendingPullDown && !this.state.onPullDownWasFiredOnce) {
      this.setState(state => _extends({}, state, {
        onPullDownWasFiredOnce: true
      }));
      this.startRefreshing();
    }
  }

  riseReachBottom() {
    if (this.props.forceGeneratePockets && this.state.wasInit && !this.state.isScrolling && this.inRange && !(this.state.pendingBounceAnimator || this.state.pendingInertiaAnimator) && this.isReachBottom && !this.state.pendingReachBottom && !this.state.onReachBottomWasFiredOnce) {
      this.setState(state => _extends({}, state, {
        onReachBottomWasFiredOnce: true
      }));
      this.startLoading();
    }
  }

  riseEnd() {
    if (!this.state.isScrolling && this.inRange && this.state.needRiseEnd && this.state.wasScrollComplete && !this.state.pendingBounceAnimator && !this.state.pendingInertiaAnimator && !this.state.pendingReachBottom && !this.state.pendingPullDown && this.props.scrollLocation <= 0 && this.props.scrollLocation >= -this.visibleScrollAreaSize) {
      var _this$props$onUnlock, _this$props, _this$props$onEnd, _this$props2;

      this.setState(state => _extends({}, state, {
        wasScrollComplete: false
      }));
      this.setState(state => _extends({}, state, {
        forceAnimationToBottomBound: false
      }));
      this.setState(state => _extends({}, state, {
        needRiseEnd: false
      }));
      this.hide();
      (_this$props$onUnlock = (_this$props = this.props).onUnlock) === null || _this$props$onUnlock === void 0 ? void 0 : _this$props$onUnlock.call(_this$props);
      (_this$props$onEnd = (_this$props2 = this.props).onEnd) === null || _this$props$onEnd === void 0 ? void 0 : _this$props$onEnd.call(_this$props2, this.props.direction);
    }
  }

  bounceAnimatorStart() {
    if (!this.inRange && !this.state.isScrolling && this.state.wasScrollComplete && !(this.state.pendingBounceAnimator || this.state.pendingInertiaAnimator) && !this.state.pendingPullDown && !this.state.pendingReachBottom) {
      this.setState(state => _extends({}, state, {
        wasScrollComplete: false
      }));
      this.onBounceAnimatorStart();
    }
  }

  updateMaxOffset() {
    if (this.props.forceGeneratePockets) {
      if (this.isPullDown) {
        this.setState(state => _extends({}, state, {
          maxOffset: this.props.topPocketSize
        }));
        this.setPocketState(TopPocketState.STATE_READY);
      } else {
        this.setState(state => _extends({}, state, {
          maxOffset: 0
        }));
        this.setPocketState(TopPocketState.STATE_RELEASED);
      }
    }
  }

  updateLockedState() {
    if (this.state.pendingBounceAnimator || this.state.pendingPullDown) {
      var _this$props$onLock, _this$props3;

      (_this$props$onLock = (_this$props3 = this.props).onLock) === null || _this$props$onLock === void 0 ? void 0 : _this$props$onLock.call(_this$props3);
    }
  }

  updateContentTranslate() {
    if (this.props.forceGeneratePockets && this.props.pullDownEnabled) {
      if (this.initialTopPocketSize !== this.props.topPocketSize) {
        this.updateContent(this.props.scrollLocation);
        this.initialTopPocketSize = this.props.topPocketSize;
      }
    }
  }

  moveToBoundaryOnSizeChange() {
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
  }

  hide() {
    this.setState(state => _extends({}, state, {
      visibility: false
    }));

    if (isDefined(this.state.showOnScrollByWheel) && this.props.showScrollbar === "onScroll") {
      this.hideScrollbarTimer = setTimeout(() => {
        this.setState(state => _extends({}, state, {
          showOnScrollByWheel: undefined
        }));
      }, HIDE_SCROLLBAR_TIMEOUT);
    }
  }

  get inRange() {
    return inRange(this.props.scrollLocation, this.minOffset, this.state.maxOffset);
  }

  get axis() {
    return this.isHorizontal ? "x" : "y";
  }

  get scrollProp() {
    return this.isHorizontal ? "left" : "top";
  }

  get fullScrollProp() {
    return this.isHorizontal ? "scrollLeft" : "scrollTop";
  }

  get dimension() {
    return this.isHorizontal ? "width" : "height";
  }

  get isHorizontal() {
    return this.props.direction === DIRECTION_HORIZONTAL;
  }

  clearHideScrollbarTimer() {
    clearTimeout(this.hideScrollbarTimer);
    this.hideScrollbarTimer = undefined;
  }

  onInertiaAnimatorStart(velocity) {
    var _this$props$onAnimato, _this$props4;

    this.setState(state => _extends({}, state, {
      pendingInertiaAnimator: true
    }));
    (_this$props$onAnimato = (_this$props4 = this.props).onAnimatorStart) === null || _this$props$onAnimato === void 0 ? void 0 : _this$props$onAnimato.call(_this$props4, "inertia", velocity, this.thumbScrolling, this.crossThumbScrolling);
  }

  onBounceAnimatorStart() {
    var _this$props$onAnimato2, _this$props5;

    this.setState(state => _extends({}, state, {
      pendingBounceAnimator: true
    }));
    (_this$props$onAnimato2 = (_this$props5 = this.props).onAnimatorStart) === null || _this$props$onAnimato2 === void 0 ? void 0 : _this$props$onAnimato2.call(_this$props5, "bounce");
  }

  startRefreshing() {
    var _this$props$onPullDow, _this$props6;

    this.setState(state => _extends({}, state, {
      maxOffset: 0
    }));
    this.setPocketState(TopPocketState.STATE_REFRESHING);
    this.setState(state => _extends({}, state, {
      pendingPullDown: true
    }));
    (_this$props$onPullDow = (_this$props6 = this.props).onPullDown) === null || _this$props$onPullDow === void 0 ? void 0 : _this$props$onPullDow.call(_this$props6);
  }

  startLoading() {
    var _this$props$onReachBo, _this$props7;

    this.setState(state => _extends({}, state, {
      pendingReachBottom: true
    }));
    (_this$props$onReachBo = (_this$props7 = this.props).onReachBottom) === null || _this$props$onReachBo === void 0 ? void 0 : _this$props$onReachBo.call(_this$props7);
  }

  resetThumbScrolling() {
    this.thumbScrolling = false;
    this.crossThumbScrolling = false;
  }

  scrollBy(delta) {
    var distance = delta[this.axis];

    if (!this.inRange) {
      distance *= OUT_BOUNDS_ACCELERATION;
    }

    this.scrollStep(distance);
  }

  cancelScrolling() {
    this.setState(state => _extends({}, state, {
      isScrolling: false
    }));
    this.hide();
    this.onAnimatorCancel();
  }

  onAnimatorCancel() {
    var _this$props$onAnimato3, _this$props8;

    this.setState(state => _extends({}, state, {
      pendingBounceAnimator: false
    }));
    this.setState(state => _extends({}, state, {
      pendingInertiaAnimator: false
    }));
    (_this$props$onAnimato3 = (_this$props8 = this.props).onAnimatorCancel) === null || _this$props$onAnimato3 === void 0 ? void 0 : _this$props$onAnimato3.call(_this$props8);
  }

  prepareThumbScrolling(event, currentCrossThumbScrolling) {
    if (isDxMouseWheelEvent(event.originalEvent)) {
      if (this.props.showScrollbar === "onScroll") {
        this.setState(state => _extends({}, state, {
          showOnScrollByWheel: true
        }));
      }

      return;
    }

    var {
      target
    } = event.originalEvent;
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
  }

  moveToMouseLocation(event) {
    var mouseLocation = event["page".concat(this.axis.toUpperCase())] - this.props.scrollableOffset;
    var delta = mouseLocation / this.containerToContentRatio - this.props.containerSize / 2;
    this.setState(state => _extends({}, state, {
      visibility: true
    }));
    this.moveTo(Math.round(Math.max(Math.min(-delta, 0), -this.visibleScrollAreaSize)));
  }

  updateContent(location) {
    var _this$props$contentTr, _this$props9;

    var contentTranslateOffset = Number.NaN;

    if (location > 0) {
      contentTranslateOffset = location;
    } else if (location <= this.minOffset) {
      contentTranslateOffset = location - this.minOffset;
    } else {
      contentTranslateOffset = location % 1;
    }

    this.setState(state => _extends({}, state, {
      wasInit: true
    }));

    if (this.props.forceGeneratePockets && this.props.pullDownEnabled) {
      contentTranslateOffset -= this.props.topPocketSize;
    }

    (_this$props$contentTr = (_this$props9 = this.props).contentTranslateOffsetChange) === null || _this$props$contentTr === void 0 ? void 0 : _this$props$contentTr.call(_this$props9, this.scrollProp, contentTranslateOffset);
  }

  onRelease() {
    var _this$props$onRelease, _this$props10;

    this.setPocketState(TopPocketState.STATE_RELEASED);
    (_this$props$onRelease = (_this$props10 = this.props).onRelease) === null || _this$props$onRelease === void 0 ? void 0 : _this$props$onRelease.call(_this$props10);
    this.setState(state => _extends({}, state, {
      pendingPullDown: false
    }));
    this.setState(state => _extends({}, state, {
      pendingReachBottom: false
    }));

    if (this.props.scrollLocation <= -this.visibleScrollAreaSize && this.inRange) {
      this.setState(state => _extends({}, state, {
        forceAnimationToBottomBound: true
      }));
    }

    this.stopScrolling();
  }

  setPocketState(newState) {
    var _this$props$pocketSta, _this$props11;

    (_this$props$pocketSta = (_this$props11 = this.props).pocketStateChange) === null || _this$props$pocketSta === void 0 ? void 0 : _this$props$pocketSta.call(_this$props11, newState);
  }

  get isPullDown() {
    return this.props.pullDownEnabled && this.props.bounceEnabled && this.props.scrollLocation - this.props.topPocketSize >= 0;
  }

  get isReachBottom() {
    return this.props.reachBottomEnabled && this.props.scrollLocation + this.visibleScrollAreaSize <= 0.5;
  }

  get visibleContentAreaSize() {
    var size = this.props.contentSize - this.props.bottomPocketSize - this.props.topPocketSize;

    if (this.props.forceGeneratePockets && this.props.reachBottomEnabled) {
      return Math.max(size - this.props.contentPaddingBottom, 0);
    }

    return Math.max(size, 0);
  }

  get visibleScrollAreaSize() {
    return Math.max(this.visibleContentAreaSize - this.props.containerSize, 0);
  }

  get minOffset() {
    if (this.props.forceGeneratePockets && this.props.reachBottomEnabled && !this.state.forceAnimationToBottomBound) {
      return -Math.max(this.visibleScrollAreaSize + this.props.bottomPocketSize + this.props.contentPaddingBottom, 0);
    }

    return -Math.max(this.visibleScrollAreaSize, 0);
  }

  get scrollSize() {
    return Math.max(this.props.containerSize * this.containerToContentRatio, THUMB_MIN_SIZE);
  }

  get scrollRatio() {
    if (this.visibleScrollAreaSize) {
      return (this.props.containerSize - this.scrollSize) / this.visibleScrollAreaSize;
    }

    return 1;
  }

  get containerToContentRatio() {
    return this.visibleContentAreaSize ? this.props.containerSize / this.visibleContentAreaSize : this.props.containerSize;
  }

  expand() {
    this.setState(state => _extends({}, state, {
      expanded: true
    }));
  }

  collapse() {
    this.setState(state => _extends({}, state, {
      expanded: false
    }));
  }

  onHoverStart() {
    if (this.props.showScrollbar === "onHover") {
      this.setState(state => _extends({}, state, {
        hovered: true
      }));
    }
  }

  onHoverEnd() {
    if (this.props.showScrollbar === "onHover") {
      this.setState(state => _extends({}, state, {
        hovered: false
      }));
    }
  }

  get cssClasses() {
    var {
      direction
    } = this.props;
    var classesMap = {
      [SCROLLABLE_SCROLLBAR_CLASS]: true,
      ["dx-scrollbar-".concat(direction)]: true,
      [SCROLLABLE_SCROLLBAR_ACTIVE_CLASS]: !!this.state.expanded,
      [HOVER_ENABLED_STATE]: !!this.hoverStateEnabled
    };
    return combineClasses(classesMap);
  }

  get scrollStyles() {
    return {
      [this.dimension]: this.scrollSize || THUMB_MIN_SIZE,
      transform: this.scrollTransform
    };
  }

  get scrollTransform() {
    if (this.props.showScrollbar === "never") {
      return "none";
    }

    var translateValue = -this.props.scrollLocation * this.scrollRatio;

    if (this.isHorizontal) {
      return "translate(".concat(translateValue, "px, 0px)");
    }

    return "translate(0px, ".concat(translateValue, "px)");
  }

  get scrollClasses() {
    return combineClasses({
      [SCROLLABLE_SCROLL_CLASS]: true,
      "dx-state-invisible": !this.visible
    });
  }

  get isVisible() {
    return this.props.showScrollbar !== "never" && this.containerToContentRatio < 1 && this.props.containerSize > 15;
  }

  get visible() {
    var {
      forceVisibility,
      showScrollbar
    } = this.props;

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

  get hoverStateEnabled() {
    var {
      scrollByThumb,
      showScrollbar
    } = this.props;
    return (showScrollbar === "onHover" || showScrollbar === "always") && scrollByThumb;
  }

  get restAttributes() {
    var _this$props12 = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props12, _excluded);

    return restProps;
  }

  isThumb(element) {
    var _this$scrollbarRef$cu, _this$scrollbarRef$cu2;

    return ((_this$scrollbarRef$cu = this.scrollbarRef.current) === null || _this$scrollbarRef$cu === void 0 ? void 0 : _this$scrollbarRef$cu.querySelector(".".concat(SCROLLABLE_SCROLL_CLASS))) === element || ((_this$scrollbarRef$cu2 = this.scrollbarRef.current) === null || _this$scrollbarRef$cu2 === void 0 ? void 0 : _this$scrollbarRef$cu2.querySelector(".".concat(SCROLLABLE_SCROLL_CONTENT_CLASS))) === element;
  }

  isScrollbar(element) {
    return element === this.scrollbarRef.current;
  }

  validateEvent(event) {
    var {
      target
    } = event.originalEvent;
    return this.isThumb(target) || this.isScrollbar(target);
  }

  getLocationWithinRange(value) {
    return Math.max(Math.min(value, this.state.maxOffset), this.minOffset);
  }

  getMinOffset() {
    return this.minOffset;
  }

  getMaxOffset() {
    return this.state.maxOffset;
  }

  initHandler(event, crossThumbScrolling) {
    this.cancelScrolling();
    this.setState(state => _extends({}, state, {
      isScrolling: true
    }));
    this.setState(state => _extends({}, state, {
      onReachBottomWasFiredOnce: false
    }));
    this.setState(state => _extends({}, state, {
      onPullDownWasFiredOnce: false
    }));
    this.prepareThumbScrolling(event, crossThumbScrolling);
  }

  startHandler() {
    this.setState(state => _extends({}, state, {
      visibility: true
    }));
  }

  moveHandler(delta) {
    if (this.crossThumbScrolling) {
      return;
    }

    var distance = delta;

    if (this.thumbScrolling) {
      distance[this.axis] = -Math.round(distance[this.axis] / this.containerToContentRatio);
    }

    this.scrollBy(distance);
  }

  endHandler(velocity, needRiseEnd) {
    this.setState(state => _extends({}, state, {
      needRiseEnd: needRiseEnd
    }));
    this.onInertiaAnimatorStart(velocity[this.axis]);
    this.setState(state => _extends({}, state, {
      isScrolling: false
    }));
    this.resetThumbScrolling();
  }

  stopHandler() {
    if (this.thumbScrolling) {
      this.stopScrolling();
    }

    this.resetThumbScrolling();
  }

  scrollByHandler(delta) {
    this.scrollBy(delta);
    this.setState(state => _extends({}, state, {
      needRiseEnd: true
    }));
    this.stopScrolling();
  }

  stopScrolling() {
    this.setState(state => _extends({}, state, {
      isScrolling: false
    }));
    this.setState(state => _extends({}, state, {
      wasScrollComplete: true
    }));
  }

  stopAnimator(animator) {
    if (animator === "bounce") {
      this.setState(state => _extends({}, state, {
        pendingBounceAnimator: false
      }));
    }

    if (animator === "inertia") {
      this.setState(state => _extends({}, state, {
        pendingInertiaAnimator: false
      }));
    }

    this.setState(state => _extends({}, state, {
      wasScrollComplete: true
    }));
  }

  scrollStep(delta) {
    if (this.props.bounceEnabled) {
      this.moveTo(this.props.scrollLocation + delta);
    } else {
      this.moveTo(this.getLocationWithinRange(this.props.scrollLocation + delta));
    }
  }

  moveTo(location) {
    var _this$props$scrollLoc, _this$props13;

    var scrollDelta = Math.abs(this.prevScrollLocation - location);
    (_this$props$scrollLoc = (_this$props13 = this.props).scrollLocationChange) === null || _this$props$scrollLoc === void 0 ? void 0 : _this$props$scrollLoc.call(_this$props13, this.fullScrollProp, location);
    this.updateContent(location);

    if (scrollDelta >= 1) {
      var _this$props$onScroll, _this$props14;

      (_this$props$onScroll = (_this$props14 = this.props).onScroll) === null || _this$props$onScroll === void 0 ? void 0 : _this$props$onScroll.call(_this$props14);
    }

    this.prevScrollLocation = location;
    this.rightScrollLocation = this.minOffset - location;
  }

  releaseHandler() {
    this.onRelease();
  }

  render() {
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
  }

}
Scrollbar.defaultProps = _extends({}, ScrollbarPropsType);
