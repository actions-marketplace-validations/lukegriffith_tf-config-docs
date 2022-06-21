#!/bin/sh
set -x

modPath=${1:-.}
outputPath=${2:-./docs}
recurse=${3:-"false"}
loadEnvName=${4:-"false"}

recruseArg=''

if [[ "$recurse" = "true" ]]; then
    recurseArg='-recurse'
fi

if [[ "$loadEnvName" = "true" ]]; then
    [ -z "$WORKDIR_FRIENDLY_NAME" ] && echo "laodEnvName provided but no env var found." && exit 1
    loadEnvArg='-loadEnvName'
fi

git config --global --add safe.directory /github/workspace
git config --global user.email "tf-config-docs@actions.com"
git config --global user.name "tf-config-docs bot"

cd /github/workspace

mkdir $outputPath || rm -rf $outputPath/*
cp -r /build/* $outputPath
tf-config-docs -modulePath $modPath -outputPath $outputPath $recurseArg $loadEnvArg

git checkout -b docs
git add $outputPath
git commit -m "Updating Terraform docs."
git push origin docs --force

# Can we push directly from here to docs? 