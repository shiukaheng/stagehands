import {z} from "zod"
import { responseMessageSchema } from "../../serverResponse";
import {createService} from "webtopics"
import { botPoseSchema } from "../../bot/botState";

export const moveBotToPoseRequestSchema =z.object({
    botPose:botPoseSchema
})

export const moveBotToPoseServiceChannel = createService(
    "moveBotToPose",
    moveBotToPoseRequestSchema,
    responseMessageSchema
)
