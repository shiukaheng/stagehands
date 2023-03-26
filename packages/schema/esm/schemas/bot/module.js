import { z } from "zod";
import { poseSchema } from "./pose";
// Mic stand module specific schema
export var micStandDataSchema = z.object({
    gripPosition: z.number()
});
// Null module
export var nullModuleDataSchema = z["null"]();
// Combine types of all modules
export var moduleDataSchema = z.union([micStandDataSchema, nullModuleDataSchema]);
// Module literal types - for clients to understand how to parse moduleData
export var moduleTypeLiteralsSchema = z.union([
    z.literal("micStand"),
    z.literal("nullModule"),
]);
// Matching module data to module type
export var moduleTypeToDataSchema = {
    micStand: micStandDataSchema,
    nullModule: nullModuleDataSchema
};
// Module models schema - systematic way to represent arbritrary models, mainly for 3D rendering
export var moduleModelsSchema = z.record(z.object({
    modelID: z.string(),
    pose: poseSchema // Relative to bot origin
}));
export var moduleStateSchema = z.object({
    type: moduleTypeLiteralsSchema,
    state: moduleDataSchema,
    moduleModels: moduleModelsSchema
}).refine(function (data) {
    // Check that the module type matches the module state
    var moduleType = data.type;
    var moduleState = data.state;
    var moduleDataSchema = moduleTypeToDataSchema[moduleType];
    if (moduleDataSchema) {
        if (moduleDataSchema.safeParse(moduleState).success) {
            return true;
        }
        else {
            return false;
        }
    }
    else { // Module type not found
        return false;
    }
}, {
    message: "Module type does not match module state, or module type not found"
});
