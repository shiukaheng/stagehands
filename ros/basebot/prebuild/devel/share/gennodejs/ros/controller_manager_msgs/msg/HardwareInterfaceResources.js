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

class HardwareInterfaceResources {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.hardware_interface = null;
      this.resources = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('hardware_interface')) {
        this.hardware_interface = initObj.hardware_interface;
      }
      else {
        this.hardware_interface = '';
      }

      if (initObj.hasOwnProperty('resources')) {
        this.resources = initObj.resources;
      }
      else {
        this.resources = [];
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type HardwareInterfaceResources
    // Serialize message field [hardware_interface]
    bufferOffset = _serializer.string(obj.hardware_interface, buffer, bufferOffset);


    // Serialize message field [resources]
    bufferOffset = _arraySerializer.string(obj.resources, buffer, bufferOffset, null);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type HardwareInterfaceResources
    let data = new HardwareInterfaceResources(null);
    let len;
    // Deserialize message field [hardware_interface]
    data.hardware_interface = _deserializer.string(buffer, bufferOffset);

    // Deserialize message field [resources]
    data.resources = _arrayDeserializer.string(buffer, bufferOffset, null);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += _getByteLength(object.hardware_interface);
    for(let i = 0; i < object.resources.length; ++i) {
      length += 4 + _getByteLength(object.resources[i]);
    }
    // 8 is precalculated sum of the constant length fields
    return length + 8;
  }

  static datatype() {
    // Returns string type for a controller_manager_msgs/HardwareInterfaceResources object
    return 'controller_manager_msgs/HardwareInterfaceResources';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'f25b55cbf1d1f76e82e5ec9e83f76258'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
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
    const resolved = new HardwareInterfaceResources(null);
    if (msg.hardware_interface !== undefined) {
      resolved.hardware_interface = msg.hardware_interface;
    }
    else {
      resolved.hardware_interface = '';
    }

    if (msg.resources !== undefined) {
      resolved.resources = msg.resources;
    }
    else {
      resolved.resources = [];
    }

    return resolved;
  }
}

module.exports = HardwareInterfaceResources
