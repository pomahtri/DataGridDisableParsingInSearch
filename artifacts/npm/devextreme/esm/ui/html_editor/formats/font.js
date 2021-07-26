/**
* DevExtreme (esm/ui/html_editor/formats/font.js)
* Version: 21.2.0
* Build date: Mon Jul 26 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Quill from 'devextreme-quill';
var FontStyle = {};

if (Quill) {
  FontStyle = Quill.import('attributors/style/font');
  FontStyle.whitelist = null;
}

export default FontStyle;
