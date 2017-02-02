// Auto-generated. Do not edit!

// (in-package baxter_maintenance_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let CalibrateArmData = require('./CalibrateArmData.js');

//-----------------------------------------------------------

class CalibrateArmEnable {
  constructor() {
    this.isEnabled = false;
    this.uid = '';
    this.data = new CalibrateArmData();
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type CalibrateArmEnable
    // Serialize message field [isEnabled]
    bufferInfo = _serializer.bool(obj.isEnabled, bufferInfo);
    // Serialize message field [uid]
    bufferInfo = _serializer.string(obj.uid, bufferInfo);
    // Serialize message field [data]
    bufferInfo = CalibrateArmData.serialize(obj.data, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type CalibrateArmEnable
    let tmp;
    let len;
    let data = new CalibrateArmEnable();
    // Deserialize message field [isEnabled]
    tmp = _deserializer.bool(buffer);
    data.isEnabled = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [uid]
    tmp = _deserializer.string(buffer);
    data.uid = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [data]
    tmp = CalibrateArmData.deserialize(buffer);
    data.data = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_maintenance_msgs/CalibrateArmEnable';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'd7ff300fd410d4ac849664ab8143da39';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    bool isEnabled
    string uid
    CalibrateArmData data
    
    ================================================================================
    MSG: baxter_maintenance_msgs/CalibrateArmData
    bool suppressWriteToFile
    
    `;
  }

};

module.exports = CalibrateArmEnable;
