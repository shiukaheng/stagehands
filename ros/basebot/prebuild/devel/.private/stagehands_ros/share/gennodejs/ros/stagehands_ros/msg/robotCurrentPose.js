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

class robotCurrentPose {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.robot_id = null;
      this.xPos = null;
      this.yPos = null;
      this.rotationQuaternion = null;
      this.currentMicHeight = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('robot_id')) {
        this.robot_id = initObj.robot_id;
      }
      else {
        this.robot_id = '';
      }

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

      if (initObj.hasOwnProperty('currentMicHeight')) {
        this.currentMicHeight = initObj.currentMicHeight;
      }
      else {
        this.currentMicHeight = 0.0;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type robotCurrentPose
    // Serialize message field [robot_id]
    bufferOffset = _serializer.string(obj.robot_id, buffer, bufferOffset);

    // Serialize message field [xPos]
    bufferOffset = _serializer.float64(obj.xPos, buffer, bufferOffset);

    // Serialize message field [yPos]
    bufferOffset = _serializer.float64(obj.yPos, buffer, bufferOffset);


    // Serialize message field [rotationQuaternion]
    bufferOffset = _arraySerializer.float64(obj.rotationQuaternion, buffer, bufferOffset, null);

    // Serialize message field [currentMicHeight]
    bufferOffset = _serializer.float64(obj.currentMicHeight, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type robotCurrentPose
    let data = new robotCurrentPose(null);
    let len;
    // Deserialize message field [robot_id]
    data.robot_id = _deserializer.string(buffer, bufferOffset);

    // Deserialize message field [xPos]
    data.xPos = _deserializer.float64(buffer, bufferOffset);

    // Deserialize message field [yPos]
    data.yPos = _deserializer.float64(buffer, bufferOffset);

    // Deserialize message field [rotationQuaternion]
    data.rotationQuaternion = _arrayDeserializer.float64(buffer, bufferOffset, null);

    // Deserialize message field [currentMicHeight]
    data.currentMicHeight = _deserializer.float64(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += _getByteLength(object.robot_id);
    length += 8 * object.rotationQuaternion.length
    // 32 is precalculated sum of the constant length fields
    return length + 32;
  }

  static datatype() {
    // Returns string type for a stagehands_ros/robotCurrentPose object
    return 'stagehands_ros/robotCurrentPose';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '4e7b217eea6103e03ece87b56ae7b5b5'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string robot_id
float64 xPos
float64 yPos
float64[] rotationQuaternion
float64 currentMicHeight
# string currentLEDAnimation
# int[] currentLEDColour
# float64 currentFlashFrequency
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new robotCurrentPose(null);
    if (msg.robot_id !== undefined) {
      resolved.robot_id = msg.robot_id;
    }
    else {
      resolved.robot_id = '';
    }

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

    if (msg.currentMicHeight !== undefined) {
      resolved.currentMicHeight = msg.currentMicHeight;
    }
    else {
      resolved.currentMicHeight = 0.0;
    }

    return resolved;
  }
}

module.exports = robotCurrentPose
