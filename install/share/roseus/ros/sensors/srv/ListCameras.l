;; Auto-generated. Do not edit!


(when (boundp 'sensors::ListCameras)
  (if (not (find-package "SENSORS"))
    (make-package "SENSORS"))
  (shadow 'ListCameras (find-package "SENSORS")))
(unless (find-package "SENSORS::LISTCAMERAS")
  (make-package "SENSORS::LISTCAMERAS"))
(unless (find-package "SENSORS::LISTCAMERASREQUEST")
  (make-package "SENSORS::LISTCAMERASREQUEST"))
(unless (find-package "SENSORS::LISTCAMERASRESPONSE")
  (make-package "SENSORS::LISTCAMERASRESPONSE"))

(in-package "ROS")





(defclass sensors::ListCamerasRequest
  :super ros::object
  :slots ())

(defmethod sensors::ListCamerasRequest
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

(defclass sensors::ListCamerasResponse
  :super ros::object
  :slots (_cameras ))

(defmethod sensors::ListCamerasResponse
  (:init
   (&key
    ((:cameras __cameras) (let (r) (dotimes (i 0) (push "" r)) r))
    )
   (send-super :init)
   (setq _cameras __cameras)
   self)
  (:cameras
   (&optional __cameras)
   (if __cameras (setq _cameras __cameras)) _cameras)
  (:serialization-length
   ()
   (+
    ;; string[] _cameras
    (apply #'+ (mapcar #'(lambda (x) (+ 4 (length x))) _cameras)) 4
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; string[] _cameras
     (write-long (length _cameras) s)
     (dolist (elem _cameras)
       (write-long (length elem) s) (princ elem s)
       )
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; string[] _cameras
   (let (n)
     (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4)
     (setq _cameras (make-list n))
     (dotimes (i n)
     (let (n) (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4) (setf (elt _cameras i) (subseq buf ptr- (+ ptr- n))) (incf ptr- n))
     ))
   ;;
   self)
  )

(defclass sensors::ListCameras
  :super ros::object
  :slots ())

(setf (get sensors::ListCameras :md5sum-) "855b31192ab61744e7deb992d94db7ff")
(setf (get sensors::ListCameras :datatype-) "sensors/ListCameras")
(setf (get sensors::ListCameras :request) sensors::ListCamerasRequest)
(setf (get sensors::ListCameras :response) sensors::ListCamerasResponse)

(defmethod sensors::ListCamerasRequest
  (:response () (instance sensors::ListCamerasResponse :init)))

(setf (get sensors::ListCamerasRequest :md5sum-) "855b31192ab61744e7deb992d94db7ff")
(setf (get sensors::ListCamerasRequest :datatype-) "sensors/ListCamerasRequest")
(setf (get sensors::ListCamerasRequest :definition-)
      "---
string[]    cameras

")

(setf (get sensors::ListCamerasResponse :md5sum-) "855b31192ab61744e7deb992d94db7ff")
(setf (get sensors::ListCamerasResponse :datatype-) "sensors/ListCamerasResponse")
(setf (get sensors::ListCamerasResponse :definition-)
      "---
string[]    cameras

")



(provide :sensors/ListCameras "855b31192ab61744e7deb992d94db7ff")


