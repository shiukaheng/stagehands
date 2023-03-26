; Auto-generated. Do not edit!


(cl:in-package stagehands_ros-srv)


;//! \htmlinclude arucoAveragePose-request.msg.html

(cl:defclass <arucoAveragePose-request> (roslisp-msg-protocol:ros-message)
  ()
)

(cl:defclass arucoAveragePose-request (<arucoAveragePose-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <arucoAveragePose-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'arucoAveragePose-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name stagehands_ros-srv:<arucoAveragePose-request> is deprecated: use stagehands_ros-srv:arucoAveragePose-request instead.")))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <arucoAveragePose-request>) ostream)
  "Serializes a message object of type '<arucoAveragePose-request>"
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <arucoAveragePose-request>) istream)
  "Deserializes a message object of type '<arucoAveragePose-request>"
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<arucoAveragePose-request>)))
  "Returns string type for a service object of type '<arucoAveragePose-request>"
  "stagehands_ros/arucoAveragePoseRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'arucoAveragePose-request)))
  "Returns string type for a service object of type 'arucoAveragePose-request"
  "stagehands_ros/arucoAveragePoseRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<arucoAveragePose-request>)))
  "Returns md5sum for a message object of type '<arucoAveragePose-request>"
  "d41d8cd98f00b204e9800998ecf8427e")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'arucoAveragePose-request)))
  "Returns md5sum for a message object of type 'arucoAveragePose-request"
  "d41d8cd98f00b204e9800998ecf8427e")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<arucoAveragePose-request>)))
  "Returns full string definition for message of type '<arucoAveragePose-request>"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'arucoAveragePose-request)))
  "Returns full string definition for message of type 'arucoAveragePose-request"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <arucoAveragePose-request>))
  (cl:+ 0
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <arucoAveragePose-request>))
  "Converts a ROS message object to a list"
  (cl:list 'arucoAveragePose-request
))
;//! \htmlinclude arucoAveragePose-response.msg.html

(cl:defclass <arucoAveragePose-response> (roslisp-msg-protocol:ros-message)
  ()
)

(cl:defclass arucoAveragePose-response (<arucoAveragePose-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <arucoAveragePose-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'arucoAveragePose-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name stagehands_ros-srv:<arucoAveragePose-response> is deprecated: use stagehands_ros-srv:arucoAveragePose-response instead.")))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <arucoAveragePose-response>) ostream)
  "Serializes a message object of type '<arucoAveragePose-response>"
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <arucoAveragePose-response>) istream)
  "Deserializes a message object of type '<arucoAveragePose-response>"
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<arucoAveragePose-response>)))
  "Returns string type for a service object of type '<arucoAveragePose-response>"
  "stagehands_ros/arucoAveragePoseResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'arucoAveragePose-response)))
  "Returns string type for a service object of type 'arucoAveragePose-response"
  "stagehands_ros/arucoAveragePoseResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<arucoAveragePose-response>)))
  "Returns md5sum for a message object of type '<arucoAveragePose-response>"
  "d41d8cd98f00b204e9800998ecf8427e")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'arucoAveragePose-response)))
  "Returns md5sum for a message object of type 'arucoAveragePose-response"
  "d41d8cd98f00b204e9800998ecf8427e")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<arucoAveragePose-response>)))
  "Returns full string definition for message of type '<arucoAveragePose-response>"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'arucoAveragePose-response)))
  "Returns full string definition for message of type 'arucoAveragePose-response"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <arucoAveragePose-response>))
  (cl:+ 0
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <arucoAveragePose-response>))
  "Converts a ROS message object to a list"
  (cl:list 'arucoAveragePose-response
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'arucoAveragePose)))
  'arucoAveragePose-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'arucoAveragePose)))
  'arucoAveragePose-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'arucoAveragePose)))
  "Returns string type for a service object of type '<arucoAveragePose>"
  "stagehands_ros/arucoAveragePose")