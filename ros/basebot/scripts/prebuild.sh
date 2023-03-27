#!/bin/bash
. init.sh
cd /catkin_ws/src/stagehands-js/
npm install
npm run build-bot-deps
cd /catkin_ws/src/stagehands-js/packages/bot/
# Build the message types
npm run build
# Ensure those two bastard scripts are executable
cd /catkin_ws/src/ros_autonomous_slam/scripts
chmod +x filter.py
chmod +x assigner.py
cd /catkin_ws/
node -e "require(\"rosnodejs\").loadAllPackages();"
build