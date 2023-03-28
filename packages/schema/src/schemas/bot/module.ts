import { z } from "zod";
import { poseSchema } from "./pose";

// Mic stand module specific schema
export const micStandDataSchema = z.object({
    gripPosition: z.number(),
    gripAngle: z.number(),
});
export type MicStandData = z.infer<typeof micStandDataSchema>;

// Null module
export const nullModuleDataSchema = z.null();
export type NullModuleData = z.infer<typeof nullModuleDataSchema>;

// Combine types of all modules
export const moduleDataSchema = z.union([micStandDataSchema, nullModuleDataSchema]);
export type ModuleData = z.infer<typeof moduleDataSchema>;

// Module literal types - for clients to understand how to parse moduleData
export const moduleTypeLiteralsSchema = z.union([
    z.literal("micStand"),
    z.literal("nullModule"),
]);
export type ModuleType = z.infer<typeof moduleTypeLiteralsSchema>;

// Matching module data to module type
export const moduleTypeToDataSchema: Record<ModuleType, z.ZodTypeAny> = {
    micStand: micStandDataSchema,
    nullModule: nullModuleDataSchema,
};

// Module models schema - systematic way to represent arbritrary models, mainly for 3D rendering
export const moduleModelsSchema = z.record(z.object({
    modelID: z.string(), // Unique ID for the model, client will look up the model in the model library using this ID
    pose: poseSchema // Relative to bot origin
}));
export type ModuleModels = z.infer<typeof moduleModelsSchema>;

export const moduleStateSchema = z.object({
    type: moduleTypeLiteralsSchema, // Type of module represented in string
    state: moduleDataSchema, // State specific to the module
    moduleModels: moduleModelsSchema, // Models specific to the module
}).refine((data)=>{
    // Check that the module type matches the module state
    const moduleType = data.type;
    const moduleState = data.state;
    const moduleDataSchema = moduleTypeToDataSchema[moduleType];
    if( moduleDataSchema ){
        if (moduleDataSchema.safeParse(moduleState).success) {
            return true;
        } else {
            return false;
        }
    } else { // Module type not found
        return false;
    }
}, {
    message: "Module type does not match module state, or module type not found"
})

export type ModuleState = z.infer<typeof moduleStateSchema>;