# generated from genmsg/cmake/pkg-genmsg.cmake.em

message(STATUS "stagehands_ros: 1 messages, 3 services")

set(MSG_I_FLAGS "-Istagehands_ros:/catkin_ws/src/stagehands_ros/msg;-Istd_msgs:/opt/ros/noetic/share/std_msgs/cmake/../msg")

# Find all generators
find_package(gencpp REQUIRED)
find_package(geneus REQUIRED)
find_package(genlisp REQUIRED)
find_package(gennodejs REQUIRED)
find_package(genpy REQUIRED)

add_custom_target(stagehands_ros_generate_messages ALL)

# verify that message/service dependencies have not changed since configure



get_filename_component(_filename "/catkin_ws/src/stagehands_ros/msg/robotCurrentPose.msg" NAME_WE)
add_custom_target(_stagehands_ros_generate_messages_check_deps_${_filename}
  COMMAND ${CATKIN_ENV} ${PYTHON_EXECUTABLE} ${GENMSG_CHECK_DEPS_SCRIPT} "stagehands_ros" "/catkin_ws/src/stagehands_ros/msg/robotCurrentPose.msg" ""
)

get_filename_component(_filename "/catkin_ws/src/stagehands_ros/srv/setTargetPose.srv" NAME_WE)
add_custom_target(_stagehands_ros_generate_messages_check_deps_${_filename}
  COMMAND ${CATKIN_ENV} ${PYTHON_EXECUTABLE} ${GENMSG_CHECK_DEPS_SCRIPT} "stagehands_ros" "/catkin_ws/src/stagehands_ros/srv/setTargetPose.srv" ""
)

get_filename_component(_filename "/catkin_ws/src/stagehands_ros/srv/arucoRecordPoses.srv" NAME_WE)
add_custom_target(_stagehands_ros_generate_messages_check_deps_${_filename}
  COMMAND ${CATKIN_ENV} ${PYTHON_EXECUTABLE} ${GENMSG_CHECK_DEPS_SCRIPT} "stagehands_ros" "/catkin_ws/src/stagehands_ros/srv/arucoRecordPoses.srv" ""
)

get_filename_component(_filename "/catkin_ws/src/stagehands_ros/srv/arucoAveragePose.srv" NAME_WE)
add_custom_target(_stagehands_ros_generate_messages_check_deps_${_filename}
  COMMAND ${CATKIN_ENV} ${PYTHON_EXECUTABLE} ${GENMSG_CHECK_DEPS_SCRIPT} "stagehands_ros" "/catkin_ws/src/stagehands_ros/srv/arucoAveragePose.srv" ""
)

#
#  langs = gencpp;geneus;genlisp;gennodejs;genpy
#

### Section generating for lang: gencpp
### Generating Messages
_generate_msg_cpp(stagehands_ros
  "/catkin_ws/src/stagehands_ros/msg/robotCurrentPose.msg"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${gencpp_INSTALL_DIR}/stagehands_ros
)

### Generating Services
_generate_srv_cpp(stagehands_ros
  "/catkin_ws/src/stagehands_ros/srv/setTargetPose.srv"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${gencpp_INSTALL_DIR}/stagehands_ros
)
_generate_srv_cpp(stagehands_ros
  "/catkin_ws/src/stagehands_ros/srv/arucoRecordPoses.srv"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${gencpp_INSTALL_DIR}/stagehands_ros
)
_generate_srv_cpp(stagehands_ros
  "/catkin_ws/src/stagehands_ros/srv/arucoAveragePose.srv"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${gencpp_INSTALL_DIR}/stagehands_ros
)

### Generating Module File
_generate_module_cpp(stagehands_ros
  ${CATKIN_DEVEL_PREFIX}/${gencpp_INSTALL_DIR}/stagehands_ros
  "${ALL_GEN_OUTPUT_FILES_cpp}"
)

add_custom_target(stagehands_ros_generate_messages_cpp
  DEPENDS ${ALL_GEN_OUTPUT_FILES_cpp}
)
add_dependencies(stagehands_ros_generate_messages stagehands_ros_generate_messages_cpp)

