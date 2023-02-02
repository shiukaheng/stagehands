import { type } from "os";
import{ any, TypeOf, z } from  "zod";
const command = z.union([z.literal('capturePreset'),z.literal('recallPreset'),z.literal('stopAll'),z.literal('stop'),z.literal('setLED'),
z.literal('stopAll'),z.literal('stop'),z.literal('setLED'),z.literal('requestAllState'),z.literal('requestBotState'),z.literal('setStageBoundary')])

const stageCommandSchema =z.object({
    command: command,
    commandData: z.any(),

});

export type stageCommand=z.infer<typeof stageCommandSchema>;
