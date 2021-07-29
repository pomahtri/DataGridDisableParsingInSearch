/**
* DevExtreme (renovation/utils/shallow_equals.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.shallowEquals = void 0;

var shallowEquals = function shallowEquals(firstObject, secondObject) {
  if (Object.keys(firstObject).length !== Object.keys(secondObject).length) {
    return false;
  }

  return Object.keys(firstObject).every(function (key) {
    return firstObject[key] === secondObject[key];
  });
};

exports.shallowEquals = shallowEquals;
