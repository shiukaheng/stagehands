#!/usr/bin/env python3
from __future__ import print_function

import rospy
import tf
import actionlib
import serial

from stagehands_ros.srv import setTargetPose,setTargetPoseResponse
from stagehands_ros.srv import dummyOrientationTest, dummyOrientationTestResponse
from stagehands_ros.srv import dummyLEDTest, dummyLEDTestResponse
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
    if not("AMA" in str(p.device).split("/")[1] or str(p.device).split("/")[1] != str(p.description).split("/")):
        arduino_port = p.device

# if mic module connected, establish connection
micModuleExists = True
try:
    ser = serial.Serial(arduino_port, 115200)
    print("Mic module connected at: " + arduino_port + ", communicating over serial")
except serial.SerialException:
    micModuleExists = False

def send_LED_colour(red, green, blue, animation, frequency):
    """
    This function is called when a request is made to the set_target_pose service.
    It sends signals to the LED strip of the robot.
    :param red: The red value of the LED colour.
    :param green: The green value of the LED colour.
    :param blue: The blue value of the LED colour.
    :param animation: The animation setting (flashing or constant).
    :param frequency: The frequency of the flashing animation in Hz."""

    ledColour = Color(red, green, blue)
    if (animation== "constant"):
        strip.light_all_leds(ledColour)
        # print('LED animation is constant')
        rospy.loginfo('LED animation is constant')
    elif (animation == "flashing"):
        strip.flashing_leds(ledColour, frequency)
        # print('flashing')
        rospy.loginfo('LED animation is flashing')
    # print(ledColour)
    rospy.loginfo(ledColour)

def send_mic_orientation(micHeight, micAngle):
    """
    This function is called when a request is made to the set_target_pose service.
    It sets the mic configuration of the robot: mic height and angle.
    :param micHeight: The height of the mic module in cm.
    :param micAngle: The angle of the mic module in degrees."""
    if micModuleExists:
        valid = False
        # while True:
        #     try:
        #         mic = ser.read_until().decode('utf-8').rstrip("\r\n").split(",")
        #         rospy.logwarn(mic)
        #         # ser.write(str(req.micHeight)+","+str(req.micAngle))
        #         ser.write(req.micHeightcommaAngle.encode('utf-8'))
        #         break
        #     except (ValueError, IndexError):
        #         pass
        while not valid:
            current_val_from_serial = ser.read_until().decode('utf-8').rstrip("\r\n")
            rospy.loginfo(current_val_from_serial)
            if current_val_from_serial not in "ZEROING":
                ser.write((str(micHeight)+","+str(micAngle)).encode('utf-8'))
                valid = True
                rospy.loginfo("Mic value sent correctly")
            else:
                rospy.logwarn("Mic is likely zeroing, waiting for it to finish")

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
    # working with dummy test message that directly takes the rgb values in a string separated by commas
    # colour = req.RGBValue.split[","]
    # send_LED_colour(int(colour[0]), int(colour[1]), int(colour[2]), "constant", -1)

    # for the actual intended service request type, it is this:
    # send_LED_colour(req.ledColour[0], req.ledColour[1], req.ledColour[2], req.ledAnimation, req.ledFrequency)

    # working with dummy test service that just directly takes the string format used by arduino
    mic = req.micHeightcommaAngle.split(",")
    send_mic_orientation(float(mic[0]), float(mic[1]))

    # for the actual intended service request type, it is this:
    # send_mic_orientation(req.micHeight, req.micAngle)

    # send_goal_pose_ros(req.xPos, req.yPos, req.rotationQuaternion)
    return dummyOrientationTestResponse("lol")

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
            
        except (tf.LookupException, tf.ConnectivityException, tf.ExtrapolationException, ValueError, IndexError):
            print('unable to publish updated pose')
            pub.publish(pose)
            continue

        rate.sleep()

def action_server():
    """
    This function creates a service action_server called set_target_pose.
    """
    # s = rospy.Service('set_target_pose', setTargetPose, set_target_pose)
    s = rospy.Service('set_target_pose', dummyOrientationTest, set_target_pose)
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

    ser.close()