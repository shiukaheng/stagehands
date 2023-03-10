
import {test,expect,describe,beforeEach,beforeAll} from "@jest/globals"
import { createPresetService, Preset, updatePresetService } from "schema"
import { io } from "socket.io-client";
import { bridgeServer } from "../server";
import { TopicClient } from "webtopics";
import { dummyBotClient } from "./utils/dummyBotClient";
import isEqual from "lodash";
import { Controller } from "src/controller/Controller";
import { dummyWebClient } from "./utils/dummyWebClient";




describe("presetCRUDTest",()=>{
    let server:bridgeServer
    let controller:Controller
    let dummyBot1Client:dummyBotClient
    let dummyBot2Client:dummyBotClient
    let dummyWebClient1:dummyWebClient
    beforeAll(()=>{
        server = new bridgeServer();
        //const serverController = server.getController();
        controller = server.getController();
        dummyBot1Client = new dummyBotClient("1");
        dummyBot2Client = new dummyBotClient("2");
        dummyWebClient1 = new dummyWebClient();
        // await dummyBot1Client.registerID();
        // await dummyBot2Client.registerID();
        // dummyBot1Client.runBotServices();
        // dummyBot2Client.runBotServices();
        dummyBot1Client.topicPub();
        dummyBot2Client.topicPub();
        dummyWebClient1.topicSub();
    })
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

        const serverID = await dummyWebClient1.getWebClient().getServerID();
        await dummyWebClient1.getWebClient().req(createPresetService,serverID,testPreset1);
        const stageState = controller.getContext().getStageState();

        setTimeout(()=>{
            expect(stageState.presets[stageState.presets.length-1].value.state).toEqual(testPreset1.state)
        },500)
    
    })

    test("createPreset2 Test",async()=>{
        const serverID = await dummyWebClient1.getWebClient().getServerID();
        await dummyWebClient1.getWebClient().req(createPresetService,serverID,testPreset2);
        const stageState = controller.getContext().getStageState();

        setTimeout(()=>{
            expect(stageState.presets[stageState.presets.length-1].value.state).toEqual(testPreset2.state)
        },500)
    },1000)

    test("updatePreset1 Test",async()=>{
        const serverID = await dummyWebClient1.getWebClient().getServerID();
        console.log(dummyWebClient1.getStageState());
        
        const preset1ID = dummyWebClient1.getStageState().presets.find(p=>p.value.name===testPreset1.name)?.id
        await dummyWebClient1.getWebClient().req(updatePresetService,serverID,{presetId:preset1ID as string,preset:testPreset1Update});
        const stageState = controller.getContext().getStageState();
        setTimeout(()=>{
            expect(stageState.presets.find(p=>p.id===preset1ID)?.value).toEqual(testPreset2)
        },500)
    },4000)


}
)



