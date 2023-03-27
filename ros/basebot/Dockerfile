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

# Configure SSH
COPY ./ros/basebot/sshd_config /etc/ssh/sshd_config

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

# Copy the scripts directory into the container
COPY ./ros/basebot/scripts/ /scripts/
RUN dos2unix /scripts/*

# Set the working directory to the scripts directory
WORKDIR /scripts

# Add the init script to the bashrc
RUN echo "source /scripts/init.sh" >> ~/.bashrc

# Copy the required javascript package specifications
COPY ./package.json /catkin_ws/src/stagehands-js/package.json 
COPY ./package-lock.json /catkin_ws/src/stagehands-js/package-lock.json
COPY ./packages/bot/package.json /catkin_ws/src/stagehands-js/packages/bot/package.json
COPY ./packages/bridge/package.json /catkin_ws/src/stagehands-js/packages/bridge/package.json
COPY ./packages/fake_bridge/package.json /catkin_ws/src/stagehands-js/packages/fake_bridge/package.json
COPY ./packages/schema/package.json /catkin_ws/src/stagehands-js/packages/schema/package.json
COPY ./packages/utils/package.json /catkin_ws/src/stagehands-js/packages/utils/package.json
COPY ./packages/wtf/package.json /catkin_ws/src/stagehands-js/packages/wtf/package.json

# Install the required javascript packages needed during runtime
RUN bash -c "source /scripts/init.sh; cd /catkin_ws/src/stagehands-js && npm install --omit=dev"