;; Auto-generated. Do not edit!


(when (boundp 'stagehands_custom_nodes::setTargetPose)
  (if (not (find-package "STAGEHANDS_CUSTOM_NODES"))
    (make-package "STAGEHANDS_CUSTOM_NODES"))
  (shadow 'setTargetPose (find-package "STAGEHANDS_CUSTOM_NODES")))
(unless (find-package "STAGEHANDS_CUSTOM_NODES::SETTARGETPOSE")
  (make-package "STAGEHANDS_CUSTOM_NODES::SETTARGETPOSE"))
(unless (find-package "STAGEHANDS_CUSTOM_NODES::SETTARGETPOSEREQUEST")
  (make-package "STAGEHANDS_CUSTOM_NODES::SETTARGETPOSEREQUEST"))
(unless (find-package "STAGEHANDS_CUSTOM_NODES::SETTARGETPOSERESPONSE")
  (make-package "STAGEHANDS_CUSTOM_NODES::SETTARGETPOSERESPONSE"))

(in-package "ROS")





(defclass stagehands_custom_nodes::setTargetPoseRequest
  :super ros::object
  :slots (_xPos _yPos _thetaPos ))

(defmethod stagehands_custom_nodes::setTargetPoseRequest
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

(defclass stagehands_custom_nodes::setTargetPoseResponse
  :super ros::object
  :slots (_response ))

(defmethod stagehands_custom_nodes::setTargetPoseResponse
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

(defclass stagehands_custom_nodes::setTargetPose
  :super ros::object
  :slots ())

(setf (get stagehands_custom_nodes::setTargetPose :md5sum-) "b2641e4b932d1b80a79d7568f7c58323")
(setf (get stagehands_custom_nodes::setTargetPose :datatype-) "stagehands_custom_nodes/setTargetPose")
(setf (get stagehands_custom_nodes::setTargetPose :request) stagehands_custom_nodes::setTargetPoseRequest)
(setf (get stagehands_custom_nodes::setTargetPose :response) stagehands_custom_nodes::setTargetPoseResponse)

(defmethod stagehands_custom_nodes::setTargetPoseRequest
  (:response () (instance stagehands_custom_nodes::setTargetPoseResponse :init)))

(setf (get stagehands_custom_nodes::setTargetPoseRequest :md5sum-) "b2641e4b932d1b80a79d7568f7c58323")
(setf (get stagehands_custom_nodes::setTargetPoseRequest :datatype-) "stagehands_custom_nodes/setTargetPoseRequest")
(setf (get stagehands_custom_nodes::setTargetPoseRequest :definition-)
      "float64 xPos
float64 yPos
float64 thetaPos
---
string response
")

(setf (get stagehands_custom_nodes::setTargetPoseResponse :md5sum-) "b2641e4b932d1b80a79d7568f7c58323")
(setf (get stagehands_custom_nodes::setTargetPoseResponse :datatype-) "stagehands_custom_nodes/setTargetPoseResponse")
(setf (get stagehands_custom_nodes::setTargetPoseResponse :definition-)
      "float64 xPos
float64 yPos
float64 thetaPos
---
string response
")



(provide :stagehands_custom_nodes/setTargetPose "b2641e4b932d1b80a79d7568f7c58323")


