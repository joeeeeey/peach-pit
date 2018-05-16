#!/bin/bash

# ls ./src/components/preview

cp -r ./src/components/preview/* ../pack-container/src/components/preview/
cp -r ./src/css/* ../pack-container/src/css/
cp -r ./src/jssSettings/* ../pack-container/src/jssSettings/

cp ./src/packIndex.js ../pack-container/src/index.js

cp -r ./src/utils/* ../pack-container/src/utils/