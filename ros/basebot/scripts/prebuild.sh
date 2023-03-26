#!/bin/bash
. init.sh
cd /catkin_ws/src/stagehands-js/
npm install
npm run build-bot-deps
cd /catkin_ws/src/stagehands-js/packages/bot/
npm run build
cd /catkin_ws/
build