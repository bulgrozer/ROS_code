
(cl:in-package :asdf)

(defsystem "sensors-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils )
  :components ((:file "_package")
    (:file "ListCameras" :depends-on ("_package_ListCameras"))
    (:file "_package_ListCameras" :depends-on ("_package"))
  ))