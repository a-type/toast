# Toast

[![pipeline status](https://gitlab.com/a-type/recipes/badges/master/pipeline.svg)](https://gitlab.com/a-type/recipes/commits/master)

Toast Cooking

## Bootstrapping a Dev Environment

### Setup

1. Install Neo4J Enterprise (ask Grant for the link)
2. [`npm i -g devcert-cli`](https://github.com/davewasmer/devcert-cli), use `devcert generate`.
3. Run `lerna bootstrap` (I'm still kind of figuring out Lerna...)
4. If things seem not installed, run `npm i` in any directories where things are broken...

### Running the API

`cd apis/toast-core && npm run dev`

### Running the UI

`cd apps/toast-web && npm start`

### Running the Bookmarklet dev environment

`cd tools/bookmarklet && npm start`
