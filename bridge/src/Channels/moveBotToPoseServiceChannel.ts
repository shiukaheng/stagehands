import { botPoseSchema } from "../../../schema/src/bot/botState";
import { createService } from "webtopics";
import { responseMessageSchema } from "../../../schema/src/serverResponse";
export const moveBotToPoseCommandServiceChannel = createService(
    "moveBotToPose",
    botPoseSchema,
    responseMessageSchema
);
