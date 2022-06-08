#!/bin/sh

modPath=$1
outputPath=${2:-./docs}
recurse=${3:-"false"}

recruseArg=''

if [[ "$recurse" = "true" ]]; then
    recurseArg='-recurse'
fi

/tf-config-docs -modulePath $modPath -outputPath $outputPath $recurseArg

