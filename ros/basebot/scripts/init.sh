#!/bin/bash
source /opt/ros/noetic/setup.bash
# Source /catkin_ws/devel/setup.bash if it exists
if [ -f "/catkin_ws/devel/setup.bash" ]; then
    source /catkin_ws/devel/setup.bash
fi

if [ -d "/mnt/wslg/distro" ]; then \
    export DISPLAY=:0; \
    export WAYLAND_DISPLAY=wayland-0; \
    export XDG_RUNTIME_DIR=/mnt/wslg/runtime-dir; \
    export PULSE_SERVER=unix:/mnt/wslg/PulseServer; \
fi

# If HOST_OS is linux, then set DISPLAY to :0
if [ "$HOST_OS" = "linux" ]; then
    export DISPLAY=:0
fi

export PS1='\[\e[1;32m\]\u@\h:\[\e[1;34m\]\w\[\e[0m\]\$ '

# Convenience function to build the workspace
function build {
    catkin build
    if [ $? -eq 0 ]; then
        source devel/setup.bash
    fi
}

function set_bot_name {
    export TURTLEBOT_NAME=$1
}

function set_bot_model {
    export TURTLEBOT3_MODEL=$1
}

function cdjs {
    cd /catkin_ws/src/stagehands-js
}

function cdjsbot {
    cd /catkin_ws/src/stagehands-js/packages/bot
}

function cdjsutils {
    cd /catkin_ws/src/stagehands-js/packages/utils
}

function run {
    local cwd=$(pwd)
    cd /catkin_ws/src/stagehands-js/packages/bot
    node dist/index.js
    cd $cwd
}

function refreshenv {
    source ~/.bashrc
}

. /root/.nvm/nvm.sh

cd /catkin_ws