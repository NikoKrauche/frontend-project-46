import yaml from 'js-yaml';

const getParsedData = (data, formatdata) => {
  switch (formatdata) {
    case 'json': return JSON.parse(data);
    case 'yml':
    case 'yaml': return yaml.load(data);
    default: throw new Error(`Invalid data format: ${formatdata}`);
  }
};

export default getParsedData;
