//-----------------------------------------------------------
// Auto-generated from package tf2_msgs.
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

class LookupTransformGoal {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.target_frame = null;
      this.source_frame = null;
      this.source_time = null;
      this.timeout = null;
      this.target_time = null;
      this.fixed_frame = null;
      this.advanced = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('target_frame')) {
        this.target_frame = initObj.target_frame;
      }
      else {
        this.target_frame = '';
      }

      if (initObj.hasOwnProperty('source_frame')) {
        this.source_frame = initObj.source_frame;
      }
      else {
        this.source_frame = '';
      }

      if (initObj.hasOwnProperty('source_time')) {
        this.source_time = initObj.source_time;
      }
      else {
        this.source_time = {secs: 0, nsecs: 0};
      }

      if (initObj.hasOwnProperty('timeout')) {
        this.timeout = initObj.timeout;
      }
      else {
        this.timeout = {secs: 0, nsecs: 0};
      }

      if (initObj.hasOwnProperty('target_time')) {
        this.target_time = initObj.target_time;
      }
      else {
        this.target_time = {secs: 0, nsecs: 0};
      }

      if (initObj.hasOwnProperty('fixed_frame')) {
        this.fixed_frame = initObj.fixed_frame;
      }
      else {
        this.fixed_frame = '';
      }

      if (initObj.hasOwnProperty('advanced')) {
        this.advanced = initObj.advanced;
      }
      else {
        this.advanced = false;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type LookupTransformGoal
    // Serialize message field [target_frame]
    bufferOffset = _serializer.string(obj.target_frame, buffer, bufferOffset);

    // Serialize message field [source_frame]
    bufferOffset = _serializer.string(obj.source_frame, buffer, bufferOffset);

    // Serialize message field [source_time]
    bufferOffset = _serializer.time(obj.source_time, buffer, bufferOffset);

    // Serialize message field [timeout]
    bufferOffset = _serializer.duration(obj.timeout, buffer, bufferOffset);

    // Serialize message field [target_time]
    bufferOffset = _serializer.time(obj.target_time, buffer, bufferOffset);

    // Serialize message field [fixed_frame]
    bufferOffset = _serializer.string(obj.fixed_frame, buffer, bufferOffset);

    // Serialize message field [advanced]
    bufferOffset = _serializer.bool(obj.advanced, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type LookupTransformGoal
    let data = new LookupTransformGoal(null);
    let len;
    // Deserialize message field [target_frame]
    data.target_frame = _deserializer.string(buffer, bufferOffset);

    // Deserialize message field [source_frame]
    data.source_frame = _deserializer.string(buffer, bufferOffset);

    // Deserialize message field [source_time]
    data.source_time = _deserializer.time(buffer, bufferOffset);

    // Deserialize message field [timeout]
    data.timeout = _deserializer.duration(buffer, bufferOffset);

    // Deserialize message field [target_time]
    data.target_time = _deserializer.time(buffer, bufferOffset);

    // Deserialize message field [fixed_frame]
    data.fixed_frame = _deserializer.string(buffer, bufferOffset);

    // Deserialize message field [advanced]
    data.advanced = _deserializer.bool(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += _getByteLength(object.target_frame);
    length += _getByteLength(object.source_frame);
    length += _getByteLength(object.fixed_frame);
    // 37 is precalculated sum of the constant length fields
    return length + 37;
  }

  static datatype() {
    // Returns string type for a tf2_msgs/LookupTransformGoal object
    return 'tf2_msgs/LookupTransformGoal';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '35e3720468131d675a18bb6f3e5f22f8'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======
#Simple API
string target_frame
string source_frame
time source_time
duration timeout

#Advanced API
time target_time
string fixed_frame

#Whether or not to use the advanced API
bool advanced
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new LookupTransformGoal(null);
    if (msg.target_frame !== undefined) {
      resolved.target_frame = msg.target_frame;
    }
    else {
      resolved.target_frame = '';
    }

    if (msg.source_frame !== undefined) {
      resolved.source_frame = msg.source_frame;
    }
    else {
      resolved.source_frame = '';
    }

    if (msg.source_time !== undefined) {
      resolved.source_time = msg.source_time;
    }
    else {
      resolved.source_time = {secs: 0, nsecs: 0};
    }

    if (msg.timeout !== undefined) {
      resolved.timeout = msg.timeout;
    }
    else {
      resolved.timeout = {secs: 0, nsecs: 0};
    }

    if (msg.target_time !== undefined) {
      resolved.target_time = msg.target_time;
    }
    else {
      resolved.target_time = {secs: 0, nsecs: 0};
    }

    if (msg.fixed_frame !== undefined) {
      resolved.fixed_frame = msg.fixed_frame;
    }
    else {
      resolved.fixed_frame = '';
    }

    if (msg.advanced !== undefined) {
      resolved.advanced = msg.advanced;
    }
    else {
      resolved.advanced = false;
    }

    return resolved;
  }
}

module.exports = LookupTransformGoal
