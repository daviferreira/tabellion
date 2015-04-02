/* global describe, it, beforeEach */

import jsdom from 'mocha-jsdom';
import expect from 'unexpected';
import { Tabellion } from '../lib/tabellion';

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
  });
});
