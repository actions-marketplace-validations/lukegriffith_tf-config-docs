#!/bin/bash
set -e
git fetch --tags
TAG=$(git describe --tags)
docker pull ghcr.io/lukegriffith/tf-config-docs:$TAG || echo "Container for $TAG might not be built."
docker tag ghcr.io/lukegriffith/tf-config-docs:$TAG \
    ghcr.io/lukegriffith/tf-config-docs:stable
docker push ghcr.io/lukegriffith/tf-config-docs:stable