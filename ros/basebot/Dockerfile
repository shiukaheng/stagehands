# Pull ROS noetic image from Docker Hub
FROM osrf/ros:noetic-desktop-full

# Update git
RUN apt-get update

# READ: https://emanual.robotis.com/docs/en/platform/turtlebot3/quick-start/

# Turtlebot packages
RUN apt-get install -y ros-noetic-dynamixel-sdk
RUN apt-get install -y ros-noetic-turtlebot3-msgs
RUN apt-get install -y ros-noetic-turtlebot3
RUN apt-get install -y ros-noetic-turtlebot3-simulations
RUN apt-get install -y ros-noetic-turtlebot3-gazebo
RUN apt-get install -y ros-noetic-openslam-gmapping
RUN apt-get install -y ros-noetic-slam-gmapping
RUN apt-get install -y ros-noetic-navigation
RUN apt-get install -y ros-noetic-geometry2
RUN apt-get install -y ros-noetic-hector-slam
RUN apt-get install -y ros-noetic-rqt
# RUN apt-get install -y ros-noetic-rqt-common-plugins
# RUN apt-get install -y ros-noetic-rqt-robot-plugins
RUN apt-get install -y libgazebo11-dev
RUN apt-get install -y python3-roslaunch

# Nodejs
RUN apt-get install -y nodejs npm

# Development
RUN apt-get install -y python3-catkin-tools
RUN apt-get install -y nano
RUN apt-get install -y git
RUN apt-get install -y x11-apps
RUN apt-get install -y iputils-ping

# For hostname resolution
RUN apt-get install -y avahi-daemon avahi-discover avahi-utils libnss-mdns mdns-scan
RUN apt-get install -y wget
RUN apt-get install -y dos2unix
RUN apt-get install -y curl

# More ROS
RUN apt-get install -y ros-noetic-

# Set the working directory to catkin_ws
WORKDIR /catkin_ws/src

# Copy .src files into the catkin_ws/src folder:
COPY ./src/ .

# Set the working directory to catkin_ws 
WORKDIR /catkin_ws

# Build the catkin workspace
RUN /bin/bash -c "source /opt/ros/noetic/setup.bash; catkin build"

# Set the environment variables
ARG ROS_MASTER_HOSTNAME=localhost
ARG ROS_MASTER_PORT=11311
ARG TURTLEBOT3_MODEL=waffle_pi
ENV ROS_MASTER_URI=http://${ROS_MASTER_HOSTNAME}:11311
ENV ROS_HOSTNAME=${ROS_MASTER_HOSTNAME}
ENV TURTLEBOT3_MODEL=${TURTLEBOT3_MODEL}

# Go back to the default working directory
WORKDIR /

# Copy in the map directory
COPY ./map/ ./map/

# Expose the port for the ROS master
EXPOSE 11311

## BELOW IS FOR DEVELOPMENT PURPOSES ONLY, PLEASE REMOVE FOR PRODUCTION ##
# Copy the scripts directory into the container
COPY ./scripts/ ./scripts/
RUN dos2unix /scripts/*

# Set the working directory to the scripts directory
WORKDIR /scripts

# Add the init script to the bashrc
RUN echo "source /scripts/init.sh" >> ~/.bashrc