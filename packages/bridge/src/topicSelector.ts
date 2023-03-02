import { TopicChannel } from "webtopics";
import { fleetTopic,stageTopic } from "schema";
import { Context } from "./controller/Context";
export function selectTopic(topicChannel:TopicChannel<any>,context:Context):any{
    let topic:any;
    switch(typeof topicChannel){
        case typeof fleetTopic:
            topic = context.getCurrentBotState;
            break;
        case typeof stageTopic:
            topic = context.getStageState;
            break;
        default:
            throw new Error("Topic not found")
            
    }
    return topic;
}