# add dependencies to all check dependencies targets
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/msg/robotCurrentPose.msg" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_cpp _stagehands_ros_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/srv/setTargetPose.srv" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_cpp _stagehands_ros_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/srv/arucoRecordPoses.srv" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_cpp _stagehands_ros_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/srv/arucoAveragePose.srv" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_cpp _stagehands_ros_generate_messages_check_deps_${_filename})

# target for backward compatibility
add_custom_target(stagehands_ros_gencpp)
add_dependencies(stagehands_ros_gencpp stagehands_ros_generate_messages_cpp)

# register target for catkin_package(EXPORTED_TARGETS)
list(APPEND ${PROJECT_NAME}_EXPORTED_TARGETS stagehands_ros_generate_messages_cpp)

### Section generating for lang: geneus
### Generating Messages
_generate_msg_eus(stagehands_ros
  "/catkin_ws/src/stagehands_ros/msg/robotCurrentPose.msg"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${geneus_INSTALL_DIR}/stagehands_ros
)

### Generating Services
_generate_srv_eus(stagehands_ros
  "/catkin_ws/src/stagehands_ros/srv/setTargetPose.srv"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${geneus_INSTALL_DIR}/stagehands_ros
)
_generate_srv_eus(stagehands_ros
  "/catkin_ws/src/stagehands_ros/srv/arucoRecordPoses.srv"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${geneus_INSTALL_DIR}/stagehands_ros
)
_generate_srv_eus(stagehands_ros
  "/catkin_ws/src/stagehands_ros/srv/arucoAveragePose.srv"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${geneus_INSTALL_DIR}/stagehands_ros
)

### Generating Module File
_generate_module_eus(stagehands_ros
  ${CATKIN_DEVEL_PREFIX}/${geneus_INSTALL_DIR}/stagehands_ros
  "${ALL_GEN_OUTPUT_FILES_eus}"
)

add_custom_target(stagehands_ros_generate_messages_eus
  DEPENDS ${ALL_GEN_OUTPUT_FILES_eus}
)
add_dependencies(stagehands_ros_generate_messages stagehands_ros_generate_messages_eus)

# add dependencies to all check dependencies targets
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/msg/robotCurrentPose.msg" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_eus _stagehands_ros_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/srv/setTargetPose.srv" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_eus _stagehands_ros_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/srv/arucoRecordPoses.srv" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_eus _stagehands_ros_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/srv/arucoAveragePose.srv" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_eus _stagehands_ros_generate_messages_check_deps_${_filename})

# target for backward compatibility
add_custom_target(stagehands_ros_geneus)
add_dependencies(stagehands_ros_geneus stagehands_ros_generate_messages_eus)

# register target for catkin_package(EXPORTED_TARGETS)
list(APPEND ${PROJECT_NAME}_EXPORTED_TARGETS stagehands_ros_generate_messages_eus)

### Section generating for lang: genlisp
### Generating Messages
_generate_msg_lisp(stagehands_ros
  "/catkin_ws/src/stagehands_ros/msg/robotCurrentPose.msg"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${genlisp_INSTALL_DIR}/stagehands_ros
)

### Generating Services
_generate_srv_lisp(stagehands_ros
  "/catkin_ws/src/stagehands_ros/srv/setTargetPose.srv"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${genlisp_INSTALL_DIR}/stagehands_ros
)
_generate_srv_lisp(stagehands_ros
  "/catkin_ws/src/stagehands_ros/srv/arucoRecordPoses.srv"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${genlisp_INSTALL_DIR}/stagehands_ros
)
_generate_srv_lisp(stagehands_ros
  "/catkin_ws/src/stagehands_ros/srv/arucoAveragePose.srv"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${genlisp_INSTALL_DIR}/stagehands_ros
)

### Generating Module File
_generate_module_lisp(stagehands_ros
  ${CATKIN_DEVEL_PREFIX}/${genlisp_INSTALL_DIR}/stagehands_ros
  "${ALL_GEN_OUTPUT_FILES_lisp}"
)

