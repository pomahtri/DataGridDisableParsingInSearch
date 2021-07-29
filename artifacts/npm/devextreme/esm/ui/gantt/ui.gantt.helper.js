/**
* DevExtreme (esm/ui/gantt/ui.gantt.helper.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { compileGetter, compileSetter } from '../../core/utils/data';
import messageLocalization from '../../localization/message';
export var GanttHelper = {
  prepareMapHandler(getters) {
    return data => {
      return Object.keys(getters).reduce((previous, key) => {
        var resultKey = key === 'key' ? 'id' : key;
        previous[resultKey] = getters[key](data);
        return previous;
      }, {});
    };
  },

  prepareSetterMapHandler(setters) {
    return data => {
      return Object.keys(setters).reduce((previous, key) => {
        var resultKey = key === 'key' ? 'id' : key;
        setters[key](previous, data[resultKey]);
        return previous;
      }, {});
    };
  },

  compileGettersByOption(optionValue) {
    var getters = {};

    for (var field in optionValue) {
      var exprMatches = field.match(/(\w*)Expr/);

      if (exprMatches) {
        getters[exprMatches[1]] = compileGetter(optionValue[exprMatches[0]]);
      }
    }

    return getters;
  },

  compileSettersByOption(optionValue) {
    var setters = {};

    for (var field in optionValue) {
      var exprMatches = field.match(/(\w*)Expr/);

      if (exprMatches) {
        setters[exprMatches[1]] = compileSetter(optionValue[exprMatches[0]]);
      }
    }

    return setters;
  },

  getStoreObject(option, modelObject) {
    var setters = GanttHelper.compileSettersByOption(option);
    return Object.keys(setters).reduce((previous, key) => {
      if (key !== 'key') {
        setters[key](previous, modelObject[key]);
      }

      return previous;
    }, {});
  },

  getInvertedData(data, keyGetter) {
    var inverted = {};

    if (data) {
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var key = keyGetter(dataItem);
        inverted[key] = dataItem;
      }
    }

    return inverted;
  },

  getArrayFromOneElement(element) {
    return element === undefined || element === null ? [] : [element];
  },

  getSelectionMode(allowSelection) {
    return allowSelection ? 'single' : 'none';
  },

  convertTreeToList(root) {
    var stack = [];
    var array = [];
    var hashMap = {};
    stack.push(root);

    while (stack.length !== 0) {
      var node = stack.pop();

      if (!node.children || node.children.length === 0) {
        GanttHelper.visitNode(node, hashMap, array);
      } else {
        array.push(node.data);
        var childrenCount = node.children.length - 1;

        for (var i = childrenCount; i >= 0; i--) {
          stack.push(node.children[i]);
        }
      }
    }

    array.shift();
    return array;
  },

  visitNode(node, hashMap, array) {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node.data);
    }
  },

  getDefaultOptions() {
    return {
      /**
      * @name dxGanttOptions.rtlEnabled
      * @hidden
      */
      tasks: {
        dataSource: null,
        keyExpr: 'id',
        parentIdExpr: 'parentId',
        startExpr: 'start',
        endExpr: 'end',
        progressExpr: 'progress',
        titleExpr: 'title',
        colorExpr: 'color'
      },
      dependencies: {
        dataSource: null,
        keyExpr: 'id',
        predecessorIdExpr: 'predecessorId',
        successorIdExpr: 'successorId',
        typeExpr: 'type'
      },
      resources: {
        dataSource: null,
        keyExpr: 'id',
        textExpr: 'text',
        colorExpr: 'color'
      },
      resourceAssignments: {
        dataSource: null,
        keyExpr: 'id',
        taskIdExpr: 'taskId',
        resourceIdExpr: 'resourceId'
      },
      columns: undefined,
      taskListWidth: 300,
      showResources: true,
      taskTitlePosition: 'inside',
      firstDayOfWeek: undefined,
      selectedRowKey: undefined,
      onSelectionChanged: null,
      onTaskClick: null,
      onTaskDblClick: null,
      onTaskInserting: null,
      onTaskInserted: null,
      onTaskDeleting: null,
      onTaskDeleted: null,
      onTaskUpdating: null,
      onTaskUpdated: null,
      onTaskMoving: null,
      onTaskEditDialogShowing: null,
      onDependencyInserting: null,
      onDependencyInserted: null,
      onDependencyDeleting: null,
      onDependencyDeleted: null,
      onResourceInserting: null,
      onResourceInserted: null,
      onResourceDeleting: null,
      onResourceDeleted: null,
      onResourceAssigning: null,
      onResourceAssigned: null,
      // eslint-disable-next-line spellcheck/spell-checker
      onResourceUnassigning: null,
      // eslint-disable-next-line spellcheck/spell-checker
      onResourceUnassigned: null,
      onCustomCommand: null,
      onContextMenuPreparing: null,
      allowSelection: true,
      showRowLines: true,
      stripLines: undefined,
      scaleType: 'auto',
      editing: {
        enabled: false,
        allowTaskAdding: true,
        allowTaskDeleting: true,
        allowTaskUpdating: true,
        allowDependencyAdding: true,
        allowDependencyDeleting: true,
        allowResourceAdding: true,
        allowResourceDeleting: true,
        allowResourceUpdating: true,
        allowTaskResourceUpdating: true
      },
      validation: {
        validateDependencies: false,
        autoUpdateParentTasks: false,
        enablePredecessorGap: false
      },
      toolbar: null,
      contextMenu: {
        enabled: true,
        items: undefined
      },
      taskTooltipContentTemplate: null,
      taskProgressTooltipContentTemplate: null,
      taskTimeTooltipContentTemplate: null,
      taskContentTemplate: null,
      rootValue: 0,
      sorting: {
        ascendingText: messageLocalization.format('dxGantt-sortingAscendingText'),
        descendingText: messageLocalization.format('dxGantt-sortingDescendingText'),
        clearText: messageLocalization.format('dxGantt-sortingClearText'),
        mode: 'none',
        showSortIndexes: false
      }
    };
  }

};
