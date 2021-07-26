import _extends from "@babel/runtime/helpers/esm/extends";
import registerComponent from '../../../core/component_registrator';
import SchedulerTimeline from './ui.scheduler.timeline';
import dateUtils from '../../../core/utils/date';
import dxrDateHeader from '../../../renovation/ui/scheduler/workspaces/base/header_panel/layout.j';
import { calculateCellIndex, getViewStartByOptions } from './utils/month';
import { formatWeekdayAndDay } from './utils/base';
import { VIEWS } from '../constants';
var TIMELINE_CLASS = 'dx-scheduler-timeline-month';
var toMs = dateUtils.dateToMilliseconds;

class SchedulerTimelineMonth extends SchedulerTimeline {
  get type() {
    return VIEWS.TIMELINE_MONTH;
  }

  get viewDirection() {
    return 'horizontal';
  }

  get renovatedHeaderPanelComponent() {
    return dxrDateHeader;
  }

  _renderView() {
    super._renderView();

    this._updateScrollable();
  }

  _getElementClass() {
    return TIMELINE_CLASS;
  }

  _getDateHeaderTemplate() {
    return this.option('dateCellTemplate');
  }

  _getHiddenInterval() {
    return 0;
  }

  _calculateDurationInCells(timeDiff) {
    return timeDiff / this.getCellDuration();
  }

  getCellDuration() {
    return toMs('day');
  }

  isIndicatorVisible() {
    return true;
  }

  _getFormat() {
    return formatWeekdayAndDay;
  }

  _getIntervalBetween(currentDate) {
    var firstViewDate = this.getStartViewDate();
    var timeZoneOffset = dateUtils.getTimezonesDifference(firstViewDate, currentDate);
    return currentDate.getTime() - (firstViewDate.getTime() - this.option('startDayHour') * 3600000) - timeZoneOffset;
  }

  _getDateGenerationOptions() {
    return _extends({}, super._getDateGenerationOptions(), {
      columnsInDay: 1,
      calculateCellIndex
    });
  }

  getPositionShift() {
    return {
      top: 0,
      left: 0,
      cellPosition: 0
    };
  }

  _getViewStartByOptions() {
    return getViewStartByOptions(this.option('startDate'), this.option('currentDate'), this.option('intervalCount'), dateUtils.getFirstMonthDate(this.option('startDate')));
  }

  generateRenderOptions() {
    var options = super.generateRenderOptions(true);
    return _extends({}, options, {
      getDateForHeaderText: (_, date) => date,
      columnsInDay: 1,
      calculateCellIndex
    });
  }

}

registerComponent('dxSchedulerTimelineMonth', SchedulerTimelineMonth);
export default SchedulerTimelineMonth;