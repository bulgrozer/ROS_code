// Auto-generated. Do not edit!

// (in-package baxter_maintenance_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let TareData = require('./TareData.js');

//-----------------------------------------------------------

class TareEnable {
  constructor() {
    this.isEnabled = false;
    this.uid = '';
    this.data = new TareData();
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type TareEnable
    // Serialize message field [isEnabled]
    bufferInfo = _serializer.bool(obj.isEnabled, bufferInfo);
    // Serialize message field [uid]
    bufferInfo = _serializer.string(obj.uid, bufferInfo);
    // Serialize message field [data]
    bufferInfo = TareData.serialize(obj.data, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type TareEnable
    let tmp;
    let len;
    let data = new TareEnable();
    // Deserialize message field [isEnabled]
    tmp = _deserializer.bool(buffer);
    data.isEnabled = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [uid]
    tmp = _deserializer.string(buffer);
    data.uid = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [data]
    tmp = TareData.deserialize(buffer);
    data.data = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_maintenance_msgs/TareEnable';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '1d38ec0923789ab928453d933bef8c51';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    bool isEnabled
    string uid
    TareData data
    
    ================================================================================
    MSG: baxter_maintenance_msgs/TareData
    bool tuneGravitySpring
    
    `;
  }

};

module.exports = TareEnable;
