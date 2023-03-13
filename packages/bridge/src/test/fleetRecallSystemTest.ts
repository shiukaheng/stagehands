import {bridgeServer} from "../server";
import { io } from "socket.io-client";
import { TopicServer, createTopic,TopicClient } from "webtopics"
import { botIDRegistrationService, createPresetService, deletePresetService, fleetTopic, Preset, recallBotStateSchema, recallBotStateService, recallFleetStateService, updatePresetService } from "schema";
import { dummyBotClient } from "./utils/dummyBotClient";
import {expect,test} from "@jest/globals";
import isEqual from "lodash";
const server = new bridgeServer();
const serverController = server.getController();
const dummyWebClient = new TopicClient(io("http://localhost:3000"))
const dummyBot1 = new dummyBotClient("1");
const dummyBot2 = new dummyBotClient("2");
const dummyBot1Client = new TopicClient(io("http://localhost:3000"))
const dummyBot2Client = new TopicClient(io("http://localhost:3000"))

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
function botRegistrationService(){
    
    dummyBot1Client.srv(botIDRegistrationService,(req)=>{
        
        return "1"
    })
    dummyBot2Client.srv(botIDRegistrationService,(req)=>{
        return "2"
    })
}
function botRecallStateService(){
    dummyBot1Client.srv(recallBotStateService,(req)=>{
        console.log("bot1 received botstate");
        console.log(req);
        
        
    })
    dummyBot2Client.srv(recallBotStateService,(req)=>{
        console.log("bot2 received botstate");
        console.log(req);
    })
}

function pubFleetState() {
    dummyBot1Client.pub(fleetTopic,{"1":dummyBot1.getCurrentBotState()});
    dummyBot2Client.pub(fleetTopic,{"2":dummyBot2.getCurrentBotState()});
    

}
async function createPreset1Test(){
    const serverID = await dummyWebClient.getServerID();
    
    dummyWebClient.req(createPresetService,serverID,testPreset1)
    .catch((error=>{
        console.log(error);
        
    }));
    setTimeout(()=>{
        const context = serverController.getContext();
        isEqual((context.getStageState().presets[context.getStageState().presets.length-1].value,testPreset1)) ?console.log("createPreset1Test pass"):console.log("createPreset1Test fail");
        
        
    },500)
}

async function createPreset2Test() {
    const serverID = await dummyWebClient.getServerID();
    dummyWebClient.req(createPresetService,serverID,testPreset2);
    setTimeout(()=>{
        const context = serverController.getContext();
        isEqual((context.getStageState().presets[context.getStageState().presets.length-1].value,testPreset2)) ?console.log("createPreset2Test pass"):console.log("createPreset2Test fail");
        
        
    },500)
}

async function  updatePreset1Test() {
    const serverID = await dummyWebClient.getServerID();
    dummyWebClient.req(updatePresetService,serverID,{presetId:"1",preset:testPreset1Update});
    setTimeout(()=>{
        const context = serverController.getContext();
        isEqual((context.getStageState().presets.find(p=>p.id==="1")?.value,testPreset1Update)) ?console.log("updatePreset1Test pass"):console.log("updatePreset1Test fail");
         
    },500)
}

async function deletePreset1Test(){
    const serverID = await dummyWebClient.getServerID();
    dummyWebClient.req(deletePresetService,serverID,"1");
    setTimeout(()=>{
        const context = serverController.getContext();
        context.getStageState().presets.find(p=>p.id==="1")?.value===undefined ?console.log("deletePreset1Test pass"):console.log("deletePreset1Test fail");
         
    },500)
}

async function recallPreset2Test() {
    const serverID = await dummyWebClient.getServerID();
    dummyWebClient.req(recallFleetStateService,serverID,testPreset2.state)
    .catch((error)=>{
        console.log(error);
    });
    
}
botRegistrationService();
botRecallStateService();

pubFleetState();

setTimeout(()=>{
    createPreset1Test();
},500)

setTimeout(()=>{
    createPreset2Test();
},500)

setTimeout(()=>{
    updatePreset1Test();
},500)
setTimeout(()=>{
    deletePreset1Test();
},500)

setTimeout(()=>{
    const botNames = [...serverController.getContext().getbotClientIDMap().keys()];
    const clientIds = [...serverController.getContext().getbotClientIDMap().values()]
    console.log(botNames);
    console.log(clientIds);
},1500)

setTimeout(()=>{
    recallPreset2Test();
},2000)

setTimeout(()=>{
    console.log(serverController.getContext().getCurrentBotState());
    
},2000)


//Jest Test

// test("create preset1", (done)=>{
    
//     console.log("webClient send request to create preset1");
//     dummyWebClient.req(createPresetService,"serverID",testPreset1);

//     setTimeout(()=>{
//         const context = serverController.getContext();
//         expect(context.getStageState().presets[context.getStageState().presets.length-1]).toEqual(testPreset1);
//         done()
//     },2000)
// })



