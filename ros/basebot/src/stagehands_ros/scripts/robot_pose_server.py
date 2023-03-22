#!/usr/bin/env python3
from __future__ import print_function

import rospy
import math
import tf
import actionlib
import serial
import serial.tools.list_ports

from stagehands_ros.srv import setTargetPose,setTargetPoseResponse
from stagehands_ros.msg import robotCurrentPose
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal

# def set_serial_port():
#     available_ports = [p.device for p in list(serial.tools.list_ports.comports())]# if 'Arduino' in p.description]
#     print(list(serial.tools.list_ports.comports()))
#     # global ser
#     # ser = serial.Serial(available_ports[0], 115200)
#     # print(available_ports[0])
ser = serial.Serial('/dev/ttyACM0', 115200)

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

    # probs not how this works but lol
    ser.write(req.micHeight)

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
        return setTargetPoseResponse(str(client.get_result()))

def publish_current_pose():
    # do stuff
    pub = rospy.Publisher('robot_current_pose', robotCurrentPose, queue_size = 10)
    listener = tf.TransformListener()

    rate = rospy.Rate(10)
    print('publishuh publishin')

    while not rospy.is_shutdown():
        try:
            (trans, rot) = listener.lookupTransform('/map', '/base_link', rospy.Time(0))

            # investigate whether this is in fact the correct format
            pose = robotCurrentPose()
            pose.xPos = trans[0]
            pose.yPos = trans[1]
            pose.rotationQuaternion = rot

            # again, probs not how this works but lol, lmao, rofl even
            pose.currentMicHeight = ser.read()

            pub.publish(pose)

            #print('pose:')
            #print(pose)
            
        except (tf.LookupException, tf.ConnectivityException, tf.ExtrapolationException):
            #print('unable to publish pose')
            continue

        rate.sleep()

def server():
    s = rospy.Service('set_target_pose', setTargetPose, set_target_pose)
    print('action server running')

if __name__ == '__main__':
    print('starting')
    # set_serial_port()
    rospy.init_node('robot_position_server')
    print('node running')
    server()

    try:
        publish_current_pose()
    except rospy.ROSInterruptException:
        pass

    rospy.spin()

    # ser.close()