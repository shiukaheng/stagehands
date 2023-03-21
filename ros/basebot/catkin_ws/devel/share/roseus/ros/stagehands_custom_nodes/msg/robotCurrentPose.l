;; Auto-generated. Do not edit!


(when (boundp 'stagehands_custom_nodes::robotCurrentPose)
  (if (not (find-package "STAGEHANDS_CUSTOM_NODES"))
    (make-package "STAGEHANDS_CUSTOM_NODES"))
  (shadow 'robotCurrentPose (find-package "STAGEHANDS_CUSTOM_NODES")))
(unless (find-package "STAGEHANDS_CUSTOM_NODES::ROBOTCURRENTPOSE")
  (make-package "STAGEHANDS_CUSTOM_NODES::ROBOTCURRENTPOSE"))

(in-package "ROS")
;;//! \htmlinclude robotCurrentPose.msg.html


(defclass stagehands_custom_nodes::robotCurrentPose
  :super ros::object
  :slots (_robot_id _xPos _yPos _rotationQuaternion ))

(defmethod stagehands_custom_nodes::robotCurrentPose
  (:init
   (&key
    ((:robot_id __robot_id) "")
    ((:xPos __xPos) 0.0)
    ((:yPos __yPos) 0.0)
    ((:rotationQuaternion __rotationQuaternion) (make-array 0 :initial-element 0.0 :element-type :float))
    )
   (send-super :init)
   (setq _robot_id (string __robot_id))
   (setq _xPos (float __xPos))
   (setq _yPos (float __yPos))
   (setq _rotationQuaternion __rotationQuaternion)
   self)
  (:robot_id
   (&optional __robot_id)
   (if __robot_id (setq _robot_id __robot_id)) _robot_id)
  (:xPos
   (&optional __xPos)
   (if __xPos (setq _xPos __xPos)) _xPos)
  (:yPos
   (&optional __yPos)
   (if __yPos (setq _yPos __yPos)) _yPos)
  (:rotationQuaternion
   (&optional __rotationQuaternion)
   (if __rotationQuaternion (setq _rotationQuaternion __rotationQuaternion)) _rotationQuaternion)
  (:serialization-length
   ()
   (+
    ;; string _robot_id
    4 (length _robot_id)
    ;; float64 _xPos
    8
    ;; float64 _yPos
    8
    ;; float64[] _rotationQuaternion
    (* 8    (length _rotationQuaternion)) 4
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; string _robot_id
       (write-long (length _robot_id) s) (princ _robot_id s)
     ;; float64 _xPos
       (sys::poke _xPos (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _yPos
       (sys::poke _yPos (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64[] _rotationQuaternion
     (write-long (length _rotationQuaternion) s)
     (dotimes (i (length _rotationQuaternion))
       (sys::poke (elt _rotationQuaternion i) (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
       )
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; string _robot_id
     (let (n) (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4) (setq _robot_id (subseq buf ptr- (+ ptr- n))) (incf ptr- n))
   ;; float64 _xPos
     (setq _xPos (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _yPos
     (setq _yPos (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64[] _rotationQuaternion
   (let (n)
     (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4)
     (setq _rotationQuaternion (instantiate float-vector n))
     (dotimes (i n)
     (setf (elt _rotationQuaternion i) (sys::peek buf ptr- :double)) (incf ptr- 8)
     ))
   ;;
   self)
  )

(setf (get stagehands_custom_nodes::robotCurrentPose :md5sum-) "d025d245ac73544fde77dab78b28adba")
(setf (get stagehands_custom_nodes::robotCurrentPose :datatype-) "stagehands_custom_nodes/robotCurrentPose")
(setf (get stagehands_custom_nodes::robotCurrentPose :definition-)
      "string robot_id
float64 xPos
float64 yPos
float64[] rotationQuaternion
")



(provide :stagehands_custom_nodes/robotCurrentPose "d025d245ac73544fde77dab78b28adba")

