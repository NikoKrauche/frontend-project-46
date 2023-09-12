const formator = (keys) => {
  const result = keys.map((node) => {
    if (node.status === 'added') return `+ ${node.key}: ${node.value}`;
    if (node.status === 'deleted') return `- ${node.key}: ${node.value}`;
    if (node.status === 'changed') return `- ${node.key}: ${node.value1}\n+ ${node.key}: ${node.value2}`;
    return `  ${node.key}: ${node.value}`;
  }).join('\n');

  return result;
};

export default formator;
