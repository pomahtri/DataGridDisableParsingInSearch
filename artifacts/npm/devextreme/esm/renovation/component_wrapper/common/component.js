/**
* DevExtreme (esm/renovation/component_wrapper/common/component.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { render, createRef } from "inferno";
import { createElement } from "inferno-create-element";
import { InfernoEffectHost, hydrate } from "@devextreme/vdom";
import $ from "../../../core/renderer";
import domAdapter from "../../../core/dom_adapter";
import DOMComponent from "../../../core/dom_component";
import { extend } from "../../../core/utils/extend";
import { getPublicElement } from "../../../core/element";
import { isDefined, isRenderer, isString } from "../../../core/utils/type";
import { TemplateWrapper } from "./template_wrapper";
import { updatePropsImmutable } from "../utils/update_props_immutable";

var setDefaultOptionValue = (options, defaultValueGetter) => name => {
  if (Object.prototype.hasOwnProperty.call(options, name) && options[name] === undefined) {
    options[name] = defaultValueGetter(name);
  }
};

export default class ComponentWrapper extends DOMComponent {
  constructor() {
    super(...arguments);
    this._shouldRaiseContentReady = false;
  }

  get _propsInfo() {
    return {
      allowNull: [],
      twoWay: [],
      elements: [],
      templates: [],
      props: []
    };
  }

  get viewRef() {
    var _this$_viewRef;

    return (_this$_viewRef = this._viewRef) === null || _this$_viewRef === void 0 ? void 0 : _this$_viewRef.current;
  }

  _checkContentReadyOption(fullName) {
    var contentReadyOptions = this._getContentReadyOptions().reduce((options, name) => {
      options[name] = true;
      return options;
    }, {});

    this._checkContentReadyOption = optionName => !!contentReadyOptions[optionName];

    return this._checkContentReadyOption(fullName);
  }

  _getContentReadyOptions() {
    return ["rtlEnabled"];
  }

  _fireContentReady() {
    this._actionsMap.onContentReady({});
  }

  _getDefaultOptions() {
    return extend(true, super._getDefaultOptions(), this._viewComponent.defaultProps, this._propsInfo.twoWay.reduce((options, _ref) => {
      var [name, defaultName, eventName] = _ref;
      return _extends({}, options, {
        [name]: this._viewComponent.defaultProps[defaultName],
        [eventName]: value => this.option(name, value)
      });
    }, {}), this._propsInfo.templates.reduce((options, name) => _extends({}, options, {
      [name]: null
    }), {}));
  }

  _initMarkup() {
    var props = this.getProps();

    this._renderWrapper(props);
  }

  _renderWrapper(props) {
    var containerNode = this.$element()[0];
    var {
      parentNode
    } = containerNode;

    if (!this._isNodeReplaced) {
      var nextNode = containerNode === null || containerNode === void 0 ? void 0 : containerNode.nextSibling;
      var rootNode = domAdapter.createElement("div");
      rootNode.appendChild(containerNode);

      var mountNode = this._documentFragment.appendChild(rootNode);

      InfernoEffectHost.lock();
      hydrate(createElement(this._viewComponent, props), mountNode);
      containerNode.$V = mountNode.$V;

      if (parentNode) {
        parentNode.insertBefore(containerNode, nextNode);
      }

      this._isNodeReplaced = true;
      InfernoEffectHost.callEffects();
      this._shouldRaiseContentReady = true;
    } else {
      render(createElement(this._viewComponent, props), containerNode);
    }

    if (this._shouldRaiseContentReady) {
      this._fireContentReady();

      this._shouldRaiseContentReady = false;
    }
  }

  _silent(name, value) {
    this._options.silent(name, value);
  }

  _render() {}

  _removeWidget() {
    var containerNode = this.$element()[0];
    var {
      parentNode
    } = containerNode;

    if (parentNode) {
      parentNode.$V = containerNode.$V;
      render(null, parentNode);
      parentNode.appendChild(containerNode);
      containerNode.innerHTML = "";
      delete parentNode.$V;
    }

    delete containerNode.$V;
  }

  _dispose() {
    this._removeWidget();

    super._dispose();
  }

  get elementAttr() {
    if (!this._elementAttr) {
      var {
        attributes
      } = this.$element()[0];
      this._elementAttr = _extends({}, Object.keys(attributes).reduce((result, key) => {
        var updatedAttributes = result;

        if (attributes[key].specified) {
          updatedAttributes[attributes[key].name] = attributes[key].value;
        }

        return updatedAttributes;
      }, {}));
      this._storedClasses = this.$element()[0].getAttribute("class") || "";
    }

    var elemStyle = this.$element()[0].style;
    var style = {};

    for (var i = 0; i < elemStyle.length; i += 1) {
      style[elemStyle[i]] = elemStyle.getPropertyValue(elemStyle[i]);
    }

    this._elementAttr.style = style;
    this._elementAttr.class = this._storedClasses;
    return this._elementAttr;
  }

  _getAdditionalActionConfigs() {
    return {
      onContentReady: {
        excludeValidators: ["disabled", "readOnly"]
      }
    };
  }

  _getAdditionalProps() {
    return [];
  }

  _patchOptionValues(options) {
    var {
      allowNull,
      elements,
      props,
      twoWay
    } = this._propsInfo;
    var {
      defaultProps
    } = this._viewComponent;
    var {
      children,
      onKeyboardHandled,
      ref
    } = options;
    var onKeyDown = onKeyboardHandled ? (_, event_options) => {
      onKeyboardHandled(event_options);
    } : undefined;
    var widgetProps = {
      ref,
      children,
      onKeyDown
    };
    [...props, ...this._getAdditionalProps()].forEach(propName => {
      if (Object.prototype.hasOwnProperty.call(options, propName)) {
        widgetProps[propName] = options[propName];
      }
    });
    allowNull.forEach(setDefaultOptionValue(widgetProps, () => null));
    Object.keys(defaultProps).forEach(setDefaultOptionValue(widgetProps, name => defaultProps[name]));
    twoWay.forEach(_ref2 => {
      var [name, defaultName] = _ref2;
      setDefaultOptionValue(widgetProps, () => defaultProps[defaultName])(name);
    });
    elements.forEach(name => {
      if (name in widgetProps) {
        var value = widgetProps[name];

        if (isRenderer(value)) {
          widgetProps[name] = this._patchElementParam(value);
        }
      }
    });
    return widgetProps;
  }

  getProps() {
    var _this$elementAttr$cla, _elementAttr$class;

    var {
      elementAttr
    } = this.option();

    var options = this._patchOptionValues(_extends({}, this._props, {
      ref: this._viewRef,
      children: this._extractDefaultSlot()
    }));

    this._propsInfo.templates.forEach(template => {
      options[template] = this._componentTemplates[template];
    });

    return _extends({}, options, this.elementAttr, elementAttr, {
      className: [...((_this$elementAttr$cla = this.elementAttr.class) !== null && _this$elementAttr$cla !== void 0 ? _this$elementAttr$cla : "").split(" "), ...((_elementAttr$class = elementAttr === null || elementAttr === void 0 ? void 0 : elementAttr.class) !== null && _elementAttr$class !== void 0 ? _elementAttr$class : "").split(" ")].filter((c, i, a) => c && a.indexOf(c) === i).join(" ").trim(),
      class: ""
    }, this._actionsMap);
  }

  _getActionConfigs() {
    return {};
  }

  _getActionConfigsFull() {
    return _extends({}, this._getActionConfigs(), this._getAdditionalActionConfigs());
  }

  getDefaultTemplates() {
    var defaultTemplates = Object.values(this._templatesInfo);
    var result = {};
    defaultTemplates.forEach(template => {
      result[template] = "dx-renovation-template-mock";
    });
    return result;
  }

  get _templatesInfo() {
    return {};
  }

  _optionsWithDefaultTemplates(options) {
    var templateOptions = Object.entries(this._templatesInfo).reduce((result, _ref3) => {
      var _options$templateName;

      var [templateName, templateValue] = _ref3;
      return _extends({}, result, {
        [templateName]: (_options$templateName = options[templateName]) !== null && _options$templateName !== void 0 ? _options$templateName : templateValue
      });
    }, {});
    return _extends({}, options, templateOptions);
  }

  _init() {
    var _this$_templateManage;

    super._init();

    this.customKeyHandlers = {};
    this.defaultKeyHandlers = {};
    (_this$_templateManage = this._templateManager) === null || _this$_templateManage === void 0 ? void 0 : _this$_templateManage.addDefaultTemplates(this.getDefaultTemplates());
    this._props = this._optionsWithDefaultTemplates(this.option());
    this._documentFragment = domAdapter.createDocumentFragment();
    this._actionsMap = {};
    this._componentTemplates = {};

    this._propsInfo.templates.forEach(template => {
      this._componentTemplates[template] = this._createTemplateComponent(this._props[template]);
    });

    Object.keys(this._getActionConfigsFull()).forEach(name => this._addAction(name));
    this._viewRef = createRef();
  }

  _addAction(event, actionToAdd) {
    var action = actionToAdd;

    if (!action) {
      var actionByOption = this._createActionByOption(event, this._getActionConfigsFull()[event]);

      action = actArgs => {
        Object.keys(actArgs).forEach(name => {
          if (isDefined(actArgs[name]) && domAdapter.isNode(actArgs[name])) {
            actArgs[name] = getPublicElement($(actArgs[name]));
          }
        });
        return actionByOption(actArgs);
      };
    }

    this._actionsMap[event] = action;
  }

  _optionChanged(option) {
    var {
      fullName,
      name,
      value
    } = option;
    updatePropsImmutable(this._props, this.option(), name, fullName);

    if (this._propsInfo.templates.includes(name)) {
      this._componentTemplates[name] = this._createTemplateComponent(value);
    }

    if (name && this._getActionConfigsFull()[name]) {
      this._addAction(name);
    }

    this._shouldRaiseContentReady = this._shouldRaiseContentReady || this._checkContentReadyOption(fullName);

    super._optionChanged(option);

    this._invalidate();
  }

  _extractDefaultSlot() {
    if (this.option("_hasAnonymousTemplateContent")) {
      return createElement(TemplateWrapper, {
        template: this._getTemplate(this._templateManager.anonymousTemplateName),
        transclude: true
      });
    }

    return null;
  }

  _createTemplateComponent(templateOption) {
    if (!templateOption) {
      return undefined;
    }

    var template = this._getTemplate(templateOption);

    if (isString(template) && template === "dx-renovation-template-mock") {
      return undefined;
    }

    var templateWrapper = model => createElement(TemplateWrapper, {
      template,
      model
    });

    return templateWrapper;
  }

  _wrapKeyDownHandler(initialHandler) {
    return options => {
      var {
        keyName,
        originalEvent,
        which
      } = options;
      var keys = this.customKeyHandlers;
      var func = keys[keyName] || keys[which];

      if (func !== undefined) {
        var handler = func.bind(this);
        var result = handler(originalEvent, options);

        if (!result) {
          originalEvent.cancel = true;
          return originalEvent;
        }
      }

      return initialHandler === null || initialHandler === void 0 ? void 0 : initialHandler(originalEvent, options);
    };
  }

  _toPublicElement(element) {
    return getPublicElement($(element));
  }

  _patchElementParam(value) {
    try {
      var result = $(value);
      var element = result === null || result === void 0 ? void 0 : result.get(0);
      return element !== null && element !== void 0 && element.nodeType ? element : value;
    } catch (error) {
      return value;
    }
  }

  repaint() {
    this._isNodeReplaced = false;
    this._shouldRaiseContentReady = true;

    this._removeWidget();

    this._refresh();
  }

  _supportedKeys() {
    return _extends({}, this.defaultKeyHandlers, this.customKeyHandlers);
  }

  registerKeyHandler(key, handler) {
    this.customKeyHandlers[key] = handler;
  }

  setAria(_name, _value) {
    throw new Error('"setAria" method is deprecated, use "aria" property instead');
  }

}
ComponentWrapper.IS_RENOVATED_WIDGET = false;
ComponentWrapper.IS_RENOVATED_WIDGET = true;
