// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class DigitalIOState {
  constructor() {
    this.state = 0;
    this.isInputOnly = false;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type DigitalIOState
    // Serialize message field [state]
    bufferInfo = _serializer.int8(obj.state, bufferInfo);
    // Serialize message field [isInputOnly]
    bufferInfo = _serializer.bool(obj.isInputOnly, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type DigitalIOState
    let tmp;
    let len;
    let data = new DigitalIOState();
    // Deserialize message field [state]
    tmp = _deserializer.int8(buffer);
    data.state = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [isInputOnly]
    tmp = _deserializer.bool(buffer);
    data.isInputOnly = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_core_msgs/DigitalIOState';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '29d0be3859dae81a66b28f167ecec98c';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    int8 state
    bool isInputOnly
    
    int8 OFF = 0
    int8 ON  = 1
    int8 PRESSED = 1
    int8 UNPRESSED = 0
    `;
  }

};

// Constants for message
DigitalIOState.Constants = {
  OFF: 0,
  ON: 1,
  PRESSED: 1,
  UNPRESSED: 0,
}

module.exports = DigitalIOState;
