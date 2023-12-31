import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  {
    filename1: 'file1.json',
    filename2: 'file2.json',
    format: undefined,
    fixture: 'stylish.txt',
  },
  {
    filename1: 'file1.yml',
    filename2: 'file2.yaml',
    format: undefined,
    fixture: 'stylish.txt',
  },
  {
    filename1: 'file1.json',
    filename2: 'file2.json',
    format: 'plain',
    fixture: 'plaine.txt',
  },
  {
    filename1: 'file1.yml',
    filename2: 'file2.yaml',
    format: 'plain',
    fixture: 'plaine.txt',
  },
  {
    filename1: 'file1.json',
    filename2: 'file2.json',
    format: 'json',
    fixture: 'json.txt',
  },
  {
    filename1: 'file1.yml',
    filename2: 'file2.yaml',
    format: 'json',
    fixture: 'json.txt',
  },
])('Comparison of files', ({
  filename1, filename2, format, fixture,
}) => {
  const data1 = getFixturePath(filename1);
  const data2 = getFixturePath(filename2);
  const expected = readFile(fixture);

  expect(genDiff(data1, data2, format)).toBe(expected);
});
