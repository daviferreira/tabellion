# Tabellion

*Tabellion* is a lightweight script to manipulate tables, table rows and table
cells.

[![Build Status](https://travis-ci.org/daviferreira/tabellion.svg?branch=master)](https://travis-ci.org/daviferreira/tabellion)
[![devDependency Status](https://david-dm.org/daviferreira/tabellion/dev-status.png)](https://david-dm.org/daviferreira/tabellion#info=devDependencies)

## Installation

### Via npm

Run in your console: `npm install tabellion`

### Via bower

Run in your console: `bower install tabellion`

### Manual installation

Download the [latest release](https://github.com/daviferreira/tabellion/releases) and attach tabellion's script to your page:

```html
<script src="js/tabellion.js"></script>
```

## Basic Usage

You can now instantiate a new MediumEditor object:

```html
<script>var tbl = new Tabellion(<your_table_element);</script>
```

## API

* **root**
* **addRow([index])**
* **deleteRow(index)**
* **addColumn([index])**
* **deleteColumn(index)**
* **deleteTable()**
* **zebrify([options])**

## Developing

Install dev dependencies:

```npm install```

Run tests:

```npm test```

Update build:

```npm run build```

Profit :grin:

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Test your changes to the best of your ability.
4. Update the documentation to reflect your changes if they add or changes current functionality.
5. Commit your changes (`git commit -am 'Add some feature'`)
6. Push to the branch (`git push origin my-new-feature`)
7. Create new Pull Request

## License

[MIT](https://github.com/daviferreira/tabellion/blob/master/LICENSE)
