import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('Comparison of flat files (JSON)', () => {
  const dataJSON1 = getFixturePath('file1.json');
  const dataJSON2 = getFixturePath('file2.json');
  const expected = readFile('expected.txt');

  expect(genDiff(dataJSON1, dataJSON2)).toBe(expected);
});
