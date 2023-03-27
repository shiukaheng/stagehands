//-----------------------------------------------------------
// Auto-generated from package actionlib_tutorials.
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

class AveragingFeedback {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.sample = null;
      this.data = null;
      this.mean = null;
      this.std_dev = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('sample')) {
        this.sample = initObj.sample;
      }
      else {
        this.sample = 0;
      }

      if (initObj.hasOwnProperty('data')) {
        this.data = initObj.data;
      }
      else {
        this.data = 0.0;
      }

      if (initObj.hasOwnProperty('mean')) {
        this.mean = initObj.mean;
      }
      else {
        this.mean = 0.0;
      }

      if (initObj.hasOwnProperty('std_dev')) {
        this.std_dev = initObj.std_dev;
      }
      else {
        this.std_dev = 0.0;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type AveragingFeedback
    // Serialize message field [sample]
    bufferOffset = _serializer.int32(obj.sample, buffer, bufferOffset);

    // Serialize message field [data]
    bufferOffset = _serializer.float32(obj.data, buffer, bufferOffset);

    // Serialize message field [mean]
    bufferOffset = _serializer.float32(obj.mean, buffer, bufferOffset);

    // Serialize message field [std_dev]
    bufferOffset = _serializer.float32(obj.std_dev, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type AveragingFeedback
    let data = new AveragingFeedback(null);
    let len;
    // Deserialize message field [sample]
    data.sample = _deserializer.int32(buffer, bufferOffset);

    // Deserialize message field [data]
    data.data = _deserializer.float32(buffer, bufferOffset);

    // Deserialize message field [mean]
    data.mean = _deserializer.float32(buffer, bufferOffset);

    // Deserialize message field [std_dev]
    data.std_dev = _deserializer.float32(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    return 16;
  }

  static datatype() {
    // Returns string type for a actionlib_tutorials/AveragingFeedback object
    return 'actionlib_tutorials/AveragingFeedback';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '9e8dfc53c2f2a032ca33fa80ec46fd4f'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======
#feedback
int32 sample
float32 data
float32 mean
float32 std_dev
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new AveragingFeedback(null);
    if (msg.sample !== undefined) {
      resolved.sample = msg.sample;
    }
    else {
      resolved.sample = 0;
    }

    if (msg.data !== undefined) {
      resolved.data = msg.data;
    }
    else {
      resolved.data = 0.0;
    }

    if (msg.mean !== undefined) {
      resolved.mean = msg.mean;
    }
    else {
      resolved.mean = 0.0;
    }

    if (msg.std_dev !== undefined) {
      resolved.std_dev = msg.std_dev;
    }
    else {
      resolved.std_dev = 0.0;
    }

    return resolved;
  }
}

module.exports = AveragingFeedback
