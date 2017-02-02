// Auto-generated. Do not edit!

// (in-package baxter_maintenance_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let UpdateSource = require('./UpdateSource.js');

//-----------------------------------------------------------

class UpdateSources {
  constructor() {
    this.uuid = '';
    this.sources = [];
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type UpdateSources
    // Serialize message field [uuid]
    bufferInfo = _serializer.string(obj.uuid, bufferInfo);
    // Serialize the length for message field [sources]
    bufferInfo = _serializer.uint32(obj.sources.length, bufferInfo);
    // Serialize message field [sources]
    obj.sources.forEach((val) => {
      bufferInfo = UpdateSource.serialize(val, bufferInfo);
    });
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type UpdateSources
    let tmp;
    let len;
    let data = new UpdateSources();
    // Deserialize message field [uuid]
    tmp = _deserializer.string(buffer);
    data.uuid = tmp.data;
    buffer = tmp.buffer;
    // Deserialize array length for message field [sources]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [sources]
    data.sources = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = UpdateSource.deserialize(buffer);
      data.sources[i] = tmp.data;
      buffer = tmp.buffer;
    }
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_maintenance_msgs/UpdateSources';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'b3b428bf55e80e83d378830c33b3405b';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string          uuid
    UpdateSource[]  sources
    
    ================================================================================
    MSG: baxter_maintenance_msgs/UpdateSource
    string  devname
    string  filename
    string  version
    string  uuid
    
    `;
  }

};

module.exports = UpdateSources;
