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
  :slots (_xPos _yPos _rotationQuaternion _micHeight _ledAnimation _ledRGBColour _flashFrequency ))

(defmethod stagehands_ros::setTargetPoseRequest
  (:init
   (&key
    ((:xPos __xPos) 0.0)
    ((:yPos __yPos) 0.0)
    ((:rotationQuaternion __rotationQuaternion) (make-array 0 :initial-element 0.0 :element-type :float))
    ((:micHeight __micHeight) 0.0)
    ((:ledAnimation __ledAnimation) "")
    ((:ledRGBColour __ledRGBColour) (make-array 0 :initial-element 0 :element-type :integer))
    ((:flashFrequency __flashFrequency) 0.0)
    )
   (send-super :init)
   (setq _xPos (float __xPos))
   (setq _yPos (float __yPos))
   (setq _rotationQuaternion __rotationQuaternion)
   (setq _micHeight (float __micHeight))
   (setq _ledAnimation (string __ledAnimation))
   (setq _ledRGBColour __ledRGBColour)
   (setq _flashFrequency (float __flashFrequency))
   self)
  (:xPos
   (&optional __xPos)
   (if __xPos (setq _xPos __xPos)) _xPos)
  (:yPos
   (&optional __yPos)
   (if __yPos (setq _yPos __yPos)) _yPos)
  (:rotationQuaternion
   (&optional __rotationQuaternion)
   (if __rotationQuaternion (setq _rotationQuaternion __rotationQuaternion)) _rotationQuaternion)
  (:micHeight
   (&optional __micHeight)
   (if __micHeight (setq _micHeight __micHeight)) _micHeight)
  (:ledAnimation
   (&optional __ledAnimation)
   (if __ledAnimation (setq _ledAnimation __ledAnimation)) _ledAnimation)
  (:ledRGBColour
   (&optional __ledRGBColour)
   (if __ledRGBColour (setq _ledRGBColour __ledRGBColour)) _ledRGBColour)
  (:flashFrequency
   (&optional __flashFrequency)
   (if __flashFrequency (setq _flashFrequency __flashFrequency)) _flashFrequency)
  (:serialization-length
   ()
   (+
    ;; float64 _xPos
    8
    ;; float64 _yPos
    8
    ;; float64[] _rotationQuaternion
    (* 8    (length _rotationQuaternion)) 4
    ;; float64 _micHeight
    8
    ;; string _ledAnimation
    4 (length _ledAnimation)
    ;; int64[] _ledRGBColour
    (* 8    (length _ledRGBColour)) 4
    ;; float64 _flashFrequency
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
     ;; float64[] _rotationQuaternion
     (write-long (length _rotationQuaternion) s)
     (dotimes (i (length _rotationQuaternion))
       (sys::poke (elt _rotationQuaternion i) (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
       )
     ;; float64 _micHeight
       (sys::poke _micHeight (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; string _ledAnimation
       (write-long (length _ledAnimation) s) (princ _ledAnimation s)
     ;; int64[] _ledRGBColour
     (write-long (length _ledRGBColour) s)
     (dotimes (i (length _ledRGBColour))
#+(or :alpha :irix6 :x86_64)
       (progn (sys::poke (elt _ledRGBColour i) (send s :buffer) (send s :count) :long) (incf (stream-count s) 8))
#-(or :alpha :irix6 :x86_64)
       (cond ((and (class (elt _ledRGBColour i)) (= (length ((elt _ledRGBColour i) . bv)) 2)) ;; bignum
              (write-long (ash (elt ((elt _ledRGBColour i) . bv) 0) 0) s)
              (write-long (ash (elt ((elt _ledRGBColour i) . bv) 1) -1) s))
             ((and (class (elt _ledRGBColour i)) (= (length ((elt _ledRGBColour i) . bv)) 1)) ;; big1
              (write-long (elt ((elt _ledRGBColour i) . bv) 0) s)
              (write-long (if (>= (elt _ledRGBColour i) 0) 0 #xffffffff) s))
             (t                                         ;; integer
              (write-long (elt _ledRGBColour i) s)(write-long (if (>= (elt _ledRGBColour i) 0) 0 #xffffffff) s)))
       )
     ;; float64 _flashFrequency
       (sys::poke _flashFrequency (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
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
   ;; float64 _micHeight
     (setq _micHeight (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; string _ledAnimation
     (let (n) (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4) (setq _ledAnimation (subseq buf ptr- (+ ptr- n))) (incf ptr- n))
   ;; int64[] _ledRGBColour
   (let (n)
     (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4)
     (setq _ledRGBColour (instantiate integer-vector n))
     (dotimes (i n)
#+(or :alpha :irix6 :x86_64)
      (setf (elt _ledRGBColour i) (prog1 (sys::peek buf ptr- :long) (incf ptr- 8)))
#-(or :alpha :irix6 :x86_64)
      (setf (elt _ledRGBColour i) (let ((b0 (prog1 (sys::peek buf ptr- :integer) (incf ptr- 4)))
                  (b1 (prog1 (sys::peek buf ptr- :integer) (incf ptr- 4))))
              (cond ((= b1 -1) b0)
                     ((and (= b1  0)
                           (<= lisp::most-negative-fixnum b0 lisp::most-positive-fixnum))
                      b0)
                    ((= b1  0) (make-instance bignum :size 1 :bv (integer-vector b0)))
                    (t (make-instance bignum :size 2 :bv (integer-vector b0 (ash b1 1)))))))
     ))
   ;; float64 _flashFrequency
     (setq _flashFrequency (sys::peek buf ptr- :double)) (incf ptr- 8)
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

(setf (get stagehands_ros::setTargetPose :md5sum-) "5c0e8c1ef239833f4aa2b438a827901b")
(setf (get stagehands_ros::setTargetPose :datatype-) "stagehands_ros/setTargetPose")
(setf (get stagehands_ros::setTargetPose :request) stagehands_ros::setTargetPoseRequest)
(setf (get stagehands_ros::setTargetPose :response) stagehands_ros::setTargetPoseResponse)

(defmethod stagehands_ros::setTargetPoseRequest
  (:response () (instance stagehands_ros::setTargetPoseResponse :init)))

(setf (get stagehands_ros::setTargetPoseRequest :md5sum-) "5c0e8c1ef239833f4aa2b438a827901b")
(setf (get stagehands_ros::setTargetPoseRequest :datatype-) "stagehands_ros/setTargetPoseRequest")
(setf (get stagehands_ros::setTargetPoseRequest :definition-)
      "float64 xPos
float64 yPos
float64[] rotationQuaternion
float64 micHeight
string ledAnimation
int64[] ledRGBColour
float64 flashFrequency
---
string response
")

(setf (get stagehands_ros::setTargetPoseResponse :md5sum-) "5c0e8c1ef239833f4aa2b438a827901b")
(setf (get stagehands_ros::setTargetPoseResponse :datatype-) "stagehands_ros/setTargetPoseResponse")
(setf (get stagehands_ros::setTargetPoseResponse :definition-)
      "float64 xPos
float64 yPos
float64[] rotationQuaternion
float64 micHeight
string ledAnimation
int64[] ledRGBColour
float64 flashFrequency
---
string response
")



(provide :stagehands_ros/setTargetPose "5c0e8c1ef239833f4aa2b438a827901b")


