export class Table {
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

  // TODO: index validation
  addRow(index = this._element.rows.length) {
    return this._element.insertRow(index);
  }

  // TODO: index validation
  deleteRow(index) {
    this._element.rows[index].parentNode.removeChild(this._element.rows[index]);
  }

  // TODO: index validation
  addColumn(index = this._element.rows[0].cells.length) {
    var cells = [];
    for (let i = 0; i < this._element.rows.length; i++) {
      cells.push(this._element.rows[i].insertCell(index));
    }
    return cells;
  }

  // TODO: index validation
  deleteColumn(index) {
    for (let i = 0; i < this._element.rows.length; i++) {
      this._element.rows[i].deleteCell(index);
    }
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
}
