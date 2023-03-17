
import {test,expect,describe,beforeEach,beforeAll} from "@jest/globals"
import { createPresetService, deletePresetService, Preset, stageTopic, updatePresetService } from "schema"
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
    let serverID :string;
    beforeAll(async ()=>{
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
        dummyWebClient1.topicSub();
        setTimeout(async() => {
            dummyBot1Client.topicPub();
            dummyBot2Client.topicPub();
           
        }, 1000);
        serverID = await dummyWebClient1.getWebClient().getServerID();
    })
    const testPreset1 :Preset= {
        name:"preset1",
        state:{
            "1":{
                name:"1",
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
            name:"2",
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
                name:"1",
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
            name:"2",
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
                name:"1",
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
            name:"2",
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

    
    test("createPreset1 Test", (done)=>{

        //const serverID = await dummyWebClient1.getWebClient().getServerID();
        setTimeout(() => {
            dummyWebClient1.getWebClient().req(createPresetService,serverID,testPreset1)
            .then((res)=>{
            //console.log(controller.getContext().getStageState());
            
            expect(controller.getContext().getStageState().presets[controller.getContext().getStageState().presets.length-1].value.state).toEqual(testPreset1.state)

            done()
        })
        .catch((error)=>{
            done(error)
        })
        }, 1500);
    
    })

    test("createPreset2 Test",(done)=>{
        setTimeout(() => {
            dummyWebClient1.getWebClient().req(createPresetService,serverID,testPreset2)
            .then((res)=>{
                //console.log(controller.getContext().getStageState());
                expect(controller.getContext().getStageState().presets[controller.getContext().getStageState().presets.length-1].value.state).toEqual(testPreset2.state)
                done()
            })
            .catch((error)=>{
                done(error)
            })
        }, 2000);
        
    })

    test("web client received preset",(done)=>{
        setTimeout(() => {

            expect(dummyWebClient1.getStageState()).toEqual(controller.getContext().getStageState())
            done()
        }, 2500);
    })

    test("updatePreset1 Test",(done)=>{
        setTimeout(()=>{

            const preset1ID = dummyWebClient1.getStageState().presets[0].id
            dummyWebClient1.getWebClient().req(updatePresetService,serverID,{presetId:preset1ID as string,preset:testPreset1Update})
            .then(()=>{
                expect(controller.getContext().getStageState().presets[0].value).toEqual(testPreset1Update)
                done()
            })
            .catch((error)=>{
                done(error)
            })
        },3000)
    },5000)

    test("deletePreset1 Test",(done)=>{
        setTimeout(() => {
            const preset1ID = dummyWebClient1.getStageState().presets[0].id
            dummyWebClient1.getWebClient().req(deletePresetService,serverID,preset1ID)
            .then(()=>{
                expect(controller.getContext().getStageState().presets.length).toEqual(1);
                expect(controller.getContext().getStageState().presets[0].value.name).toEqual("preset2")
                done()
            })
            .catch((error)=>{
                done(error)
            })
        }, 3500);
    },5500)
}
)



