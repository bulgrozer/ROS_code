// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let std_msgs = _finder('std_msgs');

//-----------------------------------------------------------

class SEAJointState {
  constructor() {
    this.header = new std_msgs.msg.Header();
    this.name = [];
    this.commanded_position = [];
    this.commanded_velocity = [];
    this.commanded_acceleration = [];
    this.commanded_effort = [];
    this.actual_position = [];
    this.actual_velocity = [];
    this.actual_effort = [];
    this.gravity_model_effort = [];
    this.gravity_only = [];
    this.hysteresis_model_effort = [];
    this.crosstalk_model_effort = [];
    this.hystState = 0.0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type SEAJointState
    // Serialize message field [header]
    bufferInfo = std_msgs.msg.Header.serialize(obj.header, bufferInfo);
    // Serialize the length for message field [name]
    bufferInfo = _serializer.uint32(obj.name.length, bufferInfo);
    // Serialize message field [name]
    obj.name.forEach((val) => {
      bufferInfo = _serializer.string(val, bufferInfo);
    });
    // Serialize the length for message field [commanded_position]
    bufferInfo = _serializer.uint32(obj.commanded_position.length, bufferInfo);
    // Serialize message field [commanded_position]
    obj.commanded_position.forEach((val) => {
      bufferInfo = _serializer.float64(val, bufferInfo);
    });
    // Serialize the length for message field [commanded_velocity]
    bufferInfo = _serializer.uint32(obj.commanded_velocity.length, bufferInfo);
    // Serialize message field [commanded_velocity]
    obj.commanded_velocity.forEach((val) => {
      bufferInfo = _serializer.float64(val, bufferInfo);
    });
    // Serialize the length for message field [commanded_acceleration]
    bufferInfo = _serializer.uint32(obj.commanded_acceleration.length, bufferInfo);
    // Serialize message field [commanded_acceleration]
    obj.commanded_acceleration.forEach((val) => {
      bufferInfo = _serializer.float64(val, bufferInfo);
    });
    // Serialize the length for message field [commanded_effort]
    bufferInfo = _serializer.uint32(obj.commanded_effort.length, bufferInfo);
    // Serialize message field [commanded_effort]
    obj.commanded_effort.forEach((val) => {
      bufferInfo = _serializer.float64(val, bufferInfo);
    });
    // Serialize the length for message field [actual_position]
    bufferInfo = _serializer.uint32(obj.actual_position.length, bufferInfo);
    // Serialize message field [actual_position]
    obj.actual_position.forEach((val) => {
      bufferInfo = _serializer.float64(val, bufferInfo);
    });
    // Serialize the length for message field [actual_velocity]
    bufferInfo = _serializer.uint32(obj.actual_velocity.length, bufferInfo);
    // Serialize message field [actual_velocity]
    obj.actual_velocity.forEach((val) => {
      bufferInfo = _serializer.float64(val, bufferInfo);
    });
    // Serialize the length for message field [actual_effort]
    bufferInfo = _serializer.uint32(obj.actual_effort.length, bufferInfo);
    // Serialize message field [actual_effort]
    obj.actual_effort.forEach((val) => {
      bufferInfo = _serializer.float64(val, bufferInfo);
    });
    // Serialize the length for message field [gravity_model_effort]
    bufferInfo = _serializer.uint32(obj.gravity_model_effort.length, bufferInfo);
    // Serialize message field [gravity_model_effort]
    obj.gravity_model_effort.forEach((val) => {
      bufferInfo = _serializer.float64(val, bufferInfo);
    });
    // Serialize the length for message field [gravity_only]
    bufferInfo = _serializer.uint32(obj.gravity_only.length, bufferInfo);
    // Serialize message field [gravity_only]
    obj.gravity_only.forEach((val) => {
      bufferInfo = _serializer.float64(val, bufferInfo);
    });
    // Serialize the length for message field [hysteresis_model_effort]
    bufferInfo = _serializer.uint32(obj.hysteresis_model_effort.length, bufferInfo);
    // Serialize message field [hysteresis_model_effort]
    obj.hysteresis_model_effort.forEach((val) => {
      bufferInfo = _serializer.float64(val, bufferInfo);
    });
    // Serialize the length for message field [crosstalk_model_effort]
    bufferInfo = _serializer.uint32(obj.crosstalk_model_effort.length, bufferInfo);
    // Serialize message field [crosstalk_model_effort]
    obj.crosstalk_model_effort.forEach((val) => {
      bufferInfo = _serializer.float64(val, bufferInfo);
    });
    // Serialize message field [hystState]
    bufferInfo = _serializer.float64(obj.hystState, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type SEAJointState
    let tmp;
    let len;
    let data = new SEAJointState();
    // Deserialize message field [header]
    tmp = std_msgs.msg.Header.deserialize(buffer);
    data.header = tmp.data;
    buffer = tmp.buffer;
    // Deserialize array length for message field [name]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [name]
    data.name = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.string(buffer);
      data.name[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [commanded_position]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [commanded_position]
    data.commanded_position = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.float64(buffer);
      data.commanded_position[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [commanded_velocity]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [commanded_velocity]
    data.commanded_velocity = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.float64(buffer);
      data.commanded_velocity[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [commanded_acceleration]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [commanded_acceleration]
    data.commanded_acceleration = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.float64(buffer);
      data.commanded_acceleration[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [commanded_effort]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [commanded_effort]
    data.commanded_effort = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.float64(buffer);
      data.commanded_effort[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [actual_position]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [actual_position]
    data.actual_position = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.float64(buffer);
      data.actual_position[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [actual_velocity]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [actual_velocity]
    data.actual_velocity = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.float64(buffer);
      data.actual_velocity[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [actual_effort]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [actual_effort]
    data.actual_effort = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.float64(buffer);
      data.actual_effort[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [gravity_model_effort]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [gravity_model_effort]
    data.gravity_model_effort = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.float64(buffer);
      data.gravity_model_effort[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [gravity_only]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [gravity_only]
    data.gravity_only = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.float64(buffer);
      data.gravity_only[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [hysteresis_model_effort]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [hysteresis_model_effort]
    data.hysteresis_model_effort = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.float64(buffer);
      data.hysteresis_model_effort[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [crosstalk_model_effort]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [crosstalk_model_effort]
    data.crosstalk_model_effort = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.float64(buffer);
      data.crosstalk_model_effort[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize message field [hystState]
    tmp = _deserializer.float64(buffer);
    data.hystState = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_core_msgs/SEAJointState';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'd36406dcbb6d860b1b39c4e28f81352b';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # This is a message that holds data to describe the state of a set of torque controlled joints.
    #
    # The state of each joint (revolute or prismatic) is defined by:
    #  * the position of the joint (rad or m),
    #  * the velocity of the joint (rad/s or m/s) and
    #  * the effort that is applied in the joint (Nm or N).
    #
    # Each joint is uniquely identified by its name
    # The header specifies the time at which the joint states were recorded. All the joint states
    # in one message have to be recorded at the same time.
    #
    # This message consists of a multiple arrays, one for each part of the joint state.
    # The goal is to make each of the fields optional. When e.g. your joints have no
    # effort associated with them, you can leave the effort array empty.
    #
    # All arrays in this message should have the same size, or be empty.
    # This is the only way to uniquely associate the joint name with the correct
    # states.
    
    
    Header header
    
    string[]  name
    float64[] commanded_position
    float64[] commanded_velocity
    float64[] commanded_acceleration
    float64[] commanded_effort
    float64[] actual_position
    float64[] actual_velocity
    float64[] actual_effort
    # This includes the inertial feed forward torques when applicable.
    float64[] gravity_model_effort
    # This is the torque required to hold the arm against gravity returned by KDL
    # if the arm was stationary.  This does not include inertial feed forward
    # torques (even when we have them) or any of the corrections (i.e. spring
    # hysteresis, crosstalk, etc) we make to the KDL model.
    float64[] gravity_only
    float64[] hysteresis_model_effort
    float64[] crosstalk_model_effort
    float64   hystState
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

module.exports = SEAJointState;
