/**
* DevExtreme (renovation/ui/toolbar/toolbar_props.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.ToolbarProps = exports.ToolbarItemType = exports.ToolbarItem = exports.ToolbarDropDownButtonProps = exports.ToolbarDropDownButtonItemPropsType = exports.ToolbarDropDownButtonItemProps = exports.ToolbarButtonProps = exports.ToolbarButtonGroupProps = exports.ToolbarButtonGroupItemPropsType = exports.ToolbarButtonGroupItemProps = exports.ToolbarCheckBoxProps = exports.ToolbarTextBoxProps = exports.CollectionWidgetItem = void 0;

var _base_props = require("../common/base_props");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var CollectionWidgetItem = {};
exports.CollectionWidgetItem = CollectionWidgetItem;
var ToolbarTextBoxProps = {
  value: ""
};
exports.ToolbarTextBoxProps = ToolbarTextBoxProps;
var ToolbarCheckBoxProps = {
  value: false
};
exports.ToolbarCheckBoxProps = ToolbarCheckBoxProps;

var ToolbarButtonGroupItemProps = _extends({}, CollectionWidgetItem);

exports.ToolbarButtonGroupItemProps = ToolbarButtonGroupItemProps;
var ToolbarButtonGroupItemPropsType = {};
exports.ToolbarButtonGroupItemPropsType = ToolbarButtonGroupItemPropsType;
var ToolbarButtonGroupProps = {};
exports.ToolbarButtonGroupProps = ToolbarButtonGroupProps;
var ToolbarButtonProps = {};
exports.ToolbarButtonProps = ToolbarButtonProps;

var ToolbarDropDownButtonItemProps = _extends({}, CollectionWidgetItem);

exports.ToolbarDropDownButtonItemProps = ToolbarDropDownButtonItemProps;
var ToolbarDropDownButtonItemPropsType = {};
exports.ToolbarDropDownButtonItemPropsType = ToolbarDropDownButtonItemPropsType;
var ToolbarDropDownButtonProps = {};
exports.ToolbarDropDownButtonProps = ToolbarDropDownButtonProps;

var ToolbarItem = _extends({}, CollectionWidgetItem);

exports.ToolbarItem = ToolbarItem;
var ToolbarItemType = {};
exports.ToolbarItemType = ToolbarItemType;

var ToolbarProps = _extends({}, _base_props.BaseWidgetProps);

exports.ToolbarProps = ToolbarProps;
