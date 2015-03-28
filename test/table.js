/* global describe, it */

import jsdom from 'mocha-jsdom';
import expect from 'unexpected';
import { Table } from '../lib/table';

// TODO: table generator + before/after
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
    table.deleteTable();
  });

  it('should raise an error when element is not a table', () => {
    expect(() => {
      return new Table('error');
    }, 'to throw', 'Element is not a table');
  });

  it('should be possible to set a new root element', () => {
    var tableEl = document.createElement('table');
    var table = new Table(tableEl);
    expect(table.root, 'to be', tableEl);
    var anotherTableEl = document.createElement('table');
    table.root = anotherTableEl;
    expect(table.root, 'to be', anotherTableEl);
  });

  it('should delete a table', () => {
    var tableEl = document.createElement('table');
    document.body.appendChild(tableEl);
    var table = new Table(tableEl);
    table.deleteTable();
    expect(document.body.querySelector('table'), 'to be null');
  });

  describe('add row', () => {
    it('should insert a row at the end of the table by default', () => {
      var tableEl = document.createElement('table');
      tableEl.innerHTML = `
        <tr id="row-1">
          <td>1</td>
        </tr>
        <tr id="row-2">
          <td>2</td>
        </tr>
      `;
      var table = new Table(tableEl);
      expect(table.root.rows.length, 'to be', 2);
      table.addRow();
      expect(table.root.rows.length, 'to be', 3);
      // all other rows have IDs
      expect(table.root.rows[2].id, 'to be', '');
    });

    it('should be possible to specify an index', () => {
      var tableEl = document.createElement('table');
      tableEl.innerHTML = `
        <tr id="row-1">
          <td>1</td>
        </tr>
        <tr id="row-2">
          <td>2</td>
        </tr>
      `;
      var table = new Table(tableEl);
      table.addRow(1);
      // we need to do this check here because of jsdom
      // https://github.com/tmpvar/jsdom/issues/742
      expect(table.root.rows.length, 'to be', 3);
      // all other rows have IDs
      expect(table.root.rows[1].id, 'to be', '');
    });
  });

  describe('delete row', () => {
    it('should be possible to delete a row by index', () => {
      var tableEl = document.createElement('table');
      tableEl.innerHTML = `
        <tr id="row-1">
          <td>1</td>
        </tr>
        <tr id="row-2">
          <td>2</td>
        </tr>
      `;
      var table = new Table(tableEl);
      expect(table.root.rows.length, 'to be', 2);
      table.deleteRow(0);
      expect(table.root.rows.length, 'to be', 1);
      expect(table.root.rows[0].id, 'to be', 'row-2');
    });
  });
});
