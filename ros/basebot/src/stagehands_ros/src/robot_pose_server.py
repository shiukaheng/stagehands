#!/usr/bin/env python
from __future__ import print_function

import rospy
import tf
import actionlib
import serial

from stagehands_ros.srv import setTargetPose,setTargetPoseResponse
from stagehands_ros.msg import robotCurrentPose, ledData, micModuleData
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal
from geometry_msgs.msg import Pose, Point, Quaternion

def send_goal_pose_ros(xPos, yPos, rotationQuaternion):
    """
    This function is called when a request is made to the set_target_pose service.
    It sends a goal pose to the ROS navigation stack.
    :param xPos: The x position of the goal pose.
    :param yPos: The y position of the goal pose.
    :param rotationQuaternion: The rotation of the goal pose as a quaternion."""

    # Create an action client called "move_base" with action definition file "MoveBaseAction"
    client = actionlib.SimpleActionClient('move_base',MoveBaseAction)
 
    # Waits until the action action_server has started up and started listening for goals.
    client.wait_for_server()

    # Creates a new goal with the MoveBaseGoal constructor
    goal = MoveBaseGoal()
    goal.target_pose.header.frame_id = "map"
    goal.target_pose.header.stamp = rospy.Time.now()
    # log goal to ros console
    rospy.loginfo(goal)
    
    pose = Pose(Point(xPos, yPos, 0.000), Quaternion(rotationQuaternion[0], rotationQuaternion[1], rotationQuaternion[2], rotationQuaternion[3]))
    goal.target_pose.pose = pose

    # Sends the goal to the action action_server.
    client.send_goal(goal)
    # Waits for the action_server to finish performing the action.
    wait = client.wait_for_result()
    # If the result doesn't arrive, assume the Server is not available
    if not wait:
        rospy.logerr("Action action_server not available!")
        rospy.signal_shutdown("Action action_server not available!")
    # else:
    # # Result of executing the action
    #     # return setTargetPoseResponse(str(client.get_result()))
    #     return dummyOrientationTestResponse(str(client.get_result()))

def set_target_pose(req):
    """
    This function is called when a request is made to the set_target_pose service.
    It sets the target pose of the robot to the pose specified in the request (including pose, mic height and LED colour).
    :param req: The request message containing the target pose, mic height and LED colour.
    :return: A response message confirming that the target pose has been set.
    """
    ledMsg = ledData()
    ledMsg.red = req.ledRGBColour[0]
    ledMsg.green = req.ledRGBColour[1]
    ledMsg.blue = req.ledRGBColour[2]
    ledMsg.flashFrequency = req.flashFrequency
    ledMsg.ledAnimation = req.ledAnimation
    rospy.Publisher('/led_data', ledData, queue_size = 10).publish(ledMsg)

    micMsg = micModuleData()
    micMsg.micHeight = req.micHeight
    micMsg.micOrientation = req.micOrientation
    rospy.Publisher('/mic_module_data', micModuleData, queue_size = 10).publish(micMsg)

    send_goal_pose_ros(req.xPos, req.yPos, req.rotationQuaternion)

    return setTargetPoseResponse("ewrhujoi")

def publish_current_pose():
    """
    This function publishes the current pose of the robot to the robot_current_pose topic.
    """
    # do stuff
    pub = rospy.Publisher('robot_current_pose', robotCurrentPose, queue_size = 10)
    listener = tf.TransformListener()

    rate = rospy.Rate(10)

    pose = robotCurrentPose()
    while not rospy.is_shutdown():
        try:
            # (trans, rot) = listener.lookupTransform('/map', '/base_link', rospy.Time(0))

            # pose.xPos = trans[0]
            # pose.yPos = trans[1]
            # pose.rotationQuaternion = rot

            # again, probs not how this works but lol, lmao, rofl even
            # if (micModuleExists): 
            #     (height,angle) = micModule.status
            #     pose.currentMicHeight = height
            #     pose.currentMicAngle = angle
            # else: 
            #     pose.currentMicHeight = -1
            #     pose.currentMicAngle = -1
            # pub.publish(pose)

            print('pose:')
            print(pose)
            
        except (tf.LookupException, tf.ConnectivityException, tf.ExtrapolationException, ValueError, IndexError):
            print('unable to publish updated pose')
            pub.publish(pose)
            continue

        rate.sleep()

def action_server():
    """
    This function creates a service action_server called set_target_pose.
    """
    s = rospy.Service('set_target_pose', setTargetPose, set_target_pose)
    # s = rospy.Service('set_target_pose', dummyOrientationTest, set_target_pose)
    # s = rospy.Service('set_target_pose', dummyLEDTest, set_target_pose)
    print('action action_server running')

if __name__ == '__main__':
    print('starting')
    rospy.init_node('robot_position_server')
    print('node running')
    action_server()

    try:
        publish_current_pose()
    except rospy.ROSInterruptException:
        pass

    rospy.spin()

    micModule.stopSerialRead()