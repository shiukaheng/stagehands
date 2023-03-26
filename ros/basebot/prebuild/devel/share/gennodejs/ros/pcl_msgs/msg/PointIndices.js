//-----------------------------------------------------------
// Auto-generated from package pcl_msgs.
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

//-----------------------------------------------------------

class PointIndices {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.header = null;
      this.indices = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('header')) {
        this.header = initObj.header;
      }
      else {
        this.header = new std_msgs.msg.Header();
      }

      if (initObj.hasOwnProperty('indices')) {
        this.indices = initObj.indices;
      }
      else {
        this.indices = [];
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type PointIndices
    // Serialize message field [header]
    bufferOffset = std_msgs.msg.Header.serialize(obj.header, buffer, bufferOffset);


    // Serialize message field [indices]
    bufferOffset = _arraySerializer.int32(obj.indices, buffer, bufferOffset, null);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type PointIndices
    let data = new PointIndices(null);
    let len;
    // Deserialize message field [header]
    data.header = std_msgs.msg.Header.deserialize(buffer, bufferOffset);

    // Deserialize message field [indices]
    data.indices = _arrayDeserializer.int32(buffer, bufferOffset, null);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += std_msgs.msg.Header.getMessageSize(object.header)
    length += 4 * object.indices.length
    // 4 is precalculated sum of the constant length fields
    return length + 4;
  }

  static datatype() {
    // Returns string type for a pcl_msgs/PointIndices object
    return 'pcl_msgs/PointIndices';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '458c7998b7eaf99908256472e273b3d4'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    Header header
int32[] indices

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
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new PointIndices(null);
    if (msg.header !== undefined) {
      resolved.header = std_msgs.msg.Header.Resolve(msg.header);
    }
    else {
      resolved.header = new std_msgs.msg.Header();
    }

    if (msg.indices !== undefined) {
      resolved.indices = msg.indices;
    }
    else {
      resolved.indices = [];
    }

    return resolved;
  }
}

module.exports = PointIndices
