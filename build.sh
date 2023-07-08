#!/usr/bin/env bash
# exit on error
set -o errexit

yarn
yarn node ./dist/swagger.js
yarn build
yarn typeorm migration:run -d dist/data-source