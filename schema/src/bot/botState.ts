//Unsettled schema

import { z } from 'zod';

export const botPoseSchema = z.unknown(); 

export const obstacleSchema = z.unknown();

export const batteryStatusSchema = z.unknown();

export const ledStateSchema = z.unknown();

export const modulePoseSchema = z.unknown();

export const compositePoseSchema = z.object({
    pose: botPoseSchema,
    modulePose: modulePoseSchema
})

export const robotStatusLiteralSchema = z.union([z.literal('idle'),z.literal('moving'),z.literal('stopped'),z.literal('error')]) ;

export const moduleStateSchema = z.object({

    type: z.string(),
    moduleData: z.any(),
    modulePose: modulePoseSchema,

});

export const botStateSchema = z.object({

    name: z.string(),
    pose: botPoseSchema,
    obstacles: obstacleSchema.array(),
    batteryStatus: batteryStatusSchema,
    ledState: ledStateSchema,
    status: robotStatusLiteralSchema,
    module: moduleStateSchema

});

export const aggregateBotStateSchema = z.object({
    bots: z.map(z.string(),botStateSchema)
})

export type botState = z.infer<typeof botStateSchema>;
export type aggregateBotState = z.infer<typeof aggregateBotStateSchema>;
export type compositePose = z.infer<typeof compositePoseSchema>;