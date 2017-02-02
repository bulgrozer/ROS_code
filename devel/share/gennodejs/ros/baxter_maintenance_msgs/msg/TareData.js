// Auto-generated. Do not edit!

// (in-package baxter_maintenance_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class TareData {
  constructor() {
    this.tuneGravitySpring = false;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type TareData
    // Serialize message field [tuneGravitySpring]
    bufferInfo = _serializer.bool(obj.tuneGravitySpring, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type TareData
    let tmp;
    let len;
    let data = new TareData();
    // Deserialize message field [tuneGravitySpring]
    tmp = _deserializer.bool(buffer);
    data.tuneGravitySpring = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_maintenance_msgs/TareData';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '241e9c2ceee7da9db50693da0b3f2741';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    bool tuneGravitySpring
    
    `;
  }

};

module.exports = TareData;
