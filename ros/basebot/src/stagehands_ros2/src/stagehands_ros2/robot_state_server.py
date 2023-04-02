import rospy
import tf
import threading

from stagehands_ros2.msg import StagehandsState
from geometry_msgs.msg import Pose, Point, Quaternion

from stagehands_ros2.led import *
from stagehands_ros2.motor import *
from stagehands_ros2.nav_client import *

class RobotStateServer:

    def __init__(self):
        # Initialize node
        rospy.init_node('robot_state_server')

        # Initialize posePublisher
        self.posePublisher = rospy.Publisher('robot_current_pose', robotCurrentPose, queue_size = 10)
        self.transformListener = tf.TransformListener()
        
        # Initialize mic module client
        self.micModuleClient = MicModule("/dev/ttyACM0", 115200)
        self.micModuleClient.start()

        # Initialize LED client
        self.ledClient = LED()
        self.ledClient.start()

        # Initialize navigation client
        self.navClient = NavClient()

        # Initialize state subscriber
        rospy.Subscriber("stagehands_command_state", StagehandsState, self.onReceiveState)

    def startPublishState(self):
        """
        Deals with publishing outgoing state messages to the interface

        Publishes:
        - Live navigation data (where the bot is in the world)
        - Live mic module data (sensed height and angle)
        """

        # Create a clock / loop
        rate = rospy.Rate(30)

        while not rospy.is_shutdown():
            try:
                # Create a message to send
                pose = robotCurrentPose()

                # Get the transformation between map and baselink (where the bot is in the world)
                (trans, rot) = listener.lookupTransform('/map', '/base_link', rospy.Time(0))

                # Fill in the message with the data
                pose.xPos = trans[0]
                pose.yPos = trans[1]
                pose.rotationQuaternion = rot

                status = self.micModule.lastReadMsg # Read message
                if not ((status is None) or (status == "ZEROING")): # Only publish if there is data
                    (height, angle) = self.micModule.lastReadMsg
                    pose.currentMicHeight = height
                    pose.currentMicAngle = angle
                    # Publish pose
                    self.posePublisher.publish(pose)

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

        # Recieves a stagehandsState msg (identical to original request, just with unused return string removed)
        self.ledClient.setLEDState((state.ledRGBColour[0], state.ledRGBColour[1], state.ledRGBColour[2]), state.isFlashing, state.flashFrequency)
        self.micModuleClient.setState(state.micHeight, state.micAngle)
        self.navClient.setPose(state.xPos, state.yPos, state.rotationQuaternion)

    def start(self):
        # Start the publish state thread
        publishStateThread = threading.Thread(target=self.startPublishState)
        publishStateThread.start()

        # Start the node
        rospy.spin()

if __name__ == '__main__':
    server = RobotStateServer()
    server.start()