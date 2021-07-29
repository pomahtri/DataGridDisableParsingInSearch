/**
* DevExtreme (cjs/renovation/ui/responsive_box/responsive_box.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.ResponsiveBox = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _widget = require("../common/widget");

var _responsive_box_props = require("./responsive_box_props");

var _combine_classes = require("../../utils/combine_classes");

var _box = require("../box/box");

var _window = require("../../../core/utils/window");

var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));

var _screen_utils = require("./screen_utils");

var _excluded = ["screenByWidth"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HD_SCREEN_WIDTH = 1920;
var RESPONSIVE_BOX_CLASS = "dx-responsivebox";
var SCREEN_SIZE_CLASS_PREFIX = "".concat(RESPONSIVE_BOX_CLASS, "-screen-");

var viewFunction = function viewFunction(viewModel) {
  var _combineClasses;

  var getCurrentScreenSizeQualifier = function getCurrentScreenSizeQualifier() {
    var _viewModel$props$scre;

    var screenWidth = (0, _window.hasWindow)() ? _dom_adapter.default.getDocumentElement().clientWidth : HD_SCREEN_WIDTH;
    var screenSizeFunc = (_viewModel$props$scre = viewModel.props.screenByWidth) !== null && _viewModel$props$scre !== void 0 ? _viewModel$props$scre : _screen_utils.convertToScreenSizeQualifier;
    return screenSizeFunc(screenWidth);
  };

  var screenSizeQualifier = getCurrentScreenSizeQualifier();
  var cssClasses = (0, _combine_classes.combineClasses)((_combineClasses = {}, _defineProperty(_combineClasses, RESPONSIVE_BOX_CLASS, true), _defineProperty(_combineClasses, SCREEN_SIZE_CLASS_PREFIX + screenSizeQualifier, true), _combineClasses));
  return (0, _inferno.createComponentVNode)(2, _widget.Widget, {
    "classes": cssClasses,
    children: (0, _inferno.createComponentVNode)(2, _box.Box)
  });
};

exports.viewFunction = viewFunction;

var ResponsiveBox = /*#__PURE__*/function (_InfernoWrapperCompon) {
  _inheritsLoose(ResponsiveBox, _InfernoWrapperCompon);

  function ResponsiveBox(props) {
    var _this;

    _this = _InfernoWrapperCompon.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = ResponsiveBox.prototype;

  _proto.createEffects = function createEffects() {
    return [(0, _vdom.createReRenderEffect)()];
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      restAttributes: this.restAttributes
    });
  };

  _createClass(ResponsiveBox, [{
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
          screenByWidth = _this$props.screenByWidth,
          restProps = _objectWithoutProperties(_this$props, _excluded);

      return restProps;
    }
  }]);

  return ResponsiveBox;
}(_vdom.InfernoWrapperComponent);

exports.ResponsiveBox = ResponsiveBox;
ResponsiveBox.defaultProps = _extends({}, _responsive_box_props.ResponsiveBoxProps);
