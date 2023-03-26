import numpy as np
import rospy
import tf

from aruco_msgs.msg import MarkerArray, Marker

from geometry_msgs.msg import PoseWithCovarianceStamped, Pose, Point, Quaternion
from tf.transformations import quaternion_from_matrix

def quaternion_to_rotation_matrix(qx, qy, qz, qw):
    """
    Converts a quaternion to a rotation matrix.
    :param qx: x component of the quaternion
    :param qy: y component of the quaternion
    :param qz: z component of the quaternion
    :param qw: w component of the quaternion
    :return: 3x3 rotation matrix
    """
    R = np.array([[1 - 2*(qy**2 + qz**2),     2*(qx*qy - qw*qz),     2*(qx*qz + qw*qy)],
                  [    2*(qx*qy + qw*qz), 1 - 2*(qx**2 + qz**2),     2*(qy*qz - qw*qx)],
                  [    2*(qx*qz - qw*qy),     2*(qy*qz + qw*qx), 1 - 2*(qx**2 + qy**2)]])
    return R

def pose_to_transformation_matrix(x, y, z, qx, qy, qz, qw):
    """
    Converts a pose to a transformation matrix.
    :param x: x component of the position
    :param y: y component of the position
    :param z: z component of the position
    :param qx: x component of the quaternion
    :param qy: y component of the quaternion
    :param qz: z component of the quaternion
    :param qw: w component of the quaternion
    :return: 4x4 transformation matrix
    """
    R = quaternion_to_rotation_matrix(qx, qy, qz, qw)
    T = np.identity(4)
    T[:3, :3] = R
    T[:3, 3] = [x, y, z]
    return T

# the PoseWithCovarianceStamped message is probably written in the text file like so:
# header:
#   seq: <sequence_number>
#   stamp:
#     secs: <timestamp_seconds>
#     nsecs: <timestamp_nanoseconds>
#   frame_id: <frame_id>
# pose:
#   pose:
#     position:
#       x: <position_x> (i+10)
#       y: <position_y> (i+11)
#       z: <position_z> (i+12)
#     orientation:
#       x: <orientation_x> (i+14)
#       y: <orientation_y> (i+15)
#       z: <orientation_z> (i+16)
#       w: <orientation_w> (i+17)
#   covariance: [<covariance_matrix_entries>]
# which means line parsing is a problem wheeeee

def find_marker_pose(marker_id):
    """
    Finds the pose of a marker in the map frame.
    :param marker_id: the id of the marker
    :return: the pose of the marker in the map frame
    """
    # open the text file containing the aruco poses
    f = open('../files/aruco_poses.txt', 'r')
    lines = f.readlines()
    pose_found = False

    # iterate through the lines of the text file until the id is located
    for i in range(len(lines)):
        line = lines[i]
        if line == str(marker_id) + ":\n":
            pose_found = True
            # parse the position values from the text file
            x = float(lines[i+10].split(': ')[1])
            y = float(lines[i+11].split(': ')[1])
            z = float(lines[i+12].split(': ')[1])

            # parse the orientation values from the text file
            qx = float(lines[i+14].split(': ')[1])
            qy = float(lines[i+15].split(': ')[1])
            qz = float(lines[i+16].split(': ')[1])
            qw = float(lines[i+17].split(': ')[1])

            # calculate the aruco->map transformation matrix
            transform_aruco_to_map = pose_to_transformation_matrix(x, y, z, qx, qy, qz, qw)
            break 
    f.close()  
    # if the marker id is not found in the text file, skip this marker
    if not pose_found: return None
    
    return transform_aruco_to_map

def send_initial_pose(avg_transform_map_to_camera):
    """
    Takes the average of the map->camera transformations for each marker and publishes the initial pose estimate.
    :param avg_transform_map_to_camera: the average map->camera transformation matrix
    """
    # initialise the transform listener and publisher
    listener = tf.TransformListener()
    pub = rospy.Publisher('initialpose', PoseWithCovarianceStamped, queue_size=10)

    try:
        # get the transform between the camera and the base link
        (trans, rot) = listener.lookupTransform('/camera_link', '/base_link', rospy.Time(0))
        transform_camera_to_base = pose_to_transformation_matrix(trans[0], trans[1], trans[2], rot[0], rot[1], rot[2], rot[3])

        # calculate the base->map transformation matrix (i.e. the initial pose estimate)
        transform_base_to_map = np.linalg.inv(avg_transform_map_to_camera @ transform_camera_to_base)

    except(tf.LookupException, tf.ConnectivityException, tf.ExtrapolationException):
        print("Unable to get transform from camera to base link, publishing camera pose as the estimate instead")
        transform_base_to_map = avg_transform_map_to_camera

    # retrieve the position and orientation from the transformation matrix
    position = transform_base_to_map[:3, 3]
    orientation = quaternion_from_matrix(transform_base_to_map)

    # convert the position and orientation to the correct format
    pose_cov_stamped = PoseWithCovarianceStamped()
    pose_cov_stamped.header.frame_id = "your_frame_id"
    pose_cov_stamped.header.stamp = rospy.Time.now()
            
    pose = Pose(Point(position[0], position[1], position[2]), Quaternion(orientation[0], orientation[1], orientation[2], orientation[3]))
    pose_cov_stamped.pose.pose = pose

    pose_cov_stamped.pose.covariance = [0] * 36

    # publish the initial pose estimate
    pub.publish(pose_cov_stamped)
    
def callback(data):
    """
    When aruco markers are detected, calculate the average map->camera transformation, use it to find an initial pose estimate, and publish it.
    :param data: data for all the detected aruco markers
    """
    # initialise the average matrix representing the map->camera transformation
    avg_transform_map_to_camera = np.zeros((4, 4))
    # initialise the marker count
    marker_count = 0

    for marker in data:
        # go through the text file and find the pose of the marker: if this specific marker is not currently visible, skip it
        transform_aruco_to_map = find_marker_pose(marker.id)
        if transform_aruco_to_map is None: continue

        # increment the marker count
        marker_count += 1
        
        # calculate the aruco->camera transformation matrix
        transform_aruco_to_camera = pose_to_transformation_matrix(marker.pose.pose.position.x, marker.pose.pose.position.y, marker.pose.pose.position.z, 
                                                                  marker.pose.pose.orientation.x, marker.pose.pose.orientation.y, marker.pose.pose.orientation.z, 
                                                                  marker.pose.pose.orientation.w)
        
        # calculate the map->camera transformation matrix, as estimated by the data for this marker
        transform_map_to_camera = np.linalg.inv(transform_aruco_to_map) @ transform_aruco_to_camera
        avg_transform_map_to_camera += transform_map_to_camera

    # if there are any markers found, calculate the average map->camera transformation matrix
    if marker_count > 0:
        # divide the sum of the matrices by the number of markers
        avg_transform_map_to_camera /= marker_count
        send_initial_pose(avg_transform_map_to_camera)
    else:
        print("No markers found, please move the robot to a different location")


def listener():
    rospy.Subscriber("markers", MarkerArray, callback)

if __name__ == "__main__":
    rospy.init_node('initial_pose_estimate_aruco')
    try:
        listener()
    except rospy.ROSInterruptException:
        pass

    rospy.spin()