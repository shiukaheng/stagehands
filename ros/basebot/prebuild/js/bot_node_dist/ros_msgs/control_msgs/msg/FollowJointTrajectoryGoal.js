//-----------------------------------------------------------
// Auto-generated from package control_msgs.
// !! Do not edit !!
//-----------------------------------------------------------

"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength
const trajectory_msgs = _finder('trajectory_msgs');
const JointTolerance = require('./JointTolerance.js');

//-----------------------------------------------------------

class FollowJointTrajectoryGoal {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.trajectory = null;
      this.path_tolerance = null;
      this.goal_tolerance = null;
      this.goal_time_tolerance = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('trajectory')) {
        this.trajectory = initObj.trajectory;
      }
      else {
        this.trajectory = new trajectory_msgs.msg.JointTrajectory();
      }

      if (initObj.hasOwnProperty('path_tolerance')) {
        this.path_tolerance = initObj.path_tolerance;
      }
      else {
        this.path_tolerance = [];
      }

      if (initObj.hasOwnProperty('goal_tolerance')) {
        this.goal_tolerance = initObj.goal_tolerance;
      }
      else {
        this.goal_tolerance = [];
      }

      if (initObj.hasOwnProperty('goal_time_tolerance')) {
        this.goal_time_tolerance = initObj.goal_time_tolerance;
      }
      else {
        this.goal_time_tolerance = {secs: 0, nsecs: 0};
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type FollowJointTrajectoryGoal
    // Serialize message field [trajectory]
    bufferOffset = trajectory_msgs.msg.JointTrajectory.serialize(obj.trajectory, buffer, bufferOffset);


    // Serialize message field [path_tolerance]
    // Serialize the length for message field [path_tolerance]
    bufferOffset = _serializer.uint32(obj.path_tolerance.length, buffer, bufferOffset);
    obj.path_tolerance.forEach((val) => {
      bufferOffset = JointTolerance.serialize(val, buffer, bufferOffset);
    });


    // Serialize message field [goal_tolerance]
    // Serialize the length for message field [goal_tolerance]
    bufferOffset = _serializer.uint32(obj.goal_tolerance.length, buffer, bufferOffset);
    obj.goal_tolerance.forEach((val) => {
      bufferOffset = JointTolerance.serialize(val, buffer, bufferOffset);
    });

    // Serialize message field [goal_time_tolerance]
    bufferOffset = _serializer.duration(obj.goal_time_tolerance, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type FollowJointTrajectoryGoal
    let data = new FollowJointTrajectoryGoal(null);
    let len;
    // Deserialize message field [trajectory]
    data.trajectory = trajectory_msgs.msg.JointTrajectory.deserialize(buffer, bufferOffset);

    // Deserialize message field [path_tolerance]
    // Deserialize array length for message field [path_tolerance]
    len = _deserializer.uint32(buffer, bufferOffset);
    data.path_tolerance = new Array(len);
    for (let i = 0; i < len; ++i) {
      data.path_tolerance[i] = JointTolerance.deserialize(buffer, bufferOffset);
    }

    // Deserialize message field [goal_tolerance]
    // Deserialize array length for message field [goal_tolerance]
    len = _deserializer.uint32(buffer, bufferOffset);
    data.goal_tolerance = new Array(len);
    for (let i = 0; i < len; ++i) {
      data.goal_tolerance[i] = JointTolerance.deserialize(buffer, bufferOffset);
    }

    // Deserialize message field [goal_time_tolerance]
    data.goal_time_tolerance = _deserializer.duration(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += trajectory_msgs.msg.JointTrajectory.getMessageSize(object.trajectory)
    for(let i = 0; i < object.path_tolerance.length; ++i) {
      length += JointTolerance.getMessageSize(object.path_tolerance[i]);
    }
    for(let i = 0; i < object.goal_tolerance.length; ++i) {
      length += JointTolerance.getMessageSize(object.goal_tolerance[i]);
    }
    // 16 is precalculated sum of the constant length fields
    return length + 16;
  }

  static datatype() {
    // Returns string type for a control_msgs/FollowJointTrajectoryGoal object
    return 'control_msgs/FollowJointTrajectoryGoal';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '69636787b6ecbde4d61d711979bc7ecb'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======
# The joint trajectory to follow
trajectory_msgs/JointTrajectory trajectory

# Tolerances for the trajectory.  If the measured joint values fall
# outside the tolerances the trajectory goal is aborted.  Any
# tolerances that are not specified (by being omitted or set to 0) are
# set to the defaults for the action server (often taken from the
# parameter server).

# Tolerances applied to the joints as the trajectory is executed.  If
# violated, the goal aborts with error_code set to
# PATH_TOLERANCE_VIOLATED.
JointTolerance[] path_tolerance

# To report success, the joints must be within goal_tolerance of the
# final trajectory value.  The goal must be achieved by time the
# trajectory ends plus goal_time_tolerance.  (goal_time_tolerance
# allows some leeway in time, so that the trajectory goal can still
# succeed even if the joints reach the goal some time after the
# precise end time of the trajectory).
#
# If the joints are not within goal_tolerance after "trajectory finish
# time" + goal_time_tolerance, the goal aborts with error_code set to
# GOAL_TOLERANCE_VIOLATED
JointTolerance[] goal_tolerance
duration goal_time_tolerance

================================================================================
MSG: trajectory_msgs/JointTrajectory
Header header
string[] joint_names
JointTrajectoryPoint[] points

================================================================================
MSG: std_msgs/Header
# Standard metadata for higher-level stamped data types.
# This is generally used to communicate timestamped data 
# in a particular coordinate frame.
# 
# sequence ID: consecutively increasing ID 
uint32 seq
#Two-integer timestamp that is expressed as:
# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')
# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')
# time-handling sugar is provided by the client library
time stamp
#Frame this data is associated with
string frame_id

================================================================================
MSG: trajectory_msgs/JointTrajectoryPoint
# Each trajectory point specifies either positions[, velocities[, accelerations]]
# or positions[, effort] for the trajectory to be executed.
# All specified values are in the same order as the joint names in JointTrajectory.msg

float64[] positions
float64[] velocities
float64[] accelerations
float64[] effort
duration time_from_start

================================================================================
MSG: control_msgs/JointTolerance
# The tolerances specify the amount the position, velocity, and
# accelerations can vary from the setpoints.  For example, in the case
# of trajectory control, when the actual position varies beyond
# (desired position + position tolerance), the trajectory goal may
# abort.
# 
# There are two special values for tolerances:
#  * 0 - The tolerance is unspecified and will remain at whatever the default is
#  * -1 - The tolerance is "erased".  If there was a default, the joint will be
#         allowed to move without restriction.

string name
float64 position  # in radians or meters (for a revolute or prismatic joint, respectively)
float64 velocity  # in rad/sec or m/sec
float64 acceleration  # in rad/sec^2 or m/sec^2
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new FollowJointTrajectoryGoal(null);
    if (msg.trajectory !== undefined) {
      resolved.trajectory = trajectory_msgs.msg.JointTrajectory.Resolve(msg.trajectory);
    }
    else {
      resolved.trajectory = new trajectory_msgs.msg.JointTrajectory();
    }

    if (msg.path_tolerance !== undefined) {
      resolved.path_tolerance = new Array(msg.path_tolerance.length);
      for (let i = 0; i < resolved.path_tolerance.length; ++i) {
        resolved.path_tolerance[i] = JointTolerance.Resolve(msg.path_tolerance[i]);
      }
    }
    else {
      resolved.path_tolerance = [];
    }

    if (msg.goal_tolerance !== undefined) {
      resolved.goal_tolerance = new Array(msg.goal_tolerance.length);
      for (let i = 0; i < resolved.goal_tolerance.length; ++i) {
        resolved.goal_tolerance[i] = JointTolerance.Resolve(msg.goal_tolerance[i]);
      }
    }
    else {
      resolved.goal_tolerance = [];
    }

    if (msg.goal_time_tolerance !== undefined) {
      resolved.goal_time_tolerance = msg.goal_time_tolerance;
    }
    else {
      resolved.goal_time_tolerance = {secs: 0, nsecs: 0};
    }

    return resolved;
  }
}

module.exports = FollowJointTrajectoryGoal