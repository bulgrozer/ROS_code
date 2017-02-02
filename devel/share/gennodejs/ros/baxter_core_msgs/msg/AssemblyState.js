// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class AssemblyState {
  constructor() {
    this.ready = false;
    this.enabled = false;
    this.stopped = false;
    this.error = false;
    this.estop_button = 0;
    this.estop_source = 0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type AssemblyState
    // Serialize message field [ready]
    bufferInfo = _serializer.bool(obj.ready, bufferInfo);
    // Serialize message field [enabled]
    bufferInfo = _serializer.bool(obj.enabled, bufferInfo);
    // Serialize message field [stopped]
    bufferInfo = _serializer.bool(obj.stopped, bufferInfo);
    // Serialize message field [error]
    bufferInfo = _serializer.bool(obj.error, bufferInfo);
    // Serialize message field [estop_button]
    bufferInfo = _serializer.uint8(obj.estop_button, bufferInfo);
    // Serialize message field [estop_source]
    bufferInfo = _serializer.uint8(obj.estop_source, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type AssemblyState
    let tmp;
    let len;
    let data = new AssemblyState();
    // Deserialize message field [ready]
    tmp = _deserializer.bool(buffer);
    data.ready = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [enabled]
    tmp = _deserializer.bool(buffer);
    data.enabled = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [stopped]
    tmp = _deserializer.bool(buffer);
    data.stopped = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [error]
    tmp = _deserializer.bool(buffer);
    data.error = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [estop_button]
    tmp = _deserializer.uint8(buffer);
    data.estop_button = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [estop_source]
    tmp = _deserializer.uint8(buffer);
    data.estop_source = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_core_msgs/AssemblyState';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '356d9dd237ce73b2667da9235f541933';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
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

// Constants for message
AssemblyState.Constants = {
  ESTOP_BUTTON_UNPRESSED: 0,
  ESTOP_BUTTON_PRESSED: 1,
  ESTOP_BUTTON_UNKNOWN: 2,
  ESTOP_BUTTON_RELEASED: 3,
  ESTOP_SOURCE_NONE: 0,
  ESTOP_SOURCE_USER: 1,
  ESTOP_SOURCE_UNKNOWN: 2,
  ESTOP_SOURCE_FAULT: 3,
  ESTOP_SOURCE_BRAIN: 4,
}

module.exports = AssemblyState;
