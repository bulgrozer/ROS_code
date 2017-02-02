// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let std_msgs = _finder('std_msgs');

//-----------------------------------------------------------

class CollisionAvoidanceState {
  constructor() {
    this.header = new std_msgs.msg.Header();
    this.other_arm = false;
    this.collision_object = [];
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type CollisionAvoidanceState
    // Serialize message field [header]
    bufferInfo = std_msgs.msg.Header.serialize(obj.header, bufferInfo);
    // Serialize message field [other_arm]
    bufferInfo = _serializer.bool(obj.other_arm, bufferInfo);
    // Serialize the length for message field [collision_object]
    bufferInfo = _serializer.uint32(obj.collision_object.length, bufferInfo);
    // Serialize message field [collision_object]
    obj.collision_object.forEach((val) => {
      bufferInfo = _serializer.string(val, bufferInfo);
    });
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type CollisionAvoidanceState
    let tmp;
    let len;
    let data = new CollisionAvoidanceState();
    // Deserialize message field [header]
    tmp = std_msgs.msg.Header.deserialize(buffer);
    data.header = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [other_arm]
    tmp = _deserializer.bool(buffer);
    data.other_arm = tmp.data;
    buffer = tmp.buffer;
    // Deserialize array length for message field [collision_object]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [collision_object]
    data.collision_object = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.string(buffer);
      data.collision_object[i] = tmp.data;
      buffer = tmp.buffer;
    }
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_core_msgs/CollisionAvoidanceState';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '30f5cb8ae019f1ffe8b599e6d2e589c7';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    std_msgs/Header header
    bool other_arm
    string[] collision_object
    ================================================================================
    MSG: std_msgs/Header
    # Standard metadata for higher-level stamped data types.
    # This is generally used to communicate timestamped data 
    # in a particular coordinate frame.
    # 
    # sequence ID: consecutively increasing ID 
    uint32 seq
    #Two-integer timestamp that is expressed as:
    # * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')
    # * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')
    # time-handling sugar is provided by the client library
    time stamp
    #Frame this data is associated with
    # 0: no frame
    # 1: global frame
    string frame_id
    
    `;
  }

};

module.exports = CollisionAvoidanceState;
