import rospy
import geometry_msgs
import std_msgs
import actionlib
import math

class Client():
    def __init__(self):
        self.action_client = actionlib.SimpleActionClient("move_base/goal", geometry_msgs.msg.PoseStamped)

    def send_goal(self, xPos, yPos, theta):
        goalPos = geometry_msgs.msg.PoseStamped()

        # point = geometry_msgs.Point(x = xPos, y = yPos, z = 0)
        # quaternion = geometry_msgs.Quaternion(x = 0, y = 0, z = math.sin(theta/2), w = math.cos(theta/2))
        # header = std_msgs.Header(seq = 12, stamp = rospy.Time.now(), frame_id = "map")

        #goalPos.header.seq = 123445
        goalPos.header.stamp = rospy.Time.now()
        goalPos.header.frame_id = "map"

        goalPos.pose.position.x = xPos
        goalPos.pose.position.y = yPos
        goalPos.pose.position.z = 0

        goalPos.pose.orientation.x = 0.0
        goalPos.pose.orientation.y = 0.0
        goalPos.pose.orientation.z = math.sin(theta/2)
        goalPos.pose.orientation.w = math.cos(theta/2)

        # copied from the foxglove tutorial
        #rospy.loginfo('Starting at: {0}'.format(starting_num))
        rospy.loginfo('Waiting for server...')

        self.action_client.wait_for_server()

        # Returns future to goal handle; client runs feedback_callback after sending the goal
        self.send_goal_future = self.action_client.send_goal(goalPos, active_cb=self.goal_response_callback, feedback_cb=self.feedback_callback, done_cb = self.get_result_callback)

        rospy.loginfo("Goal sent!")

    # The next few functions are directly copied from the foxglove tutorial

    # Run when client accepts goal
    def goal_response_callback(self):
        rospy.loginfo('Goal accepted :)')

   # Run when client sends feedback
    def feedback_callback(self, feedback_msg):
        rospy.loginfo('Received feedback: {0}'.format(feedback_msg.current_num))

   # Run when client sends final result
    def get_result_callback(self, state, result):
        # Show log and exit node
        rospy.loginfo('Result: {0}'.format(result.is_finished))
        rospy.signal_shutdown("Shutting-down client node")

