/**
* DevExtreme (cjs/ui/form/ui.form.utils.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getLabelWidthByText = getLabelWidthByText;
exports.renderLabel = renderLabel;
exports.renderHelpText = renderHelpText;
exports.getItemPath = exports.isFullPathContainsTabs = exports.tryGetTabPath = exports.getOptionNameFromFullName = exports.getFullOptionName = exports.isExpectedItem = exports.getTextWithoutSpaces = exports.concatPaths = exports.createItemPathByIndex = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _type = require("../../core/utils/type");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var createItemPathByIndex = function createItemPathByIndex(index, isTabs) {
  return "".concat(isTabs ? 'tabs' : 'items', "[").concat(index, "]");
};

exports.createItemPathByIndex = createItemPathByIndex;

var concatPaths = function concatPaths(path1, path2) {
  if ((0, _type.isDefined)(path1) && (0, _type.isDefined)(path2)) {
    return "".concat(path1, ".").concat(path2);
  }

  return path1 || path2;
};

exports.concatPaths = concatPaths;

var getTextWithoutSpaces = function getTextWithoutSpaces(text) {
  return text ? text.replace(/\s/g, '') : undefined;
};

exports.getTextWithoutSpaces = getTextWithoutSpaces;

var isExpectedItem = function isExpectedItem(item, fieldName) {
  return item && (item.dataField === fieldName || item.name === fieldName || getTextWithoutSpaces(item.title) === fieldName || item.itemType === 'group' && getTextWithoutSpaces(item.caption) === fieldName);
};

exports.isExpectedItem = isExpectedItem;

var getFullOptionName = function getFullOptionName(path, optionName) {
  return "".concat(path, ".").concat(optionName);
};

exports.getFullOptionName = getFullOptionName;

var getOptionNameFromFullName = function getOptionNameFromFullName(fullName) {
  var parts = fullName.split('.');
  return parts[parts.length - 1].replace(/\[\d+]/, '');
};

exports.getOptionNameFromFullName = getOptionNameFromFullName;

var tryGetTabPath = function tryGetTabPath(fullPath) {
  var pathParts = fullPath.split('.');

  var resultPathParts = _toConsumableArray(pathParts);

  for (var i = pathParts.length - 1; i >= 0; i--) {
    if (isFullPathContainsTabs(pathParts[i])) {
      return resultPathParts.join('.');
    }

    resultPathParts.splice(i, 1);
  }

  return '';
};

exports.tryGetTabPath = tryGetTabPath;

var isFullPathContainsTabs = function isFullPathContainsTabs(fullPath) {
  return fullPath.indexOf('tabs') > -1;
};

exports.isFullPathContainsTabs = isFullPathContainsTabs;

var getItemPath = function getItemPath(items, item, isTabs) {
  var index = items.indexOf(item);

  if (index > -1) {
    return createItemPathByIndex(index, isTabs);
  }

  for (var i = 0; i < items.length; i++) {
    var targetItem = items[i];
    var tabOrGroupItems = targetItem.tabs || targetItem.items;

    if (tabOrGroupItems) {
      var itemPath = getItemPath(tabOrGroupItems, item, targetItem.tabs);

      if (itemPath) {
        return concatPaths(createItemPathByIndex(i, isTabs), itemPath);
      }
    }
  }
};

exports.getItemPath = getItemPath;

function getLabelWidthByText(renderLabelOptions) {
  var $hiddenContainer = (0, _renderer.default)('<div>').addClass(_constants.WIDGET_CLASS).addClass(_constants.HIDDEN_LABEL_CLASS).appendTo('body');
  var $label = renderLabel(renderLabelOptions).appendTo($hiddenContainer);
  var labelTextElement = $label.find('.' + _constants.FIELD_ITEM_LABEL_TEXT_CLASS)[0]; // this code has slow performance

  var result = labelTextElement.offsetWidth;
  $hiddenContainer.remove();
  return result;
}

function renderLabel(_ref) {
  var text = _ref.text,
      id = _ref.id,
      location = _ref.location,
      alignment = _ref.alignment,
      _ref$labelID = _ref.labelID,
      labelID = _ref$labelID === void 0 ? null : _ref$labelID,
      _ref$markOptions = _ref.markOptions,
      markOptions = _ref$markOptions === void 0 ? {} : _ref$markOptions;

  if (!(0, _type.isDefined)(text) || text.length <= 0) {
    return null;
  }

  return (0, _renderer.default)('<label>').addClass(_constants.FIELD_ITEM_LABEL_CLASS + ' ' + _constants.FIELD_ITEM_LABEL_LOCATION_CLASS + location).attr('for', id).attr('id', labelID).css('textAlign', alignment).append((0, _renderer.default)('<span>').addClass(_constants.FIELD_ITEM_LABEL_CONTENT_CLASS).append((0, _renderer.default)('<span>').addClass(_constants.FIELD_ITEM_LABEL_TEXT_CLASS).text(text), _renderLabelMark(markOptions)));
}

function renderHelpText(helpText, helpID) {
  return (0, _renderer.default)('<div>').addClass(_constants.FIELD_ITEM_HELP_TEXT_CLASS).attr('id', helpID).text(helpText);
}

function _renderLabelMark(_ref2) {
  var isRequiredMark = _ref2.isRequiredMark,
      requiredMark = _ref2.requiredMark,
      isOptionalMark = _ref2.isOptionalMark,
      optionalMark = _ref2.optionalMark;

  if (!isRequiredMark && !isOptionalMark) {
    return null;
  }

  return (0, _renderer.default)('<span>').addClass(isRequiredMark ? _constants.FIELD_ITEM_REQUIRED_MARK_CLASS : _constants.FIELD_ITEM_OPTIONAL_MARK_CLASS).text(String.fromCharCode(160) + (isRequiredMark ? requiredMark : optionalMark));
}
