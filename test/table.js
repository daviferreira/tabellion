import jsdom from 'mocha-jsdom';
import expect from 'unexpected';
import { Table } from '../lib/table';

describe('table tests', function () {
  jsdom();

  it('should set table element as root', () => {
    var tableEl = document.createElement('table');
    var table = new Table(tableEl);
    expect(table.root, 'to be', tableEl);
  });

  it('should delete a table', () => {
    var tableEl = document.createElement('table');
    var table = new Table(tableEl);
    document.body.appendChild(tableEl);
    table.delete();
    expect(document.body.querySelector('table'), 'to be null');
  });
});
