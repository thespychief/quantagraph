quantagraph
========

> **This package is still in Alpha.** All future versions are subject to
breaking changes until the official first version, at which point the full documentation will be released and Semantic Versioning will be used.

A Quantagraph is a data structure for storing and evaluating relationships
between values and functions. It can be used to represent some mathematical
equations, dependency graphs, and other types of logical relationships. It is a
type of Directed Acyclic Graph designed for computation-heavy use cases.

A common use case for this type of data structure is a spreadsheet, where values
and functions are stored and need to be recomputed when changes occur.

## Installation

```cmd
npm install quantagraph --save
```

## Usage

With CommonJS:
```js
const Quantagraph = require('quantagraph');
```

With ES Modules:
```js
import Quantagraph from 'quantagraph';
```

## Learn by Example

Storing and calculating the Pythagorean Theorem:

```js
// Formula
const pythagorean = [
  { id: 'a' }, // Stored Property
  { id: 'b' }, // Stored Property
  {            // Computed Property
    id: 'c',
    inputs: ['a', 'b'],
    value: (a, b) => Math.sqrt((a ** 2) + (b ** 2)),
  },
];

const { quantagraph, nodeIdMap } = Quantagraph.create({
  nodes: pythagorean,
});

// Stored Values
const storedPropertyValues = {
  [nodeIdMap.a]: 3,
  [nodeIdMap.b]: 4,
};

const values = Quantagraph.evaluate({
  quantagraph,
  values: storedPropertyValues,
});

// values[nodeIdMap.a] => 3
// values[nodeIdMap.b] => 4
// values[nodeIdMap.c] => 5
```

## API

### Data Types & Terminology

- Quantagraph: An object representing the Quantagraph.
- Formula: An array of objects, each object representing either:
    - Stored Properties: Properties that hold a single value.
    - Computed Properties: Properties that hold an equation that takes inputs and produces outputs.
- Stored Values: An object containing property ids as keys with their associated value.

## Contributing

If you would like to contribute to this repo:

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request.

All contributions welcomed!

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## License

[MIT License](LICENSE) © Chandler Freeman