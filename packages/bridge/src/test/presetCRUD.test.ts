import {bridgeServer} from "../server";
import { io } from "socket.io-client";
import { TopicServer, createTopic,TopicClient } from "webtopics"
import { createPresetService, Preset } from "schema";
import { dummyBot } from "./utils/dummyBot";
import {expect,test} from "@jest/globals";
import {isEqual} from "lodash";
const server = new bridgeServer();
const serverController = server.getController();
const dummyWebClient = new TopicClient(io("http://localhost:3000"))
const dummyBot1 = new dummyBot("1");
const dummyBot2 = new dummyBot("2");
let serverID :string;
const testPreset1 :Preset= {
    name:"preset1",
    state:{
        "1":{
            targetPose:{
                position: [0, 0, 1],
                quaternion: [0, 0, 0, 1]
            },
            baseLEDState:{
                rgbValue: [0, 0, 0],
                ledAnimation: {
                    animationMode: "constant",
                    flashingFrequency: 0
                    }

            },
            module:{
                type: "nullModule",
                state: null,
            }

    },
    "2":{
        targetPose:{
            position: [0, 0, 2],
            quaternion: [0, 0, 0, 1]
        },
        baseLEDState:{
            rgbValue: [0, 0, 0],
            ledAnimation: {
                animationMode: "constant",
                flashingFrequency: 0
                }

        },
        module:{
            type: "nullModule",
            state: null,
        }
    }
    }
}

const testPreset2 :Preset= {
    name:"preset2",
    state:{
        "1":{
            targetPose:{
                position: [0, 0, 4],
                quaternion: [0, 0, 0, 1]
            },
            baseLEDState:{
                rgbValue: [0, 0, 0],
                ledAnimation: {
                    animationMode: "constant",
                    flashingFrequency: 0
                    }

            },
            module:{
                type: "nullModule",
                state: null,
            }

    },
    "2":{
        targetPose:{
            position: [0, 0, 5],
            quaternion: [0, 0, 0, 1]
        },
        baseLEDState:{
            rgbValue: [0, 0, 0],
            ledAnimation: {
                animationMode: "constant",
                flashingFrequency: 0
                }

        },
        module:{
            type: "nullModule",
            state: null,
        }
    }
    }
}
async function getServerID(){
    serverID = await dummyWebClient.getServerID();
}
getServerID();

//Test

test("create preset1", (done)=>{

    console.log("webClient send request to create preset1");
    dummyWebClient.req(createPresetService,serverID,testPreset1);

    setTimeout(()=>{
        const context = serverController.getContext();
        
        expect(context.getStageState().presets["1"]).toEqual(testPreset1);
        done()
    },2000)
})



