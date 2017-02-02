// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.srv)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------


//-----------------------------------------------------------

class ListCamerasRequest {
  constructor() {
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type ListCamerasRequest
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type ListCamerasRequest
    let tmp;
    let len;
    let data = new ListCamerasRequest();
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'baxter_core_msgs/ListCamerasRequest';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'd41d8cd98f00b204e9800998ecf8427e';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    
    `;
  }

};

class ListCamerasResponse {
  constructor() {
    this.cameras = [];
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type ListCamerasResponse
    // Serialize the length for message field [cameras]
    bufferInfo = _serializer.uint32(obj.cameras.length, bufferInfo);
    // Serialize message field [cameras]
    obj.cameras.forEach((val) => {
      bufferInfo = _serializer.string(val, bufferInfo);
    });
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type ListCamerasResponse
    let tmp;
    let len;
    let data = new ListCamerasResponse();
    // Deserialize array length for message field [cameras]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [cameras]
    data.cameras = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.string(buffer);
      data.cameras[i] = tmp.data;
      buffer = tmp.buffer;
    }
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'baxter_core_msgs/ListCamerasResponse';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '855b31192ab61744e7deb992d94db7ff';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string[]    cameras
    
    
    `;
  }

};

module.exports = {
  Request: ListCamerasRequest,
  Response: ListCamerasResponse
};
