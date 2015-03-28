export class Table {
  constructor(el, options) {
    // TODO: el check, table exists?
    this.root = el;
    // TODO: defaults
    this.options = options || {};
  }

  delete() {
    this.root.parentNode.removeChild(this.root);
  }
}
