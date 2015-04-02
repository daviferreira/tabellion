/* global describe, it, beforeEach, require, before */

import jsdom from 'mocha-jsdom';
import expect from 'unexpected';
import { Tabellion } from '../lib/tabellion';

describe('util tests', () => {
  jsdom();

  var tableEl;

  before(() => {
    require('../polyfill/classlist');
  });

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

  describe('zebrify', () => {
    it('should add zebra class to odd rows by default', () => {
      var table = new Tabellion(tableEl);
      expect(table.root.rows[0].className, 'to be', '');
      table.zebrify();
      expect(table.root.rows[1].className, 'to contain', 'zebra');
    });

    it('should zebrify even rows', () => {
      var table = new Tabellion(tableEl);
      expect(table.root.rows[0].className, 'to be', '');
      table.zebrify({
        even: true
      });
      expect(table.root.rows[0].className, 'to contain', 'zebra');
    });

    it('should accept a custom className', () => {
      var table = new Tabellion(tableEl);
      expect(table.root.rows[0].className, 'to be', '');
      table.zebrify({
        even: true,
        className: 'stripe'
      });
      expect(table.root.rows[0].className, 'to contain', 'stripe');
    });

    it('should toggle the zebra class', () => {
      var table = new Tabellion(tableEl);
      expect(table.root.rows[0].className, 'to be', '');
      table.zebrify();
      expect(table.root.rows[1].className, 'to contain', 'zebra');
      table.zebrify();
      expect(table.root.rows[0].className, 'to be', '');
    });
  });

  describe('highlight', () => {
    it('should highlight a row by its index', () => {
      var table = new Tabellion(tableEl);
      table.highlight(1);
      expect(table.root.rows[1].className, 'to be', 'highlight');
    });

    it('should toggle the highlight class', () => {
      var table = new Tabellion(tableEl);
      table.highlight(1);
      expect(table.root.rows[1].className, 'to be', 'highlight');
      table.highlight(1);
      expect(table.root.rows[1].className, 'to be', '');
    });

    it('should throw an error when index is invalid', () => {
      var table = new Tabellion(tableEl);
      expect(() => {
        table.highlight('highlight');
      }, 'to throw', 'Invalid row index');

      expect(() => {
          table.highlight(-26.4);
      }, 'to throw', 'Invalid row index');

      expect(() => {
        table.highlight('55,66');
      }, 'to throw', 'Invalid row index');
    });
  });

  describe('all utility methods should work well together', () => {
    it('should zebrify and highlight a row by its index', () => {
      var table = new Tabellion(tableEl);
      table.zebrify();
      table.highlight(1);
      expect(table.root.rows[1].className, 'to be', 'zebra highlight');
    });

    it('should toggle only the zebra class', () => {
      var table = new Tabellion(tableEl);
      table.zebrify();
      table.highlight(1);
      expect(table.root.rows[1].className, 'to be', 'zebra highlight');
      table.zebrify();
      expect(table.root.rows[1].className, 'to be', 'highlight');
    });

    it('should toggle only the highlight class', () => {
      var table = new Tabellion(tableEl);
      table.zebrify();
      table.highlight(1);
      expect(table.root.rows[1].className, 'to be', 'zebra highlight');
      table.highlight(1);
      expect(table.root.rows[1].className, 'to be', 'zebra');
    });
  });
});
