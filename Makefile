install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

help:
	gendiff -h

test:
	npm run test

testwatch:
	npm run test -- --watch

test-coverage:
	npx jest --coverage

json:
	gendiff __fixtures__/file1.json __fixtures__/file2.json

yml:
	gendiff __fixtures__/file1.yml __fixtures__/file2.yaml