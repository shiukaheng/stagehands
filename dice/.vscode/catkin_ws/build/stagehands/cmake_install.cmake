# Install script for directory: /afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/src/stagehands

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
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/stagehands/msg" TYPE FILE FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/src/stagehands/msg/robotCurrentPose.msg")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/stagehands/srv" TYPE FILE FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/src/stagehands/srv/setTargetPose.srv")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/stagehands/cmake" TYPE FILE FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/build/stagehands/catkin_generated/installspace/stagehands-msg-paths.cmake")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include" TYPE DIRECTORY FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/devel/include/stagehands")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/roseus/ros" TYPE DIRECTORY FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/devel/share/roseus/ros/stagehands")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/common-lisp/ros" TYPE DIRECTORY FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/devel/share/common-lisp/ros/stagehands")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/gennodejs/ros" TYPE DIRECTORY FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/devel/share/gennodejs/ros/stagehands")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  execute_process(COMMAND "/usr/bin/python3" -m compileall "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/devel/lib/python3/dist-packages/stagehands")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/python3/dist-packages" TYPE DIRECTORY FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/devel/lib/python3/dist-packages/stagehands")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/pkgconfig" TYPE FILE FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/build/stagehands/catkin_generated/installspace/stagehands.pc")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/stagehands/cmake" TYPE FILE FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/build/stagehands/catkin_generated/installspace/stagehands-msg-extras.cmake")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/stagehands/cmake" TYPE FILE FILES
    "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/build/stagehands/catkin_generated/installspace/stagehandsConfig.cmake"
    "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/build/stagehands/catkin_generated/installspace/stagehandsConfig-version.cmake"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/stagehands" TYPE FILE FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/src/stagehands/package.xml")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/stagehands" TYPE PROGRAM FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/build/stagehands/catkin_generated/installspace/server.py")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/stagehands/config" TYPE DIRECTORY FILES "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/src/stagehands/config/")
endif()

