# Install script for directory: /afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/src/custom_nodes

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/install")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Install shared libraries without execute permission?
if(NOT DEFINED CMAKE_INSTALL_SO_NO_EXE)
  set(CMAKE_INSTALL_SO_NO_EXE "1")
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "FALSE")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/stagehands_custom_nodes/msg" TYPE FILE FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/src/custom_nodes/msg/robotCurrentPose.msg")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/stagehands_custom_nodes/srv" TYPE FILE FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/src/custom_nodes/srv/setTargetPose.srv")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/stagehands_custom_nodes/cmake" TYPE FILE FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/build/custom_nodes/catkin_generated/installspace/stagehands_custom_nodes-msg-paths.cmake")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include" TYPE DIRECTORY FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/devel/include/stagehands_custom_nodes")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/roseus/ros" TYPE DIRECTORY FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/devel/share/roseus/ros/stagehands_custom_nodes")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/common-lisp/ros" TYPE DIRECTORY FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/devel/share/common-lisp/ros/stagehands_custom_nodes")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/gennodejs/ros" TYPE DIRECTORY FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/devel/share/gennodejs/ros/stagehands_custom_nodes")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  execute_process(COMMAND "/usr/bin/python3" -m compileall "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/devel/lib/python3/dist-packages/stagehands_custom_nodes")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/python3/dist-packages" TYPE DIRECTORY FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/devel/lib/python3/dist-packages/stagehands_custom_nodes")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/pkgconfig" TYPE FILE FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/build/custom_nodes/catkin_generated/installspace/stagehands_custom_nodes.pc")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/stagehands_custom_nodes/cmake" TYPE FILE FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/build/custom_nodes/catkin_generated/installspace/stagehands_custom_nodes-msg-extras.cmake")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/stagehands_custom_nodes/cmake" TYPE FILE FILES
    "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/build/custom_nodes/catkin_generated/installspace/stagehands_custom_nodesConfig.cmake"
    "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/build/custom_nodes/catkin_generated/installspace/stagehands_custom_nodesConfig-version.cmake"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/stagehands_custom_nodes" TYPE FILE FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/src/custom_nodes/package.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/stagehands_custom_nodes" TYPE PROGRAM FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/build/custom_nodes/catkin_generated/installspace/server.py")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/stagehands_custom_nodes/config" TYPE DIRECTORY FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/src/custom_nodes/config/")
endif()

