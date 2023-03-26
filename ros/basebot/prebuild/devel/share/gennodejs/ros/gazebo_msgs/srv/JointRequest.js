//-----------------------------------------------------------
// Auto-generated from package gazebo_msgs.
// !! Do not edit !!
//-----------------------------------------------------------

"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength

//-----------------------------------------------------------


//-----------------------------------------------------------

class JointRequestRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.joint_name = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('joint_name')) {
        this.joint_name = initObj.joint_name;
      }
      else {
        this.joint_name = '';
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type JointRequestRequest
    // Serialize message field [joint_name]
    bufferOffset = _serializer.string(obj.joint_name, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type JointRequestRequest
    let data = new JointRequestRequest(null);
    let len;
    // Deserialize message field [joint_name]
    data.joint_name = _deserializer.string(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += _getByteLength(object.joint_name);
    // 4 is precalculated sum of the constant length fields
    return length + 4;
  }

  static datatype() {
    // Returns string type for a gazebo_msgs/JointRequestRequest object
    return 'gazebo_msgs/JointRequestRequest';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '0be1351618e1dc030eb7959d9a4902de'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string joint_name   # name of the joint requested
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new JointRequestRequest(null);
    if (msg.joint_name !== undefined) {
      resolved.joint_name = msg.joint_name;
    }
    else {
      resolved.joint_name = '';
    }

    return resolved;
  }
}

//-----------------------------------------------------------
class JointRequestResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type JointRequestResponse
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type JointRequestResponse
    let data = new JointRequestResponse(null);
    let len;
    return data;
  }

  static getMessageSize(object) {
    return 0;
  }

  static datatype() {
    // Returns string type for a gazebo_msgs/JointRequestResponse object
    return 'gazebo_msgs/JointRequestResponse';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'd41d8cd98f00b204e9800998ecf8427e'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new JointRequestResponse(null);
    return resolved;
  }
}

//-----------------------------------------------------------
module.exports = {
  Request: JointRequestRequest,
  Response: JointRequestResponse,
  md5sum() { return '0be1351618e1dc030eb7959d9a4902de'; },
  datatype() { return 'gazebo_msgs/JointRequest'; }
};

