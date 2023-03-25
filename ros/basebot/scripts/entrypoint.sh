#!/bin/bash
. init.sh

cd /catkin_ws/src/stagehands-js/packages
roscore &
npm run prod-bot