import rospy
import os
import subprocess

class StagehandsManagementNode:
    
    def __init__(self):
        self._node_name = rospy.get_name()
        self._name = None
        self.get_name()
        rospy.loginfo("[%s] Initializing " %(self._node_name))

        # # Setup publishers
        # self._pub_mode = rospy.Publisher("~mode", String, queue_size=1)

        # # Setup subscribers
        # self._sub_mode = rospy.Subscriber("~mode", String, self.cbMode, queue_size=1)

        # # Setup services
        # self._srv_mode = rospy.Service("~mode", SetMode, self.srvMode)

        # # Setup parameters
        # self._mode = rospy.get_param("~mode", "pairing")

        # # Setup timers
        # self._timer = rospy.Timer(rospy.Duration(0.1), self.cbTimer) 
        rospy.loginfo("[%s] Launching bot: [%s]" %(self._node_name, self._name))
        rospy.loginfo("[%s] Initialized " %(self._node_name))

        self.start_pairing()

    def get_name(self):
        """
        Get the name of the bot
        """
        # Could be substituted with a ROS service call

        # Run "node --experimental-specifier-resolution=node --loader ts-node/esm /catkin_ws/src/stagehands-js/packages/utils/dist/getName.js" and cache the result
        if self._name is None:
            # Make it run in /catkin_ws/src/stagehands-js/packages/
            # Get original working directory
            original_wd = os.getcwd()
            os.chdir("/catkin_ws/src/stagehands-js/packages/")
            self._name = subprocess.check_output(["node", "--experimental-specifier-resolution=node", "--loader", "ts-node/esm", "/catkin_ws/src/stagehands-js/packages/utils/dist/getName.js"]).decode("utf-8").strip()
            # Restore original working directory
            os.chdir(original_wd)
            return self._name
        else:
            return self._name

    def start_pairing():
        


if __name__ == '__main__':
    rospy.init_node('stagehands_management_node', anonymous=False)
    stagehands_management_node = StagehandsManagementNode()
    rospy.spin()