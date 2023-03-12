#!/usr/bin/env node

/************************************************************************
 Copyright (c) 2017, Rethink Robotics
 Copyright (c) 2017, Ian McMahon

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
************************************************************************/

'use strict';
/**
 * This example demonstrates simple receiving of messages over the ROS system.
 */

// Require rosnodejs itself
const rosnodejs = require('rosnodejs');
// Require the geometry_msgs
const geom_msgs = rosnodejs.require('geometry_msgs').msg;
const stagehandsSchema = require('stagehands-schema');
const webtopics = require('webtopics');
const io = require('socket.io-client');


console.log(stagehandsSchema)

const ioclient = io("localhost:3000")
const publisher = new webtopics.TopicClient(ioclient)

function listener() {
  // Register node with ROS master
  rosnodejs.initNode('/listener_node')
    .then((rosNode) => {
      // Create ROS subscriber on the 'chatter' topic expecting String messages
      let sub = rosNode.subscribe('/amcl_pose', geom_msgs.PoseWithCovarianceStamped,
        (data) => { // define callback execution
          rosnodejs.log.info('I heard: [' + data + ']');
          console.log(data.pose.pose)
        }
      );
    });
}

if (require.main === module) {
  // Invoke Main Listener Function
  listener();
}
