import rosnodejs from 'rosnodejs';
import { TopicClient } from "webtopics";
import io from "socket.io-client";
import { fleetTopic, ModuleState, recallBotStateService, BotState, RecallBotState } from "schema";
import NodeHandle from 'rosnodejs/dist/lib/NodeHandle';
import { ROSPose } from './types';


const current_pose = (rosnodejs.require('stagehands_ros').msg).robotCurrentPose ;
const target_pose_service = (rosnodejs.require('stagehands_ros').srv).setTargetPose;

// instantiate ros node named 'interface'
rosnodejs.initNode('interface').then((nodeHandle) => {
    // create a TopicClient for the main server
    let client = new TopicClient(io("http://192.168.0.37:3000"), {logTopics: true});

    console.log("Connecting to server...")
    client.getServerID().then((id) => {
        console.log("Server ID: ", id);
    });

    // start publishing bot's current location over webtopics
    pose_listener(client, nodeHandle)

    // create WebTopics service to send bot to required position
    target_pose_executor(client, nodeHandle)
})

// publishes the bot's current state to the ui stuff
function pose_listener(client: TopicClient, nodeHandle: NodeHandle) {
    // subscribe to robot_current_pose ROS topic and receive message containing robot's current position
    let mod: ModuleState;
    let sub = nodeHandle.subscribe('robot_current_pose', current_pose, (data:ROSPose) => {
        // check if a mic module is actually connected (although this is a potential thing to watch out for:
        // the python ros node actually publishing on this topic stores the mic height as NONE if there
        // isn't a module attached)
        if (data.currentMicHeight != null) {
            mod = {
                type: "micStand",
                state: {
                    gripPosition: data.currentMicHeight
                },
                moduleModels:{}
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
        let x: BotState
        x = {
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
        client.pub(fleetTopic, {
            [client.id]: x
        })
        // console.log("im publishing", x)
    });
}

// function that takes a """""""recall""""""" bot state schema as input and executes it on the robbit
function target_pose_executor(client: TopicClient, nodeHandle: NodeHandle) {
    // creates a service
    client.srv(recallBotStateService, (data:RecallBotState) => {
        // service client for ROS service to set robot's target pose
        let serviceClient = nodeHandle.serviceClient('set_target_pose', target_pose_service)

        // set values in request object based on input schema
        let requestedPose = new target_pose_service.Request();
        requestedPose.xPos = data.targetPose.position[0]
        requestedPose.yPos = data.targetPose.position[1]
        requestedPose.rotationQuaternion = data.targetPose.quaternion
        requestedPose.ledRGBColour = data.baseLEDState.rgbValue
        requestedPose.ledAnimation = data.baseLEDState.ledAnimation.animationMode
        requestedPose.flashFrequency = data.baseLEDState.ledAnimation.flashingFrequency
        
        if (data.module.state != null) {
            requestedPose.micHeight = data.module.state.gripPosition
        }
        else { requestedPose.micHeight = null }

        console.log(data)
        
        // call ROS service to move the robbit
        serviceClient.call(requestedPose).then((resp:string) => {console.log(resp);})
    })
}