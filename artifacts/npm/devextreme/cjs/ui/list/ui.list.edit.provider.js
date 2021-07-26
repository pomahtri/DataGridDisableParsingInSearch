/**
* DevExtreme (cjs/ui/list/ui.list.edit.provider.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _common = require("../../core/utils/common");

var _class = _interopRequireDefault(require("../../core/class"));

var _extend = require("../../core/utils/extend");

var _iterator = require("../../core/utils/iterator");

var _ui = _interopRequireDefault(require("../widget/ui.errors"));

var _uiListEdit = require("./ui.list.edit.decorator_registry");

require("./ui.list.edit.decorator.static");

require("./ui.list.edit.decorator.switchable.button");

require("./ui.list.edit.decorator.switchable.slide");

require("./ui.list.edit.decorator.swipe");

require("./ui.list.edit.decorator.context");

require("./ui.list.edit.decorator.selection");

require("./ui.list.edit.decorator.reorder");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var editOptionsRegistry = [];

var registerOption = function registerOption(enabledFunc, decoratorTypeFunc, decoratorSubTypeFunc) {
  editOptionsRegistry.push({
    enabled: enabledFunc,
    decoratorType: decoratorTypeFunc,
    decoratorSubType: decoratorSubTypeFunc
  });
}; // NOTE: option registration order does matter


registerOption(function () {
  return this.option('menuItems').length;
}, function () {
  return 'menu';
}, function () {
  return this.option('menuMode');
});
registerOption(function () {
  return !this.option('menuItems').length && this.option('allowItemDeleting');
}, function () {
  var mode = this.option('itemDeleteMode');
  return mode === 'toggle' || mode === 'slideButton' || mode === 'swipe' || mode === 'static' ? 'delete' : 'menu';
}, function () {
  var mode = this.option('itemDeleteMode');

  if (mode === 'slideItem') {
    mode = 'slide';
  }

  if (mode === 'hold') {
    mode = 'context';
  }

  return mode;
});
registerOption(function () {
  return this.option('selectionMode') !== 'none' && this.option('showSelectionControls');
}, function () {
  return 'selection';
}, function () {
  return 'default';
});
registerOption(function () {
  return this.option('itemDragging.allowReordering') || this.option('itemDragging.allowDropInsideItem') || this.option('itemDragging.group');
}, function () {
  return 'reorder';
}, function () {
  return 'default';
});
var LIST_ITEM_BEFORE_BAG_CLASS = 'dx-list-item-before-bag';
var LIST_ITEM_AFTER_BAG_CLASS = 'dx-list-item-after-bag';
var DECORATOR_BEFORE_BAG_CREATE_METHOD = 'beforeBag';
var DECORATOR_AFTER_BAG_CREATE_METHOD = 'afterBag';
var DECORATOR_MODIFY_ELEMENT_METHOD = 'modifyElement';
var DECORATOR_AFTER_RENDER_METHOD = 'afterRender';
var DECORATOR_GET_EXCLUDED_SELECTORS_METHOD = 'getExcludedSelectors';

var EditProvider = _class.default.inherit({
  ctor: function ctor(list) {
    this._list = list;

    this._fetchRequiredDecorators();
  },
  dispose: function dispose() {
    if (this._decorators && this._decorators.length) {
      (0, _iterator.each)(this._decorators, function (_, decorator) {
        decorator.dispose();
      });
    }
  },
  _fetchRequiredDecorators: function _fetchRequiredDecorators() {
    this._decorators = [];
    (0, _iterator.each)(editOptionsRegistry, function (_, option) {
      var optionEnabled = option.enabled.call(this._list);

      if (optionEnabled) {
        var decoratorType = option.decoratorType.call(this._list);
        var decoratorSubType = option.decoratorSubType.call(this._list);

        var decorator = this._createDecorator(decoratorType, decoratorSubType);

        this._decorators.push(decorator);
      }
    }.bind(this));
  },
  _createDecorator: function _createDecorator(type, subType) {
    var decoratorClass = this._findDecorator(type, subType);

    return new decoratorClass(this._list);
  },
  _findDecorator: function _findDecorator(type, subType) {
    var foundDecorator = _uiListEdit.registry[type][subType];

    if (!foundDecorator) {
      throw _ui.default.Error('E1012', type, subType);
    }

    return foundDecorator;
  },
  modifyItemElement: function modifyItemElement(args) {
    var $itemElement = (0, _renderer.default)(args.itemElement);
    var config = {
      $itemElement: $itemElement
    };

    this._prependBeforeBags($itemElement, config);

    this._appendAfterBags($itemElement, config);

    this._applyDecorators(DECORATOR_MODIFY_ELEMENT_METHOD, config);
  },
  afterItemsRendered: function afterItemsRendered() {
    this._applyDecorators(DECORATOR_AFTER_RENDER_METHOD);
  },
  _prependBeforeBags: function _prependBeforeBags($itemElement, config) {
    var $beforeBags = this._collectDecoratorsMarkup(DECORATOR_BEFORE_BAG_CREATE_METHOD, config, LIST_ITEM_BEFORE_BAG_CLASS);

    $itemElement.prepend($beforeBags);
  },
  _appendAfterBags: function _appendAfterBags($itemElement, config) {
    var $afterBags = this._collectDecoratorsMarkup(DECORATOR_AFTER_BAG_CREATE_METHOD, config, LIST_ITEM_AFTER_BAG_CLASS);

    $itemElement.append($afterBags);
  },
  _collectDecoratorsMarkup: function _collectDecoratorsMarkup(method, config, containerClass) {
    var $collector = (0, _renderer.default)('<div>');
    (0, _iterator.each)(this._decorators, function () {
      var $container = (0, _renderer.default)('<div>').addClass(containerClass);
      this[method]((0, _extend.extend)({
        $container: $container
      }, config));

      if ($container.children().length) {
        $collector.append($container);
      }
    });
    return $collector.children();
  },
  _applyDecorators: function _applyDecorators(method, config) {
    (0, _iterator.each)(this._decorators, function () {
      this[method](config);
    });
  },
  _handlerExists: function _handlerExists(name) {
    if (!this._decorators) {
      return false;
    }

    var decorators = this._decorators;
    var length = decorators.length;

    for (var i = 0; i < length; i++) {
      if (decorators[i][name] !== _common.noop) {
        return true;
      }
    }

    return false;
  },
  _eventHandler: function _eventHandler(name, $itemElement, e) {
    if (!this._decorators) {
      return false;
    }

    var response = false;
    var decorators = this._decorators;
    var length = decorators.length;

    for (var i = 0; i < length; i++) {
      response = decorators[i][name]($itemElement, e);

      if (response) {
        break;
      }
    }

    return response;
  },
  handleClick: function handleClick($itemElement, e) {
    return this._eventHandler('handleClick', $itemElement, e);
  },
  handleKeyboardEvents: function handleKeyboardEvents(currentFocusedIndex, moveFocusUp) {
    return this._eventHandler('handleKeyboardEvents', currentFocusedIndex, moveFocusUp);
  },
  handleEnterPressing: function handleEnterPressing(e) {
    return this._eventHandler('handleEnterPressing', e);
  },
  contextMenuHandlerExists: function contextMenuHandlerExists() {
    return this._handlerExists('handleContextMenu');
  },
  handleContextMenu: function handleContextMenu($itemElement, e) {
    return this._eventHandler('handleContextMenu', $itemElement, e);
  },
  getExcludedItemSelectors: function getExcludedItemSelectors() {
    var excludedSelectors = [];

    this._applyDecorators(DECORATOR_GET_EXCLUDED_SELECTORS_METHOD, excludedSelectors);

    return excludedSelectors.join(',');
  }
});

var _default = EditProvider;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
