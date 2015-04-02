/* global describe, it, beforeEach */

import jsdom from 'mocha-jsdom';
import expect from 'unexpected';
import { Tabellion } from '../lib/tabellion';

describe('column tests', () => {
  jsdom();

  var tableEl;

  beforeEach(() => {
    tableEl = document.createElement('table');
    tableEl.innerHTML = `
      <tr id="row-1">
        <td id="row-1-cell-1">1</td>
      </tr>
      <tr id="row-2">
        <td id="row-2-cell-1">2</td>
      </tr>
    `;
  });

  describe('add column', () => {
    it('should be possible by add a column at the end by default', () => {
      var table = new Tabellion(tableEl);
      expect(table.root.rows[0].cells.length, 'to be', 1);
      table.addColumn();
      expect(table.root.rows[0].cells.length, 'to be', 2);
      // all other cells have IDs
      expect(table.root.rows[0].cells[1].getAttribute('id'), 'to be', null);
    });

    it('should return an array with newly created cells', () => {
      var table = new Tabellion(tableEl);
      var cells = table.addColumn();
      expect(cells.length, 'to be', 2);
    });

    it('should be possible to add a column by index', () => {
      var table = new Tabellion(tableEl);
      expect(table.root.rows[0].cells.length, 'to be', 1);
      table.addColumn(0);
      expect(table.root.rows[0].cells.length, 'to be', 2);
      // all other cells have IDs
      expect(table.root.rows[0].cells[0].getAttribute('id'), 'to be', null);
      expect(
        table.root.rows[0].cells[1].getAttribute('id'),
        'to be',
        'row-1-cell-1'
      );
    });

    it('should throw an error when index is invalid', () => {
      var table = new Tabellion(tableEl);
      expect(() => {
        table.addColumn(NaN);
      }, 'to throw', 'Invalid column index');

      expect(() => {
        table.addColumn(-21);
      }, 'to throw', 'Invalid column index');

      expect(() => {
        table.addColumn('43');
      }, 'to throw', 'Invalid column index');
    });
  });

  describe('before and after', () => {
    it('should be possible to add a column before other column', () => {
      var table = new Tabellion(tableEl);
      var row = table.root.rows[0];
      expect(row.cells.length, 'to be', 1);
      table.addColumn('before', row.cells[0]);
      expect(row.cells.length, 'to be', 2);
      expect(row.cells[0].id, 'to be', '');
      expect(row.cells[1].id, 'to be', 'row-1-cell-1');
    });

    it('should be possible to add a column after other column', () => {
      var table = new Tabellion(tableEl);
      var row = table.root.rows[0];
      expect(row.cells.length, 'to be', 1);
      table.addColumn('after', row.cells[0]);
      expect(row.cells.length, 'to be', 2);
      expect(row.cells[0].id, 'to be', 'row-1-cell-1');
      expect(row.cells[1].id, 'to be', '');
    });

    it('should throw an error when column element is invalid', () => {
      var table = new Tabellion(tableEl);
      expect(() => {
        table.addColumn('before');
      }, 'to throw', 'Invalid column element');

      expect(() => {
        table.addColumn('after', window.document.body);
      }, 'to throw', 'Invalid column element');

      expect(() => {
        table.addColumn('before', tableEl);
      }, 'to throw', 'Invalid column element');
    });

    it('should throw an error when row is not a child of current table', () => {
      var table = new Tabellion(tableEl);
      var colEl = document.createElement('td');
      expect(() => {
        table.addColumn('before', colEl);
      }, 'to throw', 'Column is not a child of selected table');
    });
  });


  describe('delete column', () => {
    it('should be possible to delete a column by index', () => {
      var table = new Tabellion(tableEl);
      table.addColumn(0);
      expect(table.root.rows[0].cells.length, 'to be', 2);
      table.deleteColumn(0);
      expect(table.root.rows[0].cells.length, 'to be', 1);
      expect(table.root.rows[0].cells[0].id, 'to be', 'row-1-cell-1');
    });

    it('should throw an error when index is invalid', () => {
      var table = new Tabellion(tableEl);
      expect(() => {
        table.deleteColumn('-100');
      }, 'to throw', 'Invalid column index');

      expect(() => {
        table.deleteColumn(9999999);
      }, 'to throw', 'Invalid column index');

      expect(() => {
        table.deleteColumn('undefined');
      }, 'to throw', 'Invalid column index');
    });
  });
});
