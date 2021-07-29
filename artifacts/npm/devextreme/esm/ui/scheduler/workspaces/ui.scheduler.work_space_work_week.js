/**
* DevExtreme (esm/ui/scheduler/workspaces/ui.scheduler.work_space_work_week.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../../core/component_registrator';
import { isDataOnWeekend, getWeekendsCount, getFirstDayOfWeek } from './utils/work_week';
import SchedulerWorkSpaceWeek from './ui.scheduler.work_space_week';
import { VIEWS } from '../constants';
var WORK_WEEK_CLASS = 'dx-scheduler-work-space-work-week';

class SchedulerWorkSpaceWorkWeek extends SchedulerWorkSpaceWeek {
  get type() {
    return VIEWS.WORK_WEEK;
  }

  get isWorkView() {
    return true;
  }

  constructor() {
    super(...arguments);
    this._getWeekendsCount = getWeekendsCount;
  }

  _isSkippedData(date) {
    return isDataOnWeekend(date);
  }

  _getElementClass() {
    return WORK_WEEK_CLASS;
  }

  _firstDayOfWeek() {
    return getFirstDayOfWeek(this.option('firstDayOfWeek'));
  }

}

registerComponent('dxSchedulerWorkSpaceWorkWeek', SchedulerWorkSpaceWorkWeek);
export default SchedulerWorkSpaceWorkWeek;
