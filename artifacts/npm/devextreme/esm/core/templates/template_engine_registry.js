/**
* DevExtreme (esm/core/templates/template_engine_registry.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isString } from '../utils/type';
import errors from '../errors';
var templateEngines = {};
var currentTemplateEngine;
export function registerTemplateEngine(name, templateEngine) {
  templateEngines[name] = templateEngine;
}
export function setTemplateEngine(templateEngine) {
  if (isString(templateEngine)) {
    currentTemplateEngine = templateEngines[templateEngine];

    if (!currentTemplateEngine) {
      throw errors.Error('E0020', templateEngine);
    }
  } else {
    currentTemplateEngine = templateEngine;
  }
}
export function getCurrentTemplateEngine() {
  return currentTemplateEngine;
}
