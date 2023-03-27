import rosnodejs from 'rosnodejs';
import { TopicClient } from "webtopics";
import io, { Socket } from "socket.io-client";
import { fleetTopic, ModuleState, recallBotStateService, BotState, RecallBotState } from "schema";
import NodeHandle from 'rosnodejs/dist/lib/NodeHandle';
import { ROSPose } from './types';

const current_pose = (rosnodejs.require('stagehands_ros').msg as any).robotCurrentPose;
const target_pose_service = (rosnodejs.require('stagehands_ros').srv as any).setTargetPose;

export class WebtopicROSInterface {
    private client: TopicClient;
    private ioClient: Socket;
    private nodeHandle: NodeHandle | null = null;
    private connectedToROSResolver: ((v: unknown)=>void) | null = null;
    private connectedToROS = new Promise((resolve, reject) => {
        this.connectedToROSResolver = resolve;
    })
    private initBotState: BotState = {
        name: "alice",
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
            moduleModels: {}
        },
        stopped: false,
        batteryStatus: {
            batteryPercentage: 0
        }
    }

    constructor(ip:string, port:string) {
        this.ioClient = io("http://" + ip + ":" + port)
        this.client = new TopicClient(this.ioClient, {logTopics: true});
    }

    /**
     * Start the ros node and webtopics client
     */
    startNode(){
        // instantiate ros node named 'interface'
        rosnodejs.initNode('interface').then((nodeHandle) => {
            // create a TopicClient for the main server
            this.nodeHandle = nodeHandle
            this.connectedToROSResolver!(true)
            console.log("Connecting to server...")
            this.client.getServerID().then((id) => {
                console.log("Server ID: ", id);
            });

            // start publishing bot's current location over webtopics
            this.currentPosePublisher()

            // create WebTopics service to send bot to required position
            this.targetPoseSender()
        })
    }

    /**
     * Publishes the bot's current state to the fleet topic, taken from ROS
     */
    currentPosePublisher() {
        if (this.nodeHandle === null) {
            throw new Error("Node handle is null")
        }
        // subscribe to robot_current_pose ROS topic and receive message containing robot's current position
        let mod: ModuleState;
        mod = {
            type: "nullModule",
            state: null,
            moduleModels:{}
        }
        let sub = this.nodeHandle.subscribe('robot_current_pose', current_pose, (data:ROSPose) => {
            // check if a mic module is actually connected (although this is a potential thing to watch out for:
            // the python ros node actually publishing on this topic stores the mic height as NONE if there
            // isn't a module attached)
            if (data.currentMicHeight != null) {
                mod.type = "micStand"
                mod.state = { gripPosition: data.currentMicHeight}
            }
            // define schema containing bot current location
            this.initBotState.pose.position = [data.xPos, 0, data.yPos]
            this.initBotState.pose.quaternion = data.rotationQuaternion
            // publish to fleet topic
            this.client.pub(fleetTopic, {
                [this.client.id]: this.initBotState
            })
        });
    }

    /**
     * Function that takes a recall bot state schema as input and executes it on the robot
     */
    targetPoseSender() {
        // creates a service
        this.client.srv(recallBotStateService, (data:RecallBotState) => {
            if (this.nodeHandle === null) {
                throw new Error("Node handle is null")
            }
            else {
                this.sendPose(data)
            }
        })
    }

    sendPose(data:RecallBotState) {
        if (this.nodeHandle === null) {
            throw new Error("Node handle is null")
        }
        else {
            // Gets service client for ROS service to set robot's target pose
            let serviceClient = this.nodeHandle.serviceClient('set_target_pose', target_pose_service)

            // Set values in request object based on input schema
            let requestedPose = new target_pose_service.Request();
            
            // Set position and rotation values
            requestedPose.xPos = data.targetPose.position[0]
            requestedPose.yPos = data.targetPose.position[2]
            requestedPose.rotationQuaternion = data.targetPose.quaternion

            // Set LED values
            requestedPose.ledRGBColour = data.baseLEDState.rgbValue
            requestedPose.ledAnimation = data.baseLEDState.ledAnimation.animationMode
            requestedPose.flashFrequency = data.baseLEDState.ledAnimation.flashingFrequency

            if (data.module.state != null) {
                requestedPose.micHeight = data.module.state.gripPosition
            }

            else { requestedPose.micHeight = null }

            console.log("Received:", data)
            console.log("Sending:", requestedPose)
            
            // Call ROS service to move the robot
            serviceClient.call(requestedPose).then((resp:string) => {console.log(resp);})
        }
    }

    waitForConnection() {
        return this.connectedToROS;
    }

    shutdown() {
        this.ioClient.disconnect();
        rosnodejs.shutdown()
    }
}

// // Create a new instance of the class and start the node
// let rosInterface = new WebtopicROSInterface("192.168.0.37", "3001")
// rosInterface.startNode()