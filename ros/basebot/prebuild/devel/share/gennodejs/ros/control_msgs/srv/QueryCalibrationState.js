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

//-----------------------------------------------------------


//-----------------------------------------------------------

class QueryCalibrationStateRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type QueryCalibrationStateRequest
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type QueryCalibrationStateRequest
    let data = new QueryCalibrationStateRequest(null);
    let len;
    return data;
  }

  static getMessageSize(object) {
    return 0;
  }

  static datatype() {
    // Returns string type for a control_msgs/QueryCalibrationStateRequest object
    return 'control_msgs/QueryCalibrationStateRequest';
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
    const resolved = new QueryCalibrationStateRequest(null);
    return resolved;
  }
}

//-----------------------------------------------------------
class QueryCalibrationStateResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.is_calibrated = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('is_calibrated')) {
        this.is_calibrated = initObj.is_calibrated;
      }
      else {
        this.is_calibrated = false;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type QueryCalibrationStateResponse
    // Serialize message field [is_calibrated]
    bufferOffset = _serializer.bool(obj.is_calibrated, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type QueryCalibrationStateResponse
    let data = new QueryCalibrationStateResponse(null);
    let len;
    // Deserialize message field [is_calibrated]
    data.is_calibrated = _deserializer.bool(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    return 1;
  }

  static datatype() {
    // Returns string type for a control_msgs/QueryCalibrationStateResponse object
    return 'control_msgs/QueryCalibrationStateResponse';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '28af3beedcb84986b8e470dc5470507d'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    bool is_calibrated
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new QueryCalibrationStateResponse(null);
    if (msg.is_calibrated !== undefined) {
      resolved.is_calibrated = msg.is_calibrated;
    }
    else {
      resolved.is_calibrated = false;
    }

    return resolved;
  }
}

//-----------------------------------------------------------
module.exports = {
  Request: QueryCalibrationStateRequest,
  Response: QueryCalibrationStateResponse,
  md5sum() { return '28af3beedcb84986b8e470dc5470507d'; },
  datatype() { return 'control_msgs/QueryCalibrationState'; }
};

