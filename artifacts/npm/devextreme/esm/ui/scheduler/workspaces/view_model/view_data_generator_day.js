/**
* DevExtreme (esm/ui/scheduler/workspaces/view_model/view_data_generator_day.js)
* Version: 21.2.0
* Build date: Wed Jul 28 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { calculateStartViewDate } from '../utils/day';
import { ViewDataGenerator } from './view_data_generator';
export class ViewDataGeneratorDay extends ViewDataGenerator {
  _calculateStartViewDate(options) {
    return calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, this._getIntervalDuration(options.intervalCount));
  }

}
