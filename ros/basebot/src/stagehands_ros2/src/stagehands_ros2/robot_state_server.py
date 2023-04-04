import rospy
import tf
import threading

from stagehands_ros2.msg import StagehandsCommandState, StagehandsFeedbackState
from geometry_msgs.msg import Pose, Point, Quaternion

from stagehands_ros2.led import *
from stagehands_ros2.motor import *
from stagehands_ros2.nav_client import *

class RobotStateServer:

    def __init__(self, dry_run = False):
        # Initialize node
        rospy.loginfo("Initializing robot state server")
        rospy.init_node('robot_state_server')

        # Initialize publishers
        rospy.loginfo("Initializing publishers")
        self.feedbackPublisher = rospy.Publisher('stagehands_feedback_state', StagehandsFeedbackState, queue_size = 10)
        self.transformListener = tf.TransformListener()
        self.dry_run = dry_run

        if dry_run:
            rospy.loginfo("Running in dry run mode")
        else:
            # Initialize mic module client
            rospy.loginfo("Initializing mic module client")
            self.micModuleClient = MicModule("/dev/ttyACM0", 115200)
            self.micModuleClient.start()

            # Initialize LED client
            rospy.loginfo("Initializing LED client")
            self.ledClient = LED()
            self.ledClient.start()

            # Initialize navigation client
            # rospy.loginfo("Initializing navigation client")
            # self.navClient = NavClient()

        # Initialize state subscriber
        rospy.loginfo("Initializing state subscriber")
        rospy.Subscriber("stagehands_command_state", StagehandsCommandState, self.onReceiveState)

    def startPublishState(self):
        """
        Deals with publishing outgoing state messages to the interface

        Publishes:
        - Live navigation data (where the bot is in the world)
        - Live mic module data (sensed height and angle)
        """

        rospy.loginfo("Starting state publisher")

        # Create a clock / loop
        rate = rospy.Rate(30)

        while not rospy.is_shutdown():
            try:
                # Create a message to send
                feedback = StagehandsFeedbackState()

                if not self.dry_run:

                    # Get the transformation between map and baselink (where the bot is in the world)
                    # (t, r) = self.transformListener.lookupTransform('/map', '/base_link', rospy.Time(0))

                    # Fill in the message with the data
                    # feedback.xPos = t[0]
                    # feedback.yPos = t[1]
                    # feedback.rotationQuaternion = r

                    status = self.micModuleClient.lastReadMsg # Read message
                    if not ((status is None) or (status == "ZEROING")): # Only publish if there is data
                        (height, angle) = self.micModuleClient.lastReadMsg
                        feedback.micHeight = height
                        feedback.micAngle = angle

                        # Publish pose
                        self.feedbackPublisher.publish(feedback)
                else:
                    # Publish pose
                    self.feedbackPublisher.publish(feedback)

                # Sleep
                rate.sleep()

            except (tf.LookupException, tf.ConnectivityException, tf.ExtrapolationException, ValueError, IndexError) as e:
                rospy.logerr("Can't publish message for robot state server: ", e)
                continue

    def onReceiveState(self, state):
        """
        Deals with executing incoming state messages from the interface

        Receives:
        - LED state -> set LED colour and flashing
        - Mic module state -> set mic height and angle
        - Navigation state -> set target pose
        """
        rospy.loginfo("Received state: " + str(state))

        # Recieves a stagehandsState msg (identical to original request, just with unused return string removed)
        if self.dry_run:
            return
        print(type(state.ledRGBColour), state.ledRGBColour)
        colour = eval(state.ledRGBColour)
        self.ledClient.setLEDState(LEDState((colour[0], colour[1], colour[2]), state.isFlashing, state.flashFrequency))
        self.micModuleClient.setState(state.micHeight, state.micAngle)

    def start(self):
        rospy.loginfo("Starting robot state server")
        # Start the publish state thread
        publishStateThread = threading.Thread(target=self.startPublishState)
        publishStateThread.start()

        # Start the node
        rospy.spin()