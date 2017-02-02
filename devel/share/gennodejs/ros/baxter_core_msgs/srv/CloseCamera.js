// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.srv)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------


//-----------------------------------------------------------

class CloseCameraRequest {
  constructor() {
    this.name = '';
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type CloseCameraRequest
    // Serialize message field [name]
    bufferInfo = _serializer.string(obj.name, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type CloseCameraRequest
    let tmp;
    let len;
    let data = new CloseCameraRequest();
    // Deserialize message field [name]
    tmp = _deserializer.string(buffer);
    data.name = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'baxter_core_msgs/CloseCameraRequest';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'c1f3d28f1b044c871e6eff2e9fc3c667';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string          name
    
    `;
  }

};

class CloseCameraResponse {
  constructor() {
    this.err = 0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type CloseCameraResponse
    // Serialize message field [err]
    bufferInfo = _serializer.int32(obj.err, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type CloseCameraResponse
    let tmp;
    let len;
    let data = new CloseCameraResponse();
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
    return 'baxter_core_msgs/CloseCameraResponse';
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
  Request: CloseCameraRequest,
  Response: CloseCameraResponse
};
