import { describe,beforeAll,expect,test,jest} from "@jest/globals";
import { createPresetService, Preset, recallFleetStateService, runPresetService } from "schema";
import { Controller } from "src/controller/Controller";
import { bridgeServer } from "../server";
import { dummyBotClient } from "./utils/dummyBotClient";
import { dummyWebClient } from "./utils/dummyWebClient";

describe("fleetRecallTest",()=>{
    
    let server:bridgeServer
    let controller:Controller
    let dummyBot1Client:dummyBotClient
    let dummyBot2Client:dummyBotClient
    let dummyWebClient1:dummyWebClient
    let serverID :string;
    beforeAll(async ()=>{
        server = new bridgeServer();
        controller = server.getController();
        dummyBot1Client = new dummyBotClient("1");
        dummyBot2Client = new dummyBotClient("2");
        dummyWebClient1 = new dummyWebClient();
        
        dummyWebClient1.topicSub();
        dummyBot1Client.registerID();
        dummyBot2Client.registerID();
        dummyBot1Client.runBotServices()
        dummyBot2Client.runBotServices()
        setTimeout(async() => {
            dummyBot1Client.topicPub();
            dummyBot2Client.topicPub();

        }, 500);
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
    test("recallPreset1StateTest",(done)=>{
        setTimeout(() => {
            dummyWebClient1.getWebClient().req(recallFleetStateService,serverID,testPreset1.state)
            .then(()=>{
                //console.log(dummyBot1Client.getTargetBotState().targetPose);
                
                expect(dummyBot1Client.getTargetBotState().targetPose).toEqual(testPreset1.state["1"].targetPose)
                expect(dummyBot1Client.getTargetBotState().module.state).toEqual(testPreset1.state["1"].module.state)
                expect(dummyBot1Client.getTargetBotState().ledState.base).toEqual(testPreset1.state["1"].baseLEDState)
        
                expect(dummyBot2Client.getTargetBotState().targetPose).toEqual(testPreset1.state["2"].targetPose)
                expect(dummyBot2Client.getTargetBotState().module.state).toEqual(testPreset1.state["2"].module.state)
                expect(dummyBot2Client.getTargetBotState().ledState.base).toEqual(testPreset1.state["2"].baseLEDState)
                done()
               
            })
            .catch((error)=>{
                done(error)
            })  
        }, 1000);
        
    },5000)
    test("runPresetServiceTest",(done)=>{
        dummyWebClient1.getWebClient().req(createPresetService,serverID,testPreset1)
        dummyWebClient1.getWebClient().req(createPresetService,serverID,testPreset2)
        setTimeout(() => {
            const preset2ID = dummyWebClient1.getStageState().presets[1].id
            dummyWebClient1.getWebClient().req(runPresetService,serverID,preset2ID)
            .then(()=>{
                
                
                expect(dummyBot1Client.getTargetBotState().targetPose).toEqual(testPreset2.state["1"].targetPose)
                expect(dummyBot1Client.getTargetBotState().module.state).toEqual(testPreset2.state["1"].module.state)
                expect(dummyBot1Client.getTargetBotState().ledState.base).toEqual(testPreset2.state["1"].baseLEDState)
        
                expect(dummyBot2Client.getTargetBotState().targetPose).toEqual(testPreset2.state["2"].targetPose)
                expect(dummyBot2Client.getTargetBotState().module.state).toEqual(testPreset2.state["2"].module.state)
                expect(dummyBot2Client.getTargetBotState().ledState.base).toEqual(testPreset2.state["2"].baseLEDState)

                expect(controller.getContext().getStageState().activePreset).toEqual(preset2ID);
                done()
            })
            .catch((error)=>{
                done(error)
            })
        }, 1500);
        
    })
})


