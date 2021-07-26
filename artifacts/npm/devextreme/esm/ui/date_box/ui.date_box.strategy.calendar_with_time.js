/**
* DevExtreme (esm/ui/date_box/ui.date_box.strategy.calendar_with_time.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import { getWindow } from '../../core/utils/window';
var window = getWindow();
import CalendarStrategy from './ui.date_box.strategy.calendar';
import TimeView from './ui.time_view';
import dateLocalization from '../../localization/date';
import { extend } from '../../core/utils/extend';
import dateUtils from '../../core/utils/date';
import Box from '../box';
import uiDateUtils from './ui.date_utils';
var SHRINK_VIEW_SCREEN_WIDTH = 573;
var DATEBOX_ADAPTIVITY_MODE_CLASS = 'dx-datebox-adaptivity-mode';
var CalendarWithTimeStrategy = CalendarStrategy.inherit({
  NAME: 'CalendarWithTime',
  getDefaultOptions: function getDefaultOptions() {
    return extend(this.callBase(), {
      applyValueMode: 'useButtons',
      buttonsLocation: 'bottom after',
      'dropDownOptions.showTitle': false
    });
  },
  _closeDropDownByEnter: function _closeDropDownByEnter() {
    return dateUtils.sameDate(this._getContouredValue(), this.widgetOption('value'));
  },
  getDisplayFormat: function getDisplayFormat(displayFormat) {
    return displayFormat || 'shortdateshorttime';
  },
  _is24HourFormat: function _is24HourFormat() {
    return dateLocalization.is24HourFormat(this.getDisplayFormat(this.dateBox.option('displayFormat')));
  },
  _getContouredValue: function _getContouredValue() {
    var viewDate = this.callBase();
    return this._updateDateTime(viewDate);
  },
  _renderWidget: function _renderWidget() {
    this.callBase();
    this._timeView = this.dateBox._createComponent($('<div>'), TimeView, {
      value: this.dateBoxValue(),
      _showClock: !this._isShrinkView(),
      use24HourFormat: this._is24HourFormat(),
      onValueChanged: this._valueChangedHandler.bind(this),
      stylingMode: this.dateBox.option('stylingMode')
    });

    this._timeView.registerKeyHandler('escape', this._escapeHandler.bind(this));
  },
  renderOpenedState: function renderOpenedState() {
    this.callBase();

    var popup = this._getPopup();

    if (popup) {
      popup.$wrapper().toggleClass(DATEBOX_ADAPTIVITY_MODE_CLASS, this._isSmallScreen());
    }

    clearTimeout(this._repaintTimer);
    this._repaintTimer = setTimeout(function () {
      this._getPopup() && this._getPopup().repaint();
    }.bind(this), 0);
  },
  isAdaptivityChanged: function isAdaptivityChanged() {
    var isAdaptiveMode = this._isShrinkView();

    var currentAdaptiveMode = this._currentAdaptiveMode;

    if (isAdaptiveMode !== currentAdaptiveMode) {
      this._currentAdaptiveMode = isAdaptiveMode;
      return currentAdaptiveMode !== undefined;
    }

    return this.callBase();
  },
  _updateValue: function _updateValue(preventDefaultValue) {
    var date = this.dateBoxValue();

    if (!date && !preventDefaultValue) {
      date = new Date();
      uiDateUtils.normalizeTime(date);
    }

    this.callBase();

    if (this._timeView) {
      date && this._timeView.option('value', date);

      this._timeView.option('use24HourFormat', this._is24HourFormat());
    }
  },
  _isSmallScreen: function _isSmallScreen() {
    return $(window).width() <= SHRINK_VIEW_SCREEN_WIDTH;
  },
  _isShrinkView: function _isShrinkView() {
    return !this.dateBox.option('showAnalogClock') || this.dateBox.option('adaptivityEnabled') && this._isSmallScreen();
  },
  _getBoxItems: function _getBoxItems() {
    var items = [{
      ratio: 0,
      shrink: 0,
      baseSize: 'auto',
      name: 'calendar'
    }];

    if (!this._isShrinkView()) {
      items.push({
        ratio: 0,
        shrink: 0,
        baseSize: 'auto',
        name: 'time'
      });
    }

    return items;
  },
  renderPopupContent: function renderPopupContent() {
    this.callBase();
    this._currentAdaptiveMode = this._isShrinkView();

    var $popupContent = this._getPopup().$content();

    this._box = this.dateBox._createComponent($('<div>').appendTo($popupContent), Box, {
      direction: 'row',
      crossAlign: 'start',
      items: this._getBoxItems(),
      itemTemplate: function (data) {
        var $container = $('<div>');

        switch (data.name) {
          case 'calendar':
            $container.append(this._widget.$element());
            if (this._isShrinkView()) $container.append(this._timeView.$element());
            break;

          case 'time':
            $container.append(this._timeView.$element());
            break;
        }

        return $container;
      }.bind(this)
    });

    this._attachTabHandler();
  },
  popupConfig: function popupConfig(_popupConfig) {
    var calendarPopupConfig = this.callBase(_popupConfig);
    var result = extend(calendarPopupConfig, {
      width: 'auto',
      onShowing: function () {
        if (this._box.option('_layoutStrategy') === 'fallback') {
          var clockMinWidth = this._getPopup().$content().find('.dx-timeview-clock').css('minWidth');

          this._timeView.$element().css('maxWidth', clockMinWidth);
        }
      }.bind(this)
    });
    return result;
  },
  getFirstPopupElement: function getFirstPopupElement() {
    return this._timeView._hourBox.$element().find('input');
  },
  _attachTabHandler: function _attachTabHandler() {
    var dateBox = this.dateBox;

    var handler = function handler(e) {
      if (e.shiftKey) {
        e.preventDefault();
        dateBox.focus();
      }
    };

    this._timeView._hourBox.registerKeyHandler('tab', handler);
  },
  _preventFocusOnPopup: function _preventFocusOnPopup(e) {
    if (!$(e.target).hasClass('dx-texteditor-input')) {
      this.callBase.apply(this, arguments);

      if (!this.dateBox._hasFocusClass()) {
        this.dateBox.focus();
      }
    }
  },
  _updateDateTime: function _updateDateTime(date) {
    var time = this._timeView.option('value');

    date.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
    return date;
  },
  getValue: function getValue() {
    var date = this._widget.option('value');

    date = date ? new Date(date) : new Date();
    return this._updateDateTime(date);
  },
  dispose: function dispose() {
    clearTimeout(this._removeMinWidthTimer);
    clearTimeout(this._repaintTimer);
    this.callBase();
  }
});
export default CalendarWithTimeStrategy;
