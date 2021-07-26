"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _ui = _interopRequireDefault(require("../widget/ui.widget"));

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _translator = require("../../animation/translator");

var _position = _interopRequireDefault(require("../../animation/position"));

var _math = require("../../core/utils/math");

var _type = require("../../core/utils/type");

var _extend = require("../../core/utils/extend");

var _position2 = require("../../core/utils/position");

var _number = _interopRequireDefault(require("../../localization/number"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SLIDER_CLASS = 'dx-slider';
var SLIDER_HANDLE_CLASS = 'dx-slider-handle';
var POSITION_ALIASES = {
  'top': {
    my: 'bottom center',
    at: 'top center',
    collision: 'none'
  },
  'bottom': {
    my: 'top center',
    at: 'bottom center',
    collision: 'none'
  },
  'right': {
    my: 'left center',
    at: 'right center',
    collision: 'none'
  },
  'left': {
    my: 'right center',
    at: 'left center',
    collision: 'none'
  }
};

var SliderHandle = _ui.default.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      hoverStateEnabled: false,
      value: 0,
      tooltipEnabled: false,
      tooltipFormat: function tooltipFormat(v) {
        return v;
      },
      tooltipPosition: 'top',
      tooltipShowMode: 'onHover',
      tooltipFitIn: null
    });
  },
  _initMarkup: function _initMarkup() {
    this.callBase();
    this.$element().addClass(SLIDER_HANDLE_CLASS);
    this.setAria({
      'role': 'slider',
      'valuenow': this.option('value')
    });
  },
  _render: function _render() {
    this._renderTooltip();

    this.callBase();
  },
  _renderTooltip: function _renderTooltip() {
    if (this.option('tooltipEnabled')) {
      if (!this._$tooltip) {
        this._$tooltip = (0, _renderer.default)('<div>').appendTo(this.$element());
      }

      this._$slider = this.$element().closest('.' + SLIDER_CLASS);

      this._updateTooltip();
    } else {
      this._removeTooltip();
    }
  },
  _createTooltip: function _createTooltip() {
    if (this._tooltip) {
      return false;
    }

    this._tooltip = this._createComponent(this._$tooltip, _tooltip.default, {
      visible: true,
      target: this.$element(),
      closeOnOutsideClick: false,
      container: this.$element(),
      hideTopOverlayHandler: null,
      closeOnTargetScroll: false,
      onPositioned: function (args) {
        this._saveTooltipElements(args.component);

        this._saveTooltipLocation();

        this._centeredTooltipPosition();
      }.bind(this),
      animation: null,
      arrowPosition: null,
      templatesRenderAsynchronously: false,
      _fixWrapperPosition: false
    });
    return true;
  },
  _removeTooltip: function _removeTooltip() {
    if (!this._$tooltip) {
      return;
    }

    this._$tooltip.remove();

    delete this._$tooltip;
    delete this._tooltip;
  },
  _renderTooltipPosition: function _renderTooltipPosition() {
    if (!this._tooltip) {
      return;
    }

    var position = this.option('tooltipPosition');

    this._saveTooltipElements();

    this._resetTooltipPosition();

    if ((0, _type.type)(position) === 'string') {
      position = (0, _extend.extend)({
        boundary: this._$slider,
        boundaryOffset: {
          h: 1,
          v: 1
        }
      }, POSITION_ALIASES[position]);
    }

    this._tooltip.option('position', position);

    this._saveTooltipLocation();
  },
  _saveTooltipElements: function _saveTooltipElements(tooltip) {
    tooltip = this._tooltip || tooltip;
    this._$tooltipContent = tooltip.$content().parent();
    this._$tooltipArrow = this._$tooltipContent.find('.dx-popover-arrow');
  },
  _resetTooltipPosition: function _resetTooltipPosition() {
    (0, _translator.resetPosition)(this._$tooltipContent);
    (0, _translator.resetPosition)(this._$tooltipArrow);
  },
  _saveTooltipLocation: function _saveTooltipLocation() {
    this._contentLocate = (0, _translator.locate)(this._$tooltipContent);
  },
  _centeredTooltipPosition: function _centeredTooltipPosition() {
    if (!this._tooltip) {
      return;
    }

    this._$tooltipContent.outerWidth('auto');

    var outerWidthWithoutRounding = (0, _position2.getBoundingRect)(this._$tooltipContent.get(0)).width;
    var tooltipOuterWidth = Math.ceil(outerWidthWithoutRounding);
    var roundedTooltipOuterWidth = tooltipOuterWidth % 2 + tooltipOuterWidth;

    this._$tooltipContent.outerWidth(roundedTooltipOuterWidth);

    var tooltipCenter = (roundedTooltipOuterWidth - this.$element().width()) / 2;
    this._contentLocate.left = -tooltipCenter;

    this._$tooltipArrow.css({
      marginLeft: -this._$tooltipArrow.outerWidth() / 2,
      left: '50%'
    });

    this._fitTooltip();
  },
  _fitTooltip: function _fitTooltip() {
    if (!this._tooltip) {
      return;
    }

    var position = this.option('tooltipPosition');

    if ((0, _type.type)(position) === 'string') {
      position = (0, _extend.extend)({
        of: this.$element(),
        boundary: this._$slider,
        boundaryOffset: {
          h: 2,
          v: 1
        }
      }, POSITION_ALIASES[position], {
        collision: 'fit none'
      });
    }

    var calculatePosition = _position.default.calculate(this._$tooltipContent, position);

    var isLeftSide = calculatePosition.h.collisionSide === 'left';
    var arrowLeft = (isLeftSide ? -1 : 1) * calculatePosition.h.oversize;
    var arrowMinLeft = this._contentLocate.left;

    var arrowMaxRight = this._contentLocate.left + this._$tooltipContent.outerWidth() - this._$tooltipArrow.outerWidth();

    (0, _translator.move)(this._$tooltipContent, {
      left: this._contentLocate.left + (isLeftSide ? 1 : -1) * calculatePosition.h.oversize
    });
    (0, _translator.move)(this._$tooltipArrow, {
      left: (0, _math.fitIntoRange)(arrowLeft, arrowMinLeft, arrowMaxRight)
    });
  },
  _getFormattedValue: function _getFormattedValue(value) {
    return _number.default.format(value, this.option('tooltipFormat'));
  },
  _renderValue: function _renderValue() {
    if (!this._tooltip) {
      return;
    }

    var value = this.option('value');

    this._tooltip.$content().text(this._getFormattedValue(value));

    this._fitTooltip();
  },
  _updateTooltip: function _updateTooltip() {
    var hoverMode = /^onhover$/i.test(this.option('tooltipShowMode'));

    if (!hoverMode) {
      this._createTooltip();
    }

    this.$element().toggleClass('dx-slider-tooltip-on-hover', hoverMode);

    this._renderTooltipPosition();

    this._renderValue();

    this._centeredTooltipPosition();
  },
  _clean: function _clean() {
    this.callBase();
    delete this._$tooltip;
    delete this._tooltip;
  },
  _ensureTooltipIsCentered: function _ensureTooltipIsCentered(value, previousValue) {
    if ((0, _type.isDefined)(value) && (0, _type.isDefined)(previousValue) && value.toString().length !== previousValue.toString().length) {
      this._centeredTooltipPosition();
    }
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'tooltipFormat':
        this._renderValue();

        break;

      case 'value':
        {
          this._renderValue();

          var value = this._getFormattedValue(args.value);

          var previousValue = this._getFormattedValue(args.previousValue);

          this._ensureTooltipIsCentered(value, previousValue);

          this.setAria('valuenow', args.value);
          break;
        }

      case 'tooltipEnabled':
        this._renderTooltip();

        break;

      case 'tooltipPosition':
        this._renderTooltipPosition();

        this._centeredTooltipPosition();

        break;

      case 'tooltipShowMode':
        this._updateTooltip();

        break;

      case 'tooltipFitIn':
        this._fitTooltip();

        break;

      default:
        this.callBase(args);
    }
  },
  fitTooltipPosition: function fitTooltipPosition() {
    this._fitTooltip();
  },
  updateTooltip: function updateTooltip() {
    if (!this._createTooltip()) {
      return;
    }

    this._renderTooltipPosition();

    this._renderValue();

    this._centeredTooltipPosition();
  },
  repaint: function repaint() {
    this._renderTooltipPosition();

    this._centeredTooltipPosition();

    if (this._tooltip) {
      this._tooltip._visibilityChanged(true);
    }
  }
});

var _default = SliderHandle;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;