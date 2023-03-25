import rospy

from aruco_msgs.msg import MarkerArray, Marker
from stagehands_ros.srv import arucoRecordPoses, arucoAveragePose

# dict with key markerID and value list of marker pose readings
marker_pose_readings = dict()

# records estimated marker positions during SLAM
def store_marker_poses(data):
    # print('callback')
    # print(data.markers[0].pose.pose.position.x)
    # print(data.markers[0].pose.pose.position.y)
    # print(data.markers[0].pose.pose.position.z)

    # for each marker in the MarkerArray, add the pose to the list of poses for that marker
    for marker in data.markers:
        # if there is already a list of marker poses for this marker, append the new pose to the list
        # otherwise create a new list with the new pose
        current_list = marker_pose_readings.getordefault(marker.id, [])
        marker_pose_readings.update({marker.id: current_list.append(marker.pose.pose)})

# when the record service is called, begin storing the marker poses
def aruco_listener(req):
    rospy.Subscriber("markers", MarkerArray, store_marker_poses)

# when the average service is called, calculate the average pose for each marker and write to file
def aruco_average_pose(req):
    f = open('../files/aruco_poses.txt', 'a')
    # for each marker, calculate the average pose and write to file
    for entry in marker_pose_readings:
        marker_id = entry.key
        sum_of_poses = [(x,y,z) for x,y,z in entry.value]
        nr_poses = len(sum_of_poses)
        average_pose = [sum_of_poses[0]/nr_poses, sum_of_poses[1]/nr_poses, sum_of_poses[2]/nr_poses]
        f.write('marker id: ' + str(marker_id) + ' average pose: ' + str(average_pose))
    f.close()
        

if __name__ == '__main__':
    # initialize node
    rospy.init_node('aruco_pose_handler')
    print('node running')
    # create service to start recording marker poses
    s = rospy.Service('aruco_record_poses', arucoRecordPoses, aruco_listener)
    # create service to calculate average marker poses and write to file
    t = rospy.Service('aruco_average_pose', arucoAveragePose, aruco_average_pose)

    # spin() simply keeps python from exiting until this node is stopped
    rospy.spin()