"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Table = exports.Table = (function () {
  function Table(el) {
    _classCallCheck(this, Table);

    this._root = this._getDOMElement(el);

    if (!this._isTableElement()) {
      throw new Error("Element is not a table");
    }
  }

  _createClass(Table, {
    root: {
      get: function () {
        return this._root;
      }
    },
    "delete": {
      value: function _delete() {
        this.root.parentNode.removeChild(this.root);
      }
    },
    _getDOMElement: {
      value: function _getDOMElement(el) {
        if (typeof el === "string") {
          return document.body.querySelector(el);
        }
        return el;
      }
    },
    _isTableElement: {
      value: function _isTableElement() {
        return this._root && this._root.tagName && this._root.tagName.toLowerCase() === "table";
      }
    }
  });

  return Table;
})();
