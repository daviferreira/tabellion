export class Table {
  // TODO: break method?
  constructor(el, options) {
    if (typeof el === 'string') {
      el = document.body.querySelector(el);
    }

    if (!el || !el.tagName || el.tagName.toLowerCase() !== 'table') {
      throw new Error('Element is not a table');
    }

    this.root = el;
    // TODO: defaults
    this.options = options || {};
  }

  delete() {
    this.root.parentNode.removeChild(this.root);
  }
}
