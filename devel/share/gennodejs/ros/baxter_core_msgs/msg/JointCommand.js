// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class JointCommand {
  constructor() {
    this.mode = 0;
    this.command = [];
    this.names = [];
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type JointCommand
    // Serialize message field [mode]
    bufferInfo = _serializer.int32(obj.mode, bufferInfo);
    // Serialize the length for message field [command]
    bufferInfo = _serializer.uint32(obj.command.length, bufferInfo);
    // Serialize message field [command]
    obj.command.forEach((val) => {
      bufferInfo = _serializer.float64(val, bufferInfo);
    });
    // Serialize the length for message field [names]
    bufferInfo = _serializer.uint32(obj.names.length, bufferInfo);
    // Serialize message field [names]
    obj.names.forEach((val) => {
      bufferInfo = _serializer.string(val, bufferInfo);
    });
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type JointCommand
    let tmp;
    let len;
    let data = new JointCommand();
    // Deserialize message field [mode]
    tmp = _deserializer.int32(buffer);
    data.mode = tmp.data;
    buffer = tmp.buffer;
    // Deserialize array length for message field [command]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [command]
    data.command = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.float64(buffer);
      data.command[i] = tmp.data;
      buffer = tmp.buffer;
    }
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
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_core_msgs/JointCommand';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '19bfec8434dd568ab3c633d187c36f2e';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    int32 mode
    float64[] command
    string[]  names
    
    int32 POSITION_MODE=1
    int32 VELOCITY_MODE=2
    int32 TORQUE_MODE=3
    int32 RAW_POSITION_MODE=4
    `;
  }

};

// Constants for message
JointCommand.Constants = {
  POSITION_MODE: 1,
  VELOCITY_MODE: 2,
  TORQUE_MODE: 3,
  RAW_POSITION_MODE: 4,
}

module.exports = JointCommand;
