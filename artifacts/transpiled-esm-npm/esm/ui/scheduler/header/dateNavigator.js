import _extends from "@babel/runtime/helpers/esm/extends";
import dateUtils from '../../../core/utils/date';
var {
  trimTime
} = dateUtils;
var DATE_NAVIGATOR_CLASS = 'dx-scheduler-navigator';
var PREVIOUS_BUTTON_CLASS = 'dx-scheduler-navigator-previous';
var CALENDAR_BUTTON_CLASS = 'dx-scheduler-navigator-caption';
var NEXT_BUTTON_CLASS = 'dx-scheduler-navigator-next';
var DIRECTION_LEFT = -1;
var DIRECTION_RIGHT = 1;
export var getDateNavigator = (header, item) => {
  var items = [getPreviousButtonOptions(header), getCalendarButtonOptions(header), getNextButtonOptions(header)];
  var stylingMode = header.option('useDropDownViewSwitcher') ? 'text' : 'contained';
  return _extends({
    widget: 'dxButtonGroup',
    cssClass: DATE_NAVIGATOR_CLASS,
    options: {
      items,
      stylingMode,
      onItemClick: e => {
        e.itemData.clickHandler(e);
      }
    }
  }, item);
};

var getPreviousButtonOptions = header => {
  return {
    key: 'previous',
    icon: 'chevronprev',
    elementAttr: {
      class: PREVIOUS_BUTTON_CLASS
    },
    clickHandler: () => header._updateDateByDirection(DIRECTION_LEFT),
    onContentReady: e => {
      var previousButton = e.component;
      previousButton.option('disabled', isPreviousButtonDisabled(header));

      header._addEvent('min', () => {
        previousButton.option('disabled', isPreviousButtonDisabled(header));
      });

      header._addEvent('currentDate', () => {
        previousButton.option('disabled', isPreviousButtonDisabled(header));
      });

      header._addEvent('displayedDate', () => {
        previousButton.option('disabled', isPreviousButtonDisabled(header));
      });
    }
  };
};

var getCalendarButtonOptions = header => {
  return {
    key: 'calendar',
    text: header.captionText,
    elementAttr: {
      class: CALENDAR_BUTTON_CLASS
    },
    clickHandler: e => header._showCalendar(e),
    onContentReady: e => {
      var calendarButton = e.component;

      header._addEvent('currentView', () => {
        calendarButton.option('text', header.captionText);
      });

      header._addEvent('currentDate', () => {
        calendarButton.option('text', header.captionText);
      });

      header._addEvent('displayedDate', () => {
        calendarButton.option('text', header.captionText);
      });

      header._addEvent('views', () => {
        calendarButton.option('text', header.captionText);
      });

      header._addEvent('firstDayOfWeek', () => {
        calendarButton.option('text', header.captionText);
      });
    }
  };
};

var getNextButtonOptions = header => {
  return {
    key: 'next',
    icon: 'chevronnext',
    elementAttr: {
      class: NEXT_BUTTON_CLASS
    },
    clickHandler: () => header._updateDateByDirection(DIRECTION_RIGHT),
    onContentReady: e => {
      var nextButton = e.component;
      nextButton.option('disabled', isNextButtonDisabled(header));

      header._addEvent('min', () => {
        nextButton.option('disabled', isNextButtonDisabled(header));
      });

      header._addEvent('currentDate', () => {
        nextButton.option('disabled', isNextButtonDisabled(header));
      });

      header._addEvent('displayedDate', () => {
        nextButton.option('disabled', isNextButtonDisabled(header));
      });
    }
  };
};

var isPreviousButtonDisabled = header => {
  var min = header.option('min');
  if (!min) return false;
  min = new Date(min);
  var date = header.date;

  var caption = header._getCaption(date);

  min = trimTime(min);

  var previousDate = header._getNextDate(-1, caption.endDate);

  return previousDate < trimTime(min);
};

var isNextButtonDisabled = header => {
  var max = header.option('max');
  if (!max) return false;
  max = new Date(max);
  var date = header.date;

  var caption = header._getCaption(date);

  max = max.setHours(23, 59, 59);

  var nextDate = header._getNextDate(1, caption.startDate);

  return nextDate > max;
};