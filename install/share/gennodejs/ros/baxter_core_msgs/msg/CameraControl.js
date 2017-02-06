// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class CameraControl {
  constructor() {
    this.id = 0;
    this.value = 0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type CameraControl
    // Serialize message field [id]
    bufferInfo = _serializer.int32(obj.id, bufferInfo);
    // Serialize message field [value]
    bufferInfo = _serializer.int32(obj.value, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type CameraControl
    let tmp;
    let len;
    let data = new CameraControl();
    // Deserialize message field [id]
    tmp = _deserializer.int32(buffer);
    data.id = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [value]
    tmp = _deserializer.int32(buffer);
    data.value = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_core_msgs/CameraControl';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '01e38dd67dfb36af457f0915248629d1';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    int32   id
    int32   value
    
    int32 CAMERA_CONTROL_EXPOSURE=100
    int32 CAMERA_CONTROL_GAIN=101
    int32 CAMERA_CONTROL_WHITE_BALANCE_R=102
    int32 CAMERA_CONTROL_WHITE_BALANCE_G=103
    int32 CAMERA_CONTROL_WHITE_BALANCE_B=104
    int32 CAMERA_CONTROL_WINDOW_X=105
    int32 CAMERA_CONTROL_WINDOW_Y=106
    int32 CAMERA_CONTROL_FLIP=107
    int32 CAMERA_CONTROL_MIRROR=108
    int32 CAMERA_CONTROL_RESOLUTION_HALF=109
    
    `;
  }

};

// Constants for message
CameraControl.Constants = {
  CAMERA_CONTROL_EXPOSURE: 100,
  CAMERA_CONTROL_GAIN: 101,
  CAMERA_CONTROL_WHITE_BALANCE_R: 102,
  CAMERA_CONTROL_WHITE_BALANCE_G: 103,
  CAMERA_CONTROL_WHITE_BALANCE_B: 104,
  CAMERA_CONTROL_WINDOW_X: 105,
  CAMERA_CONTROL_WINDOW_Y: 106,
  CAMERA_CONTROL_FLIP: 107,
  CAMERA_CONTROL_MIRROR: 108,
  CAMERA_CONTROL_RESOLUTION_HALF: 109,
}

module.exports = CameraControl;
