// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class AnalogOutputCommand {
  constructor() {
    this.name = '';
    this.value = 0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type AnalogOutputCommand
    // Serialize message field [name]
    bufferInfo = _serializer.string(obj.name, bufferInfo);
    // Serialize message field [value]
    bufferInfo = _serializer.uint16(obj.value, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type AnalogOutputCommand
    let tmp;
    let len;
    let data = new AnalogOutputCommand();
    // Deserialize message field [name]
    tmp = _deserializer.string(buffer);
    data.name = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [value]
    tmp = _deserializer.uint16(buffer);
    data.value = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_core_msgs/AnalogOutputCommand';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'a7b945129a083ca4095d48aa94841d85';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    ##the name of the output
    string name  
    ##the value to set output 
    uint16 value   
    
    `;
  }

};

module.exports = AnalogOutputCommand;
