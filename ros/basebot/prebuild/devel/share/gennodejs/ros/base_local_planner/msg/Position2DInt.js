//-----------------------------------------------------------
// Auto-generated from package base_local_planner.
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

class Position2DInt {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.x = null;
      this.y = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('x')) {
        this.x = initObj.x;
      }
      else {
        this.x = 0;
      }

      if (initObj.hasOwnProperty('y')) {
        this.y = initObj.y;
      }
      else {
        this.y = 0;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type Position2DInt
    // Serialize message field [x]
    bufferOffset = _serializer.int64(obj.x, buffer, bufferOffset);

    // Serialize message field [y]
    bufferOffset = _serializer.int64(obj.y, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type Position2DInt
    let data = new Position2DInt(null);
    let len;
    // Deserialize message field [x]
    data.x = _deserializer.int64(buffer, bufferOffset);

    // Deserialize message field [y]
    data.y = _deserializer.int64(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    return 16;
  }

  static datatype() {
    // Returns string type for a base_local_planner/Position2DInt object
    return 'base_local_planner/Position2DInt';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '3b834ede922a0fff22c43585c533b49f'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    int64 x
int64 y
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new Position2DInt(null);
    if (msg.x !== undefined) {
      resolved.x = msg.x;
    }
    else {
      resolved.x = 0;
    }

    if (msg.y !== undefined) {
      resolved.y = msg.y;
    }
    else {
      resolved.y = 0;
    }

    return resolved;
  }
}

module.exports = Position2DInt
