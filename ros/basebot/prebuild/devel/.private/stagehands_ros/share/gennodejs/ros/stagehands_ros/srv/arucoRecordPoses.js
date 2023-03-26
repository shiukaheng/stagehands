//-----------------------------------------------------------
// Auto-generated from package stagehands_ros.
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

class arucoRecordPosesRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type arucoRecordPosesRequest
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type arucoRecordPosesRequest
    let data = new arucoRecordPosesRequest(null);
    let len;
    return data;
  }

  static getMessageSize(object) {
    return 0;
  }

  static datatype() {
    // Returns string type for a stagehands_ros/arucoRecordPosesRequest object
    return 'stagehands_ros/arucoRecordPosesRequest';
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
    const resolved = new arucoRecordPosesRequest(null);
    return resolved;
  }
}

//-----------------------------------------------------------
class arucoRecordPosesResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type arucoRecordPosesResponse
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type arucoRecordPosesResponse
    let data = new arucoRecordPosesResponse(null);
    let len;
    return data;
  }

  static getMessageSize(object) {
    return 0;
  }

  static datatype() {
    // Returns string type for a stagehands_ros/arucoRecordPosesResponse object
    return 'stagehands_ros/arucoRecordPosesResponse';
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
    const resolved = new arucoRecordPosesResponse(null);
    return resolved;
  }
}

//-----------------------------------------------------------
module.exports = {
  Request: arucoRecordPosesRequest,
  Response: arucoRecordPosesResponse,
  md5sum() { return 'd41d8cd98f00b204e9800998ecf8427e'; },
  datatype() { return 'stagehands_ros/arucoRecordPoses'; }
};

