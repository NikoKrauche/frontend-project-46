import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formator = (data, format) => {
  switch (format) {
    case 'stylish': return makeStylish(data);
    case 'plain': return makePlain(data);
    default: throw new Error(`Unknown format: ${format}!`);
  }
};

export default formator;
