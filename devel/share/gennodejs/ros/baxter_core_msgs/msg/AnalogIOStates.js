// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let AnalogIOState = require('./AnalogIOState.js');

//-----------------------------------------------------------

class AnalogIOStates {
  constructor() {
    this.names = [];
    this.states = [];
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type AnalogIOStates
    // Serialize the length for message field [names]
    bufferInfo = _serializer.uint32(obj.names.length, bufferInfo);
    // Serialize message field [names]
    obj.names.forEach((val) => {
      bufferInfo = _serializer.string(val, bufferInfo);
    });
    // Serialize the length for message field [states]
    bufferInfo = _serializer.uint32(obj.states.length, bufferInfo);
    // Serialize message field [states]
    obj.states.forEach((val) => {
      bufferInfo = AnalogIOState.serialize(val, bufferInfo);
    });
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type AnalogIOStates
    let tmp;
    let len;
    let data = new AnalogIOStates();
    // Deserialize array length for message field [names]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [names]
    data.names = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.string(buffer);
      data.names[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [states]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [states]
    data.states = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = AnalogIOState.deserialize(buffer);
      data.states[i] = tmp.data;
      buffer = tmp.buffer;
    }
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_core_msgs/AnalogIOStates';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '0a05ba3bbb53a8a3b164e34946d619f7';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string[]         names
    AnalogIOState[] states
    ================================================================================
    MSG: baxter_core_msgs/AnalogIOState
    time timestamp
    float64 value
    bool isInputOnly
    
    `;
  }

};

module.exports = AnalogIOStates;
