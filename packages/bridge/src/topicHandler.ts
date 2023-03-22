
import { ServerMeta } from "webtopics";
import { Context} from "./controller/Context";
import { Controller } from "./controller/Controller";
import { botIDRegistrationService,FleetState } from "schema";

// export function newBotClientRegistrationHandler(serverMeta:ServerMeta,context:Context){
//     //const clientIds = Object.keys(serverMeta.clients)
    
//         for(const clientID of Object.keys(serverMeta.clients)){
//         // console.log("have clientID");
        
//         // console.log(clientID);
        
//         if (context.getclientBotIDMap().get(clientID)===undefined){

//             Controller.getInstance().server.req(botIDRegistrationService,clientID,clientID)
//             .then((botID)=>{
//                 context.getbotClientIDMap().set(botID,clientID);
//                 context.getclientBotIDMap().set(clientID,botID);
//             })
//             .catch((error)=>{
//                 //console.log(error);
                
//             })
//         }
//     }
    
// }

export function fleetTopicHandler(fleetState:FleetState,context:Context){
    context.setCurrentBotState(fleetState);
    console.log(fleetState);
    console.log("receving")
    
    //console.log("current state");

    //console.log(fleetState);
    
    
    // console.log("fleet topic received");
    
    // console.log(fleetState);
    
}