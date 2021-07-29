/**
* DevExtreme (cjs/ui/scheduler/header/dateNavigator.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getDateNavigator = void 0;

var _date = _interopRequireDefault(require("../../../core/utils/date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var trimTime = _date.default.trimTime;
var DATE_NAVIGATOR_CLASS = 'dx-scheduler-navigator';
var PREVIOUS_BUTTON_CLASS = 'dx-scheduler-navigator-previous';
var CALENDAR_BUTTON_CLASS = 'dx-scheduler-navigator-caption';
var NEXT_BUTTON_CLASS = 'dx-scheduler-navigator-next';
var DIRECTION_LEFT = -1;
var DIRECTION_RIGHT = 1;

var getDateNavigator = function getDateNavigator(header, item) {
  var items = [getPreviousButtonOptions(header), getCalendarButtonOptions(header), getNextButtonOptions(header)];
  var stylingMode = header.option('useDropDownViewSwitcher') ? 'text' : 'contained';
  return _extends({
    widget: 'dxButtonGroup',
    cssClass: DATE_NAVIGATOR_CLASS,
    options: {
      items: items,
      stylingMode: stylingMode,
      onItemClick: function onItemClick(e) {
        e.itemData.clickHandler(e);
      }
    }
  }, item);
};

exports.getDateNavigator = getDateNavigator;

var getPreviousButtonOptions = function getPreviousButtonOptions(header) {
  return {
    key: 'previous',
    icon: 'chevronprev',
    elementAttr: {
      class: PREVIOUS_BUTTON_CLASS
    },
    clickHandler: function clickHandler() {
      return header._updateDateByDirection(DIRECTION_LEFT);
    },
    onContentReady: function onContentReady(e) {
      var previousButton = e.component;
      previousButton.option('disabled', isPreviousButtonDisabled(header));

      header._addEvent('min', function () {
        previousButton.option('disabled', isPreviousButtonDisabled(header));
      });

      header._addEvent('currentDate', function () {
        previousButton.option('disabled', isPreviousButtonDisabled(header));
      });

      header._addEvent('displayedDate', function () {
        previousButton.option('disabled', isPreviousButtonDisabled(header));
      });
    }
  };
};

var getCalendarButtonOptions = function getCalendarButtonOptions(header) {
  return {
    key: 'calendar',
    text: header.captionText,
    elementAttr: {
      class: CALENDAR_BUTTON_CLASS
    },
    clickHandler: function clickHandler(e) {
      return header._showCalendar(e);
    },
    onContentReady: function onContentReady(e) {
      var calendarButton = e.component;

      header._addEvent('currentView', function () {
        calendarButton.option('text', header.captionText);
      });

      header._addEvent('currentDate', function () {
        calendarButton.option('text', header.captionText);
      });

      header._addEvent('displayedDate', function () {
        calendarButton.option('text', header.captionText);
      });

      header._addEvent('views', function () {
        calendarButton.option('text', header.captionText);
      });

      header._addEvent('firstDayOfWeek', function () {
        calendarButton.option('text', header.captionText);
      });
    }
  };
};

var getNextButtonOptions = function getNextButtonOptions(header) {
  return {
    key: 'next',
    icon: 'chevronnext',
    elementAttr: {
      class: NEXT_BUTTON_CLASS
    },
    clickHandler: function clickHandler() {
      return header._updateDateByDirection(DIRECTION_RIGHT);
    },
    onContentReady: function onContentReady(e) {
      var nextButton = e.component;
      nextButton.option('disabled', isNextButtonDisabled(header));

      header._addEvent('min', function () {
        nextButton.option('disabled', isNextButtonDisabled(header));
      });

      header._addEvent('currentDate', function () {
        nextButton.option('disabled', isNextButtonDisabled(header));
      });

      header._addEvent('displayedDate', function () {
        nextButton.option('disabled', isNextButtonDisabled(header));
      });
    }
  };
};

var isPreviousButtonDisabled = function isPreviousButtonDisabled(header) {
  var min = header.option('min');
  if (!min) return false;
  min = new Date(min);
  var date = header.date;

  var caption = header._getCaption(date);

  min = trimTime(min);

  var previousDate = header._getNextDate(-1, caption.endDate);

  return previousDate < trimTime(min);
};

var isNextButtonDisabled = function isNextButtonDisabled(header) {
  var max = header.option('max');
  if (!max) return false;
  max = new Date(max);
  var date = header.date;

  var caption = header._getCaption(date);

  max = max.setHours(23, 59, 59);

  var nextDate = header._getNextDate(1, caption.startDate);

  return nextDate > max;
};
