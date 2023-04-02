import actionlib
import rospy
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal

class NavClient:
    def __init__(self):
        self.client = actionlib.SimpleActionClient('move_base', MoveBaseAction)
        self.client.wait_for_server()

    def setPose(self, xPos, yPos, rotationQuaternion):
        """
        Internal function for sending goal node to navigation stack
        """

        # Create a new goal
        goal = MoveBaseGoal()
        goal.target_pose.header.frame_id = "map"
        goal.target_pose.header.stamp = rospy.Time.now()
        pose = Pose(Point(xPos, yPos, 0.000), Quaternion(rotationQuaternion[0], rotationQuaternion[1], rotationQuaternion[2], rotationQuaternion[3]))
        goal.target_pose.pose = pose

        # Send goal
        rospy.loginfo("Moving to: ", goal)
        client.send_goal(goal)

        # Don't wait, because otherwise it would block new incoming messages

        # # Waits for the action_server to finish performing the action.
        # wait = client.wait_for_result()
        
        # # If the result doesn't arrive, assume the Server is not available
        # if not wait:
        #     rospy.logerr("Action action_server not available!")
        #     rospy.signal_shutdown("Action action_server not available!")