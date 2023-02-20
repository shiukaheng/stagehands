const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs').msg;
const geom_msgs = rosnodejs.require('geometry_msgs').msg;

console.log(geom_msgs);
rosnodejs.log.info('Stagehands client connected.');

function listener() {
  // Register node with ROS master
  rosnodejs.initNode('/stagehands_client')
    .then((rosNode) => {
      // Create ROS subscriber on the amcl_pose topic
      let sub = rosNode.subscribe('/amcl_pose', geom_msgs.PoseWithCovarianceStamped,
        (data) => { // define callback execution
        //   rosnodejs.log.info('I heard: [' + data + ']');
            console.log(data);
        }
      );
    });
}

if (require.main === module) {
  // Invoke Main Listener Function
  listener();
}
