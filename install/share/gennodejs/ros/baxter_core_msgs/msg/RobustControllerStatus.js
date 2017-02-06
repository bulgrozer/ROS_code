// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class RobustControllerStatus {
  constructor() {
    this.isEnabled = false;
    this.complete = 0;
    this.controlUid = '';
    this.timedOut = false;
    this.errorCodes = [];
    this.labels = [];
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type RobustControllerStatus
    // Serialize message field [isEnabled]
    bufferInfo = _serializer.bool(obj.isEnabled, bufferInfo);
    // Serialize message field [complete]
    bufferInfo = _serializer.int32(obj.complete, bufferInfo);
    // Serialize message field [controlUid]
    bufferInfo = _serializer.string(obj.controlUid, bufferInfo);
    // Serialize message field [timedOut]
    bufferInfo = _serializer.bool(obj.timedOut, bufferInfo);
    // Serialize the length for message field [errorCodes]
    bufferInfo = _serializer.uint32(obj.errorCodes.length, bufferInfo);
    // Serialize message field [errorCodes]
    obj.errorCodes.forEach((val) => {
      bufferInfo = _serializer.string(val, bufferInfo);
    });
    // Serialize the length for message field [labels]
    bufferInfo = _serializer.uint32(obj.labels.length, bufferInfo);
    // Serialize message field [labels]
    obj.labels.forEach((val) => {
      bufferInfo = _serializer.string(val, bufferInfo);
    });
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type RobustControllerStatus
    let tmp;
    let len;
    let data = new RobustControllerStatus();
    // Deserialize message field [isEnabled]
    tmp = _deserializer.bool(buffer);
    data.isEnabled = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [complete]
    tmp = _deserializer.int32(buffer);
    data.complete = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [controlUid]
    tmp = _deserializer.string(buffer);
    data.controlUid = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [timedOut]
    tmp = _deserializer.bool(buffer);
    data.timedOut = tmp.data;
    buffer = tmp.buffer;
    // Deserialize array length for message field [errorCodes]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [errorCodes]
    data.errorCodes = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.string(buffer);
      data.errorCodes[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [labels]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [labels]
    data.labels = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.string(buffer);
      data.labels[i] = tmp.data;
      buffer = tmp.buffer;
    }
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_core_msgs/RobustControllerStatus';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '2f15441b7285d915e7e59d3618e173f2';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # True if the RC is enabled and running, false if not.
    bool isEnabled
    
    # The state of the RC with respect to its completion goal.  One of
    # NOT_COMPLETE, COMPLETE_W_FAILURE, or COMPLETE_W_SUCCESS
    int32 complete
    int32 NOT_COMPLETE = 0
    int32 COMPLETE_W_FAILURE = 1
    int32 COMPLETE_W_SUCCESS = 2
    
    # Identifies the sender of the Enable message that the RC is using for its
    # commands.  This should correspond to the "uid" field of a recently published
    # RC *Enable message.
    string controlUid
    
    # Set to true when the RC self-disables as a result of too much time elapsing
    # without receiving an Enable message.
    bool timedOut
    
    # A list of relevant error codes.  Error codes are defined by the individual
    # robust controllers, consult a robust controller's documentation to see what
    # error codes it generates.
    string[] errorCodes
    
    # A list of current labels for the RC's current state. For example, "fastapproach",
    # "slowapproach", etc. Used primarily for the blended RCs, other RCs can leave this
    # blank. This will probably contains just one label, but it could contain multiple labels
    # in the future.
    string[] labels
    
    `;
  }

};

// Constants for message
RobustControllerStatus.Constants = {
  NOT_COMPLETE: 0,
  COMPLETE_W_FAILURE: 1,
  COMPLETE_W_SUCCESS: 2,
}

module.exports = RobustControllerStatus;
