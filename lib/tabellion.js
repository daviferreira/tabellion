function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.substr(1);
}

export class Tabellion {
  constructor(el) {
    this.root = el;
  }

  get root() {
    return this._element;
  }

  set root(el) {
    this._element = this._getDOMElement(el);

    if (!this._isTableElement()) {
      throw new Error('Element is not a table');
    }
  }

  addRow(index = -1, row = undefined) {
    if (['above', 'below'].indexOf(index) !== -1) {
      if (index === 'above') {
        index = this._getRowIndex(row);
      } else {
        index = this._getRowIndex(row) + 1;
      }
    }
    index = this._validateRowIndex(index);
    return this._element.insertRow(index);
  }

  deleteRow(index) {
    index = this._validateRowIndex(index);
    this._element.rows[index].parentNode.removeChild(this._element.rows[index]);
  }

  addColumn(index = -1, column = undefined) {
    if (['before', 'after'].indexOf(index) !== -1) {
      if (index === 'before') {
        index = this._getColumnIndex(column);
      } else {
        index = this._getColumnIndex(column) + 1;
      }
    }
    index = this._validateColumnIndex(index);
    var cells = [];
    for (let i = 0; i < this._element.rows.length; i++) {
      cells.push(this._element.rows[i].insertCell(index));
    }
    return cells;
  }

  deleteColumn(index) {
    index = this._validateColumnIndex(index);
    for (let i = 0; i < this._element.rows.length; i++) {
      this._element.rows[i].deleteCell(index);
    }
  }

  zebrify(options) {
    options = Object.assign({
      even: false,
      className: 'zebra'
    }, options);
    var start = options.even ? 0 : 1;
    for (let i = start; i < this._element.rows.length; i += 2) {
      this._element.rows[i].classList.toggle(options.className);
    }
  }

  highlight(index, className = 'highlight') {
    index = this._validateRowIndex(index);
    this._element.rows[index].classList.toggle(className);
  }

  // TODO: what to do after this? Invalidate the whole object somehow?
  deleteTable() {
    this._element.parentNode.removeChild(this._element);
  }

  _getDOMElement(el) {
    if (typeof el === 'string') {
      return document.body.querySelector(el);
    }
    return el;
  }

  _isTableElement() {
    return (
      this._element &&
      this._element.tagName &&
      this._element.tagName.toLowerCase() === 'table'
    );
  }

  _validateRowIndex(index) {
    index = parseInt(Number(index), 10);
    // -1 is allowed to insert a row at the end of the table
    if (isNaN(index) || index < -1 || index > this._element.rows.length) {
      throw new Error('Invalid row index');
    }
    return index;
  }

  _validateColumnIndex(index) {
    index = parseInt(Number(index), 10);
    // -1 is allowed to insert a cell at the end of the row
    // TODO: colspan?
    if (isNaN(index) || index < -1 || index > this._element.rows[0].cells.length) {
      throw new Error('Invalid column index');
    }
    return index;
  }

  _getRowIndex(row) {
    this._validateElement(row, 'tr', 'row');
    for (let i = 0; i < this._element.rows.length; i += 1) {
      if (this._element.rows[i] === row) {
        return i;
      }
    }
  }

  _getColumnIndex(column) {
    this._validateElement(column, 'td', 'column');
    for (let i = 0; i < column.parentNode.cells.length; i += 1) {
      if (column.parentNode.cells[i] === column) {
        return i;
      }
    }
  }

  _validateElement(node, tagName, type) {
    tagName = tagName.toLowerCase();
    if (!(node && node.tagName && node.tagName.toLowerCase() === tagName)) {
      throw new Error(`Invalid ${ type } element`);
    } else {
      this._validateChild(node, type);
    }
  }

  _validateChild(node, type) {
    if (!this._isDescendant(node)) {
      throw new Error(`${ capitalize(type) } is not a child of selected table`);
    }
  }

  _isDescendant(child) {
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
