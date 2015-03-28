var jsdom = require('mocha-jsdom');
var expect = require('unexpected');

describe('mocha tests', function () {
  jsdom();

  it('has document', function () {
    var div = document.createElement('div');
    expect(div.nodeName, 'to be', 'DIV');
  });
});
