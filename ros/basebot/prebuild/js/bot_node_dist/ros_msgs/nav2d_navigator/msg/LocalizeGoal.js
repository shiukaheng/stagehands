//-----------------------------------------------------------
// Auto-generated from package nav2d_navigator.
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

class LocalizeGoal {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.velocity = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('velocity')) {
        this.velocity = initObj.velocity;
      }
      else {
        this.velocity = 0.0;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type LocalizeGoal
    // Serialize message field [velocity]
    bufferOffset = _serializer.float32(obj.velocity, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type LocalizeGoal
    let data = new LocalizeGoal(null);
    let len;
    // Deserialize message field [velocity]
    data.velocity = _deserializer.float32(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    return 4;
  }

  static datatype() {
    // Returns string type for a nav2d_navigator/LocalizeGoal object
    return 'nav2d_navigator/LocalizeGoal';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'e4ff88b32504f688719a85e0753f63ce'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======
float32 velocity
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new LocalizeGoal(null);
    if (msg.velocity !== undefined) {
      resolved.velocity = msg.velocity;
    }
    else {
      resolved.velocity = 0.0;
    }

    return resolved;
  }
}

module.exports = LocalizeGoal
