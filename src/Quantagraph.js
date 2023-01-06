/* eslint-disable no-restricted-syntax */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */

const generateId = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  .replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });

const addNodesToGraph = ({ quantagraph, nodes }) => {
  const graph = {};
  const instanceIdMap = {};

  nodes.forEach((node) => {
    if (!Object.prototype.hasOwnProperty.call(instanceIdMap, node.id)) {
      instanceIdMap[node.id] = generateId();
    }

    const id = instanceIdMap[node.id];
    const inputs = (node.inputs ?? []).map((input) => {
      if (!Object.prototype.hasOwnProperty.call(instanceIdMap, input)) {
        instanceIdMap[input] = generateId();
      }

      return instanceIdMap[input];
    });

    graph[id] = {
      inputs, value: (inputs.length > 0 ? node.value : (x) => x),
    };
  });

  return {
    quantagraph: { ...quantagraph, ...graph },
    nodeIdMap: instanceIdMap,
    nodeIds: nodes.map((node) => instanceIdMap[node.id]),
  };
};

const deepEvaluteNode = (quantagraph, values, id) => {
  if (Object.prototype.hasOwnProperty.call(values, id)) return values[id];

  const node = quantagraph[id];
  const inputValues = node.inputs.map(
    (inputId) => deepEvaluteNode(quantagraph, values, inputId),
  );
  return node.value(...inputValues);
};

module.exports = {
  create: ({ nodes = [] }) => addNodesToGraph({ quantagraph: {}, nodes }),
  addNodes: ({ quantagraph, nodes }) => addNodesToGraph({ quantagraph, nodes }),
  evaluate: ({ quantagraph, values }) => {
    const results = values;
    for (const [key] of Object.entries(quantagraph)) {
      results[key] = deepEvaluteNode(quantagraph, values, key);
    }
    return results;
  },
};
