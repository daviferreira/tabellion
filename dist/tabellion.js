"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Tabellion = exports.Tabellion = (function () {
  function Tabellion(el) {
    _classCallCheck(this, Tabellion);

    this.root = el;
  }

  _createClass(Tabellion, {
    root: {
      get: function () {
        return this._element;
      },
      set: function (el) {
        this._element = this._getDOMElement(el);

        if (!this._isTableElement()) {
          throw new Error("Element is not a table");
        }
      }
    },
    zebrify: {

      // TODO: options

      value: function zebrify() {
        var even = arguments[0] === undefined ? false : arguments[0];
        var className = arguments[1] === undefined ? "zebra" : arguments[1];

        var start = even ? 0 : 1;
        for (var i = start; i < this._element.rows.length; i += 2) {
          this._element.rows[i].className += " " + className;
        }
      }
    },
    addRow: {
      value: function addRow() {
        var index = arguments[0] === undefined ? -1 : arguments[0];

        index = this._validateRowIndex(index);
        return this._element.insertRow(index);
      }
    },
    deleteRow: {
      value: function deleteRow(index) {
        index = this._validateRowIndex(index);
        this._element.rows[index].parentNode.removeChild(this._element.rows[index]);
      }
    },
    addColumn: {
      value: function addColumn() {
        var index = arguments[0] === undefined ? -1 : arguments[0];

        index = this._validateColumnIndex(index);
        var cells = [];
        for (var i = 0; i < this._element.rows.length; i++) {
          cells.push(this._element.rows[i].insertCell(index));
        }
        return cells;
      }
    },
    deleteColumn: {
      value: function deleteColumn(index) {
        index = this._validateColumnIndex(index);
        for (var i = 0; i < this._element.rows.length; i++) {
          this._element.rows[i].deleteCell(index);
        }
      }
    },
    deleteTable: {

      // TODO: what to do after this? Invalidate the whole object somehow?

      value: function deleteTable() {
        this._element.parentNode.removeChild(this._element);
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
        return this._element && this._element.tagName && this._element.tagName.toLowerCase() === "table";
      }
    },
    _validateRowIndex: {
      value: function _validateRowIndex(index) {
        index = parseInt(Number(index), 10);
        // -1 is allowed to insert a row at the end of the table
        if (isNaN(index) || index < -1 || index > this._element.rows.length) {
          throw new Error("Invalid row index");
        }
        return index;
      }
    },
    _validateColumnIndex: {
      value: function _validateColumnIndex(index) {
        index = parseInt(Number(index), 10);
        // -1 is allowed to insert a cell at the end of the row
        // TODO: colspan?
        if (isNaN(index) || index < -1 || index > this._element.rows[0].cells.length) {
          throw new Error("Invalid column index");
        }
        return index;
      }
    }
  });

  return Tabellion;
})();
