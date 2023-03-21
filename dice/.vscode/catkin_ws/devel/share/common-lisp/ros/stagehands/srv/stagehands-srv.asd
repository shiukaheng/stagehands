
(cl:in-package :asdf)

(defsystem "stagehands-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils )
  :components ((:file "_package")
    (:file "setTargetPose" :depends-on ("_package_setTargetPose"))
    (:file "_package_setTargetPose" :depends-on ("_package"))
  ))