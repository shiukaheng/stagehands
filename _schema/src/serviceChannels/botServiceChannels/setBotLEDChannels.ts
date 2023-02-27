
import {z} from "zod"
import { responseMessageSchema } from "../../serverResponse";
import {createService} from "webtopics"
import { LEDStateSchema } from "../../bot/ledState";
export const setBotLEDStateRequestSchema = z.object({
    LEDId:z.string(),
    LEDState:LEDStateSchema
})

export const setBotLEDStateServiceChannel = createService(
    "setLEDState",
    setBotLEDStateRequestSchema,
    responseMessageSchema
)
export type SetBotLEDStateRequest =z.infer <typeof setBotLEDStateRequestSchema>