add_custom_target(stagehands_ros_generate_messages_lisp
  DEPENDS ${ALL_GEN_OUTPUT_FILES_lisp}
)
add_dependencies(stagehands_ros_generate_messages stagehands_ros_generate_messages_lisp)

# add dependencies to all check dependencies targets
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/msg/robotCurrentPose.msg" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_lisp _stagehands_ros_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/srv/setTargetPose.srv" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_lisp _stagehands_ros_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/srv/arucoRecordPoses.srv" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_lisp _stagehands_ros_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/srv/arucoAveragePose.srv" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_lisp _stagehands_ros_generate_messages_check_deps_${_filename})

# target for backward compatibility
add_custom_target(stagehands_ros_genlisp)
add_dependencies(stagehands_ros_genlisp stagehands_ros_generate_messages_lisp)

# register target for catkin_package(EXPORTED_TARGETS)
list(APPEND ${PROJECT_NAME}_EXPORTED_TARGETS stagehands_ros_generate_messages_lisp)

### Section generating for lang: gennodejs
### Generating Messages
_generate_msg_nodejs(stagehands_ros
  "/catkin_ws/src/stagehands_ros/msg/robotCurrentPose.msg"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${gennodejs_INSTALL_DIR}/stagehands_ros
)

### Generating Services
_generate_srv_nodejs(stagehands_ros
  "/catkin_ws/src/stagehands_ros/srv/setTargetPose.srv"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${gennodejs_INSTALL_DIR}/stagehands_ros
)
_generate_srv_nodejs(stagehands_ros
  "/catkin_ws/src/stagehands_ros/srv/arucoRecordPoses.srv"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${gennodejs_INSTALL_DIR}/stagehands_ros
)
_generate_srv_nodejs(stagehands_ros
  "/catkin_ws/src/stagehands_ros/srv/arucoAveragePose.srv"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${gennodejs_INSTALL_DIR}/stagehands_ros
)

### Generating Module File
_generate_module_nodejs(stagehands_ros
  ${CATKIN_DEVEL_PREFIX}/${gennodejs_INSTALL_DIR}/stagehands_ros
  "${ALL_GEN_OUTPUT_FILES_nodejs}"
)

add_custom_target(stagehands_ros_generate_messages_nodejs
  DEPENDS ${ALL_GEN_OUTPUT_FILES_nodejs}
)
add_dependencies(stagehands_ros_generate_messages stagehands_ros_generate_messages_nodejs)

# add dependencies to all check dependencies targets
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/msg/robotCurrentPose.msg" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_nodejs _stagehands_ros_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/srv/setTargetPose.srv" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_nodejs _stagehands_ros_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/srv/arucoRecordPoses.srv" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_nodejs _stagehands_ros_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/srv/arucoAveragePose.srv" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_nodejs _stagehands_ros_generate_messages_check_deps_${_filename})

# target for backward compatibility
add_custom_target(stagehands_ros_gennodejs)
add_dependencies(stagehands_ros_gennodejs stagehands_ros_generate_messages_nodejs)

# register target for catkin_package(EXPORTED_TARGETS)
list(APPEND ${PROJECT_NAME}_EXPORTED_TARGETS stagehands_ros_generate_messages_nodejs)

### Section generating for lang: genpy
### Generating Messages
_generate_msg_py(stagehands_ros
  "/catkin_ws/src/stagehands_ros/msg/robotCurrentPose.msg"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/stagehands_ros
)

### Generating Services
_generate_srv_py(stagehands_ros
  "/catkin_ws/src/stagehands_ros/srv/setTargetPose.srv"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/stagehands_ros
)
_generate_srv_py(stagehands_ros
  "/catkin_ws/src/stagehands_ros/srv/arucoRecordPoses.srv"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/stagehands_ros
)
_generate_srv_py(stagehands_ros
  "/catkin_ws/src/stagehands_ros/srv/arucoAveragePose.srv"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/stagehands_ros
)

