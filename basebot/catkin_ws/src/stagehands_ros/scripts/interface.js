'use strict';

const rosnodejs = require('rosnodejs');
const stagehands_ros_msgs = rosnodejs.require('stagehands_ros').msg;
const stagehands_ros_srv = rosnodejs.require('stagehands_ros').srv;

function pose_listener() {
    rosnodejs.initNode('interface').then((nodeHandle) => {
        let sub = nodeHandle.subscribe('robot_current_pose', stagehands_ros_msgs.robotCurrentPose, (data) => {
            //rosnodejs.log.info('I heard: [' + data.xPos + ']');
            
        });
    });
}

if (require.main == module) {
    pose_listener();
}