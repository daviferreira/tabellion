"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.substr(1);
}

var Tabellion = (function () {
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
        var row = arguments[1] === undefined ? undefined : arguments[1];

        if (["above", "below"].indexOf(index) !== -1) {
          if (index === "above") {
            index = this._getRowIndex(row);
          } else {
            index = this._getRowIndex(row) + 1;
          }
        }
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
        var column = arguments[1] === undefined ? undefined : arguments[1];

        if (["before", "after"].indexOf(index) !== -1) {
          if (index === "before") {
            index = this._getColumnIndex(column);
          } else {
            index = this._getColumnIndex(column) + 1;
          }
        }
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
    zebrify: {
      value: function zebrify(options) {
        options = Object.assign({
          even: false,
          className: "zebra"
        }, options);
        var start = options.even ? 0 : 1;
        for (var i = start; i < this._element.rows.length; i += 2) {
          this._element.rows[i].classList.toggle(options.className);
        }
      }
    },
    highlight: {
      value: function highlight(index) {
        var className = arguments[1] === undefined ? "highlight" : arguments[1];

        index = this._validateRowIndex(index);
        this._element.rows[index].classList.toggle(className);
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
    },
    _getRowIndex: {
      value: function _getRowIndex(row) {
        this._validateElement(row, "tr", "row");
        for (var i = 0; i < this._element.rows.length; i += 1) {
          if (this._element.rows[i] === row) {
            return i;
          }
        }
      }
    },
    _getColumnIndex: {
      value: function _getColumnIndex(column) {
        this._validateElement(column, "td", "column");
        for (var i = 0; i < column.parentNode.cells.length; i += 1) {
          if (column.parentNode.cells[i] === column) {
            return i;
          }
        }
      }
    },
    _validateElement: {
      value: function _validateElement(node, tagName, type) {
        tagName = tagName.toLowerCase();
        if (!(node && node.tagName && node.tagName.toLowerCase() === tagName)) {
          throw new Error("Invalid " + type + " element");
        } else {
          this._validateChild(node, type);
        }
      }
    },
    _validateChild: {
      value: function _validateChild(node, type) {
        if (!this._isDescendant(node)) {
          throw new Error("" + capitalize(type) + " is not a child of selected table");
        }
      }
    },
    _isDescendant: {
      value: function _isDescendant(child) {
        var node = child.parentNode;
        while (node !== null) {
          if (node === this._element) {
            return true;
          }
          node = node.parentNode;
        }
        return false;
      }
    }
  });

  return Tabellion;
})();
