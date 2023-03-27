#!/bin/bash
. init.sh

# Make sure name is generated by running "node /catkin_ws/src/stagehands-js/packages/bot/dist/getName.js" and saving output to bash variable
export NAME=$(node /catkin_ws/src/stagehands-js/packages/bot/dist/getName.js)

# Set ROS hostname to <name>-stagehands.local
export ROS_HOSTNAME=$NAME-stagehands.local
echo "Launching ROS with hostname $ROS_HOSTNAME"

# # Launch ROS master
# roscore &

# Launch the management node
cd /catkin_ws/src/stagehands-js/packages/bot
node dist/index.js

# Start ssh daemon
# service ssh start

# Prevent container from exiting
# tail -f /dev/null