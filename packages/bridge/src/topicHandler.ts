import { Context } from "./controller/Context";
import { FleetState, fleetTopic } from "schema";
import { ServerMeta, TopicServer } from "webtopics";

/**
 * Handles updates to the fleet topic.
 * @param fleetState - The new state of the fleet.
 * @param context - The context object.
 */
export function fleetTopicHandler(fleetState: FleetState, context: Context): void {
  console.log(fleetState);
  
  context.setCurrentBotState(fleetState);
}

export function serverMetaHandler(serverMeta:ServerMeta,context:Context,server:TopicServer):void{
  Object.keys(context.getCurrentBotState()).forEach((botId)=>{
    if(serverMeta.clients[botId]===undefined){
      delete context.getCurrentBotState()[botId]
    }

  })
  
  //console.log(serverMeta);
  console.log(serverMeta);
  
  server.pub(fleetTopic,context.getCurrentBotState())
}
