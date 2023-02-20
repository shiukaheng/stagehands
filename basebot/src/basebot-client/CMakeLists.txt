cmake_minimum_required(VERSION 2.8.3)
project(basebot-client)

find_package(catkin REQUIRED)

###################################
## catkin specific configuration ##
###################################
catkin_package()

#############
## Install ##
#############

# Run npm install before copying files
execute_process(COMMAND npm install
  WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
)

install(PROGRAMS
   src/client.js
   DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION}
)

