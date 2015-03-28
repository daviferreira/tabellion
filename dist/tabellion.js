"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Table = exports.Table = (function () {
  function Table(el, options) {
    _classCallCheck(this, Table);

    // TODO: el check, table exists?
    this.root = el;
    // TODO: defaults
    this.options = options || {};
  }

  _createClass(Table, {
    "delete": {
      value: function _delete() {
        this.root.parentNode.removeChild(this.root);
      }
    }
  });

  return Table;
})();
