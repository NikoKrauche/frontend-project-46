import path from 'path';
import { readFileSync } from 'node:fs';
import getParsedData from './parser.js';
import getDiffTree from './makeAstTree.js';
import formate from './formatters/index.js';

const readFile = (filepath) => readFileSync(path.resolve(filepath));
const getExtension = (filepath) => path.extname(filepath).slice(1);
const getData = (filepath) => getParsedData(readFile(filepath), getExtension(filepath));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  return formate(getDiffTree(data1, data2), format);
};

export default genDiff;
