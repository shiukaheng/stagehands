import { TopicChannel } from "webtopics";
import { fleetTopic, stageTopic } from "schema";
import { Context } from "./controller/Context";

/**
 * Selects the topic based on the topic channel.
 * @param topicChannel - The topic channel to select.
 * @param context - The context object.
 * @returns The selected topic.
 * @throws An error if the topic is not found.
 */
export function selectTopic(topicChannel: TopicChannel<any>, context: Context): any {
  let topic: any;
  switch (topicChannel) {
    case fleetTopic:
      topic = context.getCurrentBotState();
      break;
    case stageTopic:
      topic = context.getStageState();
      break;
    default:
      throw new Error("Topic not found");
  }
  return topic;
}