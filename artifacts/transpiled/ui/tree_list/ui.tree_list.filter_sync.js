"use strict";

var _uiTree_list = _interopRequireDefault(require("./ui.tree_list.core"));

var _uiGrid_core = require("../grid_core/ui.grid_core.filter_sync");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_uiTree_list.default.registerModule('filterSync', _uiGrid_core.filterSyncModule);