import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formate = (data, format) => {
  switch (format) {
    case 'stylish': return makeStylish(data);
    case 'plain': return makePlain(data);
    case 'json': return JSON.stringify(data);
    default: throw new Error(`Unknown format: ${format}!`);
  }
};

export default formate;
