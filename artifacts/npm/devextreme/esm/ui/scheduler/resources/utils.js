/**
* DevExtreme (esm/ui/scheduler/resources/utils.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { normalizeDataSourceOptions } from '../../../data/data_source/utils';
import { DataSource } from '../../../data/data_source/data_source';
export var getValueExpr = resource => resource.valueExpr || 'id';
export var getDisplayExpr = resource => resource.displayExpr || 'text';
export var getFieldExpr = resource => resource.fieldExpr || resource.field;
export var getWrappedDataSource = dataSource => {
  if (dataSource instanceof DataSource) {
    return dataSource;
  }

  var result = {
    store: normalizeDataSourceOptions(dataSource).store,
    pageSize: 0
  };

  if (!Array.isArray(dataSource)) {
    result.filter = dataSource.filter;
  }

  return new DataSource(result);
};
export var createResourcesTree = groups => {
  var leafIndex = 0;

  var make = (group, groupIndex, result, parent) => {
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
export var getPathToLeaf = (leafIndex, groups) => {
  var tree = createResourcesTree(groups);

  var findLeafByIndex = (data, index) => {
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

  var makeBranch = (leaf, result) => {
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

export var getCellGroups = (groupIndex, groups) => {
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
export var getGroupCount = groups => {
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
export var getGroupsObjectFromGroupsArray = groupsArray => {
  return groupsArray.reduce((currentGroups, _ref) => {
    var {
      name,
      id
    } = _ref;
    return _extends({}, currentGroups, {
      [name]: id
    });
  }, {});
};
export var getAllGroups = groups => {
  var groupCount = getGroupCount(groups);
  return [...new Array(groupCount)].map((_, groupIndex) => {
    var groupsArray = getCellGroups(groupIndex, groups);
    return getGroupsObjectFromGroupsArray(groupsArray);
  });
};
