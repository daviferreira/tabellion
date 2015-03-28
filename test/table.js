var jsdom = require('mocha-jsdom');
var expect = require('unexpected');

var { Table } = require('../dist/tabellion');

describe('table tests', function () {
  jsdom();

  it('should set table element as root', () => {
    var table = document.createElement('table');
    var tabellion = new Table(table);
    expect(tabellion.root, 'to be', table);
  });

  it('should delete a table', () => {
    var table = document.createElement('table');
    var tabellion = new Table(table);
    document.body.appendChild(table);
    tabellion.delete();
    expect(document.body.querySelector('table'), 'to be null');
  });
});
