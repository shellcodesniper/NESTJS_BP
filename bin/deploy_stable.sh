#!/bin/bash
export PACKAGE_VERSION="v$(cat ./package.json | grep -m 1 version | sed 's/[^0-9.]//g')"
export PACKAGE_NAME="luna-x-api"

docker pull "shellcodesniper/${PACKAGE_NAME}:stable"
docker tag "shellcodesniper/${PACKAGE_NAME}:stable" "shellcodesniper/${PACKAGE_NAME}:rollback"
docker push "shellcodesniper/${PACKAGE_NAME}:rollback"

docker build . -t "shellcodesniper/${PACKAGE_NAME}:${PACKAGE_VERSION}" -t "shellcodesniper/${PACKAGE_NAME}:stable"

docker push "shellcodesniper/${PACKAGE_NAME}:stable"
docker push "shellcodesniper/${PACKAGE_NAME}:${PACKAGE_VERSION}"

docker rmi -f $(docker images "shellcodesniper/${PACKAGE_NAME}" -q)
