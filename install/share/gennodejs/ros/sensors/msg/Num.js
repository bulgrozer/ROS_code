// Auto-generated. Do not edit!

// (in-package sensors.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let std_msgs = _finder('std_msgs');

//-----------------------------------------------------------

class Num {
  constructor() {
    this.header = new std_msgs.msg.Header();
    this.num = 0;
    this.text = '';
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type Num
    // Serialize message field [header]
    bufferInfo = std_msgs.msg.Header.serialize(obj.header, bufferInfo);
    // Serialize message field [num]
    bufferInfo = _serializer.int64(obj.num, bufferInfo);
    // Serialize message field [text]
    bufferInfo = _serializer.string(obj.text, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type Num
    let tmp;
    let len;
    let data = new Num();
    // Deserialize message field [header]
    tmp = std_msgs.msg.Header.deserialize(buffer);
    data.header = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [num]
    tmp = _deserializer.int64(buffer);
    data.num = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [text]
    tmp = _deserializer.string(buffer);
    data.text = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'sensors/Num';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'd13457acd9284c8cad71524de7b1d586';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    Header header
    int64 num
    string text
    
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

module.exports = Num;
