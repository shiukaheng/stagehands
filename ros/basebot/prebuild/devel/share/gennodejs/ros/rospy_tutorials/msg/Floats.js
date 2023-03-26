//-----------------------------------------------------------
// Auto-generated from package rospy_tutorials.
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

class Floats {
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
        this.data = [];
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type Floats

    // Serialize message field [data]
    bufferOffset = _arraySerializer.float32(obj.data, buffer, bufferOffset, null);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type Floats
    let data = new Floats(null);
    let len;
    // Deserialize message field [data]
    data.data = _arrayDeserializer.float32(buffer, bufferOffset, null);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += 4 * object.data.length
    // 4 is precalculated sum of the constant length fields
    return length + 4;
  }

  static datatype() {
    // Returns string type for a rospy_tutorials/Floats object
    return 'rospy_tutorials/Floats';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '420cd38b6b071cd49f2970c3e2cee511'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    float32[] data
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new Floats(null);
    if (msg.data !== undefined) {
      resolved.data = msg.data;
    }
    else {
      resolved.data = [];
    }

    return resolved;
  }
}

module.exports = Floats
