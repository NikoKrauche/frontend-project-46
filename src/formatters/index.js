import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const formator = (data, format) => {
  switch (format) {
    case 'stylish': return makeStylish(data);
    case 'plain': return makePlain(data);
    case 'json': return makeJson(data);
    default: throw new Error(`Unknown format: ${format}!`);
  }
};

export default formator;
