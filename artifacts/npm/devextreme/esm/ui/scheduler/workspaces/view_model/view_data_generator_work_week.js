/**
* DevExtreme (esm/ui/scheduler/workspaces/view_model/view_data_generator_work_week.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { calculateStartViewDate } from '../utils/work_week';
import { ViewDataGeneratorWeek } from './view_data_generator_week';
export class ViewDataGeneratorWorkWeek extends ViewDataGeneratorWeek {
  get daysInInterval() {
    return 5;
  }

  _calculateStartViewDate(options) {
    return calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, this._getIntervalDuration(options.intervalCount), options.firstDayOfWeek);
  }

}
