#!/usr/bin/env bash
# exit on error
set -o errexit

yarn
yarn build
yarn node ./dist/swagger.js
yarn typeorm migration:run -d dist/data-source