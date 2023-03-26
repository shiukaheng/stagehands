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

class UnloadControllerRequest {
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
    // Serializes a message object of type UnloadControllerRequest
    // Serialize message field [name]
    bufferOffset = _serializer.string(obj.name, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type UnloadControllerRequest
    let data = new UnloadControllerRequest(null);
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
    // Returns string type for a controller_manager_msgs/UnloadControllerRequest object
    return 'controller_manager_msgs/UnloadControllerRequest';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'c1f3d28f1b044c871e6eff2e9fc3c667'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # The UnloadController service allows you to unload a single controller
# from controller_manager

# To unload a controller, specify the "name" of the controller.
# The return value "ok" indicates if the controller was successfully
# unloaded or not

string name
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new UnloadControllerRequest(null);
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
class UnloadControllerResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.ok = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('ok')) {
        this.ok = initObj.ok;
      }
      else {
        this.ok = false;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type UnloadControllerResponse
    // Serialize message field [ok]
    bufferOffset = _serializer.bool(obj.ok, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type UnloadControllerResponse
    let data = new UnloadControllerResponse(null);
    let len;
    // Deserialize message field [ok]
    data.ok = _deserializer.bool(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    return 1;
  }

  static datatype() {
    // Returns string type for a controller_manager_msgs/UnloadControllerResponse object
    return 'controller_manager_msgs/UnloadControllerResponse';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '6f6da3883749771fac40d6deb24a8c02'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    bool ok
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new UnloadControllerResponse(null);
    if (msg.ok !== undefined) {
      resolved.ok = msg.ok;
    }
    else {
      resolved.ok = false;
    }

    return resolved;
  }
}

//-----------------------------------------------------------
module.exports = {
  Request: UnloadControllerRequest,
  Response: UnloadControllerResponse,
  md5sum() { return '647e5c54b8d6468952d8d31f1efe96c0'; },
  datatype() { return 'controller_manager_msgs/UnloadController'; }
};

