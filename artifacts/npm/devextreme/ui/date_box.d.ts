/**
* DevExtreme (ui/date_box.d.ts)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo
} from '../events/index';

import {
    ComponentDisabledDate,
    dxCalendarOptions
} from './calendar';

import dxDropDownEditor, {
    dxDropDownEditorOptions,
    DropDownButtonTemplateDataModel
} from './drop_down_editor/ui.drop_down_editor';

import {
    ValueChangedInfo
} from './editor/editor';

import {
    Format
} from '../localization';

import {
    Properties as PopupProperties
} from './popup';


/** @public */
export type ChangeEvent = NativeEventInfo<dxDateBox>;

/** @public */
export type ClosedEvent = EventInfo<dxDateBox>;

/** @public */
export type ContentReadyEvent = EventInfo<dxDateBox>;

/** @public */
export type CopyEvent = NativeEventInfo<dxDateBox>;

/** @public */
export type CutEvent = NativeEventInfo<dxDateBox>;

/** @public */
export type DisposingEvent = EventInfo<dxDateBox>;

/** @public */
export type EnterKeyEvent = NativeEventInfo<dxDateBox>;

/** @public */
export type FocusInEvent = NativeEventInfo<dxDateBox>;

/** @public */
export type FocusOutEvent = NativeEventInfo<dxDateBox>;

/** @public */
export type InitializedEvent = InitializedEventInfo<dxDateBox>;

/** @public */
export type InputEvent = NativeEventInfo<dxDateBox>;

/** @public */
export type KeyDownEvent = NativeEventInfo<dxDateBox>;

/** @public */
export type KeyPressEvent = NativeEventInfo<dxDateBox>;

/** @public */
export type KeyUpEvent = NativeEventInfo<dxDateBox>;

/** @public */
export type OpenedEvent = EventInfo<dxDateBox>;

/** @public */
export type OptionChangedEvent = EventInfo<dxDateBox> & ChangedOptionInfo;

/** @public */
export type PasteEvent = NativeEventInfo<dxDateBox>;

/** @public */
export type ValueChangedEvent = NativeEventInfo<dxDateBox> & ValueChangedInfo;

/** @public */
export type DisabledDate = ComponentDisabledDate<dxDateBox>;

/** @public */
export type DropDownButtonTemplateData = DropDownButtonTemplateDataModel;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 */
export interface dxDateBoxOptions extends dxDropDownEditorOptions<dxDateBox> {
    /**
     * @docid
     * @default false
     * @public
     */
    adaptivityEnabled?: boolean;
    /**
     * @docid
     * @default "OK"
     * @public
     */
    applyButtonText?: string;
    /**
     * @docid
     * @default {}
     * @public
     */
    calendarOptions?: dxCalendarOptions;
    /**
     * @docid
     * @default "Cancel"
     * @public
     */
    cancelButtonText?: string;
    /**
     * @docid
     * @default "Value is out of range"
     * @public
     */
    dateOutOfRangeMessage?: string;
    /**
     * @docid
     * @default undefined
     * @public
     */
    dateSerializationFormat?: string;
    /**
     * @docid
     * @default null
     * @type_function_param1 data:object
     * @type_function_param1_field1 component:dxDateBox
     * @type_function_param1_field2 date:Date
     * @type_function_param1_field3 view:string
     * @type_function_return boolean
     * @public
     */
    disabledDates?: Array<Date> | ((data: DisabledDate) => boolean);
    /**
     * @docid
     * @default null
     * @public
     */
    displayFormat?: Format;
    /**
     * @docid
     * @default 30
     * @public
     */
    interval?: number;
    /**
     * @docid
     * @default "Value must be a date or time"
     * @public
     */
    invalidDateMessage?: string;
    /**
     * @docid
     * @default undefined
     * @public
     */
    max?: Date | number | string;
    /**
     * @docid
     * @default undefined
     * @public
     */
    min?: Date | number | string;
    /**
     * @docid
     * @type Enums.DateBoxPickerType
     * @default 'calendar'
     * @default 'native' &for(iOS)
     * @default 'native' &for(Android)
     * @default 'rollers' &for(Android_below_version_4.4)
     * @default 'rollers' &for(mobile_devices)
     * @public
     */
    pickerType?: 'calendar' | 'list' | 'native' | 'rollers';
    /**
     * @docid
     * @default ""
     * @public
     */
    placeholder?: string;
    /**
     * @docid
     * @default true
     * @public
     */
    showAnalogClock?: boolean;
    /**
     * @docid
     * @type Enums.DateBoxType
     * @default "date"
     * @public
     */
    type?: 'date' | 'datetime' | 'time';
    /**
     * @docid
     * @default false
     * @public
     */
    useMaskBehavior?: boolean;
    /**
     * @docid
     * @default null
     * @public
     */
    value?: Date | number | string;

    /**
     * @docid
     * @type dxPopupOptions
     */
    dropDownOptions?: PopupProperties;
}
/**
 * @docid
 * @isEditor
 * @inherits dxDropDownEditor
 * @module ui/date_box
 * @export default
 * @namespace DevExpress.ui
 * @public
 */
export default class dxDateBox extends dxDropDownEditor<dxDateBoxOptions> {
    /**
     * @docid
     * @publicName close()
     * @public
     */
    close(): void;
    /**
     * @docid
     * @publicName open()
     * @public
     */
    open(): void;
}

/** @public */
export type Properties = dxDateBoxOptions;

/** @deprecated use Properties instead */
export type Options = dxDateBoxOptions;

/** @deprecated use Properties instead */
export type IOptions = dxDateBoxOptions;
