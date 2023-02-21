//unsettled schema

import {z} from 'zod';

export const targetBotIdsSchema = z.string().array();

export const botCommandLiteralSchema = z.union([z.literal('moveToPose'),z.literal('stop'),z.literal('setLED'),z.literal('requestState'),z.literal('requestAllState')]);

export const botCommandDataSchema = z.any();

export const botCommandSchema = z.object({

    // The IDs of the bots to send the command to
    targetIds: targetBotIdsSchema,
    // command string property that allows literal values
    botCommand: botCommandLiteralSchema,
    // arbritrary data property
    botCommandData: botCommandDataSchema,
    
})

export type TargetBotIds = z.infer<typeof targetBotIdsSchema>;
export type BotCommandLiteral = z.infer<typeof botCommandLiteralSchema>;
export type BotCommandData = z.infer<typeof botCommandDataSchema>;
export type BotCommand = z.infer<typeof botCommandSchema>;