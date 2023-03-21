
(cl:in-package :asdf)

(defsystem "stagehands_ros-msg"
  :depends-on (:roslisp-msg-protocol :roslisp-utils )
  :components ((:file "_package")
    (:file "robotCurrentPose" :depends-on ("_package_robotCurrentPose"))
    (:file "_package_robotCurrentPose" :depends-on ("_package"))
  ))