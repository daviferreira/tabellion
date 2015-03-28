// TODO: es6

var jsdom = require('mocha-jsdom');
var expect = require('unexpected');

var Tabellion = require('../dist/tabellion').Table;

describe('table tests', function () {
  jsdom();

  it('should set table element as root', function () {
    var table = document.createElement('table');
    var tabellion = new Tabellion(table);
    expect(tabellion.root, 'to be', table);
  });

  it('should delete a table', function () {
    var table = document.createElement('table');
    document.body.appendChild(table);
    var tabellion = new Tabellion(table);
    tabellion.delete();
    expect(document.body.querySelector('table'), 'to be null');
  });
});
