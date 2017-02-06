// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class HeadState {
  constructor() {
    this.pan = 0.0;
    this.isTurning = false;
    this.isNodding = false;
    this.isPanEnabled = false;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type HeadState
    // Serialize message field [pan]
    bufferInfo = _serializer.float32(obj.pan, bufferInfo);
    // Serialize message field [isTurning]
    bufferInfo = _serializer.bool(obj.isTurning, bufferInfo);
    // Serialize message field [isNodding]
    bufferInfo = _serializer.bool(obj.isNodding, bufferInfo);
    // Serialize message field [isPanEnabled]
    bufferInfo = _serializer.bool(obj.isPanEnabled, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type HeadState
    let tmp;
    let len;
    let data = new HeadState();
    // Deserialize message field [pan]
    tmp = _deserializer.float32(buffer);
    data.pan = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [isTurning]
    tmp = _deserializer.bool(buffer);
    data.isTurning = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [isNodding]
    tmp = _deserializer.bool(buffer);
    data.isNodding = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [isPanEnabled]
    tmp = _deserializer.bool(buffer);
    data.isPanEnabled = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_core_msgs/HeadState';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '71c43b264307205358e7e49be5601348';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    float32 pan
    bool isTurning
    bool isNodding
    bool isPanEnabled
    
    `;
  }

};

module.exports = HeadState;
