'use strict';

const rosnodejs = require('rosnodejs');
const stagehands_ros_msgs = rosnodejs.require('stagehands_ros').msg;
const server = require("../../../../../../packages/bridge/dist/server")
const bridgeServer = new server.bridgeServer()
// import { createService, createTopic } from "webtopics";
// import { fleetStateSchema } from "./schemas/schemas";
const webtopics = require('../../../../../../node_modules/webtopics')
//const botStateSchema = require('../../../../../../packages/schema/dist/schemas/bot/bot')
//import { io } from "socket.io-client";
const io = require('../../../../../../node_modules/socket.io-client')
const channle = require("../../../../../../packages/schema/dist/channels")

function pose_listener() {
    rosnodejs.initNode('interface').then((nodeHandle) => {
        let sub = nodeHandle.subscribe('robot_current_pose', stagehands_ros_msgs.robotCurrentPose, (data) => {
            let client = new webtopics.TopicClient(io("http://localhost:3000"))
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
            client.pub(channle.fleetTopic, x)
            console.log(bridgeServer.getController().getContext().getCurrentBotState())
        });
    });
}

if (require.main == module) {
    pose_listener();
}