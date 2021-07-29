/**
* DevExtreme (esm/ui/scheduler/appointments/cellPositionCalculator.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
class BaseStrategy {
  constructor(options) {
    this.options = options;
  }

  get DOMMetaData() {
    return this.options.DOMMetaData;
  }

  get appointments() {
    return this.options.dateSettings;
  } // TODO rename appoitments -> dateSettings


  get viewDataProvider() {
    return this.options.viewDataProvider;
  }

  get positionHelper() {
    return this.options.positionHelper;
  }

  calculateCellPositions(groupIndices, isAllDayRowAppointment, isRecurrentAppointment) {
    var result = [];
    this.appointments.forEach((dateSetting, index) => {
      var coordinates = this.getCoordinateInfos({
        appointment: dateSetting,
        groupIndices,
        isAllDayRowAppointment,
        isRecurrentAppointment
      });
      coordinates.forEach(item => {
        !!item && result.push(this._prepareObject(item, index));
      });
    });
    return result;
  }

  getCoordinateInfos(options) {
    var {
      appointment,
      isAllDayRowAppointment,
      groupIndices,
      recurrent
    } = options;
    var {
      startDate
    } = appointment;
    var groupIndex = !recurrent ? appointment.source.groupIndex : undefined;
    return this.positionHelper.getCoordinatesByDateInGroup(startDate, groupIndices, isAllDayRowAppointment, groupIndex);
  }

  _prepareObject(position, dateSettingIndex) {
    position.dateSettingIndex = dateSettingIndex;
    return {
      coordinates: position,
      dateSettingIndex
    };
  }

}

class VirtualStrategy extends BaseStrategy {
  calculateCellPositions(groupIndices, isAllDayRowAppointment, isRecurrentAppointment) {
    var appointments = isAllDayRowAppointment ? this.appointments : this.appointments.filter(_ref => {
      var {
        source,
        startDate,
        endDate
      } = _ref;
      return this.viewDataProvider.isGroupIntersectDateInterval(source.groupIndex, startDate, endDate);
    });

    if (isRecurrentAppointment) {
      return this.createRecurrentAppointmentInfos(appointments, isAllDayRowAppointment);
    }

    return super.calculateCellPositions(groupIndices, isAllDayRowAppointment, isRecurrentAppointment);
  }

  createRecurrentAppointmentInfos(dateSettings, isAllDayRowAppointment) {
    var result = [];
    dateSettings.forEach((_ref2, index) => {
      var {
        source,
        startDate
      } = _ref2;
      var coordinate = this.positionHelper.getCoordinatesByDate(startDate, source.groupIndex, isAllDayRowAppointment);

      if (coordinate) {
        result.push(this._prepareObject(coordinate, index));
      }
    });
    return result;
  }

}

export class CellPositionCalculator {
  constructor(options) {
    this.options = options;
  }

  calculateCellPositions(groupIndices, isAllDayRowAppointment, isRecurrentAppointment) {
    var strategy = this.options.isVirtualScrolling ? new VirtualStrategy(this.options) : new BaseStrategy(this.options);
    return strategy.calculateCellPositions(groupIndices, isAllDayRowAppointment, isRecurrentAppointment);
  }

}
