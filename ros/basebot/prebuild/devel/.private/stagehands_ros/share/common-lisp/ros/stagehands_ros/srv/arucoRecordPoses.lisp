; Auto-generated. Do not edit!


(cl:in-package stagehands_ros-srv)


;//! \htmlinclude arucoRecordPoses-request.msg.html

(cl:defclass <arucoRecordPoses-request> (roslisp-msg-protocol:ros-message)
  ()
)

(cl:defclass arucoRecordPoses-request (<arucoRecordPoses-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <arucoRecordPoses-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'arucoRecordPoses-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name stagehands_ros-srv:<arucoRecordPoses-request> is deprecated: use stagehands_ros-srv:arucoRecordPoses-request instead.")))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <arucoRecordPoses-request>) ostream)
  "Serializes a message object of type '<arucoRecordPoses-request>"
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <arucoRecordPoses-request>) istream)
  "Deserializes a message object of type '<arucoRecordPoses-request>"
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<arucoRecordPoses-request>)))
  "Returns string type for a service object of type '<arucoRecordPoses-request>"
  "stagehands_ros/arucoRecordPosesRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'arucoRecordPoses-request)))
  "Returns string type for a service object of type 'arucoRecordPoses-request"
  "stagehands_ros/arucoRecordPosesRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<arucoRecordPoses-request>)))
  "Returns md5sum for a message object of type '<arucoRecordPoses-request>"
  "d41d8cd98f00b204e9800998ecf8427e")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'arucoRecordPoses-request)))
  "Returns md5sum for a message object of type 'arucoRecordPoses-request"
  "d41d8cd98f00b204e9800998ecf8427e")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<arucoRecordPoses-request>)))
  "Returns full string definition for message of type '<arucoRecordPoses-request>"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'arucoRecordPoses-request)))
  "Returns full string definition for message of type 'arucoRecordPoses-request"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <arucoRecordPoses-request>))
  (cl:+ 0
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <arucoRecordPoses-request>))
  "Converts a ROS message object to a list"
  (cl:list 'arucoRecordPoses-request
))
;//! \htmlinclude arucoRecordPoses-response.msg.html

(cl:defclass <arucoRecordPoses-response> (roslisp-msg-protocol:ros-message)
  ()
)

(cl:defclass arucoRecordPoses-response (<arucoRecordPoses-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <arucoRecordPoses-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'arucoRecordPoses-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name stagehands_ros-srv:<arucoRecordPoses-response> is deprecated: use stagehands_ros-srv:arucoRecordPoses-response instead.")))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <arucoRecordPoses-response>) ostream)
  "Serializes a message object of type '<arucoRecordPoses-response>"
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <arucoRecordPoses-response>) istream)
  "Deserializes a message object of type '<arucoRecordPoses-response>"
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<arucoRecordPoses-response>)))
  "Returns string type for a service object of type '<arucoRecordPoses-response>"
  "stagehands_ros/arucoRecordPosesResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'arucoRecordPoses-response)))
  "Returns string type for a service object of type 'arucoRecordPoses-response"
  "stagehands_ros/arucoRecordPosesResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<arucoRecordPoses-response>)))
  "Returns md5sum for a message object of type '<arucoRecordPoses-response>"
  "d41d8cd98f00b204e9800998ecf8427e")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'arucoRecordPoses-response)))
  "Returns md5sum for a message object of type 'arucoRecordPoses-response"
  "d41d8cd98f00b204e9800998ecf8427e")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<arucoRecordPoses-response>)))
  "Returns full string definition for message of type '<arucoRecordPoses-response>"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'arucoRecordPoses-response)))
  "Returns full string definition for message of type 'arucoRecordPoses-response"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <arucoRecordPoses-response>))
  (cl:+ 0
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <arucoRecordPoses-response>))
  "Converts a ROS message object to a list"
  (cl:list 'arucoRecordPoses-response
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'arucoRecordPoses)))
  'arucoRecordPoses-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'arucoRecordPoses)))
  'arucoRecordPoses-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'arucoRecordPoses)))
  "Returns string type for a service object of type '<arucoRecordPoses>"
  "stagehands_ros/arucoRecordPoses")