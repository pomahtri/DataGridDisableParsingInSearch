/**
* DevExtreme (esm/renovation/component_wrapper/navigation/scroll_view.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Component from "../common/component";
import { Deferred } from "../../../core/utils/deferred";
export class ScrollViewWrapper extends Component {
  update() {
    this.viewRef.updateHandler();
    return new Deferred().resolve();
  }

  release(preventScrollBottom) {
    this.viewRef.release(preventScrollBottom);
    return new Deferred().resolve();
  }

  _optionChanged(option) {
    var {
      name
    } = option;

    if (name === "useNative") {
      this._isNodeReplaced = false;
    }

    super._optionChanged(option);
  }

}
