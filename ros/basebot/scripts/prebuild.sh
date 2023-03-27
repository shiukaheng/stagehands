#!/bin/bash

# Source environment
cd /scripts
. init.sh

# Install npm dependencies
cd /catkin_ws/src/stagehands-js/ &&
npm install &&
npm run build-bot-deps &&

# Ensure those two bastard scripts are executable
cd /catkin_ws/src/ros_autonomous_slam/scripts &&
chmod +x filter.py &&
chmod +x assigner.py &&

# Build packages
cd /catkin_ws/ &&
build &&

# Build the message types
cd /catkin_ws/src/stagehands-js/packages/bot/ &&
node -e "require(\"rosnodejs\").loadAllPackages();"