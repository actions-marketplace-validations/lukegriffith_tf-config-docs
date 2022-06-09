#!/bin/sh

modPath=${1:-.}
outputPath=${2:-./docs}
recurse=${3:-"false"}

recruseArg=''

if [[ "$recurse" = "true" ]]; then
    recurseArg='-recurse'
fi


ls /github/workspace

mkdir /github/workspace/docs
cp /app/build /docs

cd /github/workspace
git checkout -b docs

tf-config-docs -modulePath $modPath -outputPath $outputPath $recurseArg

# Can we push directly from here to docs? 
