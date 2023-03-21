// Auto-generated. Do not edit!

// (in-package stagehands.srv)


"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array;
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength;

//-----------------------------------------------------------


//-----------------------------------------------------------

class setTargetPoseRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.xPos = null;
      this.yPos = null;
      this.thetaPos = null;
    }
    else {
      if (initObj.hasOwnProperty('xPos')) {
        this.xPos = initObj.xPos
      }
      else {
        this.xPos = 0.0;
      }
      if (initObj.hasOwnProperty('yPos')) {
        this.yPos = initObj.yPos
      }
      else {
        this.yPos = 0.0;
      }
      if (initObj.hasOwnProperty('thetaPos')) {
        this.thetaPos = initObj.thetaPos
      }
      else {
        this.thetaPos = 0.0;
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type setTargetPoseRequest
    // Serialize message field [xPos]
    bufferOffset = _serializer.float64(obj.xPos, buffer, bufferOffset);
    // Serialize message field [yPos]
    bufferOffset = _serializer.float64(obj.yPos, buffer, bufferOffset);
    // Serialize message field [thetaPos]
    bufferOffset = _serializer.float64(obj.thetaPos, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type setTargetPoseRequest
    let len;
    let data = new setTargetPoseRequest(null);
    // Deserialize message field [xPos]
    data.xPos = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [yPos]
    data.yPos = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [thetaPos]
    data.thetaPos = _deserializer.float64(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    return 24;
  }

  static datatype() {
    // Returns string type for a service object
    return 'stagehands/setTargetPoseRequest';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '4d1d9cc6631367773b600cbea11d8455';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    float64 xPos
    float64 yPos
    float64 thetaPos
    
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new setTargetPoseRequest(null);
    if (msg.xPos !== undefined) {
      resolved.xPos = msg.xPos;
    }
    else {
      resolved.xPos = 0.0
    }

    if (msg.yPos !== undefined) {
      resolved.yPos = msg.yPos;
    }
    else {
      resolved.yPos = 0.0
    }

    if (msg.thetaPos !== undefined) {
      resolved.thetaPos = msg.thetaPos;
    }
    else {
      resolved.thetaPos = 0.0
    }

    return resolved;
    }
};

class setTargetPoseResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.response = null;
    }
    else {
      if (initObj.hasOwnProperty('response')) {
        this.response = initObj.response
      }
      else {
        this.response = '';
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type setTargetPoseResponse
    // Serialize message field [response]
    bufferOffset = _serializer.string(obj.response, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type setTargetPoseResponse
    let len;
    let data = new setTargetPoseResponse(null);
    // Deserialize message field [response]
    data.response = _deserializer.string(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += _getByteLength(object.response);
    return length + 4;
  }

  static datatype() {
    // Returns string type for a service object
    return 'stagehands/setTargetPoseResponse';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '6de314e2dc76fbff2b6244a6ad70b68d';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string response
    
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new setTargetPoseResponse(null);
    if (msg.response !== undefined) {
      resolved.response = msg.response;
    }
    else {
      resolved.response = ''
    }

    return resolved;
    }
};

module.exports = {
  Request: setTargetPoseRequest,
  Response: setTargetPoseResponse,
  md5sum() { return 'b2641e4b932d1b80a79d7568f7c58323'; },
  datatype() { return 'stagehands/setTargetPose'; }
};
