/**
* DevExtreme (esm/ui/html_editor/formats/size.js)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Quill from 'devextreme-quill';
var SizeStyle = {};

if (Quill) {
  SizeStyle = Quill.import('attributors/style/size');
  SizeStyle.whitelist = null;
}

export default SizeStyle;
