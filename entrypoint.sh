#!/bin/sh
set -x

modPath=${1:-.}
outputPath=${2:-./docs}
recurse=${3:-"false"}

recruseArg=''

if [[ "$recurse" = "true" ]]; then
    recurseArg='-recurse'
fi

git config --global --add safe.directory /github/workspace

cd /github/workspace

mkdir $outputPath
cp -r /build $outputPath
tf-config-docs -modulePath $modPath -outputPath $outputPath $recurseArg

git checkout -b docs
git add $outputPath
git commit -m "Updating Terraform docs."
git push origin docs

# Can we push directly from here to docs? 
