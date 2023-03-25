import { recallFleetStateService, runPresetService, StageState, stageTopic } from "schema";
import { io } from "socket.io-client";
import { TopicClient } from "webtopics";
import{dummyWebClient} from "./utils/dummyWebClient"


const dummyWebClient1 = new dummyWebClient();
dummyWebClient1.topicSub();
const serverID = await dummyWebClient1.getWebClient().getServerID();
console.log("Select a service to run:");
console.log("1. creating preset");
console.log("2. runPreset");

process.stdin.on('data', (input: Buffer) => {
    const choice = parseInt(input.toString().trim());

    // Call the selected function based on the user's input
    switch (choice) {
    case 1:
        console.log("Input presetName");
        
        process.stdin.once('data',(input: Buffer)=>{
            const presetName = input.toString().trim()
            dummyWebClient1.setPreset(presetName)
            process.stdin.pause();
        })
        process.stdin.resume();
        break;
    case 2:
        console.log("Input presetName");
        
        process.stdin.once('data',(input: Buffer)=>{
            const presetName = input.toString().trim()
            dummyWebClient1.getWebClient().req(runPresetService,serverID,"preset1")
            process.stdin.pause();
        })
        process.stdin.resume();
        break;
    default:
        console.log("Invalid choice");
        break;
    }

    process.stdin.pause();
});

process.stdin.resume();




// let stageState:StageState;
// let webClient:TopicClient;
// let debugBotClient =new TopicClient(io(`http://localhost:3000`))
// debugBotClient.sub(stageTopic,(s)=>{
//     stageState =s
//     })
// debugBotClient.getServerID()
// .then((serverId)=>{
//     debugBotClient.req(recallFleetStateService,serverId,{

//     })
// })
// function recallNumPreset(presetOrder:number){
    
// }

