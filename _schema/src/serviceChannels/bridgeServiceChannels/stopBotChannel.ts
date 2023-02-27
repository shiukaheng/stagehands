import {z} from "zod"
import { responseMessageSchema } from "../../serverResponse";
import {createService} from "webtopics"

export const stopBotRequestSchema = z.object({
    botId:z.string()
})

export const stopBotServiceChannel =createService(
    "stopBot",
    stopBotRequestSchema,
    responseMessageSchema
)
export type StopBotRequest =z.infer <typeof stopBotRequestSchema>