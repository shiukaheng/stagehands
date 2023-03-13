import {test,expect} from "@jest/globals"
import { createPresetService, Preset } from "schema"
import { io } from "socket.io-client";
import { bridgeServer } from "../server";
import { TopicClient } from "webtopics";
import { dummyBotClient } from "./utils/dummyBotClient";
const server = new bridgeServer();
const serverController = server.getController();
const dummyBot1Client = new dummyBotClient("1");
const dummyBot2Client = new dummyBotClient("2");
const dummyWebClient = new TopicClient(io("http://localhost:3000"));

dummyBot1Client.topicPub();
dummyBot2Client.topicPub();
dummyBot1Client.runBotServices();
dummyBot2Client.runBotServices();
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
const testPreset1Update :Preset= {
    name:"preset1",
    state:{
        "1":{
            targetPose:{
                position: [0, 0, 3],
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
test("createPreset1 Test",async ()=>{
    const serverID = await dummyWebClient.getServerID();
    await dummyWebClient.req(createPresetService,serverID,testPreset1);

    const context = serverController.getContext();
    expect(context.getStageState().presets[context.getStageState().presets.length-1]).toEqual(testPreset1);
    
})

