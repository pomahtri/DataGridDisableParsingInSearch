"use strict";

exports.getElementComputedStyle = getElementComputedStyle;

function getElementComputedStyle(el) {
  return window.getComputedStyle(el);
}