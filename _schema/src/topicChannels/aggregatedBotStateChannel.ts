import {z} from "zod";
import {createTopic} from "webtopics"
import { aggregateBotStateSchema} from "../bot/botState";
export const aggregatedBotStateTopicChannel =  createTopic(
    "aggregateBotState topic channel",
    aggregateBotStateSchema

)
