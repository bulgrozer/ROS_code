// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class HeadPanCommand {
  constructor() {
    this.target = 0.0;
    this.speed_ratio = 0.0;
    this.enable_pan_request = 0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type HeadPanCommand
    // Serialize message field [target]
    bufferInfo = _serializer.float32(obj.target, bufferInfo);
    // Serialize message field [speed_ratio]
    bufferInfo = _serializer.float32(obj.speed_ratio, bufferInfo);
    // Serialize message field [enable_pan_request]
    bufferInfo = _serializer.uint8(obj.enable_pan_request, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type HeadPanCommand
    let tmp;
    let len;
    let data = new HeadPanCommand();
    // Deserialize message field [target]
    tmp = _deserializer.float32(buffer);
    data.target = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [speed_ratio]
    tmp = _deserializer.float32(buffer);
    data.speed_ratio = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [enable_pan_request]
    tmp = _deserializer.uint8(buffer);
    data.enable_pan_request = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_core_msgs/HeadPanCommand';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '23b8a3f4b7ee9de7099d029e57660a8c';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    float32 target              # radians for target, 0 str
    float32 speed_ratio         # Percentage of max speed [0-1]
    #
      float32 MAX_SPEED_RATIO = 1.0
      float32 MIN_SPEED_RATIO = 0.0
    #
    uint8   enable_pan_request  # override automatic pan enable/disable
    # enable_pan_request is tristate: 0 = disable pan; 1 = enable pan; 2 = don't change pan
      uint8   REQUEST_PAN_DISABLE = 0
      uint8   REQUEST_PAN_ENABLE = 1
      uint8   REQUEST_PAN_VOID = 2
    #
    
    `;
  }

};

// Constants for message
HeadPanCommand.Constants = {
  MAX_SPEED_RATIO: 1.0,
  MIN_SPEED_RATIO: 0.0,
  REQUEST_PAN_DISABLE: 0,
  REQUEST_PAN_ENABLE: 1,
  REQUEST_PAN_VOID: 2,
}

module.exports = HeadPanCommand;
