import makeStylish from './stylish.js';

const formator = (data, format) => {
  switch (format) {
    case 'stylish': return makeStylish(data);
    default: throw new Error(`Unknown format: ${format}!`);
  }
};

export default formator;
