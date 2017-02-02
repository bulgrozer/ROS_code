// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class EndEffectorCommand {
  constructor() {
    this.id = 0;
    this.command = '';
    this.args = '';
    this.sender = '';
    this.sequence = 0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type EndEffectorCommand
    // Serialize message field [id]
    bufferInfo = _serializer.uint32(obj.id, bufferInfo);
    // Serialize message field [command]
    bufferInfo = _serializer.string(obj.command, bufferInfo);
    // Serialize message field [args]
    bufferInfo = _serializer.string(obj.args, bufferInfo);
    // Serialize message field [sender]
    bufferInfo = _serializer.string(obj.sender, bufferInfo);
    // Serialize message field [sequence]
    bufferInfo = _serializer.uint32(obj.sequence, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type EndEffectorCommand
    let tmp;
    let len;
    let data = new EndEffectorCommand();
    // Deserialize message field [id]
    tmp = _deserializer.uint32(buffer);
    data.id = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [command]
    tmp = _deserializer.string(buffer);
    data.command = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [args]
    tmp = _deserializer.string(buffer);
    data.args = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [sender]
    tmp = _deserializer.string(buffer);
    data.sender = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [sequence]
    tmp = _deserializer.uint32(buffer);
    data.sequence = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_core_msgs/EndEffectorCommand';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'c003234e90416f2ca02ac7837c42cbb7';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    ## Command to be sent to an end effector
    uint32 id       # target end effector id
    string command  # operation to perform
    # Well known commands:
    string   CMD_NO_OP           = no_op
    string   CMD_SET             = set
    string   CMD_CONFIGURE       = configure
    string   CMD_REBOOT          = reboot
    string   CMD_RESET           = reset
    string   CMD_CALIBRATE       = calibrate
    string   CMD_CLEAR_CALIBRATION = clear_calibration
    string   CMD_PREPARE_TO_GRIP = prepare_to_grip
    string   CMD_GRIP            = grip
    string   CMD_RELEASE         = release
    string   CMD_GO              = go
    string   CMD_STOP            = stop
    #
    string args     # JSON arguments to the command
    #
    string sender   # optional identifier, returned in state when the command is handled
    uint32 sequence # optional sequence number, return in state when the command is handled
    
    
    `;
  }

};

// Constants for message
EndEffectorCommand.Constants = {
  CMD_NO_OP: 'no_op',
  CMD_SET: 'set',
  CMD_CONFIGURE: 'configure',
  CMD_REBOOT: 'reboot',
  CMD_RESET: 'reset',
  CMD_CALIBRATE: 'calibrate',
  CMD_CLEAR_CALIBRATION: 'clear_calibration',
  CMD_PREPARE_TO_GRIP: 'prepare_to_grip',
  CMD_GRIP: 'grip',
  CMD_RELEASE: 'release',
  CMD_GO: 'go',
  CMD_STOP: 'stop',
}

module.exports = EndEffectorCommand;
