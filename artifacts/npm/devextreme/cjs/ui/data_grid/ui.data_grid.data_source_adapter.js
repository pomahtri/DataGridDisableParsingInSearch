/**
* DevExtreme (cjs/ui/data_grid/ui.data_grid.data_source_adapter.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;

var _uiGrid_core = _interopRequireDefault(require("../grid_core/ui.grid_core.data_source_adapter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataSourceAdapterType = _uiGrid_core.default;
var _default = {
  extend: function extend(extender) {
    dataSourceAdapterType = dataSourceAdapterType.inherit(extender);
  },
  create: function create(component) {
    return new dataSourceAdapterType(component);
  }
};
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
