source /opt/ros/noetic/setup.bash
source /catkin_ws/devel/setup.bash

if [ -d "/mnt/wslg/distro" ]; then \
    export DISPLAY=:0; \
    export WAYLAND_DISPLAY=wayland-0; \
    export XDG_RUNTIME_DIR=/mnt/wslg/runtime-dir; \
    export PULSE_SERVER=unix:/mnt/wslg/PulseServer; \
fi

export TURTLEBOT_NAME=AGGRON
export TURTLEBOT3_MODEL=waffle_pi
export ROS_MASTER_URI=http://192.168.105.158:11311
export ROS_HOSTNAME=$HOSTNAME
