import $ from '../../core/renderer';
import { isPlainObject } from '../../core/utils/type';
import dateUtils from '../../core/utils/date';
import { each } from '../../core/utils/iterator';
import { extend } from '../../core/utils/extend';
import dateLocalization from '../../localization/date';
import timeZoneUtils from './utils.timeZone';
import { AGENDA_LAST_IN_DATE_APPOINTMENT_CLASS } from './classes';
import { utils } from './utils';
import { getResourceManager as _getResourceManager, getAppointmentDataProvider as _getAppointmentDataProvider, getTimeZoneCalculator } from './instanceFactory';
import { createAppointmentAdapter } from './appointmentAdapter';
var toMs = dateUtils.dateToMilliseconds;
var subscribes = {
  getResourceManager: function getResourceManager() {
    return _getResourceManager(this.key);
  },
  getAppointmentDataProvider: function getAppointmentDataProvider() {
    return _getAppointmentDataProvider(this.key);
  },
  isCurrentViewAgenda: function isCurrentViewAgenda() {
    return this.option('currentView') === 'agenda';
  },
  currentViewUpdated: function currentViewUpdated(currentView) {
    this.option('currentView', currentView);
  },
  currentDateUpdated: function currentDateUpdated(date) {
    this.option('currentDate', date);
  },
  getOption: function getOption(name) {
    return this.option(name);
  },
  getWorkspaceOption: function getWorkspaceOption(name) {
    return this.getWorkSpace().option(name);
  },
  isVirtualScrolling: function isVirtualScrolling() {
    return this.isVirtualScrolling();
  },
  setCellDataCacheAlias: function setCellDataCacheAlias(appointment, geometry) {
    this._workSpace.setCellDataCacheAlias(appointment, geometry);
  },
  createAppointmentSettings: function createAppointmentSettings(appointment) {
    return this._getAppointmentSettingsGenerator(appointment).create();
  },
  isGroupedByDate: function isGroupedByDate() {
    // TODO replace with ModelProvider
    return this.getWorkSpace().isGroupedByDate();
  },
  showAppointmentTooltip: function showAppointmentTooltip(options) {
    var targetedAppointment = this.getTargetedAppointment(options.data, options.target);
    this.showAppointmentTooltip(options.data, options.target, targetedAppointment);
  },
  hideAppointmentTooltip: function hideAppointmentTooltip() {
    this.hideAppointmentTooltip();
  },
  showEditAppointmentPopup: function showEditAppointmentPopup(options) {
    var targetedData = this.getTargetedAppointment(options.data, options.target);
    this.showAppointmentPopup(options.data, false, targetedData);
  },
  updateAppointmentAfterResize: function updateAppointmentAfterResize(options) {
    var info = utils.dataAccessors.getAppointmentInfo(options.$appointment);
    var exceptionDate = info.sourceAppointment.exceptionDate;

    this._checkRecurringAppointment(options.target, options.data, exceptionDate, function () {
      this._updateAppointment(options.target, options.data, function () {
        this._appointments.moveAppointmentBack();
      });
    }.bind(this));
  },
  getUpdatedData: function getUpdatedData(rawAppointment) {
    return this._getUpdatedData(rawAppointment);
  },
  updateAppointmentAfterDrag: function updateAppointmentAfterDrag(_ref) {
    var {
      event,
      element,
      rawAppointment,
      coordinates
    } = _ref;
    var info = utils.dataAccessors.getAppointmentInfo(element);
    var appointment = createAppointmentAdapter(this.key, rawAppointment);
    var targetedAppointment = createAppointmentAdapter(this.key, extend({}, rawAppointment, this._getUpdatedData(rawAppointment)));
    var targetedRawAppointment = targetedAppointment.source();

    var newCellIndex = this._workSpace.getDroppableCellIndex();

    var oldCellIndex = this._workSpace.getCellIndexByCoordinates(coordinates);

    var becomeAllDay = targetedAppointment.allDay;
    var wasAllDay = appointment.allDay;
    var movedBetweenAllDayAndSimple = this._workSpace.supportAllDayRow() && (wasAllDay && !becomeAllDay || !wasAllDay && becomeAllDay);

    if (newCellIndex !== oldCellIndex || movedBetweenAllDayAndSimple) {
      this._checkRecurringAppointment(rawAppointment, targetedRawAppointment, info.sourceAppointment.exceptionDate, function () {
        this._updateAppointment(rawAppointment, targetedRawAppointment, function () {
          this._appointments.moveAppointmentBack(event);
        }, event);
      }.bind(this), undefined, undefined, event);
    } else {
      this._appointments.moveAppointmentBack(event);
    }
  },
  onDeleteButtonPress: function onDeleteButtonPress(options) {
    var targetedData = this.getTargetedAppointment(options.data, $(options.target));
    this.checkAndDeleteAppointment(options.data, targetedData);
    this.hideAppointmentTooltip();
  },

  getTextAndFormatDate(appointmentRaw, targetedAppointmentRaw, format) {
    // TODO: rename to createFormattedDateText
    var appointmentAdapter = createAppointmentAdapter(this.key, appointmentRaw);
    var targetedAdapter = createAppointmentAdapter(this.key, targetedAppointmentRaw || appointmentRaw);
    var timeZoneCalculator = getTimeZoneCalculator(this.key); // TODO pull out time zone converting from appointment adapter for knockout(T947938)

    var startDate = timeZoneCalculator.createDate(targetedAdapter.startDate, {
      path: 'toGrid'
    });
    var endDate = timeZoneCalculator.createDate(targetedAdapter.endDate, {
      path: 'toGrid'
    });
    var formatType = format || this.fire('_getTypeFormat', startDate, endDate, targetedAdapter.allDay);
    return {
      text: targetedAdapter.text || appointmentAdapter.text,
      formatDate: this.fire('_formatDates', startDate, endDate, formatType)
    };
  },

  _getTypeFormat(startDate, endDate, isAllDay) {
    if (isAllDay) {
      return 'DATE';
    }

    if (this.option('currentView') !== 'month' && dateUtils.sameDate(startDate, endDate)) {
      return 'TIME';
    }

    return 'DATETIME';
  },

  _createAppointmentTitle(data) {
    if (isPlainObject(data)) {
      return data.text;
    }

    return String(data);
  },

  _formatDates(startDate, endDate, formatType) {
    var dateFormat = 'monthandday';
    var timeFormat = 'shorttime';
    var isSameDate = startDate.getDate() === endDate.getDate();

    switch (formatType) {
      case 'DATETIME':
        return [dateLocalization.format(startDate, dateFormat), ' ', dateLocalization.format(startDate, timeFormat), ' - ', isSameDate ? '' : dateLocalization.format(endDate, dateFormat) + ' ', dateLocalization.format(endDate, timeFormat)].join('');

      case 'TIME':
        return "".concat(dateLocalization.format(startDate, timeFormat), " - ").concat(dateLocalization.format(endDate, timeFormat));

      case 'DATE':
        return "".concat(dateLocalization.format(startDate, dateFormat)).concat(isSameDate ? '' : ' - ' + dateLocalization.format(endDate, dateFormat));
    }
  },

  getResizableAppointmentArea: function getResizableAppointmentArea(options) {
    var allDay = options.allDay;

    var groups = this._getCurrentViewOption('groups');

    if (groups && groups.length) {
      if (allDay || this.getLayoutManager().getRenderingStrategyInstance()._needHorizontalGroupBounds()) {
        var horizontalGroupBounds = this._workSpace.getGroupBounds(options.coordinates);

        return {
          left: horizontalGroupBounds.left,
          right: horizontalGroupBounds.right,
          top: 0,
          bottom: 0
        };
      }

      if (this.getLayoutManager().getRenderingStrategyInstance()._needVerticalGroupBounds(allDay) && this._workSpace._isVerticalGroupedWorkSpace()) {
        var verticalGroupBounds = this._workSpace.getGroupBounds(options.coordinates);

        return {
          left: 0,
          right: 0,
          top: verticalGroupBounds.top,
          bottom: verticalGroupBounds.bottom
        };
      }
    }
  },
  needRecalculateResizableArea: function needRecalculateResizableArea() {
    return this.getWorkSpace().needRecalculateResizableArea();
  },
  getAppointmentGeometry: function getAppointmentGeometry(settings) {
    return this.getLayoutManager().getRenderingStrategyInstance().getAppointmentGeometry(settings);
  },
  isAllDay: function isAllDay(appointmentData) {
    return this.getLayoutManager().getRenderingStrategyInstance().isAllDay(appointmentData);
  },
  getDeltaTime: function getDeltaTime(e, initialSize, itemData) {
    return this.getLayoutManager().getRenderingStrategyInstance().getDeltaTime(e, initialSize, itemData);
  },
  getDropDownAppointmentWidth: function getDropDownAppointmentWidth(isAllDay) {
    return this.getLayoutManager().getRenderingStrategyInstance().getDropDownAppointmentWidth(this._getViewCountConfig().intervalCount, isAllDay);
  },
  getDropDownAppointmentHeight: function getDropDownAppointmentHeight() {
    return this.getLayoutManager().getRenderingStrategyInstance().getDropDownAppointmentHeight();
  },
  getCellWidth: function getCellWidth() {
    return this.getWorkSpace().getCellWidth();
  },
  getCellHeight: function getCellHeight() {
    return this.getWorkSpace().getCellHeight();
  },
  getRenderingStrategy: function getRenderingStrategy() {
    return this._getAppointmentsRenderingStrategy();
  },
  getMaxAppointmentCountPerCellByType: function getMaxAppointmentCountPerCellByType(isAllDay) {
    return this.getRenderingStrategyInstance()._getMaxAppointmentCountPerCellByType(isAllDay);
  },
  needCorrectAppointmentDates: function needCorrectAppointmentDates() {
    return this.getRenderingStrategyInstance().needCorrectAppointmentDates();
  },
  getRenderingStrategyDirection: function getRenderingStrategyDirection() {
    return this.getRenderingStrategyInstance().getDirection();
  },
  getWorkSpaceDateTableOffset: function getWorkSpaceDateTableOffset() {
    return this.getWorkSpaceDateTableOffset();
  },
  getFullWeekAppointmentWidth: function getFullWeekAppointmentWidth(options) {
    var groupIndex = options.groupIndex;
    return this._workSpace.getGroupWidth(groupIndex);
  },
  getMaxAppointmentWidth: function getMaxAppointmentWidth(options) {
    var workSpace = this._workSpace;
    return workSpace.getCellCountToLastViewDate(options.date) * workSpace.getCellWidth();
  },
  updateAppointmentStartDate: function updateAppointmentStartDate(options) {
    var appointment = options.appointment;

    var firstViewDate = this._workSpace.getStartViewDate();

    var startDate = new Date(options.startDate);

    var startDayHour = this._getCurrentViewOption('startDayHour');

    var updatedStartDate;

    if (this.appointmentTakesAllDay(appointment)) {
      updatedStartDate = dateUtils.normalizeDate(startDate, firstViewDate);
    } else {
      if (startDate < firstViewDate) {
        startDate = firstViewDate;
      }

      updatedStartDate = dateUtils.normalizeDate(options.startDate, new Date(startDate));
    }

    return dateUtils.roundDateByStartDayHour(updatedStartDate, startDayHour);
  },
  updateAppointmentEndDate: function updateAppointmentEndDate(options) {
    var endDate = options.endDate;

    var endDayHour = this._getCurrentViewOption('endDayHour');

    var startDayHour = this._getCurrentViewOption('startDayHour');

    var updatedEndDate = endDate;

    if (endDate.getHours() >= endDayHour) {
      updatedEndDate.setHours(endDayHour, 0, 0, 0);
    } else if (!options.isSameDate && startDayHour > 0 && endDate.getHours() * 60 + endDate.getMinutes() < startDayHour * 60) {
      updatedEndDate = new Date(updatedEndDate.getTime() - toMs('day'));
      updatedEndDate.setHours(endDayHour, 0, 0, 0);
    }

    return updatedEndDate;
  },
  renderCompactAppointments: function renderCompactAppointments(options) {
    this._compactAppointmentsHelper.render(options);
  },
  clearCompactAppointments: function clearCompactAppointments() {
    this._compactAppointmentsHelper.clear();
  },
  supportCompactDropDownAppointments: function supportCompactDropDownAppointments() {
    return this._workSpace._supportCompactDropDownAppointments();
  },
  isApplyCompactAppointmentOffset: function isApplyCompactAppointmentOffset() {
    return this._workSpace._isApplyCompactAppointmentOffset();
  },
  getGroupCount: function getGroupCount() {
    return this._workSpace._getGroupCount();
  },
  mapAppointmentFields: function mapAppointmentFields(config) {
    var {
      itemData,
      itemElement,
      targetedAppointment
    } = config;
    var targetedData = targetedAppointment || this.getTargetedAppointment(itemData, itemElement);
    return {
      appointmentData: config.itemData,
      appointmentElement: config.itemElement,
      targetedAppointmentData: targetedData
    };
  },
  getOffsetByAllDayPanel: function getOffsetByAllDayPanel(groupIndex) {
    return this._workSpace._getOffsetByAllDayPanel(groupIndex);
  },
  getGroupTop: function getGroupTop(groupIndex) {
    return this._workSpace._getGroupTop(groupIndex);
  },
  dayHasAppointment: function dayHasAppointment(day, appointment, trimTime) {
    return this.dayHasAppointment(day, appointment, trimTime);
  },
  getLayoutManager: function getLayoutManager() {
    return this._layoutManager;
  },
  getAgendaVerticalStepHeight: function getAgendaVerticalStepHeight() {
    return this.getWorkSpace().getAgendaVerticalStepHeight();
  },
  getAgendaDuration: function getAgendaDuration() {
    return this._getCurrentViewOption('agendaDuration');
  },
  getStartViewDate: function getStartViewDate() {
    return this.getStartViewDate();
  },
  getEndViewDate: function getEndViewDate() {
    return this.getEndViewDate();
  },
  getMaxAppointmentsPerCell: function getMaxAppointmentsPerCell() {
    return this.getMaxAppointmentsPerCell();
  },
  forceMaxAppointmentPerCell: function forceMaxAppointmentPerCell() {
    return this.forceMaxAppointmentPerCell();
  },
  onAgendaReady: function onAgendaReady(rows) {
    var $appts = this.getAppointmentsInstance()._itemElements();

    var total = 0;

    var applyClass = function applyClass(_, count) {
      var index = count + total - 1;
      $appts.eq(index).addClass(AGENDA_LAST_IN_DATE_APPOINTMENT_CLASS);
      total += count;
    };

    for (var i = 0; i < rows.length; i++) {
      each(rows[i], applyClass);
    }
  },
  getTimezone: function getTimezone() {
    return this._getTimezoneOffsetByOption();
  },
  getTargetedAppointmentData: function getTargetedAppointmentData(appointment, element) {
    return this.getTargetedAppointment(appointment, element);
  },
  getAppointmentDurationInMs: function getAppointmentDurationInMs(options) {
    var startDate = options.startDate;
    var endDate = options.endDate;
    var allDay = options.allDay;
    var appointmentDuration = endDate.getTime() - startDate.getTime();
    var dayDuration = toMs('day');

    var visibleDayDuration = this._workSpace.getVisibleDayDuration();

    var result = 0;

    if (allDay) {
      var ceilQuantityOfDays = Math.ceil(appointmentDuration / dayDuration);
      result = ceilQuantityOfDays * visibleDayDuration;
    } else {
      var isDifferentDates = !timeZoneUtils.isSameAppointmentDates(startDate, endDate);
      var floorQuantityOfDays = Math.floor(appointmentDuration / dayDuration);
      var tailDuration;

      if (isDifferentDates) {
        var startDateEndHour = new Date(new Date(startDate).setHours(this.option('endDayHour'), 0, 0));
        var hiddenDayDuration = dayDuration - visibleDayDuration - (startDate.getTime() > startDateEndHour.getTime() ? startDate.getTime() - startDateEndHour.getTime() : 0);
        tailDuration = appointmentDuration - (floorQuantityOfDays ? floorQuantityOfDays * dayDuration : hiddenDayDuration);
        var startDayTime = this.option('startDayHour') * toMs('hour');
        var endPartDuration = endDate - dateUtils.trimTime(endDate);

        if (endPartDuration < startDayTime) {
          if (floorQuantityOfDays) {
            tailDuration -= hiddenDayDuration;
          }

          tailDuration += startDayTime - endPartDuration;
        }
      } else {
        tailDuration = appointmentDuration % dayDuration;
      }

      if (tailDuration > visibleDayDuration) {
        tailDuration = visibleDayDuration;
      }

      result = floorQuantityOfDays * visibleDayDuration + tailDuration || toMs('minute');
    }

    return result;
  },
  getEndDayHour: function getEndDayHour() {
    return this._workSpace.option('endDayHour') || this.option('endDayHour');
  },
  getStartDayHour: function getStartDayHour() {
    return this._workSpace.option('startDayHour') || this.option('startDayHour');
  },
  isAdaptive: function isAdaptive() {
    return this.option('adaptivityEnabled');
  },
  removeDroppableCellClass: function removeDroppableCellClass() {
    this._workSpace.removeDroppableCellClass();
  }
};
export default subscribes;