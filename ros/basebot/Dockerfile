# Pull ROS noetic image from Docker Hub
FROM shiukaheng/ros-base:latest
# Update git
RUN sed -i 's/archive.ubuntu.com/uk.archive.ubuntu.com/g' /etc/apt/sources.list
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
RUN apt-get install -y ros-noetic-rosserial-python
RUN apt-get install -y ros-noetic-hls-lfcd-lds-driver
RUN apt-get install -y ros-noetic-nav2d
RUN apt-get install -y ros-noetic-stage-ros
RUN apt-get install -y ros-noetic-joy

# Development
RUN apt-get install -y python3-catkin-tools
RUN apt-get install -y nano
RUN apt-get install -y git
RUN apt-get install -y x11-apps
RUN apt-get install -y iputils-ping

RUN apt-get install -y net-tools
RUN apt-get install -y python3-pip
RUN pip install pyserial rpi_ws281x numpy

# For hostname resolution
RUN apt-get install -y avahi-daemon avahi-discover avahi-utils libnss-mdns mdns-scan
RUN apt-get install -y wget
RUN apt-get install -y dos2unix

# Change apt sources to use the UK mirror
RUN apt-get install -y curl
# Install latest version of NodeJS
RUN echo "Installing latest version of NodeJS"
RUN /bin/bash -c "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash"

# Raspberry Pi access
RUN apt-get install -y python3-rpi.gpio

# Add the "~/.nvm" directory to the PATH
ENV NVM_DIR=/root/.nvm
# Install the latest version of NodeJS
RUN /bin/bash -c "source $NVM_DIR/nvm.sh; nvm install node"

# Install MML libraries to allow camera to run
RUN apt-get install -y libraspberrypi-dev
RUN sudo mkdir -p /opt/vc/lib
RUN sudo ln -s /usr/lib/arm-linux-gnueabihf/libmmal* /opt/vc/lib/
RUN echo 'export LD_LIBRARY_PATH=/opt/vc/lib:$LD_LIBRARY_PATH' >> ~/.bashrc

# let's hope this doesn't break any hidden python2 dependencies
RUN apt-get install -y python3

# install scikit-learn
RUN pip install scikit-learn

# Install ssh
RUN apt-get update && apt-get install -y openssh-server

# Set password
RUN echo 'root:turtlebot' | chpasswd

# Set the working directory to catkin_ws
WORKDIR /catkin_ws/src

# Setup USB permissions
# RUN /bin/bash -c "source /opt/ros/noetic/setup.bash; rosrun turtlebot3_bringup create_udev_rules"

# Set the environment variables
# ARG ROS_MASTER_HOSTNAME=docker-desktop
# ARG ROS_MASTER_PORT=11311
# ARG TURTLEBOT3_MODEL=waffle_pi
# ENV ROS_MASTER_URI=http://${ROS_MASTER_HOSTNAME}:11311
# ENV ROS_HOSTNAME=${ROS_MASTER_HOSTNAME}
# ENV TURTLEBOT3_MODEL=${TURTLEBOT3_MODEL}
# ENV LDS_MODEL=LDS-01
# EXPOSE 11311

