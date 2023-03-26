//-----------------------------------------------------------
// Auto-generated from package std_msgs.
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

class Int64 {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.data = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('data')) {
        this.data = initObj.data;
      }
      else {
        this.data = 0;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type Int64
    // Serialize message field [data]
    bufferOffset = _serializer.int64(obj.data, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type Int64
    let data = new Int64(null);
    let len;
    // Deserialize message field [data]
    data.data = _deserializer.int64(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    return 8;
  }

  static datatype() {
    // Returns string type for a std_msgs/Int64 object
    return 'std_msgs/Int64';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '34add168574510e6e17f5d23ecc077ef'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    int64 data
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new Int64(null);
    if (msg.data !== undefined) {
      resolved.data = msg.data;
    }
    else {
      resolved.data = 0;
    }

    return resolved;
  }
}

module.exports = Int64
