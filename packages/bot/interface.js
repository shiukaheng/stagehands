'use strict';

import rosnodejs from 'rosnodejs';
const stagehands_ros_msgs = rosnodejs.require('stagehands_ros').msg;
const stagehands_ros_srvs = rosnodejs.require('stagehands_ros').srv;
import { TopicClient } from "webtopics";
import io from "socket.io-client";
import { fleetTopic, recallBotStateService } from "schema";

// instantiate ros node named 'interface'
rosnodejs.initNode('interface').then((nodeHandle) => {
    // create a TopicClient for the main server
    let client = new TopicClient(io("http://192.168.0.44:3000"));

    console.log("Connecting to server...")
    client.getServerID().then((id) => {
        console.log("Server ID: ", id);
    });

    // start publishing bot's current location over webtopics
    pose_listener(client, nodeHandle)

    // create WebTopics service to send bot to required position
    target_pose_executor(client, nodeHandle)
}
)
// publishes the bot's current state to the ui stuff
function pose_listener(client, nodeHandle) {
    // subscribe to robot_current_pose ROS topic and receive message containing robot's current position
    let sub = nodeHandle.subscribe('robot_current_pose', stagehands_ros_msgs.robotCurrentPose, (data) => {
        // check if a mic module is actually connected (although this is a potential thing to watch out for:
        // the python ros node actually publishing on this topic stores the mic height as NONE if there
        // isn't a module attached)
        if (data.currentMicHeight != null) {
            mod = {
                type: "micStand",
                state: {
                    gripPosition: data.currentMicHeight
                }
            }
        }
        else {
            mod = {
                type: "nullModule",
                state: null,
                moduleModels:{}
            }
        }

        // define... schema? json thing? containing bot current location
        let x = {
            name: "alice",
            pose: {
                position: [data.xPos, data.yPos, 0],
                quaternion: data.rotationQuaternion
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
            module: mod,
            stopped: false
        }
        // publish to fleet topic
        client.pub(fleetTopic, x)
        console.log("im publishing", data)
    });
}

// function that takes a """""""recall""""""" bot state schema as input and executes it on the robbit
function target_pose_executor(client, nodeHandle) {
    // creates a service
    client.srv(recallBotStateService, (data) => {
        // service client for ROS service to set robot's target pose
        let serviceClient = nodeHandle.serviceClient('set_target_pose', stagehands_ros_srvs.setTargetPose)

        // set values in request object based on input schema
        let requestedPose = new stagehands_ros_srvs.setTargetPose.Request();
        requestedPose.xPos = data.targetPose.position[0]
        requestedPose.yPos = data.targetPose.position[1]
        requestedPose.rotationQuaternion = data.targetPose.quaternion
        requestedPose.micHeight = data.module.state.gripPosition
        
        // call ROS service to move the robbit
        serviceClient.call(requestedPose).then((resp) => {console.log(resp);})
    })
}