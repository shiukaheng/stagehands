"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleStateSchema = exports.moduleModelsSchema = exports.moduleTypeToDataSchema = exports.moduleTypeLiteralsSchema = exports.moduleDataSchema = exports.nullModuleDataSchema = exports.micStandDataSchema = void 0;
const zod_1 = require("zod");
const pose_1 = require("./pose");
// Mic stand module specific schema
exports.micStandDataSchema = zod_1.z.object({
    gripPosition: zod_1.z.number(),
});
// Null module
exports.nullModuleDataSchema = zod_1.z.null();
// Combine types of all modules
exports.moduleDataSchema = zod_1.z.union([exports.micStandDataSchema, exports.nullModuleDataSchema]);
// Module literal types - for clients to understand how to parse moduleData
exports.moduleTypeLiteralsSchema = zod_1.z.union([
    zod_1.z.literal("micStand"),
    zod_1.z.literal("nullModule"),
]);
// Matching module data to module type
exports.moduleTypeToDataSchema = {
    micStand: exports.micStandDataSchema,
    nullModule: exports.nullModuleDataSchema,
};
// Module models schema - systematic way to represent arbritrary models, mainly for 3D rendering
exports.moduleModelsSchema = zod_1.z.record(zod_1.z.object({
    modelID: zod_1.z.string(),
    pose: pose_1.poseSchema // Relative to bot origin
}));
exports.moduleStateSchema = zod_1.z.object({
    type: exports.moduleTypeLiteralsSchema,
    state: exports.moduleDataSchema,
    moduleModels: exports.moduleModelsSchema, // Models specific to the module
}).refine((data) => {
    // Check that the module type matches the module state
    const moduleType = data.type;
    const moduleState = data.state;
    const moduleDataSchema = exports.moduleTypeToDataSchema[moduleType];
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
