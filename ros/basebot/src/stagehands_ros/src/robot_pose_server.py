#!/usr/bin/env python3
from __future__ import print_function

import rospy
import tf
import actionlib
import serial

from stagehands_ros.srv import setTargetPose,setTargetPoseResponse
from stagehands_ros.msg import robotCurrentPose
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal
from geometry_msgs.msg import Pose, Point, Quaternion
# from led_strip_handler import GroveWS2813RgbStrip
from rpi_ws281x import PixelStrip, Color
import serial.tools.list_ports

# LED strip configuration
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 10      # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)

# from grove import helper
# from grove.helper import helper
# helper.root_check()

# from grove.helper import SlotHelper
# sh = SlotHelper(SlotHelper.PWM)
# pin = sh.argv2pin(" [led-count]")

# # import sys
# count = 30
# # if len(sys.argv) >= 3:
# #     count = int(sys.argv[2])

# strip = GroveWS2813RgbStrip(pin, count)

# attempt to detect arduino port
arduino_port = "/dev/ttyACM1" # safe? default?? value?????
for p in list(serial.tools.list_ports.comports()):
    if not("AMA" in str(p.device).split("/")[1] or str(p.device).split("/")[1] != str(p.description).split("/")[1]):
        arduino_port = p.device

# if mic module connected, establish connection
micModuleExists = True
try:
    ser = serial.Serial(arduino_port, 115200)
    print("Mic module connected at: " + arduino_port)
except serial.SerialException:
    micModuleExists = False

def set_target_pose(req):
    """
    This function is called when a request is made to the set_target_pose service.
    It sets the target pose of the robot to the pose specified in the request (including pose, mic height and LED colour).
    :param req: The request message containing the target pose, mic height and LED colour.
    :return: A response message confirming that the target pose has been set.
    """
    # set the led strip to the colour and animation routine specified in the request
    (red, green, blue) = req.ledRGBColour
    ledColour = Color(red, green, blue)
    if (req.ledAnimation== "constant"):
        # strip.light_all_leds(ledColour)
        # print('LED animation is constant')
        rospy.loginfo('LED animation is constant')
    elif (req.ledAnimation == "flashing"):
        # strip.flashing_leds(ledColour, req.flashFrequency)
        # print('flashing')
        rospy.loginfo('LED animation is flashing')
    # print(ledColour)
    rospy.loginfo(ledColour)

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
    
    pose = Pose(Point(req.xPos, req.yPos, 0.000), Quaternion(req.rotationQuaternion[0], req.rotationQuaternion[1], req.rotationQuaternion[2], req.rotationQuaternion[3]))
    goal.target_pose.pose = pose

    # probs not how this works but lol
    if micModuleExists:
        try:
            mic = ser.read_until().decode('utf-8').rstrip("\r\n").split(",")
            x = float(mic[0])
            y = float(mic[1])
            ser.write(str(req.micHeight)+","+str(req.micAngle))
        except ValueError:
            pass

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
            if (micModuleExists): 
                mic = ser.read_until().decode('utf-8').rstrip("\r\n").split(",")
                pose.currentMicHeight = float(mic[0])
                pose.currentMicAngle = float(mic[1])

            else: 
                pose.currentMicHeight = -1
                pose.currentMicAngle = -1
            pub.publish(pose)

            print('pose:')
            print(pose)
            
        except (tf.LookupException, tf.ConnectivityException, tf.ExtrapolationException, ValueError):
            print('unable to publish updated pose')
            pub.publish(pose)
            continue

        rate.sleep()

def action_server():
    """
    This function creates a service action_server called set_target_pose.
    """
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

    # ser.close()