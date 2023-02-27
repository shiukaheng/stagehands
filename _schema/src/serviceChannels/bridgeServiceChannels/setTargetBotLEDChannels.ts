

import {z} from "zod"
import { responseMessageSchema } from "../../serverResponse";
import {createService} from "webtopics"
import { LEDStateSchema } from "../../bot/ledState";
export const setTargetBotLEDStateRequestSchema = z.object({
    botId:z.string(),
    LEDId:z.string(),
    LEDState:LEDStateSchema
})

export const setTargetBotLEDStateServiceChannel = createService(
    "setLEDState",
    setTargetBotLEDStateRequestSchema,
    responseMessageSchema
)
export type SetTargetBotLEDStateRequest =z.infer <typeof setTargetBotLEDStateRequestSchema>