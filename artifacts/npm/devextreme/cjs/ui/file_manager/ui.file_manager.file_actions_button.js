/**
* DevExtreme (cjs/ui/file_manager/ui.file_manager.file_actions_button.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _extend = require("../../core/utils/extend");

var _ui = _interopRequireDefault(require("../widget/ui.widget"));

var _button = _interopRequireDefault(require("../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FILE_MANAGER_FILE_ACTIONS_BUTTON = 'dx-filemanager-file-actions-button';
var FILE_MANAGER_FILE_ACTIONS_BUTTON_ACTIVATED = 'dx-filemanager-file-actions-button-activated';
var ACTIVE_STATE_CLASS = 'dx-state-active';

var FileManagerFileActionsButton = /*#__PURE__*/function (_Widget) {
  _inheritsLoose(FileManagerFileActionsButton, _Widget);

  function FileManagerFileActionsButton() {
    return _Widget.apply(this, arguments) || this;
  }

  var _proto = FileManagerFileActionsButton.prototype;

  _proto._initMarkup = function _initMarkup() {
    var _this = this;

    this._createClickAction();

    var $button = (0, _renderer.default)('<div>');
    this.$element().append($button).addClass(FILE_MANAGER_FILE_ACTIONS_BUTTON);
    this._button = this._createComponent($button, _button.default, {
      icon: 'overflow',
      stylingMode: 'text',
      onClick: function onClick(e) {
        return _this._raiseClick(e);
      }
    });

    _Widget.prototype._initMarkup.call(this);
  };

  _proto._createClickAction = function _createClickAction() {
    this._clickAction = this._createActionByOption('onClick');
  };

  _proto._raiseClick = function _raiseClick(e) {
    this._clickAction(e);
  };

  _proto._getDefaultOptions = function _getDefaultOptions() {
    return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
      cssClass: '',
      onClick: null
    });
  };

  _proto._optionChanged = function _optionChanged(args) {
    var name = args.name;

    switch (name) {
      case 'cssClass':
        this.repaint();
        break;

      case 'onClick':
        this._createClickAction();

        break;

      default:
        _Widget.prototype._optionChanged.call(this, args);

    }
  };

  _proto.setActive = function setActive(active) {
    var _this2 = this;

    this.$element().toggleClass(FILE_MANAGER_FILE_ACTIONS_BUTTON_ACTIVATED, active);
    setTimeout(function () {
      return _this2._button.$element().toggleClass(ACTIVE_STATE_CLASS, active);
    });
  };

  return FileManagerFileActionsButton;
}(_ui.default);

var _default = FileManagerFileActionsButton;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
