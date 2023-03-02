
import { ServerMeta } from "webtopics";
import { Context} from "./controller/Context";
import { Controller } from "./controller/Controller";
import { botIDRegistrationService } from "schema";
import { FleetState } from "fake-stagehands-backend";
export function newBotClientRegistrationHandler(serverMeta:ServerMeta,context:Context){
    //const clientIds = Object.keys(serverMeta.clients)
    for(const clientID of Object.keys(serverMeta.clients)){
        if (context.getbotClientIDMap().get(clientID)===undefined){

            Controller.getInstance().server.req(botIDRegistrationService,clientID,clientID)
            .then((botID)=>{
                context.getbotClientIDMap().set(botID,clientID);

            })
            .catch((error)=>{
                console.log(error);
                
            })
        }
    }
    
}

export function fleetTopicHandler(fleetState:FleetState,context:Context){
    
}