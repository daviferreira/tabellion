'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (descriptor.value) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.substr(1);
}

var Tabellion = (function () {
  function Tabellion(el) {
    _classCallCheck(this, Tabellion);

    this.root = el;
  }

  _createClass(Tabellion, [{
    key: 'root',
    get: function () {
      return this._element;
    },
    set: function (el) {
      this._element = this._getDOMElement(el);

      if (!this._isTableElement()) {
        throw new Error('Element is not a table');
      }
    }
  }, {
    key: 'addRow',
    value: function addRow() {
      var options = arguments[0] === undefined ? { index: -1, cellContent: '<br />' } : arguments[0];

      var index = options.index;
      if (['above', 'below'].indexOf(index) !== -1) {
        if (index === 'above') {
          index = this._getRowIndex(options.target);
        } else {
          index = this._getRowIndex(options.target) + 1;
        }
      }
      index = this._validateRowIndex(index);
      // TODO: extract this to a method
      var totalCells = this._element.rows[0].cells.length;
      var row = this._element.insertRow(index);
      for (var i = 0; i < totalCells; i += 1) {
        var cell = row.insertCell(i);
        if (options.cellContent instanceof Array) {
          if (options.cellContent[i]) {
            cell.innerHTML = options.cellContent[i];
          } else {
            cell.innerHTML = options.cellContent;
          }
        } else {
          cell.innerHTML = options.cellContent;
        }
      }
      return row;
    }
  }, {
    key: 'deleteRow',
    value: function deleteRow(index) {
      index = this._validateRowIndex(index);
      this._element.rows[index].parentNode.removeChild(this._element.rows[index]);
    }
  }, {
    key: 'addColumn',
    value: function addColumn() {
      var options = arguments[0] === undefined ? { index: -1, content: '<br />' } : arguments[0];

      var index = options.index;
      if (['before', 'after'].indexOf(index) !== -1) {
        if (index === 'before') {
          index = this._getColumnIndex(options.target);
        } else {
          index = this._getColumnIndex(options.target) + 1;
        }
      }
      index = this._validateColumnIndex(index);
      var cells = [];
      for (var i = 0; i < this._element.rows.length; i++) {
        var cell;
        if (this._element.rows[i].parentNode.tagName.toLowerCase() === 'thead') {
          cell = this._element.rows[i].insertBefore(document.createElement('th'), this._element.rows[i].cells[index]);
        } else {
          cell = this._element.rows[i].insertCell(index);
        }
        cell.innerHTML = options.content;
        cells.push(cell);
      }
      return cells;
    }
  }, {
    key: 'deleteColumn',
    value: function deleteColumn(index) {
      index = this._validateColumnIndex(index);
      for (var i = 0; i < this._element.rows.length; i++) {
        this._element.rows[i].deleteCell(index);
      }
    }
  }, {
    key: 'zebrify',
    value: function zebrify(options) {
      options = Object.assign({
        even: false,
        className: 'zebra'
      }, options);
      var start = options.even ? 0 : 1;
      for (var i = start; i < this._element.rows.length; i += 2) {
        this._element.rows[i].classList.toggle(options.className);
      }
    }
  }, {
    key: 'highlight',
    value: function highlight(index) {
      var className = arguments[1] === undefined ? 'highlight' : arguments[1];

      index = this._validateRowIndex(index);
      this._element.rows[index].classList.toggle(className);
    }
  }, {
    key: 'deleteTable',

    // TODO: what to do after this? Invalidate the whole object somehow?
    value: function deleteTable() {
      this._element.parentNode.removeChild(this._element);
    }
  }, {
    key: '_getDOMElement',
    value: function _getDOMElement(el) {
      if (typeof el === 'string') {
        return document.body.querySelector(el);
      }
      return el;
    }
  }, {
    key: '_isTableElement',
    value: function _isTableElement() {
      return this._element && this._element.tagName && this._element.tagName.toLowerCase() === 'table';
    }
  }, {
    key: '_validateRowIndex',
    value: function _validateRowIndex(index) {
      index = parseInt(Number(index), 10);
      // -1 is allowed to insert a row at the end of the table
      if (isNaN(index) || index < -1 || index > this._element.rows.length) {
        throw new Error('Invalid row index');
      }
      return index;
    }
  }, {
    key: '_validateColumnIndex',
    value: function _validateColumnIndex(index) {
      index = parseInt(Number(index), 10);
      // -1 is allowed to insert a cell at the end of the row
      // TODO: colspan?
      if (isNaN(index) || index < -1 || index > this._element.rows[0].cells.length) {
        throw new Error('Invalid column index');
      }
      return index;
    }
  }, {
    key: '_getRowIndex',
    value: function _getRowIndex(row) {
      this._validateElement(row, 'tr', 'row');
      for (var i = 0; i < this._element.rows.length; i += 1) {
        if (this._element.rows[i] === row) {
          return i;
        }
      }
    }
  }, {
    key: '_getColumnIndex',
    value: function _getColumnIndex(column) {
      this._validateElement(column, 'td', 'column');
      for (var i = 0; i < column.parentNode.cells.length; i += 1) {
        if (column.parentNode.cells[i] === column) {
          return i;
        }
      }
    }
  }, {
    key: '_validateElement',
    value: function _validateElement(node, tagName, type) {
      tagName = tagName.toLowerCase();
      if (!(node && node.tagName && node.tagName.toLowerCase() === tagName)) {
        throw new Error('Invalid ' + type + ' element');
      } else {
        this._validateChild(node, type);
      }
    }
  }, {
    key: '_validateChild',
    value: function _validateChild(node, type) {
      if (!this._isDescendant(node)) {
        throw new Error('' + capitalize(type) + ' is not a child of selected table');
      }
    }
  }, {
    key: '_isDescendant',
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
  }]);

  return Tabellion;
})();
