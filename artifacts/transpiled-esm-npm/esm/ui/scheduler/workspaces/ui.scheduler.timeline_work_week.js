import registerComponent from '../../../core/component_registrator';
import { VIEWS } from '../constants';
import SchedulerTimelineWeek from './ui.scheduler.timeline_week';
import { getWeekendsCount, isDataOnWeekend, getFirstDayOfWeek } from './utils/work_week';
var TIMELINE_CLASS = 'dx-scheduler-timeline-work-week';
var LAST_DAY_WEEK_INDEX = 5;

class SchedulerTimelineWorkWeek extends SchedulerTimelineWeek {
  get type() {
    return VIEWS.TIMELINE_WORK_WEEK;
  }

  get isWorkView() {
    return true;
  }

  constructor() {
    super(...arguments);
    this._getWeekendsCount = getWeekendsCount;
  }

  _getElementClass() {
    return TIMELINE_CLASS;
  }

  _getWeekDuration() {
    return 5;
  }

  _firstDayOfWeek() {
    return getFirstDayOfWeek(this.option('firstDayOfWeek'));
  }

  _isSkippedData(date) {
    return isDataOnWeekend(date);
  }

  _incrementDate(date) {
    var day = date.getDay();

    if (day === LAST_DAY_WEEK_INDEX) {
      date.setDate(date.getDate() + 2);
    }

    super._incrementDate(date);
  }

}

registerComponent('dxSchedulerTimelineWorkWeek', SchedulerTimelineWorkWeek);
export default SchedulerTimelineWorkWeek;