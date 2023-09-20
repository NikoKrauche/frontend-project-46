import _ from 'lodash';

const getIndent = (depth, shift = 2, str = ' ') => str.repeat(depth * 4 - shift);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const keys = Object.keys(data);
  const result = keys.map((key) => `${getIndent(depth)}  ${key}: ${stringify(data[key], depth + 1)}`);
  return ['{', ...result, `${getIndent(depth - 1)}  }`].join('\n');
};

const makeStylish = (keys, depth = 1) => {
  const result = keys.map((node) => {
    if (node.status === 'nested') {
      return `${getIndent(depth)}  ${node.key}: ${makeStylish(node.children, depth + 1)}`;
    }
    if (node.status === 'added') {
      return `${getIndent(depth)}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
    }
    if (node.status === 'deleted') {
      return `${getIndent(depth)}- ${node.key}: ${stringify(node.value, depth + 1)}`;
    }
    if (node.status === 'changed') {
      return `${getIndent(depth)}- ${node.key}: ${stringify(node.value1, depth + 1)}\n${getIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth + 1)}`;
    }
    return `${getIndent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
  });
  return ['{', ...result, `${getIndent(depth - 1, 0)}}`].join('\n');
};

export default makeStylish;
