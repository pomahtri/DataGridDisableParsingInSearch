import _extends from "@babel/runtime/helpers/esm/extends";
import SchedulerWorkSpaceIndicator from './ui.scheduler.work_space.indicator';
import { formatWeekdayAndDay } from './utils/base';

class SchedulerWorkspaceVertical extends SchedulerWorkSpaceIndicator {
  _getFormat() {
    return formatWeekdayAndDay;
  }

  generateRenderOptions() {
    var options = super.generateRenderOptions();
    return _extends({}, options, {
      isGenerateTimePanelData: true
    });
  }

}

export default SchedulerWorkspaceVertical;