
(cl:in-package :asdf)

(defsystem "stagehands_custom_nodes-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils )
  :components ((:file "_package")
    (:file "setTargetPose" :depends-on ("_package_setTargetPose"))
    (:file "_package_setTargetPose" :depends-on ("_package"))
  ))