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
   (rotationQuaternion
    :reader rotationQuaternion
    :initarg :rotationQuaternion
    :type (cl:vector cl:float)
   :initform (cl:make-array 0 :element-type 'cl:float :initial-element 0.0))
   (micHeight
    :reader micHeight
    :initarg :micHeight
    :type cl:float
    :initform 0.0)
   (ledAnimation
    :reader ledAnimation
    :initarg :ledAnimation
    :type cl:string
    :initform "")
   (ledRGBColour
    :reader ledRGBColour
    :initarg :ledRGBColour
    :type (cl:vector cl:integer)
   :initform (cl:make-array 0 :element-type 'cl:integer :initial-element 0))
   (flashFrequency
    :reader flashFrequency
    :initarg :flashFrequency
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

(cl:ensure-generic-function 'rotationQuaternion-val :lambda-list '(m))
(cl:defmethod rotationQuaternion-val ((m <setTargetPose-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader stagehands_ros-srv:rotationQuaternion-val is deprecated.  Use stagehands_ros-srv:rotationQuaternion instead.")
  (rotationQuaternion m))

(cl:ensure-generic-function 'micHeight-val :lambda-list '(m))
(cl:defmethod micHeight-val ((m <setTargetPose-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader stagehands_ros-srv:micHeight-val is deprecated.  Use stagehands_ros-srv:micHeight instead.")
  (micHeight m))

(cl:ensure-generic-function 'ledAnimation-val :lambda-list '(m))
(cl:defmethod ledAnimation-val ((m <setTargetPose-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader stagehands_ros-srv:ledAnimation-val is deprecated.  Use stagehands_ros-srv:ledAnimation instead.")
  (ledAnimation m))

(cl:ensure-generic-function 'ledRGBColour-val :lambda-list '(m))
(cl:defmethod ledRGBColour-val ((m <setTargetPose-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader stagehands_ros-srv:ledRGBColour-val is deprecated.  Use stagehands_ros-srv:ledRGBColour instead.")
  (ledRGBColour m))

(cl:ensure-generic-function 'flashFrequency-val :lambda-list '(m))
(cl:defmethod flashFrequency-val ((m <setTargetPose-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader stagehands_ros-srv:flashFrequency-val is deprecated.  Use stagehands_ros-srv:flashFrequency instead.")
  (flashFrequency m))
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
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'rotationQuaternion))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (cl:let ((bits (roslisp-utils:encode-double-float-bits ele)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream)))
   (cl:slot-value msg 'rotationQuaternion))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'micHeight))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'ledAnimation))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'ledAnimation))
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'ledRGBColour))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (cl:let* ((signed ele) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 18446744073709551616) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) unsigned) ostream)
    ))
   (cl:slot-value msg 'ledRGBColour))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'flashFrequency))))
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
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'rotationQuaternion) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'rotationQuaternion)))
    (cl:dotimes (i __ros_arr_len)
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:aref vals i) (roslisp-utils:decode-double-float-bits bits))))))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'micHeight) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'ledAnimation) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'ledAnimation) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'ledRGBColour) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'ledRGBColour)))
    (cl:dotimes (i __ros_arr_len)
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) unsigned) (cl:read-byte istream))
      (cl:setf (cl:aref vals i) (cl:if (cl:< unsigned 9223372036854775808) unsigned (cl:- unsigned 18446744073709551616)))))))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'flashFrequency) (roslisp-utils:decode-double-float-bits bits)))
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
  "5c0e8c1ef239833f4aa2b438a827901b")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'setTargetPose-request)))
  "Returns md5sum for a message object of type 'setTargetPose-request"
  "5c0e8c1ef239833f4aa2b438a827901b")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<setTargetPose-request>)))
  "Returns full string definition for message of type '<setTargetPose-request>"
  (cl:format cl:nil "float64 xPos~%float64 yPos~%float64[] rotationQuaternion~%float64 micHeight~%string ledAnimation~%int64[] ledRGBColour~%float64 flashFrequency~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'setTargetPose-request)))
  "Returns full string definition for message of type 'setTargetPose-request"
  (cl:format cl:nil "float64 xPos~%float64 yPos~%float64[] rotationQuaternion~%float64 micHeight~%string ledAnimation~%int64[] ledRGBColour~%float64 flashFrequency~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <setTargetPose-request>))
  (cl:+ 0
     8
     8
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'rotationQuaternion) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ 8)))
     8
     4 (cl:length (cl:slot-value msg 'ledAnimation))
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'ledRGBColour) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ 8)))
     8
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <setTargetPose-request>))
  "Converts a ROS message object to a list"
  (cl:list 'setTargetPose-request
    (cl:cons ':xPos (xPos msg))
    (cl:cons ':yPos (yPos msg))
    (cl:cons ':rotationQuaternion (rotationQuaternion msg))
    (cl:cons ':micHeight (micHeight msg))
    (cl:cons ':ledAnimation (ledAnimation msg))
    (cl:cons ':ledRGBColour (ledRGBColour msg))
    (cl:cons ':flashFrequency (flashFrequency msg))
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
  "5c0e8c1ef239833f4aa2b438a827901b")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'setTargetPose-response)))
  "Returns md5sum for a message object of type 'setTargetPose-response"
  "5c0e8c1ef239833f4aa2b438a827901b")
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