import { TopicServer } from "webtopics";
import { Server } from "socket.io";
import { createPresetCommandService,updatePresetCommandService } from "./Channels/presetCommandServiceChannel";
import { CreatePresetCommand } from "./command/StageServiceCommand/CreatePresetCommand";
import { UpdatePresetCommand } from "./command/StageServiceCommand/updatePresetCommand";
import { Context } from "./controller/Context";
import { TopicClient } from "webtopics";
import { Preset } from "schema";
import { io } from "socket.io-client";
import { Controller } from "./controller/Controller";
import { resolve } from "path";
import { rejects } from "assert";

// Create test client
const testCreatePresetSocket = io("http://localhost:3000");
const testCreatePresetClient = new TopicClient(testCreatePresetSocket);

// Create test server
const socketIOServer = new Server(3000);

const topicServer = new TopicServer(socketIOServer);



// Create context and controller
const context = new Context();
const controller = new Controller();

// Create test preset
const testPreset1: Preset = {
    name: "preset1",
    poses: []
};
const testPreset2: Preset = {
    name: "preset2",
    poses: []
};


// Set up createPresetCommandService
topicServer.srv(createPresetCommandService, (preset) => {
    const cP = new CreatePresetCommand(preset);
    return cP.execute(context);
});

// topicServer2.srv(updatePresetCommandService, (preset) => {
//     const cP = new CreatePresetCommand(preset);
//     return cP.execute(context);
// });
testCreatePresetClient.srv(createPresetCommandService, (preset) => {
    const cP = new CreatePresetCommand(preset);
    return cP.execute(context);
});

// Try requesting createPresetCommandService
async function testRequest1():Promise<string> {
    const serverID = await testCreatePresetClient.getServerID() // Wait for serverID to be received
    console.log(serverID);
    
    try{
        let response=await testCreatePresetClient.req(
            createPresetCommandService,
            testPreset1,
            serverID
        )
        console.log(
            `testCreatePresetClient received response ${JSON.stringify(response)}`
        );
        
    } catch(error){
        console.log(`testCreatePresetClient received error: ${error}`);
    }
    return new Promise((resolve,reject)=>{
        resolve(topicServer.listClients()[topicServer.listClients().length-1])
        
    })
        
}
async function testServerRequest1(clientid:string) {

    topicServer
        .req(
            createPresetCommandService,
            testPreset2,
            clientid
        )
        .then((response) => {
            console.log(
                `topicServer received response ${JSON.stringify(response)}`
            );
        })
        .catch((error) => {
            console.log(`topicServer received error: ${error}`);
        });
}


testRequest1().then(testServerRequest1)
