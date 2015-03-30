/* global describe, it, beforeEach */

import jsdom from 'mocha-jsdom';
import expect from 'unexpected';
import { Tabellion } from '../lib/table';

describe('table tests', () => {
  jsdom();

  describe('with an invalid element', () => {
    it('should raise an error when element is not a table', () => {
      expect(() => {
        return new Tabellion('.table-dont-exist');
      }, 'to throw', 'Element is not a table');
    });
  });

  describe('with a valid element', () => {
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

    it('should accept a DOM element', () => {
      var table = new Tabellion(tableEl);
      expect(table.root, 'to be', tableEl);
    });

    it('shoud accept a string selector', () => {
      tableEl.className = 'test-table';
      document.body.appendChild(tableEl);
      var table = new Tabellion('.test-table');
      expect(table.root, 'to be', tableEl);
      table.deleteTable();
    });

    it('should be possible to set a new root element', () => {
      var table = new Tabellion(tableEl);
      expect(table.root, 'to be', tableEl);
      var anotherTabellionEl = document.createElement('table');
      table.root = anotherTabellionEl;
      expect(table.root, 'to be', anotherTabellionEl);
    });

    it('should delete a table', () => {
      document.body.appendChild(tableEl);
      var table = new Tabellion(tableEl);
      table.deleteTable();
      expect(document.body.querySelector('table'), 'to be null');
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
        table.addRow(1);
        // we need to do this check here because of jsdom
        // https://github.com/tmpvar/jsdom/issues/742
        expect(table.root.rows.length, 'to be', 3);
        // all other rows have IDs
        expect(table.root.rows[1].id, 'to be', '');
      });

      it('should throw an error when index is invalid', () => {
        var table = new Tabellion(tableEl);
        expect(() => {
          table.addRow('invalid');
        }, 'to throw', 'Invalid row index');

        expect(() => {
          table.addRow('99.32');
        }, 'to throw', 'Invalid row index');

        expect(() => {
          table.addRow(-10);
        }, 'to throw', 'Invalid row index');
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
    });
  });
});
