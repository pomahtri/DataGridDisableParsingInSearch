/**
* DevExtreme (cjs/ui/scheduler/modelProvider.js)
* Version: 21.2.0
* Build date: Wed Jul 28 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.ModelProvider = void 0;

var _utils = require("./resources/utils");

var _instanceFactory = require("./instanceFactory");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ModelProvider = /*#__PURE__*/function () {
  function ModelProvider(model) {
    this.model = model;
  }

  var _proto = ModelProvider.prototype;

  _proto._isHorizontalGroupedWorkSpace = function _isHorizontalGroupedWorkSpace() {
    return !!this.loadedResources.length && this.model['groupOrientation'] === 'horizontal';
  };

  _proto.isGroupedByDate = function isGroupedByDate() {
    return this.model['groupByDate'] && this._isHorizontalGroupedWorkSpace() && (0, _utils.getGroupCount)(this.loadedResources) > 0;
  };

  _createClass(ModelProvider, [{
    key: "key",
    get: function get() {
      return this.model.key;
    }
  }, {
    key: "resourceManager",
    get: function get() {
      return (0, _instanceFactory.getResourceManager)(this.key);
    }
  }, {
    key: "loadedResources",
    get: function get() {
      return this.resourceManager.loadedResources;
    }
  }]);

  return ModelProvider;
}();

exports.ModelProvider = ModelProvider;
