#!/usr/bin/env python

import rospy
from std_msgs.msg import String

# Talker node

def talker():
    pub = rospy.Publisher('chatter', String, queue_size=10)
    rospy.init_node('talker', anonymous=True)
    rate = rospy.Rate(10) # 10hz
    while not rospy.is_shutdown():
        hello_str = "hello world %s" % rospy.get_time()
        rospy.loginfo(hello_str)
        pub.publish(hello_str)
        rate.sleep()

# Listener node

def callback(data):
    rospy.loginfo(rospy.get_caller_id() + "I heard %s", data.data)
    
def listener():
    rospy.init_node('listener', anonymous=True) # "anonymous" makes sure it is a unique name, otherwise nodes of the same name gets kicked off
    rospy.Subscriber("chatter", String, callback)
    rospy.spin() # spin() keeps python from exiting until this node is stopped

if __name__ == '__main__':
    try:
        talker()
    except rospy.ROSInterruptException:
        pass
