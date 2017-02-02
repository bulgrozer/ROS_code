// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.srv)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let geometry_msgs = _finder('geometry_msgs');
let sensor_msgs = _finder('sensor_msgs');

//-----------------------------------------------------------


//-----------------------------------------------------------

class SolvePositionIKRequest {
  constructor() {
    this.pose_stamp = [];
    this.seed_angles = [];
    this.seed_mode = 0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type SolvePositionIKRequest
    // Serialize the length for message field [pose_stamp]
    bufferInfo = _serializer.uint32(obj.pose_stamp.length, bufferInfo);
    // Serialize message field [pose_stamp]
    obj.pose_stamp.forEach((val) => {
      bufferInfo = geometry_msgs.msg.PoseStamped.serialize(val, bufferInfo);
    });
    // Serialize the length for message field [seed_angles]
    bufferInfo = _serializer.uint32(obj.seed_angles.length, bufferInfo);
    // Serialize message field [seed_angles]
    obj.seed_angles.forEach((val) => {
      bufferInfo = sensor_msgs.msg.JointState.serialize(val, bufferInfo);
    });
    // Serialize message field [seed_mode]
    bufferInfo = _serializer.uint8(obj.seed_mode, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type SolvePositionIKRequest
    let tmp;
    let len;
    let data = new SolvePositionIKRequest();
    // Deserialize array length for message field [pose_stamp]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [pose_stamp]
    data.pose_stamp = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = geometry_msgs.msg.PoseStamped.deserialize(buffer);
      data.pose_stamp[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [seed_angles]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [seed_angles]
    data.seed_angles = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = sensor_msgs.msg.JointState.deserialize(buffer);
      data.seed_angles[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize message field [seed_mode]
    tmp = _deserializer.uint8(buffer);
    data.seed_mode = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'baxter_core_msgs/SolvePositionIKRequest';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '2587e42983d0081d0a2288230991073b';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    
    geometry_msgs/PoseStamped[] pose_stamp
    
    
    
    
    sensor_msgs/JointState[] seed_angles
    
    
    
    
    
    uint8 SEED_AUTO    = 0
    uint8 SEED_USER    = 1
    uint8 SEED_CURRENT = 2
    uint8 SEED_NS_MAP  = 3
    
    uint8 seed_mode
    
    ================================================================================
    MSG: geometry_msgs/PoseStamped
    # A Pose with reference coordinate frame and timestamp
    Header header
    Pose pose
    
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
    
    ================================================================================
    MSG: geometry_msgs/Pose
    # A representation of pose in free space, composed of position and orientation. 
    Point position
    Quaternion orientation
    
    ================================================================================
    MSG: geometry_msgs/Point
    # This contains the position of a point in free space
    float64 x
    float64 y
    float64 z
    
    ================================================================================
    MSG: geometry_msgs/Quaternion
    # This represents an orientation in free space in quaternion form.
    
    float64 x
    float64 y
    float64 z
    float64 w
    
    ================================================================================
    MSG: sensor_msgs/JointState
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
    
    string[] name
    float64[] position
    float64[] velocity
    float64[] effort
    
    `;
  }

};

// Constants for message
SolvePositionIKRequest.Constants = {
  SEED_AUTO: 0,
  SEED_USER: 1,
  SEED_CURRENT: 2,
  SEED_NS_MAP: 3,
}

class SolvePositionIKResponse {
  constructor() {
    this.joints = [];
    this.isValid = [];
    this.result_type = [];
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type SolvePositionIKResponse
    // Serialize the length for message field [joints]
    bufferInfo = _serializer.uint32(obj.joints.length, bufferInfo);
    // Serialize message field [joints]
    obj.joints.forEach((val) => {
      bufferInfo = sensor_msgs.msg.JointState.serialize(val, bufferInfo);
    });
    // Serialize the length for message field [isValid]
    bufferInfo = _serializer.uint32(obj.isValid.length, bufferInfo);
    // Serialize message field [isValid]
    obj.isValid.forEach((val) => {
      bufferInfo = _serializer.bool(val, bufferInfo);
    });
    // Serialize the length for message field [result_type]
    bufferInfo = _serializer.uint32(obj.result_type.length, bufferInfo);
    // Serialize message field [result_type]
    bufferInfo.buffer.push(obj.result_type);
    bufferInfo.length += obj.result_type.length;
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type SolvePositionIKResponse
    let tmp;
    let len;
    let data = new SolvePositionIKResponse();
    // Deserialize array length for message field [joints]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [joints]
    data.joints = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = sensor_msgs.msg.JointState.deserialize(buffer);
      data.joints[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [isValid]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [isValid]
    data.isValid = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.bool(buffer);
      data.isValid[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [result_type]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [result_type]
    data.result_type = buffer.slice(0, len);
    buffer =  buffer.slice(len);
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'baxter_core_msgs/SolvePositionIKResponse';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'd9b0c2b3932e08421f5094cf62743b9f';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    
    sensor_msgs/JointState[] joints
    
    
    bool[] isValid
    
    
    
    uint8 RESULT_INVALID = 0
    uint8[] result_type
    
    
    ================================================================================
    MSG: sensor_msgs/JointState
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
    
    string[] name
    float64[] position
    float64[] velocity
    float64[] effort
    
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

// Constants for message
SolvePositionIKResponse.Constants = {
  RESULT_INVALID: 0,
}

module.exports = {
  Request: SolvePositionIKRequest,
  Response: SolvePositionIKResponse
};
