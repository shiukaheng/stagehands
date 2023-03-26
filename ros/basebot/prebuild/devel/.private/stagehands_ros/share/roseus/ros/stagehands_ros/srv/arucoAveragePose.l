;; Auto-generated. Do not edit!


(when (boundp 'stagehands_ros::arucoAveragePose)
  (if (not (find-package "STAGEHANDS_ROS"))
    (make-package "STAGEHANDS_ROS"))
  (shadow 'arucoAveragePose (find-package "STAGEHANDS_ROS")))
(unless (find-package "STAGEHANDS_ROS::ARUCOAVERAGEPOSE")
  (make-package "STAGEHANDS_ROS::ARUCOAVERAGEPOSE"))
(unless (find-package "STAGEHANDS_ROS::ARUCOAVERAGEPOSEREQUEST")
  (make-package "STAGEHANDS_ROS::ARUCOAVERAGEPOSEREQUEST"))
(unless (find-package "STAGEHANDS_ROS::ARUCOAVERAGEPOSERESPONSE")
  (make-package "STAGEHANDS_ROS::ARUCOAVERAGEPOSERESPONSE"))

(in-package "ROS")





(defclass stagehands_ros::arucoAveragePoseRequest
  :super ros::object
  :slots ())

(defmethod stagehands_ros::arucoAveragePoseRequest
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

(defclass stagehands_ros::arucoAveragePoseResponse
  :super ros::object
  :slots ())

(defmethod stagehands_ros::arucoAveragePoseResponse
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

(defclass stagehands_ros::arucoAveragePose
  :super ros::object
  :slots ())

(setf (get stagehands_ros::arucoAveragePose :md5sum-) "d41d8cd98f00b204e9800998ecf8427e")
(setf (get stagehands_ros::arucoAveragePose :datatype-) "stagehands_ros/arucoAveragePose")
(setf (get stagehands_ros::arucoAveragePose :request) stagehands_ros::arucoAveragePoseRequest)
(setf (get stagehands_ros::arucoAveragePose :response) stagehands_ros::arucoAveragePoseResponse)

(defmethod stagehands_ros::arucoAveragePoseRequest
  (:response () (instance stagehands_ros::arucoAveragePoseResponse :init)))

(setf (get stagehands_ros::arucoAveragePoseRequest :md5sum-) "d41d8cd98f00b204e9800998ecf8427e")
(setf (get stagehands_ros::arucoAveragePoseRequest :datatype-) "stagehands_ros/arucoAveragePoseRequest")
(setf (get stagehands_ros::arucoAveragePoseRequest :definition-)
      "---
")

(setf (get stagehands_ros::arucoAveragePoseResponse :md5sum-) "d41d8cd98f00b204e9800998ecf8427e")
(setf (get stagehands_ros::arucoAveragePoseResponse :datatype-) "stagehands_ros/arucoAveragePoseResponse")
(setf (get stagehands_ros::arucoAveragePoseResponse :definition-)
      "---
")



(provide :stagehands_ros/arucoAveragePose "d41d8cd98f00b204e9800998ecf8427e")