### Generating Module File
_generate_module_py(stagehands_ros
  ${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/stagehands_ros
  "${ALL_GEN_OUTPUT_FILES_py}"
)

add_custom_target(stagehands_ros_generate_messages_py
  DEPENDS ${ALL_GEN_OUTPUT_FILES_py}
)
add_dependencies(stagehands_ros_generate_messages stagehands_ros_generate_messages_py)

# add dependencies to all check dependencies targets
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/msg/robotCurrentPose.msg" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_py _stagehands_ros_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/srv/setTargetPose.srv" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_py _stagehands_ros_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/srv/arucoRecordPoses.srv" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_py _stagehands_ros_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/catkin_ws/src/stagehands_ros/srv/arucoAveragePose.srv" NAME_WE)
add_dependencies(stagehands_ros_generate_messages_py _stagehands_ros_generate_messages_check_deps_${_filename})

# target for backward compatibility
add_custom_target(stagehands_ros_genpy)
add_dependencies(stagehands_ros_genpy stagehands_ros_generate_messages_py)

# register target for catkin_package(EXPORTED_TARGETS)
list(APPEND ${PROJECT_NAME}_EXPORTED_TARGETS stagehands_ros_generate_messages_py)



if(gencpp_INSTALL_DIR AND EXISTS ${CATKIN_DEVEL_PREFIX}/${gencpp_INSTALL_DIR}/stagehands_ros)
  # install generated code
  install(
    DIRECTORY ${CATKIN_DEVEL_PREFIX}/${gencpp_INSTALL_DIR}/stagehands_ros
    DESTINATION ${gencpp_INSTALL_DIR}
  )
endif()
if(TARGET std_msgs_generate_messages_cpp)
  add_dependencies(stagehands_ros_generate_messages_cpp std_msgs_generate_messages_cpp)
endif()

if(geneus_INSTALL_DIR AND EXISTS ${CATKIN_DEVEL_PREFIX}/${geneus_INSTALL_DIR}/stagehands_ros)
  # install generated code
  install(
    DIRECTORY ${CATKIN_DEVEL_PREFIX}/${geneus_INSTALL_DIR}/stagehands_ros
    DESTINATION ${geneus_INSTALL_DIR}
  )
endif()
if(TARGET std_msgs_generate_messages_eus)
  add_dependencies(stagehands_ros_generate_messages_eus std_msgs_generate_messages_eus)
endif()

if(genlisp_INSTALL_DIR AND EXISTS ${CATKIN_DEVEL_PREFIX}/${genlisp_INSTALL_DIR}/stagehands_ros)
  # install generated code
  install(
    DIRECTORY ${CATKIN_DEVEL_PREFIX}/${genlisp_INSTALL_DIR}/stagehands_ros
    DESTINATION ${genlisp_INSTALL_DIR}
  )
endif()
if(TARGET std_msgs_generate_messages_lisp)
  add_dependencies(stagehands_ros_generate_messages_lisp std_msgs_generate_messages_lisp)
endif()

if(gennodejs_INSTALL_DIR AND EXISTS ${CATKIN_DEVEL_PREFIX}/${gennodejs_INSTALL_DIR}/stagehands_ros)
  # install generated code
  install(
    DIRECTORY ${CATKIN_DEVEL_PREFIX}/${gennodejs_INSTALL_DIR}/stagehands_ros
    DESTINATION ${gennodejs_INSTALL_DIR}
  )
endif()
if(TARGET std_msgs_generate_messages_nodejs)
  add_dependencies(stagehands_ros_generate_messages_nodejs std_msgs_generate_messages_nodejs)
endif()

if(genpy_INSTALL_DIR AND EXISTS ${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/stagehands_ros)
  install(CODE "execute_process(COMMAND \"/usr/bin/python3\" -m compileall \"${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/stagehands_ros\")")
  # install generated code
  install(
    DIRECTORY ${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/stagehands_ros
    DESTINATION ${genpy_INSTALL_DIR}
  )
endif()
if(TARGET std_msgs_generate_messages_py)
  add_dependencies(stagehands_ros_generate_messages_py std_msgs_generate_messages_py)
endif()
