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

const ControllerState = require('../msg/ControllerState.js');

//-----------------------------------------------------------

class ListControllersRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type ListControllersRequest
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type ListControllersRequest
    let data = new ListControllersRequest(null);
    let len;
    return data;
  }

  static getMessageSize(object) {
    return 0;
  }

  static datatype() {
    // Returns string type for a controller_manager_msgs/ListControllersRequest object
    return 'controller_manager_msgs/ListControllersRequest';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'd41d8cd98f00b204e9800998ecf8427e'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # The ListControllers service returns a list of controller names/states/types of the
# controllers that are loaded inside the controller_manager.
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new ListControllersRequest(null);
    return resolved;
  }
}

//-----------------------------------------------------------
class ListControllersResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.controller = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('controller')) {
        this.controller = initObj.controller;
      }
      else {
        this.controller = [];
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type ListControllersResponse

    // Serialize message field [controller]
    // Serialize the length for message field [controller]
    bufferOffset = _serializer.uint32(obj.controller.length, buffer, bufferOffset);
    obj.controller.forEach((val) => {
      bufferOffset = ControllerState.serialize(val, buffer, bufferOffset);
    });

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type ListControllersResponse
    let data = new ListControllersResponse(null);
    let len;
    // Deserialize message field [controller]
    // Deserialize array length for message field [controller]
    len = _deserializer.uint32(buffer, bufferOffset);
    data.controller = new Array(len);
    for (let i = 0; i < len; ++i) {
      data.controller[i] = ControllerState.deserialize(buffer, bufferOffset);
    }

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    for(let i = 0; i < object.controller.length; ++i) {
      length += ControllerState.getMessageSize(object.controller[i]);
    }
    // 4 is precalculated sum of the constant length fields
    return length + 4;
  }

  static datatype() {
    // Returns string type for a controller_manager_msgs/ListControllersResponse object
    return 'controller_manager_msgs/ListControllersResponse';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '1341feb2e63fa791f855565d0da950d8'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    ControllerState[] controller

================================================================================
MSG: controller_manager_msgs/ControllerState
string name
string state
string type
controller_manager_msgs/HardwareInterfaceResources[] claimed_resources

================================================================================
MSG: controller_manager_msgs/HardwareInterfaceResources
# Type of hardware interface
string hardware_interface
# List of resources belonging to the hardware interface
string[] resources
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new ListControllersResponse(null);
    if (msg.controller !== undefined) {
      resolved.controller = new Array(msg.controller.length);
      for (let i = 0; i < resolved.controller.length; ++i) {
        resolved.controller[i] = ControllerState.Resolve(msg.controller[i]);
      }
    }
    else {
      resolved.controller = [];
    }

    return resolved;
  }
}

//-----------------------------------------------------------
module.exports = {
  Request: ListControllersRequest,
  Response: ListControllersResponse,
  md5sum() { return '1341feb2e63fa791f855565d0da950d8'; },
  datatype() { return 'controller_manager_msgs/ListControllers'; }
};

