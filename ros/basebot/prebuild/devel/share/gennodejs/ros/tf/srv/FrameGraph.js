//-----------------------------------------------------------
// Auto-generated from package tf.
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

class FrameGraphRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type FrameGraphRequest
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type FrameGraphRequest
    let data = new FrameGraphRequest(null);
    let len;
    return data;
  }

  static getMessageSize(object) {
    return 0;
  }

  static datatype() {
    // Returns string type for a tf/FrameGraphRequest object
    return 'tf/FrameGraphRequest';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'd41d8cd98f00b204e9800998ecf8427e'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new FrameGraphRequest(null);
    return resolved;
  }
}

//-----------------------------------------------------------
class FrameGraphResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.dot_graph = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('dot_graph')) {
        this.dot_graph = initObj.dot_graph;
      }
      else {
        this.dot_graph = '';
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type FrameGraphResponse
    // Serialize message field [dot_graph]
    bufferOffset = _serializer.string(obj.dot_graph, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type FrameGraphResponse
    let data = new FrameGraphResponse(null);
    let len;
    // Deserialize message field [dot_graph]
    data.dot_graph = _deserializer.string(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += _getByteLength(object.dot_graph);
    // 4 is precalculated sum of the constant length fields
    return length + 4;
  }

  static datatype() {
    // Returns string type for a tf/FrameGraphResponse object
    return 'tf/FrameGraphResponse';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'c4af9ac907e58e906eb0b6e3c58478c0'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string dot_graph
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new FrameGraphResponse(null);
    if (msg.dot_graph !== undefined) {
      resolved.dot_graph = msg.dot_graph;
    }
    else {
      resolved.dot_graph = '';
    }

    return resolved;
  }
}

//-----------------------------------------------------------
module.exports = {
  Request: FrameGraphRequest,
  Response: FrameGraphResponse,
  md5sum() { return 'c4af9ac907e58e906eb0b6e3c58478c0'; },
  datatype() { return 'tf/FrameGraph'; }
};

