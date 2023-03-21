;; Auto-generated. Do not edit!


(when (boundp 'stagehands_ros::setTargetPose)
  (if (not (find-package "STAGEHANDS_ROS"))
    (make-package "STAGEHANDS_ROS"))
  (shadow 'setTargetPose (find-package "STAGEHANDS_ROS")))
(unless (find-package "STAGEHANDS_ROS::SETTARGETPOSE")
  (make-package "STAGEHANDS_ROS::SETTARGETPOSE"))
(unless (find-package "STAGEHANDS_ROS::SETTARGETPOSEREQUEST")
  (make-package "STAGEHANDS_ROS::SETTARGETPOSEREQUEST"))
(unless (find-package "STAGEHANDS_ROS::SETTARGETPOSERESPONSE")
  (make-package "STAGEHANDS_ROS::SETTARGETPOSERESPONSE"))

(in-package "ROS")





(defclass stagehands_ros::setTargetPoseRequest
  :super ros::object
  :slots (_xPos _yPos _thetaPos ))

(defmethod stagehands_ros::setTargetPoseRequest
  (:init
   (&key
    ((:xPos __xPos) 0.0)
    ((:yPos __yPos) 0.0)
    ((:thetaPos __thetaPos) 0.0)
    )
   (send-super :init)
   (setq _xPos (float __xPos))
   (setq _yPos (float __yPos))
   (setq _thetaPos (float __thetaPos))
   self)
  (:xPos
   (&optional __xPos)
   (if __xPos (setq _xPos __xPos)) _xPos)
  (:yPos
   (&optional __yPos)
   (if __yPos (setq _yPos __yPos)) _yPos)
  (:thetaPos
   (&optional __thetaPos)
   (if __thetaPos (setq _thetaPos __thetaPos)) _thetaPos)
  (:serialization-length
   ()
   (+
    ;; float64 _xPos
    8
    ;; float64 _yPos
    8
    ;; float64 _thetaPos
    8
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; float64 _xPos
       (sys::poke _xPos (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _yPos
       (sys::poke _yPos (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _thetaPos
       (sys::poke _thetaPos (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; float64 _xPos
     (setq _xPos (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _yPos
     (setq _yPos (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _thetaPos
     (setq _thetaPos (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;;
   self)
  )

(defclass stagehands_ros::setTargetPoseResponse
  :super ros::object
  :slots (_response ))

(defmethod stagehands_ros::setTargetPoseResponse
  (:init
   (&key
    ((:response __response) "")
    )
   (send-super :init)
   (setq _response (string __response))
   self)
  (:response
   (&optional __response)
   (if __response (setq _response __response)) _response)
  (:serialization-length
   ()
   (+
    ;; string _response
    4 (length _response)
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; string _response
       (write-long (length _response) s) (princ _response s)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; string _response
     (let (n) (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4) (setq _response (subseq buf ptr- (+ ptr- n))) (incf ptr- n))
   ;;
   self)
  )

(defclass stagehands_ros::setTargetPose
  :super ros::object
  :slots ())

(setf (get stagehands_ros::setTargetPose :md5sum-) "b2641e4b932d1b80a79d7568f7c58323")
(setf (get stagehands_ros::setTargetPose :datatype-) "stagehands_ros/setTargetPose")
(setf (get stagehands_ros::setTargetPose :request) stagehands_ros::setTargetPoseRequest)
(setf (get stagehands_ros::setTargetPose :response) stagehands_ros::setTargetPoseResponse)

(defmethod stagehands_ros::setTargetPoseRequest
  (:response () (instance stagehands_ros::setTargetPoseResponse :init)))

(setf (get stagehands_ros::setTargetPoseRequest :md5sum-) "b2641e4b932d1b80a79d7568f7c58323")
(setf (get stagehands_ros::setTargetPoseRequest :datatype-) "stagehands_ros/setTargetPoseRequest")
(setf (get stagehands_ros::setTargetPoseRequest :definition-)
      "float64 xPos
float64 yPos
float64 thetaPos
---
string response
")

(setf (get stagehands_ros::setTargetPoseResponse :md5sum-) "b2641e4b932d1b80a79d7568f7c58323")
(setf (get stagehands_ros::setTargetPoseResponse :datatype-) "stagehands_ros/setTargetPoseResponse")
(setf (get stagehands_ros::setTargetPoseResponse :definition-)
      "float64 xPos
float64 yPos
float64 thetaPos
---
string response
")



(provide :stagehands_ros/setTargetPose "b2641e4b932d1b80a79d7568f7c58323")


