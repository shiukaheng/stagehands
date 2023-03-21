; Auto-generated. Do not edit!


(cl:in-package stagehands_ros-msg)


;//! \htmlinclude robotCurrentPose.msg.html

(cl:defclass <robotCurrentPose> (roslisp-msg-protocol:ros-message)
  ((robot_id
    :reader robot_id
    :initarg :robot_id
    :type cl:string
    :initform "")
   (xPos
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
   :initform (cl:make-array 0 :element-type 'cl:float :initial-element 0.0)))
)

(cl:defclass robotCurrentPose (<robotCurrentPose>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <robotCurrentPose>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'robotCurrentPose)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name stagehands_ros-msg:<robotCurrentPose> is deprecated: use stagehands_ros-msg:robotCurrentPose instead.")))

(cl:ensure-generic-function 'robot_id-val :lambda-list '(m))
(cl:defmethod robot_id-val ((m <robotCurrentPose>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader stagehands_ros-msg:robot_id-val is deprecated.  Use stagehands_ros-msg:robot_id instead.")
  (robot_id m))

(cl:ensure-generic-function 'xPos-val :lambda-list '(m))
(cl:defmethod xPos-val ((m <robotCurrentPose>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader stagehands_ros-msg:xPos-val is deprecated.  Use stagehands_ros-msg:xPos instead.")
  (xPos m))

(cl:ensure-generic-function 'yPos-val :lambda-list '(m))
(cl:defmethod yPos-val ((m <robotCurrentPose>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader stagehands_ros-msg:yPos-val is deprecated.  Use stagehands_ros-msg:yPos instead.")
  (yPos m))

(cl:ensure-generic-function 'rotationQuaternion-val :lambda-list '(m))
(cl:defmethod rotationQuaternion-val ((m <robotCurrentPose>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader stagehands_ros-msg:rotationQuaternion-val is deprecated.  Use stagehands_ros-msg:rotationQuaternion instead.")
  (rotationQuaternion m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <robotCurrentPose>) ostream)
  "Serializes a message object of type '<robotCurrentPose>"
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'robot_id))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'robot_id))
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
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <robotCurrentPose>) istream)
  "Deserializes a message object of type '<robotCurrentPose>"
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'robot_id) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'robot_id) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
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
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<robotCurrentPose>)))
  "Returns string type for a message object of type '<robotCurrentPose>"
  "stagehands_ros/robotCurrentPose")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'robotCurrentPose)))
  "Returns string type for a message object of type 'robotCurrentPose"
  "stagehands_ros/robotCurrentPose")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<robotCurrentPose>)))
  "Returns md5sum for a message object of type '<robotCurrentPose>"
  "d025d245ac73544fde77dab78b28adba")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'robotCurrentPose)))
  "Returns md5sum for a message object of type 'robotCurrentPose"
  "d025d245ac73544fde77dab78b28adba")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<robotCurrentPose>)))
  "Returns full string definition for message of type '<robotCurrentPose>"
  (cl:format cl:nil "string robot_id~%float64 xPos~%float64 yPos~%float64[] rotationQuaternion~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'robotCurrentPose)))
  "Returns full string definition for message of type 'robotCurrentPose"
  (cl:format cl:nil "string robot_id~%float64 xPos~%float64 yPos~%float64[] rotationQuaternion~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <robotCurrentPose>))
  (cl:+ 0
     4 (cl:length (cl:slot-value msg 'robot_id))
     8
     8
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'rotationQuaternion) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ 8)))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <robotCurrentPose>))
  "Converts a ROS message object to a list"
  (cl:list 'robotCurrentPose
    (cl:cons ':robot_id (robot_id msg))
    (cl:cons ':xPos (xPos msg))
    (cl:cons ':yPos (yPos msg))
    (cl:cons ':rotationQuaternion (rotationQuaternion msg))
))
