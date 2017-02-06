// Auto-generated. Do not edit!

// (in-package baxter_maintenance_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class CalibrateArmData {
  constructor() {
    this.suppressWriteToFile = false;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type CalibrateArmData
    // Serialize message field [suppressWriteToFile]
    bufferInfo = _serializer.bool(obj.suppressWriteToFile, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type CalibrateArmData
    let tmp;
    let len;
    let data = new CalibrateArmData();
    // Deserialize message field [suppressWriteToFile]
    tmp = _deserializer.bool(buffer);
    data.suppressWriteToFile = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_maintenance_msgs/CalibrateArmData';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'ba9ee949ea363f7bcfc8cc74e0bcb69d';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    bool suppressWriteToFile
    
    `;
  }

};

module.exports = CalibrateArmData;
