var jsdom = require('mocha-jsdom');
var expect = require('unexpected');

var Tabellion = require('../dist/tabellion').Table;

describe('tabellion tests', function () {
  jsdom();

  it('should set table element as root', function () {
    var table = document.createElement('table');
    var tabellion = new Tabellion(table);
    expect(tabellion.root, 'to be', table);
  });
});
