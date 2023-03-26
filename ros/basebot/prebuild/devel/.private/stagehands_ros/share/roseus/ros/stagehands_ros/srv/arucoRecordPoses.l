;; Auto-generated. Do not edit!


(when (boundp 'stagehands_ros::arucoRecordPoses)
  (if (not (find-package "STAGEHANDS_ROS"))
    (make-package "STAGEHANDS_ROS"))
  (shadow 'arucoRecordPoses (find-package "STAGEHANDS_ROS")))
(unless (find-package "STAGEHANDS_ROS::ARUCORECORDPOSES")
  (make-package "STAGEHANDS_ROS::ARUCORECORDPOSES"))
(unless (find-package "STAGEHANDS_ROS::ARUCORECORDPOSESREQUEST")
  (make-package "STAGEHANDS_ROS::ARUCORECORDPOSESREQUEST"))
(unless (find-package "STAGEHANDS_ROS::ARUCORECORDPOSESRESPONSE")
  (make-package "STAGEHANDS_ROS::ARUCORECORDPOSESRESPONSE"))

(in-package "ROS")





(defclass stagehands_ros::arucoRecordPosesRequest
  :super ros::object
  :slots ())

(defmethod stagehands_ros::arucoRecordPosesRequest
  (:init
   (&key
    )
   (send-super :init)
   self)
  (:serialization-length
   ()
   (+
    0
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;;
   self)
  )

(defclass stagehands_ros::arucoRecordPosesResponse
  :super ros::object
  :slots ())

(defmethod stagehands_ros::arucoRecordPosesResponse
  (:init
   (&key
    )
   (send-super :init)
   self)
  (:serialization-length
   ()
   (+
    0
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;;
   self)
  )

(defclass stagehands_ros::arucoRecordPoses
  :super ros::object
  :slots ())

(setf (get stagehands_ros::arucoRecordPoses :md5sum-) "d41d8cd98f00b204e9800998ecf8427e")
(setf (get stagehands_ros::arucoRecordPoses :datatype-) "stagehands_ros/arucoRecordPoses")
(setf (get stagehands_ros::arucoRecordPoses :request) stagehands_ros::arucoRecordPosesRequest)
(setf (get stagehands_ros::arucoRecordPoses :response) stagehands_ros::arucoRecordPosesResponse)

(defmethod stagehands_ros::arucoRecordPosesRequest
  (:response () (instance stagehands_ros::arucoRecordPosesResponse :init)))

(setf (get stagehands_ros::arucoRecordPosesRequest :md5sum-) "d41d8cd98f00b204e9800998ecf8427e")
(setf (get stagehands_ros::arucoRecordPosesRequest :datatype-) "stagehands_ros/arucoRecordPosesRequest")
(setf (get stagehands_ros::arucoRecordPosesRequest :definition-)
      "---
")

(setf (get stagehands_ros::arucoRecordPosesResponse :md5sum-) "d41d8cd98f00b204e9800998ecf8427e")
(setf (get stagehands_ros::arucoRecordPosesResponse :datatype-) "stagehands_ros/arucoRecordPosesResponse")
(setf (get stagehands_ros::arucoRecordPosesResponse :definition-)
      "---
")



(provide :stagehands_ros/arucoRecordPoses "d41d8cd98f00b204e9800998ecf8427e")


