// Auto-generated. Do not edit!

// (in-package baxter_maintenance_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class UpdateSource {
  constructor() {
    this.devname = '';
    this.filename = '';
    this.version = '';
    this.uuid = '';
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type UpdateSource
    // Serialize message field [devname]
    bufferInfo = _serializer.string(obj.devname, bufferInfo);
    // Serialize message field [filename]
    bufferInfo = _serializer.string(obj.filename, bufferInfo);
    // Serialize message field [version]
    bufferInfo = _serializer.string(obj.version, bufferInfo);
    // Serialize message field [uuid]
    bufferInfo = _serializer.string(obj.uuid, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type UpdateSource
    let tmp;
    let len;
    let data = new UpdateSource();
    // Deserialize message field [devname]
    tmp = _deserializer.string(buffer);
    data.devname = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [filename]
    tmp = _deserializer.string(buffer);
    data.filename = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [version]
    tmp = _deserializer.string(buffer);
    data.version = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [uuid]
    tmp = _deserializer.string(buffer);
    data.uuid = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_maintenance_msgs/UpdateSource';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '88ad69e3ed4d619e167c9d83e6d9310f';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string  devname
    string  filename
    string  version
    string  uuid
    
    `;
  }

};

module.exports = UpdateSource;
