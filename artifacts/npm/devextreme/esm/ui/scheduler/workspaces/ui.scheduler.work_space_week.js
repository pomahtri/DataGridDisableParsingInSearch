/**
* DevExtreme (esm/ui/scheduler/workspaces/ui.scheduler.work_space_week.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../../core/component_registrator';
import { VIEWS } from '../constants';
import SchedulerWorkSpaceVertical from './ui.scheduler.work_space_vertical';
import { calculateViewStartDate } from './utils/week';
var WEEK_CLASS = 'dx-scheduler-work-space-week';

class SchedulerWorkSpaceWeek extends SchedulerWorkSpaceVertical {
  get type() {
    return VIEWS.WEEK;
  }

  _getElementClass() {
    return WEEK_CLASS;
  }

  _calculateViewStartDate() {
    return calculateViewStartDate(this.option('startDate'), this._firstDayOfWeek());
  }

  getPositionShift(timeShift, isAllDay) {
    if (!isAllDay && this.invoke('isAdaptive') && this.invoke('getMaxAppointmentCountPerCellByType') === 0) {
      return {
        top: 0,
        left: 0,
        cellPosition: 0
      };
    }

    return super.getPositionShift(timeShift, isAllDay);
  }

  _isApplyCompactAppointmentOffset() {
    if (this.invoke('isAdaptive') && this.invoke('getMaxAppointmentCountPerCellByType') === 0) {
      return false;
    }

    return super._isApplyCompactAppointmentOffset();
  }

}

registerComponent('dxSchedulerWorkSpaceWeek', SchedulerWorkSpaceWeek);
export default SchedulerWorkSpaceWeek;
