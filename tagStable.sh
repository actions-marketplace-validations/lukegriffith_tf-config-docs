#!/bin/bash

TAG=$(git describe --tags)
docker pull ghcr.io/lukegriffith/tf-config-docs:$TAG
docker tag ghcr.io/lukegriffith/tf-config-docs:$TAG \
    ghcr.io/lukegriffith/tf-config-docs:stable
docker push ghcr.io/lukegriffith/tf-config-docs:stable