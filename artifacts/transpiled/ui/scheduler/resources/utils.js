"use strict";

exports.getAllGroups = exports.getGroupsObjectFromGroupsArray = exports.getGroupCount = exports.getCellGroups = exports.getPathToLeaf = exports.createResourcesTree = exports.getWrappedDataSource = exports.getFieldExpr = exports.getDisplayExpr = exports.getValueExpr = void 0;

var _utils = require("../../../data/data_source/utils");

var _data_source = require("../../../data/data_source/data_source");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getValueExpr = function getValueExpr(resource) {
  return resource.valueExpr || 'id';
};

exports.getValueExpr = getValueExpr;

var getDisplayExpr = function getDisplayExpr(resource) {
  return resource.displayExpr || 'text';
};

exports.getDisplayExpr = getDisplayExpr;

var getFieldExpr = function getFieldExpr(resource) {
  return resource.fieldExpr || resource.field;
};

exports.getFieldExpr = getFieldExpr;

var getWrappedDataSource = function getWrappedDataSource(dataSource) {
  if (dataSource instanceof _data_source.DataSource) {
    return dataSource;
  }

  var result = {
    store: (0, _utils.normalizeDataSourceOptions)(dataSource).store,
    pageSize: 0
  };

  if (!Array.isArray(dataSource)) {
    result.filter = dataSource.filter;
  }

  return new _data_source.DataSource(result);
};

exports.getWrappedDataSource = getWrappedDataSource;

var createResourcesTree = function createResourcesTree(groups) {
  var leafIndex = 0;

  var make = function make(group, groupIndex, result, parent) {
    result = result || [];

    for (var itemIndex = 0; itemIndex < group.items.length; itemIndex++) {
      var _group$data;

      var currentGroupItem = group.items[itemIndex];
      var resultItem = {
        name: group.name,
        value: currentGroupItem.id,
        title: currentGroupItem.text,
        data: (_group$data = group.data) === null || _group$data === void 0 ? void 0 : _group$data[itemIndex],
        children: [],
        parent: parent || null
      };
      var nextGroupIndex = groupIndex + 1;

      if (groups[nextGroupIndex]) {
        make(groups[nextGroupIndex], nextGroupIndex, resultItem.children, resultItem);
      }

      if (!resultItem.children.length) {
        resultItem.leafIndex = leafIndex;
        leafIndex++;
      }

      result.push(resultItem);
    }

    return result;
  };

  return make(groups[0], 0);
};

exports.createResourcesTree = createResourcesTree;

var getPathToLeaf = function getPathToLeaf(leafIndex, groups) {
  var tree = createResourcesTree(groups);

  var findLeafByIndex = function findLeafByIndex(data, index) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].leafIndex === index) {
        return data[i];
      } else {
        var _leaf = findLeafByIndex(data[i].children, index);

        if (_leaf) {
          return _leaf;
        }
      }
    }
  };

  var makeBranch = function makeBranch(leaf, result) {
    result = result || [];
    result.push(leaf.value);

    if (leaf.parent) {
      makeBranch(leaf.parent, result);
    }

    return result;
  };

  var leaf = findLeafByIndex(tree, leafIndex);
  return makeBranch(leaf).reverse();
}; // TODO rework


exports.getPathToLeaf = getPathToLeaf;

var getCellGroups = function getCellGroups(groupIndex, groups) {
  var result = [];

  if (getGroupCount(groups)) {
    if (groupIndex < 0) {
      return;
    }

    var path = getPathToLeaf(groupIndex, groups);

    for (var i = 0; i < groups.length; i++) {
      result.push({
        name: groups[i].name,
        id: path[i]
      });
    }
  }

  return result;
};

exports.getCellGroups = getCellGroups;

var getGroupCount = function getGroupCount(groups) {
  var result = 0;

  for (var i = 0, len = groups.length; i < len; i++) {
    if (!i) {
      result = groups[i].items.length;
    } else {
      result *= groups[i].items.length;
    }
  }

  return result;
};

exports.getGroupCount = getGroupCount;

var getGroupsObjectFromGroupsArray = function getGroupsObjectFromGroupsArray(groupsArray) {
  return groupsArray.reduce(function (currentGroups, _ref) {
    var name = _ref.name,
        id = _ref.id;
    return _extends({}, currentGroups, _defineProperty({}, name, id));
  }, {});
};

exports.getGroupsObjectFromGroupsArray = getGroupsObjectFromGroupsArray;

var getAllGroups = function getAllGroups(groups) {
  var groupCount = getGroupCount(groups);
  return _toConsumableArray(new Array(groupCount)).map(function (_, groupIndex) {
    var groupsArray = getCellGroups(groupIndex, groups);
    return getGroupsObjectFromGroupsArray(groupsArray);
  });
};

exports.getAllGroups = getAllGroups;