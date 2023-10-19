import _ from 'lodash';

const getIndent = (depth, shift = 2, str = ' ') => str.repeat((depth + 1) * 4 - shift);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const keys = Object.keys(data);
  const result = keys.map((key) => `${getIndent(depth)}  ${key}: ${stringify(data[key], depth + 1)}`);
  return ['{', ...result, `${getIndent(depth, 6)}  }`].join('\n');
};

const makeStylish = (data) => {
  const iter = (keys, depth = 0) => {
    const result = keys.map((node) => {
      switch (node.status) {
        case 'nested':
          return `${getIndent(depth)}  ${node.key}: ${iter(node.children, depth + 1)}`;
        case 'added':
          return `${getIndent(depth)}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'deleted':
          return `${getIndent(depth)}- ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'changed':
          return [
            [`${getIndent(depth)}- ${node.key}: ${stringify(node.value1, depth + 1)}`],
            [`${getIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth + 1)}`],
          ].join('\n');
        case 'unchanged':
          return `${getIndent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
        default: throw new Error(`Unknown key status: ${node.status}`);
      }
    });
    return ['{', ...result, `${getIndent(depth, 4)}}`].join('\n');
  };
  return iter(data);
};

export default makeStylish;
