/**
* DevExtreme (cjs/ui/scheduler/workspaces/ui.scheduler.work_space_vertical.js)
* Version: 21.2.0
* Build date: Wed Jul 28 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;

var _uiSchedulerWork_space = _interopRequireDefault(require("./ui.scheduler.work_space.indicator"));

var _base = require("./utils/base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SchedulerWorkspaceVertical = /*#__PURE__*/function (_SchedulerWorkSpaceIn) {
  _inheritsLoose(SchedulerWorkspaceVertical, _SchedulerWorkSpaceIn);

  function SchedulerWorkspaceVertical() {
    return _SchedulerWorkSpaceIn.apply(this, arguments) || this;
  }

  var _proto = SchedulerWorkspaceVertical.prototype;

  _proto._getFormat = function _getFormat() {
    return _base.formatWeekdayAndDay;
  };

  _proto.generateRenderOptions = function generateRenderOptions() {
    var options = _SchedulerWorkSpaceIn.prototype.generateRenderOptions.call(this);

    return _extends({}, options, {
      isGenerateTimePanelData: true
    });
  };

  return SchedulerWorkspaceVertical;
}(_uiSchedulerWork_space.default);

var _default = SchedulerWorkspaceVertical;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
