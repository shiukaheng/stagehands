//-----------------------------------------------------------
// Auto-generated from package controller_manager_msgs.
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

class ListControllerTypesRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type ListControllerTypesRequest
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type ListControllerTypesRequest
    let data = new ListControllerTypesRequest(null);
    let len;
    return data;
  }

  static getMessageSize(object) {
    return 0;
  }

  static datatype() {
    // Returns string type for a controller_manager_msgs/ListControllerTypesRequest object
    return 'controller_manager_msgs/ListControllerTypesRequest';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'd41d8cd98f00b204e9800998ecf8427e'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # The ListControllers service returns a list of controller types that are known
# to the controller manager plugin mechanism.
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new ListControllerTypesRequest(null);
    return resolved;
  }
}

//-----------------------------------------------------------
class ListControllerTypesResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.types = null;
      this.base_classes = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('types')) {
        this.types = initObj.types;
      }
      else {
        this.types = [];
      }

      if (initObj.hasOwnProperty('base_classes')) {
        this.base_classes = initObj.base_classes;
      }
      else {
        this.base_classes = [];
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type ListControllerTypesResponse

    // Serialize message field [types]
    bufferOffset = _arraySerializer.string(obj.types, buffer, bufferOffset, null);


    // Serialize message field [base_classes]
    bufferOffset = _arraySerializer.string(obj.base_classes, buffer, bufferOffset, null);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type ListControllerTypesResponse
    let data = new ListControllerTypesResponse(null);
    let len;
    // Deserialize message field [types]
    data.types = _arrayDeserializer.string(buffer, bufferOffset, null);

    // Deserialize message field [base_classes]
    data.base_classes = _arrayDeserializer.string(buffer, bufferOffset, null);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    for(let i = 0; i < object.types.length; ++i) {
      length += 4 + _getByteLength(object.types[i]);
    }
    for(let i = 0; i < object.base_classes.length; ++i) {
      length += 4 + _getByteLength(object.base_classes[i]);
    }
    // 8 is precalculated sum of the constant length fields
    return length + 8;
  }

  static datatype() {
    // Returns string type for a controller_manager_msgs/ListControllerTypesResponse object
    return 'controller_manager_msgs/ListControllerTypesResponse';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'c1d4cd11aefa9f97ba4aeb5b33987f4e'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string[] types
string[] base_classes
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new ListControllerTypesResponse(null);
    if (msg.types !== undefined) {
      resolved.types = msg.types;
    }
    else {
      resolved.types = [];
    }

    if (msg.base_classes !== undefined) {
      resolved.base_classes = msg.base_classes;
    }
    else {
      resolved.base_classes = [];
    }

    return resolved;
  }
}

//-----------------------------------------------------------
module.exports = {
  Request: ListControllerTypesRequest,
  Response: ListControllerTypesResponse,
  md5sum() { return 'c1d4cd11aefa9f97ba4aeb5b33987f4e'; },
  datatype() { return 'controller_manager_msgs/ListControllerTypes'; }
};

