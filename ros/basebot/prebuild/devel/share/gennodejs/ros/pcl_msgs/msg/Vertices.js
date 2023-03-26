//-----------------------------------------------------------
// Auto-generated from package pcl_msgs.
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

class Vertices {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.vertices = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('vertices')) {
        this.vertices = initObj.vertices;
      }
      else {
        this.vertices = [];
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type Vertices

    // Serialize message field [vertices]
    bufferOffset = _arraySerializer.uint32(obj.vertices, buffer, bufferOffset, null);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type Vertices
    let data = new Vertices(null);
    let len;
    // Deserialize message field [vertices]
    data.vertices = _arrayDeserializer.uint32(buffer, bufferOffset, null);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += 4 * object.vertices.length
    // 4 is precalculated sum of the constant length fields
    return length + 4;
  }

  static datatype() {
    // Returns string type for a pcl_msgs/Vertices object
    return 'pcl_msgs/Vertices';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '39bd7b1c23763ddd1b882b97cb7cfe11'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # List of point indices
uint32[] vertices
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new Vertices(null);
    if (msg.vertices !== undefined) {
      resolved.vertices = msg.vertices;
    }
    else {
      resolved.vertices = [];
    }

    return resolved;
  }
}

module.exports = Vertices
