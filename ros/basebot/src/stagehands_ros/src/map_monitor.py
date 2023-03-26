import rospy
import subprocess

from nav_msgs.msg import OccupancyGrid
from stagehands_ros.srv import arucoAveragePose

prev_map_data = []
nr_iterations = 0
CHANGE_THRESHOLD = 0
map_path = "../../maps/generated_map"

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

        # Command to save the map
        save_map_cmd = "rosrun map_server map_saver -f " + map_path
        rospy.signal_shutdown("Map has not changed for 10 iterations: aruco_average_pose service called.")

        try:
        # Execute the command as a new process
            process = subprocess.Popen(save_map_cmd, shell=True)
            process.wait()

            rospy.loginfo("Map saved to: " + map_path)
        except Exception as e:
            rospy.logerr("Failed to save map: " + str(e))

        # now how to send this map to a server hmmmmmmm
        
if __name__ == '__main__':
    rospy.init_node('map_monitor')
    rospy.subscriber('map', OccupancyGrid, map_callback)