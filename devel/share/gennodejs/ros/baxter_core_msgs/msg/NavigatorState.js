// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class NavigatorState {
  constructor() {
    this.button_names = [];
    this.buttons = [];
    this.wheel = 0;
    this.light_names = [];
    this.lights = [];
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type NavigatorState
    // Serialize the length for message field [button_names]
    bufferInfo = _serializer.uint32(obj.button_names.length, bufferInfo);
    // Serialize message field [button_names]
    obj.button_names.forEach((val) => {
      bufferInfo = _serializer.string(val, bufferInfo);
    });
    // Serialize the length for message field [buttons]
    bufferInfo = _serializer.uint32(obj.buttons.length, bufferInfo);
    // Serialize message field [buttons]
    obj.buttons.forEach((val) => {
      bufferInfo = _serializer.bool(val, bufferInfo);
    });
    // Serialize message field [wheel]
    bufferInfo = _serializer.uint8(obj.wheel, bufferInfo);
    // Serialize the length for message field [light_names]
    bufferInfo = _serializer.uint32(obj.light_names.length, bufferInfo);
    // Serialize message field [light_names]
    obj.light_names.forEach((val) => {
      bufferInfo = _serializer.string(val, bufferInfo);
    });
    // Serialize the length for message field [lights]
    bufferInfo = _serializer.uint32(obj.lights.length, bufferInfo);
    // Serialize message field [lights]
    obj.lights.forEach((val) => {
      bufferInfo = _serializer.bool(val, bufferInfo);
    });
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type NavigatorState
    let tmp;
    let len;
    let data = new NavigatorState();
    // Deserialize array length for message field [button_names]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [button_names]
    data.button_names = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.string(buffer);
      data.button_names[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [buttons]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [buttons]
    data.buttons = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.bool(buffer);
      data.buttons[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize message field [wheel]
    tmp = _deserializer.uint8(buffer);
    data.wheel = tmp.data;
    buffer = tmp.buffer;
    // Deserialize array length for message field [light_names]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [light_names]
    data.light_names = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.string(buffer);
      data.light_names[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [lights]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [lights]
    data.lights = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.bool(buffer);
      data.lights[i] = tmp.data;
      buffer = tmp.buffer;
    }
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_core_msgs/NavigatorState';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '680d121a1f16a32647298b292492fffd';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
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

module.exports = NavigatorState;
