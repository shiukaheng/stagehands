'use strict';

import rosnodejs from 'rosnodejs';
const stagehands_ros_msgs = rosnodejs.require('stagehands_ros').msg;
import { TopicClient } from "webtopics";
import io from "socket.io-client";
import channels from "./schemas/channels.js";

function pose_listener() {
    rosnodejs.initNode('interface').then((nodeHandle) => {
        let sub = nodeHandle.subscribe('robot_current_pose', stagehands_ros_msgs.robotCurrentPose, (data) => {
            let client = new TopicClient(io("http://localhost:3000"))
            let x = {
                name: "bemp",
                pose: {
                    position: [0, 0, 0],
                    quaternion: [0, 0, 0, 1]
                },
                targetPose: {
                    position: [0, 0, 0],
                    quaternion: [0, 0, 0, 1]
                },
                ledState: {
                    base: {
                        rgbValue: [0, 0, 0],
                        ledAnimation: {
                            animationMode: "constant",
                            flashingFrequency: 0
                        }
                    }
                },
                status: "idle",
                module: {
                    type: "nullModule",
                    state: null,
                    moduleModels:{}
                    
                },
                stopped: false
            }
            client.pub(fleetTopic, x)
            console.log(bridgeServer.getController().getContext().getCurrentBotState())
        });
    });
}

if (require.main == module) {
    pose_listener();
}