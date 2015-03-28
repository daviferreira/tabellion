/* global describe, it */

import jsdom from 'mocha-jsdom';
import expect from 'unexpected';
import { Table } from '../lib/table';

describe('table tests', function () {
  jsdom();

  it('should accept a DOM element', () => {
    var tableEl = document.createElement('table');
    var table = new Table(tableEl);
    expect(table.root, 'to be', tableEl);
  });

  it('shoud accept a string selector', () => {
    var tableEl = document.createElement('table');
    tableEl.className = 'test-table';
    document.body.appendChild(tableEl);
    var table = new Table('.test-table');
    expect(table.root, 'to be', tableEl);
    table.delete();
  });

  it('should raise an error when element is not a table', () => {
    expect(() => {
      return new Table('error');
    }, 'to throw', 'Element is not a table');
  });

  it('should delete a table', () => {
    var tableEl = document.createElement('table');
    document.body.appendChild(tableEl);
    var table = new Table(tableEl);
    table.delete();
    expect(document.body.querySelector('table'), 'to be null');
  });

  describe('insert row', () => {
    it('should insert a row at the end of the table by default', () => {
      var tableEl = document.createElement('table');
      tableEl.innerHTML = `
        <tr id="row-2">
          <td>1</td>
        </tr>
        <tr id="row-1">
          <td>2</td>
        </tr>
      `;
      document.body.appendChild(tableEl);
      var table = new Table(tableEl);
      expect(tableEl.rows.length, 'to be', 2);
      table.insertRow();
      expect(tableEl.rows.length, 'to be', 3);
      // all other rows have IDs
      expect(tableEl.rows[2].getAttribute('id'), 'to be null');
    });
  });
});
