// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class EndEffectorState {
  constructor() {
    this.timestamp = {secs: 0, nsecs: 0};
    this.id = 0;
    this.enabled = 0;
    this.calibrated = 0;
    this.ready = 0;
    this.moving = 0;
    this.gripping = 0;
    this.missed = 0;
    this.error = 0;
    this.reverse = 0;
    this.position = 0.0;
    this.force = 0.0;
    this.state = '';
    this.command = '';
    this.command_sender = '';
    this.command_sequence = 0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type EndEffectorState
    // Serialize message field [timestamp]
    bufferInfo = _serializer.time(obj.timestamp, bufferInfo);
    // Serialize message field [id]
    bufferInfo = _serializer.uint32(obj.id, bufferInfo);
    // Serialize message field [enabled]
    bufferInfo = _serializer.uint8(obj.enabled, bufferInfo);
    // Serialize message field [calibrated]
    bufferInfo = _serializer.uint8(obj.calibrated, bufferInfo);
    // Serialize message field [ready]
    bufferInfo = _serializer.uint8(obj.ready, bufferInfo);
    // Serialize message field [moving]
    bufferInfo = _serializer.uint8(obj.moving, bufferInfo);
    // Serialize message field [gripping]
    bufferInfo = _serializer.uint8(obj.gripping, bufferInfo);
    // Serialize message field [missed]
    bufferInfo = _serializer.uint8(obj.missed, bufferInfo);
    // Serialize message field [error]
    bufferInfo = _serializer.uint8(obj.error, bufferInfo);
    // Serialize message field [reverse]
    bufferInfo = _serializer.uint8(obj.reverse, bufferInfo);
    // Serialize message field [position]
    bufferInfo = _serializer.float32(obj.position, bufferInfo);
    // Serialize message field [force]
    bufferInfo = _serializer.float32(obj.force, bufferInfo);
    // Serialize message field [state]
    bufferInfo = _serializer.string(obj.state, bufferInfo);
    // Serialize message field [command]
    bufferInfo = _serializer.string(obj.command, bufferInfo);
    // Serialize message field [command_sender]
    bufferInfo = _serializer.string(obj.command_sender, bufferInfo);
    // Serialize message field [command_sequence]
    bufferInfo = _serializer.uint32(obj.command_sequence, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type EndEffectorState
    let tmp;
    let len;
    let data = new EndEffectorState();
    // Deserialize message field [timestamp]
    tmp = _deserializer.time(buffer);
    data.timestamp = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [id]
    tmp = _deserializer.uint32(buffer);
    data.id = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [enabled]
    tmp = _deserializer.uint8(buffer);
    data.enabled = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [calibrated]
    tmp = _deserializer.uint8(buffer);
    data.calibrated = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [ready]
    tmp = _deserializer.uint8(buffer);
    data.ready = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [moving]
    tmp = _deserializer.uint8(buffer);
    data.moving = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [gripping]
    tmp = _deserializer.uint8(buffer);
    data.gripping = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [missed]
    tmp = _deserializer.uint8(buffer);
    data.missed = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [error]
    tmp = _deserializer.uint8(buffer);
    data.error = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [reverse]
    tmp = _deserializer.uint8(buffer);
    data.reverse = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [position]
    tmp = _deserializer.float32(buffer);
    data.position = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [force]
    tmp = _deserializer.float32(buffer);
    data.force = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [state]
    tmp = _deserializer.string(buffer);
    data.state = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [command]
    tmp = _deserializer.string(buffer);
    data.command = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [command_sender]
    tmp = _deserializer.string(buffer);
    data.command_sender = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [command_sequence]
    tmp = _deserializer.uint32(buffer);
    data.command_sequence = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_core_msgs/EndEffectorState';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'ade777f069d738595bc19e246b8ec7a0';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    #
    time timestamp              # time when state was updated
    uint32 id                   # EndEffectorId
    #
    # The following State fields are tristate: 0 = false; 1 = true; 2 = unknown/unsupported
      uint8   STATE_FALSE = 0
      uint8   STATE_TRUE = 1
      uint8   STATE_UNKNOWN = 2
    #
    uint8   enabled             # true if enabled
    uint8   calibrated          # true if calibration has completed
    uint8   ready               # true if ready for another command
    uint8   moving              # true if moving
    uint8   gripping            # true if gripping
    uint8   missed              # true if GRIP/GOTO/SET was commanded and the gripper reaches the end of travel
    uint8   error               # true if the gripper is in an error state
    uint8   reverse             # true if the gripper is in reverse mode
    #
    float32 position            # position as a percentage of the max position;      0=closed - 100=open
    #
      float32 POSITION_CLOSED = 0.0
      float32 POSITION_OPEN   = 100.0
    #
    float32 force               # force as a percentage of max force;                0=none   - 100=max
    #
      float32 FORCE_MIN = 0.0
      float32 FORCE_MAX = 100.0
    #
    string state                # JSON: other state information
    #
    string command              # from the last command message
    string command_sender
    uint32 command_sequence
    #
    
    `;
  }

};

// Constants for message
EndEffectorState.Constants = {
  STATE_FALSE: 0,
  STATE_TRUE: 1,
  STATE_UNKNOWN: 2,
  POSITION_CLOSED: 0.0,
  POSITION_OPEN: 100.0,
  FORCE_MIN: 0.0,
  FORCE_MAX: 100.0,
}

module.exports = EndEffectorState;
