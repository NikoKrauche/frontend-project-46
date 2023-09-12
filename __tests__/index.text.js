import { readFileSync } from 'node:fs';
import path from 'path';
import genDiff from '../src/index.js';

test('Comparison of flat files (JSON)', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  //  const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
  const dataJSON1 = getFixturePath('__fixtures__/file1.json', 'utf-8');
  const dataJSON2 = getFixturePath('__fixtures__/file2.json', 'utf-8');
  const expected = getFixturePath('__fixtures__/expected.txt', 'utf-8');
  expect(genDiff(dataJSON1, dataJSON2)).toEqual(expected);
});
