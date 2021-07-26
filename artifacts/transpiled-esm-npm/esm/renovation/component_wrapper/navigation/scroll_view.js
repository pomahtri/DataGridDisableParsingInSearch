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