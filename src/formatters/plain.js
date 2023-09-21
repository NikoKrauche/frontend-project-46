const getSuitableValue = (value) => {
  switch (toString.call(value)) {
    case '[object Boolean]':
    case '[object Null]': return value;
    case '[object String]': return `'${value}'`;
    case '[object Object]': return '[complex value]';
    default: throw new Error(`Unknown object type: ${value}`);
  }
};

const makePlain = (keys, path = '') => {
  const result = keys
    .filter((key) => key.status !== 'unchanged')
    .map((node) => {
      const accPath = `${path}${node.key}`;
      switch (node.status) {
        case 'nested':
          return makePlain(node.children, `${accPath}.`);
        case 'added':
          return `Property '${accPath}' was added with value: ${getSuitableValue(node.value)}`;
        case 'deleted':
          return `Property '${accPath}' was removed`;
        case 'changed':
          return `Property '${accPath}' was updated. From ${getSuitableValue(node.value1)} to ${getSuitableValue(node.value2)}`;
        default: throw new Error(`Unknown key status: ${node.status}`);
      }
    });
  return result.join('\n');
};

export default makePlain;
