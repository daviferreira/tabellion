// TODO: private methods?
export class Table {
  constructor(el) {
    this.root = this.getDOMElement(el);

    if (!this.isTableElement()) {
      throw new Error('Element is not a table');
    }
  }

  getDOMElement(el) {
    if (typeof el === 'string') {
      return document.body.querySelector(el);
    }
    return el;
  }

  isTableElement() {
    return (
      this.root &&
      this.root.tagName &&
      this.root.tagName.toLowerCase() === 'table'
    );
  }

  delete() {
    this.root.parentNode.removeChild(this.root);
  }
}
