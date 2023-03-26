//-----------------------------------------------------------
// Auto-generated from package turtlesim.
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

class KillRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.name = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('name')) {
        this.name = initObj.name;
      }
      else {
        this.name = '';
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type KillRequest
    // Serialize message field [name]
    bufferOffset = _serializer.string(obj.name, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type KillRequest
    let data = new KillRequest(null);
    let len;
    // Deserialize message field [name]
    data.name = _deserializer.string(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += _getByteLength(object.name);
    // 4 is precalculated sum of the constant length fields
    return length + 4;
  }

  static datatype() {
    // Returns string type for a turtlesim/KillRequest object
    return 'turtlesim/KillRequest';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'c1f3d28f1b044c871e6eff2e9fc3c667'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string name
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new KillRequest(null);
    if (msg.name !== undefined) {
      resolved.name = msg.name;
    }
    else {
      resolved.name = '';
    }

    return resolved;
  }
}

//-----------------------------------------------------------
class KillResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type KillResponse
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type KillResponse
    let data = new KillResponse(null);
    let len;
    return data;
  }

  static getMessageSize(object) {
    return 0;
  }

  static datatype() {
    // Returns string type for a turtlesim/KillResponse object
    return 'turtlesim/KillResponse';
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
    const resolved = new KillResponse(null);
    return resolved;
  }
}

//-----------------------------------------------------------
module.exports = {
  Request: KillRequest,
  Response: KillResponse,
  md5sum() { return 'c1f3d28f1b044c871e6eff2e9fc3c667'; },
  datatype() { return 'turtlesim/Kill'; }
};

