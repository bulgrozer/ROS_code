// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.srv)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let CameraSettings = require('../msg/CameraSettings.js');

//-----------------------------------------------------------


//-----------------------------------------------------------

class OpenCameraRequest {
  constructor() {
    this.name = '';
    this.settings = new CameraSettings();
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type OpenCameraRequest
    // Serialize message field [name]
    bufferInfo = _serializer.string(obj.name, bufferInfo);
    // Serialize message field [settings]
    bufferInfo = CameraSettings.serialize(obj.settings, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type OpenCameraRequest
    let tmp;
    let len;
    let data = new OpenCameraRequest();
    // Deserialize message field [name]
    tmp = _deserializer.string(buffer);
    data.name = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [settings]
    tmp = CameraSettings.deserialize(buffer);
    data.settings = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'baxter_core_msgs/OpenCameraRequest';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'c4194eee32741c5a98ef8da9666fa6c9';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string          name
    CameraSettings  settings
    
    ================================================================================
    MSG: baxter_core_msgs/CameraSettings
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

class OpenCameraResponse {
  constructor() {
    this.err = 0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type OpenCameraResponse
    // Serialize message field [err]
    bufferInfo = _serializer.int32(obj.err, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type OpenCameraResponse
    let tmp;
    let len;
    let data = new OpenCameraResponse();
    // Deserialize message field [err]
    tmp = _deserializer.int32(buffer);
    data.err = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'baxter_core_msgs/OpenCameraResponse';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'b6e094011a4dfaee5eddf447220446cf';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    int32           err
    
    
    `;
  }

};

module.exports = {
  Request: OpenCameraRequest,
  Response: OpenCameraResponse
};
