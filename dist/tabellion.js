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
    addRow: {
      value: function addRow() {
        var index = arguments[0] === undefined ? -1 : arguments[0];

        this._validateRowIndex(index);
        return this._element.insertRow(index);
      }
    },
    deleteRow: {
      value: function deleteRow(index) {
        this._validateRowIndex(index);
        this._element.rows[index].parentNode.removeChild(this._element.rows[index]);
      }
    },
    addColumn: {

      // TODO: index validation

      value: function addColumn() {
        var index = arguments[0] === undefined ? this._element.rows[0].cells.length : arguments[0];

        var cells = [];
        for (var i = 0; i < this._element.rows.length; i++) {
          cells.push(this._element.rows[i].insertCell(index));
        }
        return cells;
      }
    },
    deleteColumn: {

      // TODO: index validation

      value: function deleteColumn(index) {
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
      }
    }
  });

  return Tabellion;
})();
