install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

start:
	gendiff -h

test:
	gendiff __fixtures__/file1.json __fixtures__/file2.json