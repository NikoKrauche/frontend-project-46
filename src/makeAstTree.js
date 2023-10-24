import _ from 'lodash';

const getDiffTree = (data1, data2) => {
  const sortedKeys = _.sortBy(Object.keys({ ...data1, ...data2 }));
  const result = sortedKeys.map((key) => {
    let children;
    switch (true) {
      case (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])):
        children = getDiffTree(data1[key], data2[key]);
        return { key, children, status: 'nested' };
      case (!Object.hasOwn(data1, key)):
        return { key, value: data2[key], status: 'added' };
      case (!Object.hasOwn(data2, key)):
        return { key, value: data1[key], status: 'deleted' };
      case (!_.isEqual(data1[key], data2[key])):
        return {
          key, value1: data1[key], value2: data2[key], status: 'changed',
        };
      case (_.isEqual(data1[key], data2[key])):
        return { key, value: data1[key], status: 'unchanged' };
      default:
        throw new Error(`The '${key}' does not fit the condition`);
    }
  });
  return result;
};

export default getDiffTree;
