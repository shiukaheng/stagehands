//-----------------------------------------------------------
// Auto-generated from package turtlebot3_example.
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

class Turtlebot3Feedback {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.state = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('state')) {
        this.state = initObj.state;
      }
      else {
        this.state = '';
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type Turtlebot3Feedback
    // Serialize message field [state]
    bufferOffset = _serializer.string(obj.state, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type Turtlebot3Feedback
    let data = new Turtlebot3Feedback(null);
    let len;
    // Deserialize message field [state]
    data.state = _deserializer.string(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += _getByteLength(object.state);
    // 4 is precalculated sum of the constant length fields
    return length + 4;
  }

  static datatype() {
    // Returns string type for a turtlebot3_example/Turtlebot3Feedback object
    return 'turtlebot3_example/Turtlebot3Feedback';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'af6d3a99f0fbeb66d3248fa4b3e675fb'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======
# Define a feedback message
string state
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new Turtlebot3Feedback(null);
    if (msg.state !== undefined) {
      resolved.state = msg.state;
    }
    else {
      resolved.state = '';
    }

    return resolved;
  }
}

module.exports = Turtlebot3Feedback