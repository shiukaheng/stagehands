
import { Context } from "./controller/Context";
import { FleetState, fleetTopic } from "schema";
import { ServerMeta, TopicServer } from "webtopics";
import { object } from "zod";

/**
 * Handles updates to the fleet topic.
 * @param fleetState - The new state of the fleet.
 * @param context - The context object.
 */
export function fleetTopicHandler(fleetState: FleetState, context: Context): void {
  
  context.setCurrentBotState(fleetState);
}

export function serverMetaHandler(serverMeta:ServerMeta,context:Context,server:TopicServer):void{
  Object.keys(context.getCurrentBotState()).forEach((botId)=>{
    if(serverMeta.clients[botId]===undefined){
      //delete context.getCurrentBotState()[botId]
      server.pubDiff(fleetTopic, {
        modified: undefined,
        // @ts-ignore type hack
        deleted: {
            [botId]: null
        }
        })
    }
    

  })
  
  
  //console.log(serverMeta);
  // console.log("current bot state");
  
  // console.log(context.getCurrentBotState());
  // server.pub(fleetTopic,context.getCurrentBotState())
}
