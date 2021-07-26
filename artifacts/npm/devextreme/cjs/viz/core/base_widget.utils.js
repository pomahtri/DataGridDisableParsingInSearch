/**
* DevExtreme (cjs/viz/core/base_widget.utils.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.createEventTrigger = createEventTrigger;
exports.createResizeHandler = createResizeHandler;
exports.createIncidentOccurred = void 0;

var _version = require("../../core/version");

var _string = require("../../core/utils/string");

var _errors_warnings = _interopRequireDefault(require("./errors_warnings"));

var _iterator = require("../../core/utils/iterator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR_MESSAGES = _errors_warnings.default.ERROR_MESSAGES;

function createEventTrigger(eventsMap, callbackGetter) {
  var triggers = {};
  (0, _iterator.each)(eventsMap, function (name, info) {
    if (info.name) {
      createEvent(name);
    }
  });
  var changes;

  triggerEvent.change = function (name) {
    var eventInfo = eventsMap[name];

    if (eventInfo) {
      (changes = changes || {})[name] = eventInfo;
    }

    return !!eventInfo;
  };

  triggerEvent.applyChanges = function () {
    if (changes) {
      (0, _iterator.each)(changes, function (name, eventInfo) {
        createEvent(eventInfo.newName || name);
      });
      changes = null;
    }
  };

  triggerEvent.dispose = function () {
    eventsMap = callbackGetter = triggers = null;
  };

  return triggerEvent;

  function createEvent(name) {
    var eventInfo = eventsMap[name];
    triggers[eventInfo.name] = callbackGetter(name);
  }

  function triggerEvent(name, arg, complete) {
    triggers[name](arg);
    complete && complete();
  }
}

var createIncidentOccurred = function createIncidentOccurred(widgetName, eventTrigger) {
  return function incidentOccurred(id, args) {
    eventTrigger('incidentOccurred', {
      target: {
        id: id,
        type: id[0] === 'E' ? 'error' : 'warning',
        args: args,
        text: _string.format.apply(null, [ERROR_MESSAGES[id]].concat(args || [])),
        widget: widgetName,
        version: _version.version
      }
    });
  };
};

exports.createIncidentOccurred = createIncidentOccurred;

function createResizeHandler(callback) {
  var timeout;

  var handler = function handler() {
    clearTimeout(timeout);
    timeout = setTimeout(callback, 100);
  };

  handler.dispose = function () {
    clearTimeout(timeout);
    return this;
  };

  return handler;
}
