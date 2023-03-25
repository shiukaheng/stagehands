
class StagehandsManagementNode:
    """
    This is meant to be a ROS node for managing switching between different
    modes in the StageHands stage automation robot (based on turtlebots):
    - Pairing mode
    - Mapping mode
    - Localization mode
    - Navigation mode
    """
    
        def __init__(self):
            self._node_name = rospy.get_name()
            rospy.loginfo("[%s] Initializing " %(self._node_name))
    
            # Setup publishers
            self._pub_mode = rospy.Publisher("~mode", String, queue_size=1)
    
            # Setup subscribers
            self._sub_mode = rospy.Subscriber("~mode", String, self.cbMode, queue_size=1)
    
            # Setup services
            self._srv_mode = rospy.Service("~mode", SetMode, self.srvMode)
    
            # Setup parameters
            self._mode = rospy.get_param("~mode", "pairing")
    
            # Setup timers
            self._timer = rospy.Timer(rospy.Duration(0.1), self.cbTimer)
    
            rospy.loginfo("[%s] Initialized " %(self._node_name))
    
        def cbMode(self, msg_mode):
            self._mode = msg_mode.data
    
        def srvMode(self, req_mode):
            self._mode = req_mode.mode
            return SetModeResponse(True)
    
        def cbTimer(self, event):
            msg_mode = String()
            msg_mode.data = self._mode
            self._pub_mode.publish(msg_mode)