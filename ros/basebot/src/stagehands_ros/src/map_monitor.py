import rospy
import subprocess

from nav_msgs.msg import OccupancyGrid
from stagehands_ros.srv import arucoAveragePose

prev_map_data = []
nr_iterations = 0
CHANGE_THRESHOLD = 0
map_path = "../../maps/generated_map"

def map_callback(msg):
    """
    Callback function for the map subscriber. Checks if the map has changed: if it hasn't for 10 iterations, calls the aruco_average_pose service.
    :param msg: OccupancyGrid message
    """
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

        # KILLS EVERYTHING MUAHAHAHAHA (hopefully)
        process = subprocess.Popen('\x03', shell=True)
        process.wait()
        
def dummy_callback(msg):
    rospy.loginfo(msg)

if __name__ == '__main__':
    rospy.init_node('map_monitor')
    while not rospy.is_shutdown():
        try:
            rospy.wait_for_message('/map', OccupancyGrid,timeout=1.0)
            rospy.Subscriber('/map', OccupancyGrid, dummy_callback)
            rospy.logwarn('HEEL YEA BABEY GOT DA MAPP')
            break
        except rospy.ROSException:
            rospy.logwarn("Failed to subscribe to map topic, retrying...")
            rospy.sleep(1.0)

    rospy.spin()