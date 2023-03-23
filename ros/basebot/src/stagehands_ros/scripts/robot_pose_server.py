#!/usr/bin/env python3
from __future__ import print_function

import rospy
import tf
import actionlib
import serial
import serial.tools.list_ports
import time

from stagehands_ros.srv import setTargetPose,setTargetPoseResponse
from stagehands_ros.msg import robotCurrentPose
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal
from led_strip_handler import GroveWS2813RgbStrip
from rpi_ws281x import PixelStrip, Color

# LED strip configuration
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 10      # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)

from grove import helper
from grove.helper import helper
helper.root_check()

from grove.helper import SlotHelper
sh = SlotHelper(SlotHelper.PWM)
pin = sh.argv2pin(" [led-count]")

# import sys
count = 30
# if len(sys.argv) >= 3:
#     count = int(sys.argv[2])

strip = GroveWS2813RgbStrip(pin, count)

micModuleExists = True
try:
    ser = serial.Serial('/dev/ttyACM0', 115200)
except serial.SerialException:
    micModuleExists = False

def set_target_pose(req):
    # set the led strip to the colour and animation routine specified in the request
    (red, green, blue) = req.ledRGBColour
    ledColour = Color(red, green, blue)
    if (req.ledAnimation== "constant"):
        strip.light_all_leds(ledColour)
        print('constant')
    elif (req.ledAnimation == "flashing"):
        strip.flashing_leds(ledColour, req.flashFrequency)
        print('flashing')
        print()
    print(ledColour)

    # Create an action client called "move_base" with action definition file "MoveBaseAction"
    client = actionlib.SimpleActionClient('move_base',MoveBaseAction)
 
    # Waits until the action action_server has started up and started listening for goals.
    client.wait_for_server()

    # Creates a new goal with the MoveBaseGoal constructor
    goal = MoveBaseGoal()
    goal.target_pose.header.frame_id = "map"
    goal.target_pose.header.stamp = rospy.Time.now()
   
    goal.target_pose.pose.position.x = req.xPos
    goal.target_pose.pose.position.y = req.yPos
    goal.target_pose.pose.orientation = req.rotationQuaternion

    # probs not how this works but lol
    if micModuleExists: ser.write(req.micHeight)

    # Sends the goal to the action action_server.
    client.send_goal(goal)
    # Waits for the action_server to finish performing the action.
    wait = client.wait_for_result()
    # If the result doesn't arrive, assume the Server is not available
    if not wait:
        rospy.logerr("Action action_server not available!")
        rospy.signal_shutdown("Action action_server not available!")
    else:
    # Result of executing the action
        return setTargetPoseResponse(str(client.get_result()))

def publish_current_pose():
    # do stuff
    pub = rospy.Publisher('robot_current_pose', robotCurrentPose, queue_size = 10)
    listener = tf.TransformListener()

    rate = rospy.Rate(10)

    pose = robotCurrentPose()
    while not rospy.is_shutdown():
        try:
            (trans, rot) = listener.lookupTransform('/map', '/base_link', rospy.Time(0))

            pose.xPos = trans[0]
            pose.yPos = trans[1]
            pose.rotationQuaternion = rot

            # again, probs not how this works but lol, lmao, rofl even
            if (micModuleExists): pose.currentMicHeight = float(ser.read_until().decode('utf-8').rstrip("\r\n"))
            else: pose.currentMicHeight = -1
            pub.publish(pose)

            print('pose:')
            print(pose)
            
        except (tf.LookupException, tf.ConnectivityException, tf.ExtrapolationException, ValueError):
            print('unable to publish updated pose')
            pub.publish(pose)
            continue

        rate.sleep()

def action_server():
    s = rospy.Service('set_target_pose', setTargetPose, set_target_pose)
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

    ser.close()