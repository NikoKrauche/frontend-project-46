import path from 'path';
import { readFileSync } from 'node:fs';
import getParsedData from './parser.js';
import getDiffTree from './makeAstTree.js';
import formator from './formator/index.js';

const readFile = (filepath) => readFileSync(path.resolve(filepath));
const getExt = (filepath) => path.extname(filepath);
const getData = (filepath) => getParsedData(readFile(filepath), getExt(filepath));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  return formator(getDiffTree(data1, data2), format);
};

export default genDiff;
