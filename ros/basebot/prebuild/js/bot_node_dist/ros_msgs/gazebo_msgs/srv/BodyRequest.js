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

class BodyRequestRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.body_name = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('body_name')) {
        this.body_name = initObj.body_name;
      }
      else {
        this.body_name = '';
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type BodyRequestRequest
    // Serialize message field [body_name]
    bufferOffset = _serializer.string(obj.body_name, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type BodyRequestRequest
    let data = new BodyRequestRequest(null);
    let len;
    // Deserialize message field [body_name]
    data.body_name = _deserializer.string(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += _getByteLength(object.body_name);
    // 4 is precalculated sum of the constant length fields
    return length + 4;
  }

  static datatype() {
    // Returns string type for a gazebo_msgs/BodyRequestRequest object
    return 'gazebo_msgs/BodyRequestRequest';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '5eade9afe7f232d78005bd0cafeab755'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string body_name   # name of the body requested. body names are prefixed by model name, e.g. pr2::base_link
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new BodyRequestRequest(null);
    if (msg.body_name !== undefined) {
      resolved.body_name = msg.body_name;
    }
    else {
      resolved.body_name = '';
    }

    return resolved;
  }
}

//-----------------------------------------------------------
class BodyRequestResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type BodyRequestResponse
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type BodyRequestResponse
    let data = new BodyRequestResponse(null);
    let len;
    return data;
  }

  static getMessageSize(object) {
    return 0;
  }

  static datatype() {
    // Returns string type for a gazebo_msgs/BodyRequestResponse object
    return 'gazebo_msgs/BodyRequestResponse';
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
    const resolved = new BodyRequestResponse(null);
    return resolved;
  }
}

//-----------------------------------------------------------
module.exports = {
  Request: BodyRequestRequest,
  Response: BodyRequestResponse,
  md5sum() { return '5eade9afe7f232d78005bd0cafeab755'; },
  datatype() { return 'gazebo_msgs/BodyRequest'; }
};
