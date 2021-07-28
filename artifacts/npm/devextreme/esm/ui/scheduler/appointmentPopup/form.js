/**
* DevExtreme (esm/ui/scheduler/appointmentPopup/form.js)
* Version: 21.2.0
* Build date: Wed Jul 28 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../../core/renderer';
import Form from '../../form';
import dateSerialization from '../../../core/utils/date_serialization';
import messageLocalization from '../../../localization/message';
import devices from '../../../core/devices';
import DataSource from '../../../data/data_source';
import timeZoneDataUtils from '../timezones/utils.timezones_data';
import { extend } from '../../../core/utils/extend';
import dateUtils from '../../../core/utils/date';
import Semaphore from '../semaphore';
import '../recurrence_editor';
import '../../text_area';
import '../../tag_box';
import '../../switch';
import '../../select_box';
var SCREEN_SIZE_OF_SINGLE_COLUMN = 600;
export var APPOINTMENT_FORM_GROUP_NAMES = {
  Main: 'mainGroup',
  Recurrence: 'recurrenceGroup'
};

var getAllDayEndDate = startDate => {
  return new Date(new Date(startDate).setDate(startDate.getDate() + 1));
};

var getStartDateWithStartHour = (startDate, startDayHour) => {
  return new Date(new Date(startDate).setHours(startDayHour));
};

var validateAppointmentFormDate = (editor, value, previousValue) => {
  var isCurrentDateCorrect = value === null || !!value;
  var isPreviousDateCorrect = previousValue === null || !!previousValue;

  if (!isCurrentDateCorrect && isPreviousDateCorrect) {
    editor.option('value', previousValue);
  }
};

var updateRecurrenceItemVisibility = (recurrenceRuleExpr, value, form) => {
  var _form$getEditor;

  form.itemOption(APPOINTMENT_FORM_GROUP_NAMES.Recurrence, 'visible', value);
  !value && form.updateData(recurrenceRuleExpr, '');
  (_form$getEditor = form.getEditor(recurrenceRuleExpr)) === null || _form$getEditor === void 0 ? void 0 : _form$getEditor.changeValueByVisibility(value);
};

var createDateBoxEditor = (dataField, colSpan, firstDayOfWeek, label, onValueChanged) => {
  return {
    editorType: 'dxDateBox',
    dataField,
    colSpan,
    label: {
      text: messageLocalization.format(label)
    },
    validationRules: [{
      type: 'required'
    }],
    editorOptions: {
      width: '100%',
      calendarOptions: {
        firstDayOfWeek
      },
      onValueChanged
    }
  };
};

export class AppointmentForm {
  constructor(scheduler) {
    this.scheduler = scheduler;
    this.form = null;
    this._lockDateShiftFlag = false;
    this.semaphore = new Semaphore();
  }

  get dxForm() {
    return this.form;
  }

  set readOnly(value) {
    var _recurrenceEditor$_re;

    this.form.option('readOnly', value);
    var {
      recurrenceRuleExpr
    } = this.scheduler.getDataAccessors().expr; // TODO hack fore rec editor

    var recurrenceEditor = this.form.getEditor(recurrenceRuleExpr);
    recurrenceEditor === null || recurrenceEditor === void 0 ? void 0 : (_recurrenceEditor$_re = recurrenceEditor._recurrenceForm) === null || _recurrenceEditor$_re === void 0 ? void 0 : _recurrenceEditor$_re.option('readOnly', value);
  }

  get formData() {
    return this.form.option('formData');
  }

  set formData(value) {
    this.form.option('formData', value);
  }

  create(dataExprs, triggerResize, changeSize, appointmentData, allowTimeZoneEditing, formData) {
    var recurrenceEditorVisibility = !!appointmentData[dataExprs.recurrenceRuleExpr];
    var colSpan = recurrenceEditorVisibility ? 1 : 2;
    var resourceManager = this.scheduler.getResourceManager();
    var mainItems = [...this._createMainItems(dataExprs, triggerResize, changeSize, allowTimeZoneEditing), ...resourceManager.getEditors()];
    changeSize(recurrenceEditorVisibility);
    var items = [{
      itemType: 'group',
      name: APPOINTMENT_FORM_GROUP_NAMES.Main,
      colCountByScreen: {
        lg: 2,
        xs: 1
      },
      colSpan,
      items: mainItems
    }, {
      itemType: 'group',
      name: APPOINTMENT_FORM_GROUP_NAMES.Recurrence,
      visible: recurrenceEditorVisibility,
      colSpan,
      items: this._createRecurrenceEditor(dataExprs)
    }];
    var element = $('<div>');
    this.form = this.scheduler.createComponent(element, Form, {
      items,
      showValidationSummary: true,
      scrollingEnabled: true,
      colCount: 'auto',
      colCountByScreen: {
        lg: 2,
        xs: 1
      },
      formData,
      showColonAfterLabel: false,
      labelLocation: 'top',
      screenByWidth: width => {
        return width < SCREEN_SIZE_OF_SINGLE_COLUMN || devices.current().deviceType !== 'desktop' ? 'xs' : 'lg';
      }
    });
  }

  _dateBoxValueChanged(args, dateExpr, isNeedCorrect) {
    validateAppointmentFormDate(args.component, args.value, args.previousValue);
    var value = dateSerialization.deserializeDate(args.value);
    var previousValue = dateSerialization.deserializeDate(args.previousValue);
    var dateEditor = this.form.getEditor(dateExpr);
    var dateValue = dateSerialization.deserializeDate(dateEditor.option('value'));

    if (this.semaphore.isFree() && dateValue && value && isNeedCorrect(dateValue, value)) {
      var duration = previousValue ? dateValue.getTime() - previousValue.getTime() : 0;
      dateEditor.option('value', new Date(value.getTime() + duration));
    }
  }

  _createTimezoneEditor(timeZoneExpr, secondTimeZoneExpr, visibleIndex, colSpan, isMainTimeZone) {
    var visible = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var noTzTitle = messageLocalization.format('dxScheduler-noTimezoneTitle');
    return {
      dataField: timeZoneExpr,
      editorType: 'dxSelectBox',
      visibleIndex: visibleIndex,
      colSpan: colSpan,
      label: {
        text: ' '
      },
      editorOptions: {
        displayExpr: 'title',
        valueExpr: 'id',
        placeholder: noTzTitle,
        searchEnabled: true,
        onValueChanged: args => {
          var form = this.form;
          var secondTimezoneEditor = form.getEditor(secondTimeZoneExpr);

          if (isMainTimeZone) {
            secondTimezoneEditor.option('value', args.value);
          }
        }
      },
      visible
    };
  }

  _createDateBoxItems(dataExprs, allowTimeZoneEditing) {
    var colSpan = allowTimeZoneEditing ? 2 : 1;
    var firstDayOfWeek = this.scheduler.getFirstDayOfWeek();
    return [createDateBoxEditor(dataExprs.startDateExpr, colSpan, firstDayOfWeek, 'dxScheduler-editorLabelStartDate', args => {
      this._dateBoxValueChanged(args, dataExprs.endDateExpr, (endValue, startValue) => endValue < startValue);
    }), this._createTimezoneEditor(dataExprs.startDateTimeZoneExpr, dataExprs.endDateTimeZoneExpr, 1, colSpan, true, allowTimeZoneEditing), createDateBoxEditor(dataExprs.endDateExpr, colSpan, firstDayOfWeek, 'dxScheduler-editorLabelEndDate', args => {
      this._dateBoxValueChanged(args, dataExprs.startDateExpr, (startValue, endValue) => endValue < startValue);
    }), this._createTimezoneEditor(dataExprs.endDateTimeZoneExpr, dataExprs.startDateTimeZoneExpr, 3, colSpan, false, allowTimeZoneEditing)];
  }

  _changeFormItemDateType(itemPath, isAllDay) {
    var itemEditorOptions = this.form.itemOption(itemPath).editorOptions;
    var type = isAllDay ? 'date' : 'datetime';

    var newEditorOption = _extends({}, itemEditorOptions, {
      type
    });

    this.form.itemOption(itemPath, 'editorOptions', newEditorOption);
  }

  _createMainItems(dataExprs, triggerResize, changeSize, allowTimeZoneEditing) {
    return [{
      dataField: dataExprs.textExpr,
      editorType: 'dxTextBox',
      colSpan: 2,
      label: {
        text: messageLocalization.format('dxScheduler-editorLabelTitle')
      }
    }, {
      itemType: 'group',
      colSpan: 2,
      colCountByScreen: {
        lg: 2,
        xs: 1
      },
      items: this._createDateBoxItems(dataExprs, allowTimeZoneEditing)
    }, {
      itemType: 'group',
      colCountByScreen: {
        lg: 3,
        xs: 3
      },
      colSpan: 2,
      items: [{
        dataField: dataExprs.allDayExpr,
        cssClass: 'dx-appointment-form-switch',
        editorType: 'dxSwitch',
        label: {
          text: messageLocalization.format('dxScheduler-allDay'),
          location: 'right'
        },
        editorOptions: {
          onValueChanged: args => {
            var value = args.value;
            var startDateEditor = this.form.getEditor(dataExprs.startDateExpr);
            var endDateEditor = this.form.getEditor(dataExprs.endDateExpr);
            var startDate = dateSerialization.deserializeDate(startDateEditor.option('value'));

            if (this.semaphore.isFree() && startDate) {
              if (value) {
                var allDayStartDate = dateUtils.trimTime(startDate);
                startDateEditor.option('value', allDayStartDate);
                endDateEditor.option('value', getAllDayEndDate(allDayStartDate));
              } else {
                var startDateWithStartHour = getStartDateWithStartHour(startDate, this.scheduler.getStartDayHour());
                var endDate = this.scheduler.getCalculatedEndDate(startDateWithStartHour);
                startDateEditor.option('value', startDateWithStartHour);
                endDateEditor.option('value', endDate);
              }
            }

            var startDateItemPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.Main, ".").concat(dataExprs.startDateExpr);
            var endDateItemPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.Main, ".").concat(dataExprs.endDateExpr);

            this._changeFormItemDateType(startDateItemPath, value);

            this._changeFormItemDateType(endDateItemPath, value);
          }
        }
      }, {
        editorType: 'dxSwitch',
        dataField: 'repeat',
        cssClass: 'dx-appointment-form-switch',
        name: 'visibilityChanged',
        label: {
          text: messageLocalization.format('dxScheduler-editorLabelRecurrence'),
          location: 'right'
        },
        editorOptions: {
          onValueChanged: args => {
            var form = this.form;
            var colSpan = args.value ? 1 : 2;
            form.itemOption(APPOINTMENT_FORM_GROUP_NAMES.Main, 'colSpan', colSpan);
            form.itemOption(APPOINTMENT_FORM_GROUP_NAMES.Recurrence, 'colSpan', colSpan);
            updateRecurrenceItemVisibility(dataExprs.recurrenceRuleExpr, args.value, form);
            changeSize(args.value);
            triggerResize();
          }
        }
      }]
    }, {
      itemType: 'empty',
      colSpan: 2
    }, {
      dataField: dataExprs.descriptionExpr,
      editorType: 'dxTextArea',
      colSpan: 2,
      label: {
        text: messageLocalization.format('dxScheduler-editorLabelDescription')
      }
    }, {
      itemType: 'empty',
      colSpan: 2
    }];
  }

  _createRecurrenceEditor(dataExprs) {
    return [{
      dataField: dataExprs.recurrenceRuleExpr,
      editorType: 'dxRecurrenceEditor',
      editorOptions: {
        firstDayOfWeek: this.scheduler.getFirstDayOfWeek()
      },
      label: {
        text: ' ',
        visible: false
      }
    }];
  }

  setEditorsType(startDateExpr, endDateExpr, allDay) {
    var startDateItemPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.Main, ".").concat(startDateExpr);
    var endDateItemPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.Recurrence, ".").concat(endDateExpr);
    var startDateFormItem = this.form.itemOption(startDateItemPath);
    var endDateFormItem = this.form.itemOption(endDateItemPath);

    if (startDateFormItem && endDateFormItem) {
      var startDateEditorOptions = startDateFormItem.editorOptions;
      var endDateEditorOptions = endDateFormItem.editorOptions;
      startDateEditorOptions.type = endDateEditorOptions.type = allDay ? 'date' : 'datetime';
      this.form.itemOption(startDateItemPath, 'editorOptions', startDateEditorOptions);
      this.form.itemOption(endDateItemPath, 'editorOptions', endDateEditorOptions);
    }
  }

  updateTimeZoneEditorDataSource(date, expression) {
    var timeZoneDataSource = new DataSource({
      store: timeZoneDataUtils.getDisplayedTimeZones(date),
      paginate: true,
      pageSize: 10
    });
    var options = {
      dataSource: timeZoneDataSource
    };
    this.setEditorOptions(expression, 'Main', options);
  }

  updateRecurrenceEditorStartDate(date, expression) {
    var options = {
      startDate: date
    };
    this.setEditorOptions(expression, 'Recurrence', options);
  }

  setEditorOptions(name, groupName, options) {
    var editorPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.groupName, ".").concat(name);
    var editor = this.form.itemOption(editorPath);
    editor && this.form.itemOption(editorPath, 'editorOptions', extend({}, editor.editorOptions, options));
  }

  updateFormData(formData, dataExprs) {
    this.semaphore.take();
    var startDate = new Date(formData[dataExprs.startDateExpr]);
    var endDate = new Date(formData[dataExprs.endDateExpr]);
    this.updateTimeZoneEditorDataSource(startDate, dataExprs.startDateTimeZoneExpr);
    this.updateTimeZoneEditorDataSource(endDate, dataExprs.endDateTimeZoneExpr);
    this.updateRecurrenceEditorStartDate(startDate, dataExprs.recurrenceRuleExpr);
    this.form.option('formData', formData);
    this.semaphore.release();
  }

}
