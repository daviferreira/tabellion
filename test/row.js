/* global describe, it, beforeEach */

import jsdom from 'mocha-jsdom';
import expect from 'unexpected';
import { Tabellion } from '../lib/tabellion';

describe('row tests', () => {
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

  describe('add row', () => {
    it('should insert a row at the end of the table by default', () => {
      var table = new Tabellion(tableEl);
      expect(table.root.rows.length, 'to be', 2);
      table.addRow();
      expect(table.root.rows.length, 'to be', 3);
      // all other rows have IDs
      expect(table.root.rows[2].id, 'to be', '');
    });

    it('should be possible to specify an index', () => {
      var table = new Tabellion(tableEl);
      table.addRow({ index: 1 });
      // we need to do this check here because of jsdom
      // https://github.com/tmpvar/jsdom/issues/742
      expect(table.root.rows.length, 'to be', 3);
      // all other rows have IDs
      expect(table.root.rows[1].id, 'to be', '');
    });

    it('should throw an error when index is invalid', () => {
      var table = new Tabellion(tableEl);
      expect(() => {
        table.addRow({ index: 'invalid' });
      }, 'to throw', 'Invalid row index');

      expect(() => {
        table.addRow({ index: '99.32' });
      }, 'to throw', 'Invalid row index');

      expect(() => {
        table.addRow({ index: -10 });
      }, 'to throw', 'Invalid row index');
    });
  });

  describe('added row content', () => {
    it('should add cells with a default value of <br />', () => {
      var table = new Tabellion(tableEl);
      table.addRow();
      expect(table.root.rows.length, 'to be', 3);
      expect(table.root.rows[2].cells.length, 'to be', 1);
      expect(table.root.rows[2].cells[0].innerHTML, 'to be', '<br>');
    });

    it('should accept custom content', () => {
      var table = new Tabellion(tableEl);
      table.addRow({
        index: -1,
        cellContent: 'test'
      });
      expect(table.root.rows.length, 'to be', 3);
      expect(table.root.rows[2].cells.length, 'to be', 1);
      expect(table.root.rows[2].cells[0].innerHTML, 'to be', 'test');
    });

    it('should accept an array with custom content for each cell', () => {
      var table = new Tabellion(tableEl);
      var content = ['test 1', 'test 2', 'test 3'];
      table.addColumn();
      table.addColumn();
      table.addRow({
        index: -1,
        cellContent: content
      });
      expect(table.root.rows.length, 'to be', 3);
      expect(table.root.rows[2].cells.length, 'to be', 3);
      for (let i = 0; i < table.root.rows[2].cells.length; i += 1) {
        expect(table.root.rows[2].cells[i].innerHTML, 'to be', content[i]);
      }
    });
  });

  describe('above and below', () => {
    it('should be possible to add a row above other row', () => {
      var table = new Tabellion(tableEl);
      expect(table.root.rows.length, 'to be', 2);
      table.addRow({ index: 'above', target: table.root.rows[0] });
      expect(table.root.rows.length, 'to be', 3);
      expect(table.root.rows[0].id, 'to be', '');
      expect(table.root.rows[1].id, 'to be', 'row-1');
      expect(table.root.rows[2].id, 'to be', 'row-2');
    });

    it('should be possible to add a row below other row', () => {
      var table = new Tabellion(tableEl);
      expect(table.root.rows.length, 'to be', 2);
      table.addRow({ index: 'below', target: table.root.rows[1] });
      expect(table.root.rows.length, 'to be', 3);
      expect(table.root.rows[0].id, 'to be', 'row-1');
      expect(table.root.rows[1].id, 'to be', 'row-2');
      expect(table.root.rows[2].id, 'to be', '');
    });

    it('should throw an error when row element is invalid', () => {
      var table = new Tabellion(tableEl);
      expect(() => {
        table.addRow({ index: 'above' });
      }, 'to throw', 'Invalid row element');

      expect(() => {
        table.addRow({ index: 'below', target: window.document.body });
      }, 'to throw', 'Invalid row element');

      expect(() => {
        table.addRow({ index: 'above', target: tableEl });
      }, 'to throw', 'Invalid row element');
    });

    it('should throw an error when row is not a child of current table', () => {
      var table = new Tabellion(tableEl);
      var rowEl = document.createElement('tr');
      expect(() => {
        table.addRow({ index: 'above', target: rowEl });
      }, 'to throw', 'Row is not a child of selected table');
    });
  });

  describe('delete row', () => {
    it('should be possible to delete a row by index', () => {
      var table = new Tabellion(tableEl);
      expect(table.root.rows.length, 'to be', 2);
      table.deleteRow(0);
      expect(table.root.rows.length, 'to be', 1);
      expect(table.root.rows[0].id, 'to be', 'row-2');
    });

    it('should throw an error when index is invalid', () => {
      var table = new Tabellion(tableEl);
      expect(() => {
        table.deleteRow('invalid');
      }, 'to throw', 'Invalid row index');

      expect(() => {
        table.deleteRow(-22.32);
      }, 'to throw', 'Invalid row index');

      expect(() => {
        table.deleteRow('100');
      }, 'to throw', 'Invalid row index');
    });
  });
});
