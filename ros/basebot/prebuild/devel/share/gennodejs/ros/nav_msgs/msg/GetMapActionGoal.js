//-----------------------------------------------------------
// Auto-generated from package nav_msgs.
// !! Do not edit !!
//-----------------------------------------------------------

"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength
const std_msgs = _finder('std_msgs');
const actionlib_msgs = _finder('actionlib_msgs');
const GetMapGoal = require('./GetMapGoal.js');

//-----------------------------------------------------------

class GetMapActionGoal {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.header = null;
      this.goal_id = null;
      this.goal = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('header')) {
        this.header = initObj.header;
      }
      else {
        this.header = new std_msgs.msg.Header();
      }

      if (initObj.hasOwnProperty('goal_id')) {
        this.goal_id = initObj.goal_id;
      }
      else {
        this.goal_id = new actionlib_msgs.msg.GoalID();
      }

      if (initObj.hasOwnProperty('goal')) {
        this.goal = initObj.goal;
      }
      else {
        this.goal = new GetMapGoal();
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type GetMapActionGoal
    // Serialize message field [header]
    bufferOffset = std_msgs.msg.Header.serialize(obj.header, buffer, bufferOffset);

    // Serialize message field [goal_id]
    bufferOffset = actionlib_msgs.msg.GoalID.serialize(obj.goal_id, buffer, bufferOffset);

    // Serialize message field [goal]
    bufferOffset = GetMapGoal.serialize(obj.goal, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type GetMapActionGoal
    let data = new GetMapActionGoal(null);
    let len;
    // Deserialize message field [header]
    data.header = std_msgs.msg.Header.deserialize(buffer, bufferOffset);

    // Deserialize message field [goal_id]
    data.goal_id = actionlib_msgs.msg.GoalID.deserialize(buffer, bufferOffset);

    // Deserialize message field [goal]
    data.goal = GetMapGoal.deserialize(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += std_msgs.msg.Header.getMessageSize(object.header)
    length += actionlib_msgs.msg.GoalID.getMessageSize(object.goal_id)
    return length;
  }

  static datatype() {
    // Returns string type for a nav_msgs/GetMapActionGoal object
    return 'nav_msgs/GetMapActionGoal';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '4b30be6cd12b9e72826df56b481f40e0'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======

Header header
actionlib_msgs/GoalID goal_id
GetMapGoal goal

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
MSG: actionlib_msgs/GoalID
# The stamp should store the time at which this goal was requested.
# It is used by an action server when it tries to preempt all
# goals that were requested before a certain time
time stamp

# The id provides a way to associate feedback and
# result message with specific goal requests. The id
# specified must be unique.
string id

================================================================================
MSG: nav_msgs/GetMapGoal
# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======
# Get the map as a nav_msgs/OccupancyGrid
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new GetMapActionGoal(null);
    if (msg.header !== undefined) {
      resolved.header = std_msgs.msg.Header.Resolve(msg.header);
    }
    else {
      resolved.header = new std_msgs.msg.Header();
    }

    if (msg.goal_id !== undefined) {
      resolved.goal_id = actionlib_msgs.msg.GoalID.Resolve(msg.goal_id);
    }
    else {
      resolved.goal_id = new actionlib_msgs.msg.GoalID();
    }

    if (msg.goal !== undefined) {
      resolved.goal = GetMapGoal.Resolve(msg.goal);
    }
    else {
      resolved.goal = new GetMapGoal();
    }

    return resolved;
  }
}

module.exports = GetMapActionGoal
