import _ from 'lodash';
import formator from './formator.js';

const getDiffTree = (data1, data2) => {
  const sortedKeys = _.sortBy(Object.keys({ ...data1, ...data2 }));

  const result = sortedKeys.map((key) => {
    if (!Object.hasOwn(data1, key)) return { key, value: data2[key], status: 'added' };
    if (!Object.hasOwn(data2, key)) return { key, value: data1[key], status: 'deleted' };
    if (data1[key] !== data2[key]) return { key, value1: data1[key], value2: data2[key], status: 'changed' };

    return { key, value: data1[key], status: 'unchanged' };
  });

  return formator(result);
};

export default getDiffTree;
