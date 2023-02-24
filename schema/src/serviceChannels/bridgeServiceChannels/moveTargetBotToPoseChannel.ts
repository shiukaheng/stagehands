import {z} from "zod"
import { responseMessageSchema } from "../../serverResponse";
import {createService} from "webtopics"
import { botPoseSchema } from "../../bot/botState";

export const moveTargetBotToPoseRequestSchema =z.object({
    botId:z.string(),
    botPose:botPoseSchema
})

export const moveTargetBotToPoseServiceChannel = createService(
    "moveBotToPose",
    moveTargetBotToPoseRequestSchema,
    responseMessageSchema
);
export type MoveTargetBotToPoseRequest =z.infer <typeof moveTargetBotToPoseRequestSchema>
