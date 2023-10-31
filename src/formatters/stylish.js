import _ from 'lodash';

const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const keys = Object.keys(data);
  const result = keys.map((key) => `${getIndent(depth + 1)}  ${key}: ${stringify(data[key], depth + 1)}`);
  return ['{', ...result, `${getIndent(depth)}  }`].join('\n');
};
const makeStylish = (data) => {
  const iter = (keys, depth = 1) => {
    const result = keys.map((node) => {
      switch (node.type) {
        case 'nested':
          return `${getIndent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1)}\n${getIndent(depth)}  }`;
        case 'added':
          return `${getIndent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
        case 'deleted':
          return `${getIndent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
        case 'changed':
          return [
            [`${getIndent(depth)}- ${node.key}: ${stringify(node.value1, depth)}`],
            [`${getIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`],
          ].join('\n');
        case 'unchanged':
          return `${getIndent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
        default: throw new Error(`Unknown type: ${node.type}`);
      }
    });
    return result.join('\n');
  };
  return ['{', `${iter(data)}`, '}'].join('\n');
};

export default makeStylish;
