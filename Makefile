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