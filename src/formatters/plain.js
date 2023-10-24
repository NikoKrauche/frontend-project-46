const stringify = (value) => {
  if (typeof value === 'object' && value !== null) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const makePlain = (data) => {
  const iter = (keys, path = '') => {
    const result = keys.map((node) => {
      const accPath = `${path}${node.key}`;
      switch (node.status) {
        case 'unchanged':
          return null;
        case 'nested':
          return iter(node.children, `${accPath}.`);
        case 'added':
          return `Property '${accPath}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${accPath}' was removed`;
        case 'changed':
          return `Property '${accPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        default: throw new Error(`Unknown key status: ${node.status}`);
      }
    })
      .filter((key) => key !== null);
    return result.join('\n');
  };
  return iter(data);
};

export default makePlain;
