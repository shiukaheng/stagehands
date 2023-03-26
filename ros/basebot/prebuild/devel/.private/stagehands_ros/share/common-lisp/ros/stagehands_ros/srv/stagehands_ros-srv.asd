
(cl:in-package :asdf)

(defsystem "stagehands_ros-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils )
  :components ((:file "_package")
    (:file "arucoAveragePose" :depends-on ("_package_arucoAveragePose"))
    (:file "_package_arucoAveragePose" :depends-on ("_package"))
    (:file "arucoRecordPoses" :depends-on ("_package_arucoRecordPoses"))
    (:file "_package_arucoRecordPoses" :depends-on ("_package"))
    (:file "setTargetPose" :depends-on ("_package_setTargetPose"))
    (:file "_package_setTargetPose" :depends-on ("_package"))
  ))