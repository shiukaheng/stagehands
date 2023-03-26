#!/bin/bash

# # Check for uncommitted changes
# if [ -n "$(git status --porcelain)" ]; then
#   echo -e "\033[1;31mError:\033[0m There are uncommitted changes. Please commit or stash them before running prebuild."
#   exit 1
# fi

# Run docker-compose
docker-compose -f ./docker-compose.yaml -f ./docker-compose.prod.yaml -f ./docker-compose.useprebuild.yaml -f ./docker-compose.prebuild.yaml up

# Commit changes with prebuild message
git add .
git commit -m "Prebuild changes"
echo -e "\033[1;32mSuccess:\033[0m Prebuild completed successfully and changes were committed."