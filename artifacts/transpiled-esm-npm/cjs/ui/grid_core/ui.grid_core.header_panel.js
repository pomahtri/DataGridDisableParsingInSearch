"use strict";

exports.headerPanelModule = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _toolbar = _interopRequireDefault(require("../toolbar"));

var _uiGrid_core = require("./ui.grid_core.columns_view");

var _common = require("../../core/utils/common");

var _type = require("../../core/utils/type");

var _visibility_change = require("../../events/visibility_change");

var _message = _interopRequireDefault(require("../../localization/message"));

require("../drop_down_menu");

var _extend = require("../../core/utils/extend");

var _data = require("../../core/utils/data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HEADER_PANEL_CLASS = 'header-panel';
var TOOLBAR_BUTTON_CLASS = 'toolbar-button';
var TOOLBAR_ARIA_LABEL = '-ariaToolbar';

var HeaderPanel = _uiGrid_core.ColumnsView.inherit({
  _getToolbarItems: function _getToolbarItems() {
    return [];
  },
  _getButtonContainer: function _getButtonContainer() {
    return (0, _renderer.default)('<div>').addClass(this.addWidgetPrefix(TOOLBAR_BUTTON_CLASS));
  },
  _getToolbarButtonClass: function _getToolbarButtonClass(specificClass) {
    var secondClass = specificClass ? ' ' + specificClass : '';
    return this.addWidgetPrefix(TOOLBAR_BUTTON_CLASS) + secondClass;
  },
  _getToolbarOptions: function _getToolbarOptions() {
    var options = {
      toolbarOptions: {
        items: this._getToolbarItems(),
        onItemRendered: function onItemRendered(e) {
          var itemRenderedCallback = e.itemData.onItemRendered;

          if (itemRenderedCallback) {
            itemRenderedCallback(e);
          }
        }
      }
    };
    var userItems = this.option('toolbar.items');
    options.toolbarOptions.items = this._normalizeToolbarItems(options.toolbarOptions.items, userItems);
    this.executeAction('onToolbarPreparing', options);

    if (options.toolbarOptions && !(0, _type.isDefined)(options.toolbarOptions.visible)) {
      var toolbarItems = options.toolbarOptions.items;
      options.toolbarOptions.visible = !!(toolbarItems && toolbarItems.length);
    }

    return options.toolbarOptions;
  },
  _normalizeToolbarItems: function _normalizeToolbarItems(defaultItems, userItems) {
    var isArray = Array.isArray(userItems);

    if (!(0, _type.isDefined)(userItems)) {
      return defaultItems;
    }

    if (!isArray) {
      userItems = [userItems];
    }

    var defaultButtonsByNames = {};
    defaultItems.forEach(function (button) {
      defaultButtonsByNames[button.name] = button;
    });
    var normalizedItems = (0, _extend.extend)(true, [], userItems.map(function (button) {
      if ((0, _type.isString)(button)) {
        button = {
          name: button
        };
      }

      if (!(0, _type.isDefined)(button.name) || !(0, _type.isDefined)(defaultButtonsByNames[button.name])) {
        return button;
      }

      return (0, _extend.extend)(defaultButtonsByNames[button.name], button);
    }));
    return isArray ? normalizedItems : normalizedItems[0];
  },
  _renderCore: function _renderCore() {
    if (!this._toolbar) {
      var $headerPanel = this.element();
      $headerPanel.addClass(this.addWidgetPrefix(HEADER_PANEL_CLASS));

      var label = _message.default.format(this.component.NAME + TOOLBAR_ARIA_LABEL);

      var $toolbar = (0, _renderer.default)('<div>').attr('aria-label', label).appendTo($headerPanel);
      this._toolbar = this._createComponent($toolbar, _toolbar.default, this._toolbarOptions);
    } else {
      this._toolbar.option(this._toolbarOptions);
    }
  },
  _columnOptionChanged: _common.noop,
  _handleDataChanged: function _handleDataChanged() {
    if (this._requireReady) {
      this.render();
    }
  },
  init: function init() {
    this.callBase();
    this.createAction('onToolbarPreparing', {
      excludeValidators: ['disabled', 'readOnly']
    });
  },
  render: function render() {
    this._toolbarOptions = this._getToolbarOptions();
    this.callBase.apply(this, arguments);
  },
  setToolbarItemDisabled: function setToolbarItemDisabled(name, optionValue) {
    var toolbarInstance = this._toolbar;

    if (toolbarInstance) {
      var items = toolbarInstance.option('items') || [];
      var itemIndex = items.indexOf(items.filter(function (item) {
        return item.name === name;
      })[0]);

      if (itemIndex >= 0) {
        var itemOptionPrefix = 'items[' + itemIndex + ']';

        if (toolbarInstance.option(itemOptionPrefix + '.options')) {
          toolbarInstance.option(itemOptionPrefix + '.options.disabled', optionValue);
        } else {
          toolbarInstance.option(itemOptionPrefix + '.disabled', optionValue);
        }
      }
    }
  },
  updateToolbarDimensions: function updateToolbarDimensions() {
    if (this._toolbar) {
      (0, _visibility_change.triggerResizeEvent)(this.getHeaderPanel());
    }
  },
  getHeaderPanel: function getHeaderPanel() {
    return this.element();
  },
  getHeight: function getHeight() {
    return this.getElementHeight();
  },
  optionChanged: function optionChanged(args) {
    if (args.name === 'onToolbarPreparing') {
      this._invalidate();

      args.handled = true;
    }

    if (args.name === 'toolbar') {
      var parts = (0, _data.getPathParts)(args.fullName);
      var optionName = args.fullName.replace(/^toolbar\./, '');

      if (parts.length <= 2) {
        // toolbar and toolbar.items case
        var toolbarOptions = this._getToolbarOptions();

        this._toolbar.option(toolbarOptions);
      } else if (parts.length === 3) {
        // toolbar.items[i] case
        var normalizedItem = this._normalizeToolbarItems(this._getToolbarItems(), args.value);

        this._toolbar.option(optionName, normalizedItem);
      } else if (parts.length >= 4) {
        // toolbar.items[i].prop case
        this._toolbar.option(optionName, args.value);
      }
    }

    this.callBase(args);
  },
  isVisible: function isVisible() {
    return this._toolbarOptions && this._toolbarOptions.visible;
  },
  allowDragging: _common.noop
});

var headerPanelModule = {
  defaultOptions: function defaultOptions() {
    return {};
  },
  views: {
    headerPanel: HeaderPanel
  },
  extenders: {
    controllers: {
      resizing: {
        _updateDimensionsCore: function _updateDimensionsCore() {
          this.callBase.apply(this, arguments);
          this.getView('headerPanel').updateToolbarDimensions();
        }
      }
    }
  }
};
exports.headerPanelModule = headerPanelModule;