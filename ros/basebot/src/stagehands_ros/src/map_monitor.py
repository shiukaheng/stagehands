import rospy

from nav_msgs.msg import OccupancyGrid
from stagehands_ros.srv import arucoAveragePose

prev_map_data = []
nr_iterations = 0
CHANGE_THRESHOLD = 0

def map_callback(msg):
    if prev_map_data == []:
        prev_map_data = msg.data
    else:
        change = 0
        for (prev_map_datum, map_datum) in zip(prev_map_data, msg.data):
            change += abs(prev_map_datum - map_datum)
        if change <= CHANGE_THRESHOLD:
            nr_iterations = nr_iterations + 1
    
    if nr_iterations >= 10:
        print("Map has not changed for 10 iterations.")
        store_aruco_average_pose = rospy.ServiceProxy('aruco_average_pose', arucoAveragePose)
        store_aruco_average_pose()
        rospy.signal_shutdown("Map has not changed for 10 iterations: aruco_average_pose service called.")
        
if __name__ == '__main__':
    rospy.init_node('map_monitor')
    rospy.subscriber('map', OccupancyGrid, map_callback)