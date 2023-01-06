/* eslint-disable no-undef */
const Quantagraph = require('../src/index');

const pythagorean = [
  {
    id: 'a',
  },
  {
    id: 'b',
  },
  {
    id: 'c',
    inputs: ['a', 'b'],
    value: (a, b) => Math.sqrt((a ** 2) + (b ** 2)),
  },
];

const cube = [
  { id: 'x' },
  { id: 'y' },
  { id: 'z' },
  {
    id: 'v',
    inputs: ['x', 'y', 'z'],
    value: (x, y, z) => x * y * z,
  },
  {
    id: 'sa',
    inputs: ['x', 'y', 'z'],
    value: (x, y, z) => 2 * (x * y + x * z + y * z),
  },
];

const materialObject = [
  {
    id: 'v',
  },
  {
    id: 'd',
  },
  {
    id: 'm',
    inputs: ['v', 'd'],
    value: (v, d) => v * d,
  },
];

test('pythagorean', () => {
  const { quantagraph, nodeIdMap } = Quantagraph.create({
    nodes: pythagorean,
  });

  const storedPropertyValues = {
    [nodeIdMap.a]: 3,
    [nodeIdMap.b]: 4,
  };

  const values = Quantagraph.evaluate({
    quantagraph,
    values: storedPropertyValues,
  });

  expect(values[nodeIdMap.c]).toBe(5);
});

test('material cube', () => {
  const { quantagraph, nodeIdMap } = Quantagraph.create({
    nodes: cube,
  });

  const storedPropertyValues = {
    [nodeIdMap.x]: 3,
    [nodeIdMap.y]: 4,
    [nodeIdMap.z]: 5,
  };

  const {
    quantagraph: cubeQuantagraph,
    nodeIdMap: cubeNodeIdMap,
  } = Quantagraph.addNodes({
    quantagraph,
    nodes: materialObject,
  });

  cubeQuantagraph[cubeNodeIdMap.v].inputs = [nodeIdMap.v];

  const cubeStoredPropertyValues = {
    ...storedPropertyValues,
    [cubeNodeIdMap.d]: 7,
  };

  const values = Quantagraph.evaluate({
    quantagraph: cubeQuantagraph,
    values: cubeStoredPropertyValues,
  });

  expect(values[nodeIdMap.v]).toBe(60);
  expect(values[cubeNodeIdMap.v]).toBe(60);
  expect(values[nodeIdMap.sa]).toBe(94);
  expect(values[cubeNodeIdMap.m]).toBe(420);
});

test('nodeIdMap => nodeIds', () => {
  const { nodeIdMap, nodeIds } = Quantagraph.create({
    nodes: cube,
  });

  cube.forEach((property, index) => {
    expect(nodeIdMap[property.id]).toEqual(nodeIds[index]);
  });
});
