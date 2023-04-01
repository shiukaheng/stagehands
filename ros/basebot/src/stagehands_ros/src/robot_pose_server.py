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

import serial
import time
import threading

__all__ = ['GroveWS2813RgbStrip', 'PixelStrip', 'Color']

import time
from rpi_ws281x import PixelStrip, Color

# LED strip configuration
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 10      # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)

class GroveWS2813RgbStrip(PixelStrip):
    '''
    Wrapper Class for Grove - WS2813 RGB LED Strip Waterproof - XXX LED/m
    Args:
        pin(int)  : 12, 18 for RPi
        count(int): strip LEDs count
        brightness(int): optional, set to 0 for darkest and 255 for brightest, default 255
    '''
    def __init__(self, pin, count, brightness = None):
        ws2812_pins = { 12:0, 13:1, 18:0, 19:1}
        if not pin in ws2812_pins.keys():
            print("OneLedTypedWs2812: pin {} could not used with WS2812".format(pin))
            return
        channel = ws2812_pins.get(pin)

        if brightness is None:
            brightness = LED_BRIGHTNESS

        # Create PixelStrip object with appropriate configuration.
        super(GroveWS2813RgbStrip, self).__init__(
            count,
            pin,
            LED_FREQ_HZ,
            LED_DMA,
            LED_INVERT,
            brightness,
            channel
        )

        # Intialize the library (must be called once before other functions).
        self.begin()

    def setColor(self, color):
        for i in range(self.numPixels()):
            self.setPixelColor(i, Color(0,0,0))
        for u in ([num for num in range(6, 14)] + [num for num in range(23, 30)]):
            self.setPixelColor(u, color)
        self.show()

class MicModule:
    def __init__(self, serialPort, baudRate, onMicData=None):
        self.serialPort = serialPort
        self.baudRate = baudRate
        self.connected = False
        self.serial = None
        self.serialThread = None
        self.onMicData = onMicData
        self.status = None

    def start(self):
        # time.sleep(2)
        self.connected = True
        ramp_up_duration = 20
        iterator = list(range(0, 50))
        self.serial = serial.Serial(self.serialPort, self.baudRate)
        time.sleep(2)
        self.startSerialRead()
        i = 0
        while True:
            self.serial.write((str(i*10)+","+str(i*10)+"\n").encode())
            i = (i + 1) % 6
            time.sleep(3)

    # Start multithread: https://stackoverflow.com/questions/17553543/pyserial-non-blocking-read-loop
    def startSerialRead(self):
        # Start _serialRead using new thread
        self.serialThread = threading.Thread(target=self._serialRead)
        self.serialThread.daemon = True
        self.serialThread.start()

    # Loop that continuously reads serial, and calls callback function self.serialInputHandler whenever a newline is received, and interpret as number
    def _serialRead(self):
        while self.connected == True:
            self.serialInputHandler(self.serial.readline())

    def stopSerialRead(self):
        self.connected = False
        self.serialThread.join() 

    def write(self,data):
        self.serial = serial.Serial(self.serialPort, self.baudRate)
        time.sleep(2)
        self.serial.write((data+'\n').encode())

    # The callback funciton
    def serialInputHandler(self, data):
        # Check if the data is castable to float
        try:
            raw = data.decode()
            processed = raw.strip()
            if processed == "ZEROING":
                self.onMicData(processed)
                self.status = processed
            split = processed.split(",")
            for x in split:
                if (len(split) == 2 ):
                    try:
                        height, angle = split
                        height = float(height)
                        angle = float(angle)
                        # print(height, angle)
                        self.onMicData((height,angle))
                        self.status = (height,angle)
                    except:
                        pass
            
        except ValueError:
            # If not, do nothing
            pass

arduino_port = "/dev/ttyACM0" # safe? default?? value?????

led_strip = GroveWS2813RgbStrip(12, 30)

micModuleExists = True
try:
    # ser = serial.Serial(arduino_port, 115200)
    micModule = MicModule(arduino_port, 115200)
    micModule.start()
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
        led_strip.setColor(ledColour)
        rospy.loginfo('LED animation is constant')
    elif (animation == "flashing"):
        led_strip.setColor(ledColour) # todo: implement flashing
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
        # ser = serial.Serial(arduino_port, 115200)
        # valid = False
        # # while True:
        # #     try:
        # #         mic = ser.read_until().decode('utf-8').rstrip("\r\n").split(",")
        # #         rospy.logwarn(mic)
        # #         # ser.write(str(req.micHeight)+","+str(req.micAngle))
        # #         ser.write(req.micHeightcommaAngle.encode('utf-8'))
        # #         break
        # #     except (ValueError, IndexError):
        # #         pass
        # while not valid:
        #     current_val_from_serial = ser.read_until().decode('utf-8').rstrip("\r\n")
        #     rospy.loginfo(current_val_from_serial)
        #     if current_val_from_serial not in "ZEROING":
        #         # reopen port every single time you want to send a value
        #         ser = serial.Serial(arduino_port, 115200)
        #         ser.write((str(micHeight)+","+str(micAngle)).encode())
        #         ser.flush()
        #         valid = True
        #         rospy.loginfo("Mic value sent correctly")
        #     else:
        #         rospy.logwarn("Mic is likely zeroing, waiting for it to finish")
        micModule.write(str(micHeight)+","+str(micAngle))

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
    colour = req.RGBValue.split[","]
    send_LED_colour(int(colour[0]), int(colour[1]), int(colour[2]), "constant", -1)

    # for the actual intended service request type, it is this:
    # send_LED_colour(req.ledColour[0], req.ledColour[1], req.ledColour[2], req.ledAnimation, req.ledFrequency)

    # working with dummy test service that just directly takes the string format used by arduino
    # mic = req.micHeightcommaAngle.split(",")
    # send_mic_orientation(float(mic[0]), float(mic[1]))

    # for the actual intended service request type, it is this:
    # send_mic_orientation(req.micHeight, req.micAngle)

    # send_goal_pose_ros(req.xPos, req.yPos, req.rotationQuaternion)
    return dummyLEDTestResponse("lol")

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
                (height,angle) = micModule.status
                pose.currentMicHeight = height
                pose.currentMicAngle = angle
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
    # s = rospy.Service('set_target_pose', dummyOrientationTest, set_target_pose)
    s = rospy.Service('set_target_pose', dummyLEDTest, set_target_pose)
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