// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let CameraControl = require('./CameraControl.js');

//-----------------------------------------------------------

class CameraSettings {
  constructor() {
    this.width = 0;
    this.height = 0;
    this.fps = 0.0;
    this.controls = [];
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type CameraSettings
    // Serialize message field [width]
    bufferInfo = _serializer.int32(obj.width, bufferInfo);
    // Serialize message field [height]
    bufferInfo = _serializer.int32(obj.height, bufferInfo);
    // Serialize message field [fps]
    bufferInfo = _serializer.float32(obj.fps, bufferInfo);
    // Serialize the length for message field [controls]
    bufferInfo = _serializer.uint32(obj.controls.length, bufferInfo);
    // Serialize message field [controls]
    obj.controls.forEach((val) => {
      bufferInfo = CameraControl.serialize(val, bufferInfo);
    });
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type CameraSettings
    let tmp;
    let len;
    let data = new CameraSettings();
    // Deserialize message field [width]
    tmp = _deserializer.int32(buffer);
    data.width = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [height]
    tmp = _deserializer.int32(buffer);
    data.height = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [fps]
    tmp = _deserializer.float32(buffer);
    data.fps = tmp.data;
    buffer = tmp.buffer;
    // Deserialize array length for message field [controls]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [controls]
    data.controls = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = CameraControl.deserialize(buffer);
      data.controls[i] = tmp.data;
      buffer = tmp.buffer;
    }
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_core_msgs/CameraSettings';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'd133bef4a3bd9a6e490a5dc91d20f429';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    int32           width
    int32           height
    float32         fps
    CameraControl[] controls
    
    ================================================================================
    MSG: baxter_core_msgs/CameraControl
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

module.exports = CameraSettings;
