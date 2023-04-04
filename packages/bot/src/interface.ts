import rosnodejs from 'rosnodejs';
import { TopicClient } from "webtopics";
import io, { Socket } from "socket.io-client";
import { fleetTopic, ModuleState, recallBotStateService, BotState, RecallBotState } from "schema";
import NodeHandle from 'rosnodejs/dist/lib/NodeHandle';
import { StagehandsCommandState, StagehandsFeedbackState } from './types';

const stagehands_ros2 = rosnodejs.require('stagehands_ros2').msg as any;
const StagehandsCommandState = stagehands_ros2.StagehandsCommandState;
const StagehandsFeedbackState = stagehands_ros2.StagehandsFeedbackState;

export class WebtopicROSInterface {
    private client: TopicClient;
    private ioClient: Socket;
    private nodeHandle: NodeHandle | null = null;
    private connectedToROSResolver: ((v: unknown)=>void) | null = null;
    private connectedToROS = new Promise((resolve, reject) => {
        this.connectedToROSResolver = resolve;
    })
    private initBotState: BotState = {
        name: "",
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

            // Start publishing feedback from ROS to WebTopics
            this.startPublishFeedbackState()

            // Start serving recallBotStateService and forwarding to a ROS topic
            this.listenCommandState()
        })
    }

    /**
     * Starts listening to the /stagehands_feedback_state topic and publishes the data to the fleet topic
     */
    startPublishFeedbackState() {
        if (this.nodeHandle === null) {
            throw new Error("Node handle is null")
        }

        let sub = this.nodeHandle.subscribe('/stagehands_feedback_state', 'stagehands_ros2/StagehandsFeedbackState', (data: StagehandsFeedbackState) => {
            // Construct module state
            const moduleData: ModuleState = {
                type: "micStand",
                state: {
                    gripPosition: data.micHeight,
                    gripAngle: data.micAngle
                },
                moduleModels:{} // Unused
            }

            // Construct bot state
            const feedback: Partial<BotState> = {
                module: moduleData,
                pose: {
                    position: [data.xPos, 0, data.yPos] as [number, number, number],
                    quaternion: data.rotationQuaternion as [number, number, number, number]
                }
            }

            // Merge in the initial bot state (for fields that are not in the feedback)
            const botState: BotState = {
                ...this.initBotState,
                ...feedback
            }

            // Publish bot state to the fleet topic
            this.client.pub(fleetTopic, {
                [this.client.id]: botState
            })
        });
    }

    /**
     * Starts serving the recallBotStateService and forwards the data to "/stagehands_command_state"
     */
    listenCommandState() {
        // Advertise a service on the ROS side
        if (this.nodeHandle === null) {
            throw new Error("Node handle is null")
        }
        const publisher = this.nodeHandle.advertise('/stagehands_command_state', StagehandsCommandState)
        this.client.srv(recallBotStateService, (data: RecallBotState) => {
            if (this.nodeHandle === null) {
                // Ignore if node handle is null
                return
            }

            // Construct ROS message
            const commandState: StagehandsCommandState = new StagehandsCommandState()
            commandState.xPos = data.targetPose.position[0]
            commandState.yPos = data.targetPose.position[2]
            commandState.rotationQuaternion = data.targetPose.quaternion as [number, number, number, number]
            commandState.micHeight = data.module.state?.gripPosition ?? 0
            commandState.micAngle = data.module.state?.gripAngle ?? 0
            // commandState.ledRGBColour = data.baseLEDState.rgbValue as [number, number, number]
            commandState.ledR = data.baseLEDState.rgbValue[0]
            commandState.ledG = data.baseLEDState.rgbValue[1]
            commandState.ledB = data.baseLEDState.rgbValue[2]
            commandState.isFlashing = data.baseLEDState.ledAnimation.animationMode === "flashing"
            commandState.flashFrequency = data.baseLEDState.ledAnimation.flashingFrequency ?? 0

            // Publish to ROS topic
            publisher.publish(commandState)
        })
    }

    waitForConnection() {
        return this.connectedToROS;
    }

    shutdown() {
        this.ioClient.disconnect();
        rosnodejs.shutdown()
    }
}