# Copy the init script
COPY ./ros/basebot/scripts/init.sh /scripts/init.sh
RUN dos2unix /scripts/*

# Set the working directory to the scripts directory
WORKDIR /scripts

# Add the init script to the bashrc
RUN echo "source /scripts/init.sh" >> ~/.bashrc

# ROS packages
COPY ./ros/basebot/src/aruco_ros /catkin_ws/src/aruco_ros
COPY ./ros/basebot/src/raspicam_node /catkin_ws/src/raspicam_node
COPY ./ros/basebot/src/ros_autonomous_slam /catkin_ws/src/ros_autonomous_slam
# Build the ROS packages
RUN /bin/bash -c "source /scripts/init.sh; cd /catkin_ws; catkin build aruco_ros"
RUN /bin/bash -c "source /scripts/init.sh; cd /catkin_ws; catkin build raspicam_node"
RUN /bin/bash -c "source /scripts/init.sh; cd /catkin_ws; catkin build ros_autonomous_slam"

# Old setup script"
# # Install npm dependencies
# cd /catkin_ws/src/stagehands-js/ &&
# npm install &&
# npm run build-bot-deps &&

# # Ensure those two bastard scripts are executable
# cd /catkin_ws/src/ros_autonomous_slam/scripts &&
# chmod +x filter.py &&
# chmod +x assigner.py &&

WORKDIR /catkin_ws/src/ros_autonomous_slam/scripts
RUN chmod +x filter.py
RUN chmod +x assigner.py

# Copy stagehands_ros
COPY "./ros/basebot/src/stagehands_ros" "/catkin_ws/src/stagehands_ros"
WORKDIR /catkin_ws
RUN /bin/bash -c "source /scripts/init.sh; catkin build stagehands_ros"

# Copy stagehands-js into the container
# Copy the required javascript packages
COPY ./package.json /catkin_ws/src/stagehands-js/package.json 
COPY ./package-lock.json /catkin_ws/src/stagehands-js/package-lock.json

COPY ./packages/bot/package.json /catkin_ws/src/stagehands-js/packages/bot/package.json
COPY ./packages/bot/src/ /catkin_ws/src/stagehands-js/packages/bot/src/
COPY ./packages/bot/tsconfig.json /catkin_ws/src/stagehands-js/packages/bot/tsconfig.json
COPY ./packages/bot/webpack.config.cjs /catkin_ws/src/stagehands-js/packages/bot/webpack.config.cjs

COPY ./packages/schema/package.json /catkin_ws/src/stagehands-js/packages/schema/package.json
COPY ./packages/schema/tsconfig.json /catkin_ws/src/stagehands-js/packages/schema/tsconfig.json
COPY ./packages/schema/tsconfig.esm.json /catkin_ws/src/stagehands-js/packages/schema/tsconfig.esm.json
COPY ./packages/schema/src/ /catkin_ws/src/stagehands-js/packages/schema/src/

COPY ./packages/utils/package.json /catkin_ws/src/stagehands-js/packages/utils/package.json
COPY ./packages/utils/tsconfig.json /catkin_ws/src/stagehands-js/packages/utils/tsconfig.json
COPY ./packages/utils/tsconfig.esm.json /catkin_ws/src/stagehands-js/packages/utils/tsconfig.esm.json
COPY ./packages/utils/src/ /catkin_ws/src/stagehands-js/packages/utils/src/

COPY ./packages/wtf/package.json /catkin_ws/src/stagehands-js/packages/wtf/package.json
COPY ./packages/wtf/tsconfig.json /catkin_ws/src/stagehands-js/packages/wtf/tsconfig.json
COPY ./packages/wtf/src/ /catkin_ws/src/stagehands-js/packages/wtf/src/

WORKDIR /catkin_ws/src/stagehands-js
RUN /bin/bash -c "source /scripts/init.sh; cd /catkin_ws/src/stagehands-js; npm install"

COPY ./packages/bot/scripts/ /catkin_ws/src/stagehands-js/packages/bot/scripts/

RUN /bin/bash -c "source /scripts/init.sh; cd /catkin_ws/src/stagehands-js; npm run build-bot-deps"
# RUN /bin/bash -c "source /scripts/init.sh; catkin build stagehands-js" # Not yet ready

# # # Build the message types
WORKDIR /catkin_ws/src/stagehands-js/packages/bot/ &&
RUN /bin/bash -c "source /scripts/init.sh; cd /catkin_ws/src/stagehands-js/packages/bot; node -e \"require('rosnodejs').loadAllPackages();\""

COPY ./ros/basebot/scripts/ /scripts/
RUN dos2unix /scripts/*

# Configure SSH
COPY ./ros/basebot/sshd_config /etc/ssh/sshd_config

# Add the post init script to the bashrc (init scripts that dont affect build time should be added here)
RUN echo "source /scripts/post_init.sh" >> ~/.bashrc