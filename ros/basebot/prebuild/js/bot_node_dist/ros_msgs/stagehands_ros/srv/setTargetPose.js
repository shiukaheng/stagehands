//-----------------------------------------------------------
// Auto-generated from package stagehands_ros.
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

class setTargetPoseRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.xPos = null;
      this.yPos = null;
      this.rotationQuaternion = null;
      this.micHeight = null;
      this.ledAnimation = null;
      this.ledRGBColour = null;
      this.flashFrequency = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('xPos')) {
        this.xPos = initObj.xPos;
      }
      else {
        this.xPos = 0.0;
      }

      if (initObj.hasOwnProperty('yPos')) {
        this.yPos = initObj.yPos;
      }
      else {
        this.yPos = 0.0;
      }

      if (initObj.hasOwnProperty('rotationQuaternion')) {
        this.rotationQuaternion = initObj.rotationQuaternion;
      }
      else {
        this.rotationQuaternion = [];
      }

      if (initObj.hasOwnProperty('micHeight')) {
        this.micHeight = initObj.micHeight;
      }
      else {
        this.micHeight = 0.0;
      }

      if (initObj.hasOwnProperty('ledAnimation')) {
        this.ledAnimation = initObj.ledAnimation;
      }
      else {
        this.ledAnimation = '';
      }

      if (initObj.hasOwnProperty('ledRGBColour')) {
        this.ledRGBColour = initObj.ledRGBColour;
      }
      else {
        this.ledRGBColour = [];
      }

      if (initObj.hasOwnProperty('flashFrequency')) {
        this.flashFrequency = initObj.flashFrequency;
      }
      else {
        this.flashFrequency = 0.0;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type setTargetPoseRequest
    // Serialize message field [xPos]
    bufferOffset = _serializer.float64(obj.xPos, buffer, bufferOffset);

    // Serialize message field [yPos]
    bufferOffset = _serializer.float64(obj.yPos, buffer, bufferOffset);


    // Serialize message field [rotationQuaternion]
    bufferOffset = _arraySerializer.float64(obj.rotationQuaternion, buffer, bufferOffset, null);

    // Serialize message field [micHeight]
    bufferOffset = _serializer.float64(obj.micHeight, buffer, bufferOffset);

    // Serialize message field [ledAnimation]
    bufferOffset = _serializer.string(obj.ledAnimation, buffer, bufferOffset);


    // Serialize message field [ledRGBColour]
    bufferOffset = _arraySerializer.int64(obj.ledRGBColour, buffer, bufferOffset, null);

    // Serialize message field [flashFrequency]
    bufferOffset = _serializer.float64(obj.flashFrequency, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type setTargetPoseRequest
    let data = new setTargetPoseRequest(null);
    let len;
    // Deserialize message field [xPos]
    data.xPos = _deserializer.float64(buffer, bufferOffset);

    // Deserialize message field [yPos]
    data.yPos = _deserializer.float64(buffer, bufferOffset);

    // Deserialize message field [rotationQuaternion]
    data.rotationQuaternion = _arrayDeserializer.float64(buffer, bufferOffset, null);

    // Deserialize message field [micHeight]
    data.micHeight = _deserializer.float64(buffer, bufferOffset);

    // Deserialize message field [ledAnimation]
    data.ledAnimation = _deserializer.string(buffer, bufferOffset);

    // Deserialize message field [ledRGBColour]
    data.ledRGBColour = _arrayDeserializer.int64(buffer, bufferOffset, null);

    // Deserialize message field [flashFrequency]
    data.flashFrequency = _deserializer.float64(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += 8 * object.rotationQuaternion.length
    length += _getByteLength(object.ledAnimation);
    length += 8 * object.ledRGBColour.length
    // 44 is precalculated sum of the constant length fields
    return length + 44;
  }

  static datatype() {
    // Returns string type for a stagehands_ros/setTargetPoseRequest object
    return 'stagehands_ros/setTargetPoseRequest';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'aaeb198e8239ff7679a0d51a1562b12c'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    float64 xPos
float64 yPos
float64[] rotationQuaternion
float64 micHeight
string ledAnimation
int64[] ledRGBColour
float64 flashFrequency
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
      resolved.xPos = 0.0;
    }

    if (msg.yPos !== undefined) {
      resolved.yPos = msg.yPos;
    }
    else {
      resolved.yPos = 0.0;
    }

    if (msg.rotationQuaternion !== undefined) {
      resolved.rotationQuaternion = msg.rotationQuaternion;
    }
    else {
      resolved.rotationQuaternion = [];
    }

    if (msg.micHeight !== undefined) {
      resolved.micHeight = msg.micHeight;
    }
    else {
      resolved.micHeight = 0.0;
    }

    if (msg.ledAnimation !== undefined) {
      resolved.ledAnimation = msg.ledAnimation;
    }
    else {
      resolved.ledAnimation = '';
    }

    if (msg.ledRGBColour !== undefined) {
      resolved.ledRGBColour = msg.ledRGBColour;
    }
    else {
      resolved.ledRGBColour = [];
    }

    if (msg.flashFrequency !== undefined) {
      resolved.flashFrequency = msg.flashFrequency;
    }
    else {
      resolved.flashFrequency = 0.0;
    }

    return resolved;
  }
}

//-----------------------------------------------------------
class setTargetPoseResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.response = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('response')) {
        this.response = initObj.response;
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
    // Deserializes a message object of type setTargetPoseResponse
    let data = new setTargetPoseResponse(null);
    let len;
    // Deserialize message field [response]
    data.response = _deserializer.string(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += _getByteLength(object.response);
    // 4 is precalculated sum of the constant length fields
    return length + 4;
  }

  static datatype() {
    // Returns string type for a stagehands_ros/setTargetPoseResponse object
    return 'stagehands_ros/setTargetPoseResponse';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '6de314e2dc76fbff2b6244a6ad70b68d'
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
      resolved.response = '';
    }

    return resolved;
  }
}

//-----------------------------------------------------------
module.exports = {
  Request: setTargetPoseRequest,
  Response: setTargetPoseResponse,
  md5sum() { return '5c0e8c1ef239833f4aa2b438a827901b'; },
  datatype() { return 'stagehands_ros/setTargetPose'; }
};

