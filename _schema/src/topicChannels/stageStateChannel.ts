import {z} from "zod";
import {createTopic} from "webtopics"
import { stageStateSchema } from "../stage/stageState";
export const stageStateTopicChannel =  createTopic(
    "stageState topic channel",
    stageStateSchema

)