# Publish to "stagehands_command_state" with a message of type "StagehandsCommandState"

from stagehands_ros2.msg import StagehandsCommandState, StagehandsFeedbackState
from geometry_msgs.msg import Pose, Point, Quaternion
import time
import rospy

class TestNode:
    def __init__(self):
        # Initialize node
        rospy.init_node('test_node')

        # Initialize publishers
        self.pub = rospy.Publisher('stagehands_command_state', StagehandsCommandState, queue_size = 10)

        # Initialize state subscriber
        rospy.Subscriber("stagehands_feedback_state", StagehandsFeedbackState, self.onReceiveState)

    def onReceiveState(self, msg):
        print(msg)

    def start(self):
        # Test setting the LED to flashing blue
        # Meanwhile, move microphone in sequence: (0, 0), (10, 90), (20, 180), (30, 270), (40, 360), (50, 450), (0, 0)
        
        # First create a command message
        command = StagehandsCommandState() # Create a command message

        # float64 xPos
        # float64 yPos
        # float64[] rotationQuaternion
        # float64 micHeight
        # float64 micAngle
        # bool isFlashing
        # uint8[] ledRGBColour
        # float64 flashFrequency

        # Set the LED state
        command.isFlashing = True
        command.ledRGBColour = [0, 0, 255]
        command.flashFrequency = 1

        # Set the mic state
        command.micHeight = 0
        command.micAngle = 0

        # Publish the command message
        self.pub.publish(command)

        # Set poses for the mic
        i = 0
        while i < 7:
            command.micHeight = i * 10
            command.micAngle = i * 90
            self.pub.publish(command)
            time.sleep(1)
            i += 1

        # Set the LED state
        command.isFlashing = False
        command.ledRGBColour = [0, 0, 0]
        command.flashFrequency = 0

        # Publish the command message
        self.pub.publish(command)

        rospy.loginfo("Done")

if __name__ == "__main__":
    node = TestNode()
    node.start()