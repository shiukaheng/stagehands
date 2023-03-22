source /opt/ros/noetic/setup.bash
source /catkin_ws/devel/setup.bash

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
    source /catkin_ws/devel/setup.bash
}

function set_bot_name {
    export TURTLEBOT_NAME=$1
}

function set_bot_model {
    export TURTLEBOT3_MODEL=$1
}
