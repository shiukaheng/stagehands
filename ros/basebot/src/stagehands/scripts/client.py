#!/usr/bin/env python3

import rospy
from std_msgs.msg import String
import math

# This replaces navigation_2d's remote_joy node

from sensor_msgs.msg import Joy
from nav2d_operator.msg import cmd

class JoyToCmd:
    def __init__(self):
        self.cmd_pub = rospy.Publisher('cmd', cmd, queue_size=1)
        self.joy_sub = rospy.Subscriber('joy', Joy, self.joy_callback)

    def joy_callback(self, data):
        cmd_msg = cmd()
        cmd_msg.Turn = -data.axes[0] 
        cmd_msg.Velocity = math.sqrt(data.axes[0]**2 + data.axes[1]**2) * math.copysign(1, data.axes[1])
        cmd_msg.Mode = 0
        self.cmd_pub.publish(cmd_msg)

if __name__ == '__main__':
    rospy.init_node('joy_to_cmd')
    joy_to_cmd = JoyToCmd()
    rospy.spin()