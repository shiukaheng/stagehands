import { z } from "zod";
import { poseSchema } from "./pose";

// Mic stand module specific schema
export const micStandDataSchema = z.object({
    gripPosition: z.number(),
});
export type MicStandData = z.infer<typeof micStandDataSchema>;

// Combine types of all modules
export const moduleDataSchema = micStandDataSchema; // Zod does not allow union of one type
export type ModuleData = z.infer<typeof moduleDataSchema>;

// Module literal types - for clients to understand how to parse moduleData
export const moduleTypeLiteralsSchema = z.literal("micStand");
export type ModuleType = z.infer<typeof moduleTypeLiteralsSchema>;

// Module models schema - systematic way to represent arbritrary models, mainly for 3D rendering
export const moduleModelsSchema = z.record(z.object({
    modelID: z.string(), // Unique ID for the model, client will look up the model in the model library using this ID
    pose: poseSchema // Relative to bot origin
}));
export type ModuleModels = z.infer<typeof moduleModelsSchema>;

export const moduleStateSchema = z.object({
    type: z.string(), // Type of module represented in string
    moduleData: moduleDataSchema, // Data specific to the module
    moduleModels: moduleModelsSchema, // Models specific to the module
});
export type ModuleState = z.infer<typeof moduleStateSchema>;