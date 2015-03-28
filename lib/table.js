export class Table {
  constructor(el) {
    this.root = el;
  }

  get root() {
    return this._root;
  }

  set root(el) {
    this._root = this._getDOMElement(el);

    if (!this._isTableElement()) {
      throw new Error('Element is not a table');
    }
  }

  delete() {
    this._root.parentNode.removeChild(this._root);
  }

  _getDOMElement(el) {
    if (typeof el === 'string') {
      return document.body.querySelector(el);
    }
    return el;
  }

  _isTableElement() {
    return (
      this._root &&
      this._root.tagName &&
      this._root.tagName.toLowerCase() === 'table'
    );
  }
}
