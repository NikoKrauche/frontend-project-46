import yaml from 'js-yaml';

const getParsedData = (data, ext) => {
  switch (ext) {
    case '.json': return JSON.parse(data);
    case '.yml': return yaml.load(data);
    default: throw new Error(`Unknown type: '${ext}'!`);
  }
};

export default getParsedData;
