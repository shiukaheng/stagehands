import {z} from "zod"
import { responseMessageSchema } from "../../serverResponse";
import {createService} from "webtopics"

export const receiveBridgeResponseServiceChannel = createService(
    "responseMessage",
    responseMessageSchema,
    z.void()
)