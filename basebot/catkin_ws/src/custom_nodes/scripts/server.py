from __future__ import print_function

from custom_nodes.srv import setTargetPose,setTargetPoseResponse
from custom_nodes.msg import robotCurrentPose
import rospy
import sys
import math
import tf

# Brings in the SimpleActionClient
import actionlib
# Brings in the .action file and messages used by the move base action
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal

def set_target_pose(req):
    # Create an action client called "move_base" with action definition file "MoveBaseAction"
    client = actionlib.SimpleActionClient('move_base',MoveBaseAction)
 
    # Waits until the action server has started up and started listening for goals.
    client.wait_for_server()

    # Creates a new goal with the MoveBaseGoal constructor
    goal = MoveBaseGoal()
    goal.target_pose.header.frame_id = "map"
    goal.target_pose.header.stamp = rospy.Time.now()
   
    goal.target_pose.pose.position.x = req.xPos
    goal.target_pose.pose.position.y = req.yPos
   
    goal.target_pose.pose.orientation.z = math.sin(req.thetaPos/2)
    goal.target_pose.pose.orientation.w = math.cos(req.thetaPos/2)

    # Sends the goal to the action server.
    client.send_goal(goal)
    # Waits for the server to finish performing the action.
    wait = client.wait_for_result()
    # If the result doesn't arrive, assume the Server is not available
    if not wait:
        rospy.logerr("Action server not available!")
        rospy.signal_shutdown("Action server not available!")
    else:
    # Result of executing the action
        return client.get_result()   

def publish_current_pose():
    # do stuff
    pub = rospy.Publisher('robot_current_pose', robotCurrentPose, queue_size = 10)
    listener = tf.TransformListener()

    rate = rospy.Rate(10)

    while not rospy.is_shutdown():
        try:
            (trans, rot) = listener.lookupTransform('/map', '/base_link', rospy.Time(0))

            # investigate whether this is in fact the correct format
            pose = robotCurrentPose()
            pose.xPos = trans[0]
            pose.yPos = trans[1]
            pose.rotationQuaternion = rot

            pub.publish(pose)
        except (tf.LookupException, tf.ConnectivityException, tf.ExtrapolationException):
            continue

        rate.sleep()

def server():
    rospy.init_node('robot_position_server')
    s = rospy.Service('set_target_pose', setTargetPose, set_target_pose)
    rospy.spin()

if __name__ == "main":
    server()

    try:
        talker()
    except rospy.ROSInterruptException:
        pass