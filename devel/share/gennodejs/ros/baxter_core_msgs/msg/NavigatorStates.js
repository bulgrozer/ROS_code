// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let NavigatorState = require('./NavigatorState.js');

//-----------------------------------------------------------

class NavigatorStates {
  constructor() {
    this.names = [];
    this.states = [];
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type NavigatorStates
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
      bufferInfo = NavigatorState.serialize(val, bufferInfo);
    });
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type NavigatorStates
    let tmp;
    let len;
    let data = new NavigatorStates();
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
      tmp = NavigatorState.deserialize(buffer);
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
    return 'baxter_core_msgs/NavigatorStates';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '2c2eeb02fbbaa6f1ab6c680887f2db78';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # used when publishing multiple navigators
    string[]         names
    NavigatorState[] states
    
    ================================================================================
    MSG: baxter_core_msgs/NavigatorState
    # buttons
    string[] button_names
    bool[] buttons
    
    # wheel position
    uint8   wheel
    
    # true if the light is on, false if not
    # lights map to button names
    string[] light_names
    bool[] lights
    
    `;
  }

};

module.exports = NavigatorStates;
