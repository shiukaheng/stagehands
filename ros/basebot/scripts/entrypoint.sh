#!/bin/bash
. init.sh

# cd /catkin_ws/src/stagehands-js/packages
# roscore

# Start ssh daemon
service ssh start

# Make sure name is generated
stagehands name

# Prevent container from exiting
tail -f /dev/null