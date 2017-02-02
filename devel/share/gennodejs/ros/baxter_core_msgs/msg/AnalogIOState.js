// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class AnalogIOState {
  constructor() {
    this.timestamp = {secs: 0, nsecs: 0};
    this.value = 0.0;
    this.isInputOnly = false;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type AnalogIOState
    // Serialize message field [timestamp]
    bufferInfo = _serializer.time(obj.timestamp, bufferInfo);
    // Serialize message field [value]
    bufferInfo = _serializer.float64(obj.value, bufferInfo);
    // Serialize message field [isInputOnly]
    bufferInfo = _serializer.bool(obj.isInputOnly, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type AnalogIOState
    let tmp;
    let len;
    let data = new AnalogIOState();
    // Deserialize message field [timestamp]
    tmp = _deserializer.time(buffer);
    data.timestamp = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [value]
    tmp = _deserializer.float64(buffer);
    data.value = tmp.data;
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
    return 'baxter_core_msgs/AnalogIOState';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '39af371963dc9e4447e91f430c720b33';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    time timestamp
    float64 value
    bool isInputOnly
    
    `;
  }

};

module.exports = AnalogIOState;
