//Unsettled schema

import { z } from 'zod';

export const botPoseSchema = z.unknown(); 

export const obstacleSchema = z.unknown();

export const batteryStatusSchema = z.unknown();

//Led State
export const ledModeLiteralsSchema = z.union([z.literal('serverOverwrite'),z.literal('clientOverwrite')])
export const ledAnimationModeLiteralsSchema = z.union([z.literal('stable'),z.literal('Flashing')])
export const ledAnimationSchema = z.object({
    animationState: ledAnimationModeLiteralsSchema

})
export const ledStateSchema = z.object({
    ledMode:ledModeLiteralsSchema,
    rgbValue:z.number().array(),
    ledAnimation: ledAnimationSchema

})

//module state
export const modulePoseSchema = z.unknown();

export const compositePoseSchema = z.object({
    pose: botPoseSchema,
    modulePose: modulePoseSchema
})
export const moduleStateSchema = z.object({

    type: z.string(),
    moduleData: z.any(),
    modulePose: modulePoseSchema,

});


export const robotStatusLiteralSchema = z.union([z.literal('idle'),z.literal('moving'),z.literal('stopped'),z.literal('error')]) ;


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