// Auto-generated. Do not edit!

// (in-package baxter_core_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let EndpointState = require('./EndpointState.js');

//-----------------------------------------------------------

class EndpointStates {
  constructor() {
    this.names = [];
    this.states = [];
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type EndpointStates
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
      bufferInfo = EndpointState.serialize(val, bufferInfo);
    });
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type EndpointStates
    let tmp;
    let len;
    let data = new EndpointStates();
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
      tmp = EndpointState.deserialize(buffer);
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
    return 'baxter_core_msgs/EndpointStates';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'a0ca50a066809a5f065f39f37aa028fb';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string[] names
    EndpointState[] states
    
    
    ================================================================================
    MSG: baxter_core_msgs/EndpointState
    Header header
    geometry_msgs/Pose   pose
    geometry_msgs/Twist  twist
    geometry_msgs/Wrench wrench
    
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
    MSG: geometry_msgs/Twist
    # This expresses velocity in free space broken into its linear and angular parts.
    Vector3  linear
    Vector3  angular
    
    ================================================================================
    MSG: geometry_msgs/Vector3
    # This represents a vector in free space. 
    # It is only meant to represent a direction. Therefore, it does not
    # make sense to apply a translation to it (e.g., when applying a 
    # generic rigid transformation to a Vector3, tf2 will only apply the
    # rotation). If you want your data to be translatable too, use the
    # geometry_msgs/Point message instead.
    
    float64 x
    float64 y
    float64 z
    ================================================================================
    MSG: geometry_msgs/Wrench
    # This represents force in free space, separated into
    # its linear and angular parts.
    Vector3  force
    Vector3  torque
    
    `;
  }

};

module.exports = EndpointStates;
