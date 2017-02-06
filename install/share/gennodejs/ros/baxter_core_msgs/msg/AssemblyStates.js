// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let AssemblyState = require('./AssemblyState.js');

//-----------------------------------------------------------

class AssemblyStates {
  constructor() {
    this.names = [];
    this.states = [];
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type AssemblyStates
    // Serialize the length for message field [names]
    bufferInfo = _serializer.uint32(obj.names.length, bufferInfo);
    // Serialize message field [names]
    obj.names.forEach((val) => {
      bufferInfo = _serializer.string(val, bufferInfo);
    });
    // Serialize the length for message field [states]
    bufferInfo = _serializer.uint32(obj.states.length, bufferInfo);
    // Serialize message field [states]
    obj.states.forEach((val) => {
      bufferInfo = AssemblyState.serialize(val, bufferInfo);
    });
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type AssemblyStates
    let tmp;
    let len;
    let data = new AssemblyStates();
    // Deserialize array length for message field [names]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [names]
    data.names = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.string(buffer);
      data.names[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [states]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [states]
    data.states = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = AssemblyState.deserialize(buffer);
      data.states[i] = tmp.data;
      buffer = tmp.buffer;
    }
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_core_msgs/AssemblyStates';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '63427318d41dbd2077c105027ad82a2b';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string[] names
    AssemblyState[] states
    ================================================================================
    MSG: baxter_core_msgs/AssemblyState
    bool ready               # true if enabled and ready to operate, e.g., not homing
    bool enabled             # true if enabled
    bool stopped             # true if stopped -- e-stop asserted
    bool error               # true if a component of the assembly has an error
    #
    # The following are specific to the robot top-level assembly:
    uint8  estop_button      # One of the following:
      uint8   ESTOP_BUTTON_UNPRESSED = 0   # Robot is not stopped and button is not pressed
      uint8   ESTOP_BUTTON_PRESSED   = 1
      uint8   ESTOP_BUTTON_UNKNOWN   = 2   # STATE_UNKNOWN when estop was asserted by a non-user source
      uint8   ESTOP_BUTTON_RELEASED  = 3   # Was pressed, is now known to be released, but robot is still stopped.
    #
    uint8  estop_source      # If stopped is true, the source of the e-stop.  One of the following:
      uint8  ESTOP_SOURCE_NONE      = 0   # e-stop is not asserted
      uint8  ESTOP_SOURCE_USER      = 1   # e-stop source is user input (the red button)
      uint8  ESTOP_SOURCE_UNKNOWN   = 2   # e-stop source is unknown
      uint8  ESTOP_SOURCE_FAULT     = 3   # MotorController asserted e-stop in response to a joint fault
      uint8  ESTOP_SOURCE_BRAIN     = 4   # MotorController asserted e-stop in response to a lapse of the brain heartbeat
    
    `;
  }

};

module.exports = AssemblyStates;
