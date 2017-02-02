// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class EndEffectorProperties {
  constructor() {
    this.id = 0;
    this.ui_type = 0;
    this.manufacturer = '';
    this.product = '';
    this.serial_number = '';
    this.hardware_rev = '';
    this.firmware_rev = '';
    this.firmware_date = '';
    this.has_calibration = false;
    this.controls_grip = false;
    this.senses_grip = false;
    this.reverses_grip = false;
    this.controls_force = false;
    this.senses_force = false;
    this.controls_position = false;
    this.senses_position = false;
    this.properties = '';
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type EndEffectorProperties
    // Serialize message field [id]
    bufferInfo = _serializer.uint32(obj.id, bufferInfo);
    // Serialize message field [ui_type]
    bufferInfo = _serializer.uint8(obj.ui_type, bufferInfo);
    // Serialize message field [manufacturer]
    bufferInfo = _serializer.string(obj.manufacturer, bufferInfo);
    // Serialize message field [product]
    bufferInfo = _serializer.string(obj.product, bufferInfo);
    // Serialize message field [serial_number]
    bufferInfo = _serializer.string(obj.serial_number, bufferInfo);
    // Serialize message field [hardware_rev]
    bufferInfo = _serializer.string(obj.hardware_rev, bufferInfo);
    // Serialize message field [firmware_rev]
    bufferInfo = _serializer.string(obj.firmware_rev, bufferInfo);
    // Serialize message field [firmware_date]
    bufferInfo = _serializer.string(obj.firmware_date, bufferInfo);
    // Serialize message field [has_calibration]
    bufferInfo = _serializer.bool(obj.has_calibration, bufferInfo);
    // Serialize message field [controls_grip]
    bufferInfo = _serializer.bool(obj.controls_grip, bufferInfo);
    // Serialize message field [senses_grip]
    bufferInfo = _serializer.bool(obj.senses_grip, bufferInfo);
    // Serialize message field [reverses_grip]
    bufferInfo = _serializer.bool(obj.reverses_grip, bufferInfo);
    // Serialize message field [controls_force]
    bufferInfo = _serializer.bool(obj.controls_force, bufferInfo);
    // Serialize message field [senses_force]
    bufferInfo = _serializer.bool(obj.senses_force, bufferInfo);
    // Serialize message field [controls_position]
    bufferInfo = _serializer.bool(obj.controls_position, bufferInfo);
    // Serialize message field [senses_position]
    bufferInfo = _serializer.bool(obj.senses_position, bufferInfo);
    // Serialize message field [properties]
    bufferInfo = _serializer.string(obj.properties, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type EndEffectorProperties
    let tmp;
    let len;
    let data = new EndEffectorProperties();
    // Deserialize message field [id]
    tmp = _deserializer.uint32(buffer);
    data.id = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [ui_type]
    tmp = _deserializer.uint8(buffer);
    data.ui_type = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [manufacturer]
    tmp = _deserializer.string(buffer);
    data.manufacturer = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [product]
    tmp = _deserializer.string(buffer);
    data.product = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [serial_number]
    tmp = _deserializer.string(buffer);
    data.serial_number = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [hardware_rev]
    tmp = _deserializer.string(buffer);
    data.hardware_rev = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [firmware_rev]
    tmp = _deserializer.string(buffer);
    data.firmware_rev = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [firmware_date]
    tmp = _deserializer.string(buffer);
    data.firmware_date = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [has_calibration]
    tmp = _deserializer.bool(buffer);
    data.has_calibration = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [controls_grip]
    tmp = _deserializer.bool(buffer);
    data.controls_grip = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [senses_grip]
    tmp = _deserializer.bool(buffer);
    data.senses_grip = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [reverses_grip]
    tmp = _deserializer.bool(buffer);
    data.reverses_grip = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [controls_force]
    tmp = _deserializer.bool(buffer);
    data.controls_force = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [senses_force]
    tmp = _deserializer.bool(buffer);
    data.senses_force = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [controls_position]
    tmp = _deserializer.bool(buffer);
    data.controls_position = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [senses_position]
    tmp = _deserializer.bool(buffer);
    data.senses_position = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [properties]
    tmp = _deserializer.string(buffer);
    data.properties = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_core_msgs/EndEffectorProperties';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '21b83773ab9a35216d11e427573c76cc';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    uint32 id               # EndEffectorId
    uint8  ui_type
        # End Effector type enumeration, for the UI:
        uint8  NO_GRIPPER = 0
        uint8  SUCTION_CUP_GRIPPER = 1
        uint8  ELECTRIC_GRIPPER = 2
        uint8  PASSIVE_GRIPPER = 3
    string manufacturer     # Manufacturer name
    string product          # Product name
    string serial_number    # Serial number, optional
    string hardware_rev     # Hardware revision, optional
    string firmware_rev     # Firmware revision, optional
    string firmware_date    # Firmware date, optional
    #
    # End Effector Capabilities
    bool   has_calibration  # true if the gripper has calibration
    bool   controls_grip    # true if the gripper has grip/release control
    bool   senses_grip      # true if the gripper has grip sense
    bool   reverses_grip    # true if the gripper has reverse-grip mode
    
    bool   controls_force   # true if the gripper has force control
    bool   senses_force     # true if the gripper has force sense
    
    bool   controls_position # true if the gripper has position control
    bool   senses_position   # true if the gripper has position sense
    #
    string properties       # JSON; other properties
    
    `;
  }

};

// Constants for message
EndEffectorProperties.Constants = {
  NO_GRIPPER: 0,
  SUCTION_CUP_GRIPPER: 1,
  ELECTRIC_GRIPPER: 2,
  PASSIVE_GRIPPER: 3,
}

module.exports = EndEffectorProperties;
