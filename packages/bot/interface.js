'use strict';

// import rosnodejs from 'rosnodejs';
// const stagehands_ros_msgs = rosnodejs.require('stagehands_ros').msg;
import { TopicClient } from "webtopics";
import io from "socket.io-client";
import { fleetTopic } from "schema";

function pose_listener() {
    rosnodejs.initNode('interface').then((nodeHandle) => {
        let client = new TopicClient(io("http://192.168.0.44:3000"));
        console.log("Connecting to server...")
        client.getServerID().then((id) => {
            console.log("Server ID: ", id);
        });
        let sub = nodeHandle.subscribe('robot_current_pose', stagehands_ros_msgs.robotCurrentPose, (data) => {
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
            console.log("im publishing", data)
        });
    });
}

// pose_listener()