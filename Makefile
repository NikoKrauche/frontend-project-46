install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

start:
	gendiff -h

testJSON:
	gendiff __fixtures__/file1.json __fixtures__/file2.json

test:
	npm run test

testwatch:
	npm run test -- --watch

test-coverage:
	npx jest --coverage