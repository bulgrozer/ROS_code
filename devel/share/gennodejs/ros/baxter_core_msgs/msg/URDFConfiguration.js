// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class URDFConfiguration {
  constructor() {
    this.time = {secs: 0, nsecs: 0};
    this.link = '';
    this.joint = '';
    this.urdf = '';
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type URDFConfiguration
    // Serialize message field [time]
    bufferInfo = _serializer.time(obj.time, bufferInfo);
    // Serialize message field [link]
    bufferInfo = _serializer.string(obj.link, bufferInfo);
    // Serialize message field [joint]
    bufferInfo = _serializer.string(obj.joint, bufferInfo);
    // Serialize message field [urdf]
    bufferInfo = _serializer.string(obj.urdf, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type URDFConfiguration
    let tmp;
    let len;
    let data = new URDFConfiguration();
    // Deserialize message field [time]
    tmp = _deserializer.time(buffer);
    data.time = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [link]
    tmp = _deserializer.string(buffer);
    data.link = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [joint]
    tmp = _deserializer.string(buffer);
    data.joint = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [urdf]
    tmp = _deserializer.string(buffer);
    data.urdf = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_core_msgs/URDFConfiguration';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '0c7028d878027820eed2aa0cbf1f5e4a';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    ## URDF Configuration
    time time      # time the message was created, serves as a sequence number
                   # time should be changed only when the content changes.
    string link    # parent link name
    string joint   # joint to configure
                   # link + joint + time uniquely identifies a configuration.
    string urdf    # XML or JSON-encoded URDF data.  This should be a URDF fragment
                   # describing the entire subtree for the given joint attached
                   # to the given parent link. If this field is empty the joint
                   # is removed from the parent link.
    
    `;
  }

};

module.exports = URDFConfiguration;
