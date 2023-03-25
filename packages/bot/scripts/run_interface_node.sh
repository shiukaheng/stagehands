#!/bin/bash
NODEJS_EXECUTABLE=$(which node)

if [ -z "$NODEJS_EXECUTABLE" ]; then
  echo "Node.js not found. Please install Node.js."
  exit 1
fi

SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
JS_SCRIPT_PATH="$SCRIPT_DIR/index.js"

exec $NODEJS_EXECUTABLE $JS_SCRIPT_PATH
