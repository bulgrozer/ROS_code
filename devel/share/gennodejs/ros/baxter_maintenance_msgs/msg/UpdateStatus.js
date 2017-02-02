// Auto-generated. Do not edit!

// (in-package baxter_maintenance_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class UpdateStatus {
  constructor() {
    this.status = 0;
    this.progress = 0.0;
    this.long_description = '';
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type UpdateStatus
    // Serialize message field [status]
    bufferInfo = _serializer.uint16(obj.status, bufferInfo);
    // Serialize message field [progress]
    bufferInfo = _serializer.float32(obj.progress, bufferInfo);
    // Serialize message field [long_description]
    bufferInfo = _serializer.string(obj.long_description, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type UpdateStatus
    let tmp;
    let len;
    let data = new UpdateStatus();
    // Deserialize message field [status]
    tmp = _deserializer.uint16(buffer);
    data.status = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [progress]
    tmp = _deserializer.float32(buffer);
    data.progress = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [long_description]
    tmp = _deserializer.string(buffer);
    data.long_description = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'baxter_maintenance_msgs/UpdateStatus';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '74e246350421569590252c39e8aa7b85';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # See the class UpdateRunner()
    # status:           One-word description of the current action being performed
    # long_description: Details pertaining to status if any.  Used for verbose error messages.
    
    uint16  status
    float32 progress
    string  long_description
    
    uint16 STS_IDLE            = 0
    uint16 STS_INVALID         = 1
    uint16 STS_BUSY            = 2
    uint16 STS_CANCELLED       = 3
    uint16 STS_ERR             = 4
    uint16 STS_MOUNT_UPDATE    = 5
    uint16 STS_VERIFY_UPDATE   = 6
    uint16 STS_PREP_STAGING    = 7
    uint16 STS_MOUNT_STAGING   = 8
    uint16 STS_EXTRACT_UPDATE  = 9
    uint16 STS_LOAD_KEXEC      = 10
    
    
    `;
  }

};

// Constants for message
UpdateStatus.Constants = {
  STS_IDLE: 0,
  STS_INVALID: 1,
  STS_BUSY: 2,
  STS_CANCELLED: 3,
  STS_ERR: 4,
  STS_MOUNT_UPDATE: 5,
  STS_VERIFY_UPDATE: 6,
  STS_PREP_STAGING: 7,
  STS_MOUNT_STAGING: 8,
  STS_EXTRACT_UPDATE: 9,
  STS_LOAD_KEXEC: 10,
}

module.exports = UpdateStatus;
