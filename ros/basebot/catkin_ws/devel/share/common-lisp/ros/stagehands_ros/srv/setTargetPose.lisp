; Auto-generated. Do not edit!


(cl:in-package stagehands_ros-srv)


;//! \htmlinclude setTargetPose-request.msg.html

(cl:defclass <setTargetPose-request> (roslisp-msg-protocol:ros-message)
  ((xPos
    :reader xPos
    :initarg :xPos
    :type cl:float
    :initform 0.0)
   (yPos
    :reader yPos
    :initarg :yPos
    :type cl:float
    :initform 0.0)
   (thetaPos
    :reader thetaPos
    :initarg :thetaPos
    :type cl:float
    :initform 0.0))
)

(cl:defclass setTargetPose-request (<setTargetPose-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <setTargetPose-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'setTargetPose-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name stagehands_ros-srv:<setTargetPose-request> is deprecated: use stagehands_ros-srv:setTargetPose-request instead.")))

(cl:ensure-generic-function 'xPos-val :lambda-list '(m))
(cl:defmethod xPos-val ((m <setTargetPose-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader stagehands_ros-srv:xPos-val is deprecated.  Use stagehands_ros-srv:xPos instead.")
  (xPos m))

(cl:ensure-generic-function 'yPos-val :lambda-list '(m))
(cl:defmethod yPos-val ((m <setTargetPose-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader stagehands_ros-srv:yPos-val is deprecated.  Use stagehands_ros-srv:yPos instead.")
  (yPos m))

(cl:ensure-generic-function 'thetaPos-val :lambda-list '(m))
(cl:defmethod thetaPos-val ((m <setTargetPose-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader stagehands_ros-srv:thetaPos-val is deprecated.  Use stagehands_ros-srv:thetaPos instead.")
  (thetaPos m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <setTargetPose-request>) ostream)
  "Serializes a message object of type '<setTargetPose-request>"
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'xPos))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'yPos))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'thetaPos))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <setTargetPose-request>) istream)
  "Deserializes a message object of type '<setTargetPose-request>"
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'xPos) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'yPos) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'thetaPos) (roslisp-utils:decode-double-float-bits bits)))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<setTargetPose-request>)))
  "Returns string type for a service object of type '<setTargetPose-request>"
  "stagehands_ros/setTargetPoseRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'setTargetPose-request)))
  "Returns string type for a service object of type 'setTargetPose-request"
  "stagehands_ros/setTargetPoseRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<setTargetPose-request>)))
  "Returns md5sum for a message object of type '<setTargetPose-request>"
  "b2641e4b932d1b80a79d7568f7c58323")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'setTargetPose-request)))
  "Returns md5sum for a message object of type 'setTargetPose-request"
  "b2641e4b932d1b80a79d7568f7c58323")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<setTargetPose-request>)))
  "Returns full string definition for message of type '<setTargetPose-request>"
  (cl:format cl:nil "float64 xPos~%float64 yPos~%float64 thetaPos~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'setTargetPose-request)))
  "Returns full string definition for message of type 'setTargetPose-request"
  (cl:format cl:nil "float64 xPos~%float64 yPos~%float64 thetaPos~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <setTargetPose-request>))
  (cl:+ 0
     8
     8
     8
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <setTargetPose-request>))
  "Converts a ROS message object to a list"
  (cl:list 'setTargetPose-request
    (cl:cons ':xPos (xPos msg))
    (cl:cons ':yPos (yPos msg))
    (cl:cons ':thetaPos (thetaPos msg))
))
;//! \htmlinclude setTargetPose-response.msg.html

(cl:defclass <setTargetPose-response> (roslisp-msg-protocol:ros-message)
  ((response
    :reader response
    :initarg :response
    :type cl:string
    :initform ""))
)

(cl:defclass setTargetPose-response (<setTargetPose-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <setTargetPose-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'setTargetPose-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name stagehands_ros-srv:<setTargetPose-response> is deprecated: use stagehands_ros-srv:setTargetPose-response instead.")))

(cl:ensure-generic-function 'response-val :lambda-list '(m))
(cl:defmethod response-val ((m <setTargetPose-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader stagehands_ros-srv:response-val is deprecated.  Use stagehands_ros-srv:response instead.")
  (response m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <setTargetPose-response>) ostream)
  "Serializes a message object of type '<setTargetPose-response>"
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'response))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'response))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <setTargetPose-response>) istream)
  "Deserializes a message object of type '<setTargetPose-response>"
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'response) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'response) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<setTargetPose-response>)))
  "Returns string type for a service object of type '<setTargetPose-response>"
  "stagehands_ros/setTargetPoseResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'setTargetPose-response)))
  "Returns string type for a service object of type 'setTargetPose-response"
  "stagehands_ros/setTargetPoseResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<setTargetPose-response>)))
  "Returns md5sum for a message object of type '<setTargetPose-response>"
  "b2641e4b932d1b80a79d7568f7c58323")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'setTargetPose-response)))
  "Returns md5sum for a message object of type 'setTargetPose-response"
  "b2641e4b932d1b80a79d7568f7c58323")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<setTargetPose-response>)))
  "Returns full string definition for message of type '<setTargetPose-response>"
  (cl:format cl:nil "string response~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'setTargetPose-response)))
  "Returns full string definition for message of type 'setTargetPose-response"
  (cl:format cl:nil "string response~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <setTargetPose-response>))
  (cl:+ 0
     4 (cl:length (cl:slot-value msg 'response))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <setTargetPose-response>))
  "Converts a ROS message object to a list"
  (cl:list 'setTargetPose-response
    (cl:cons ':response (response msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'setTargetPose)))
  'setTargetPose-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'setTargetPose)))
  'setTargetPose-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'setTargetPose)))
  "Returns string type for a service object of type '<setTargetPose>"
  "stagehands_ros/setTargetPose")