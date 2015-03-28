export class Table {
  constructor(el) {
    this._root = this._getDOMElement(el);

    if (!this._isTableElement()) {
      throw new Error('Element is not a table');
    }
  }

  get root() {
    return this._root;
  }

  delete() {
    this.root.parentNode.removeChild(this.root);
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
