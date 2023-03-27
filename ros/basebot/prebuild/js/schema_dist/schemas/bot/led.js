"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botLEDStateSchema = exports.ledStateSchema = exports.ledAnimationSchema = exports.ledAnimationModeLiteralsSchema = exports.ledRGBValueSchema = void 0;
const zod_1 = require("zod");
// LED state
// Primitives to define color, animation:
exports.ledRGBValueSchema = zod_1.z.number().array().length(3);
exports.ledAnimationModeLiteralsSchema = zod_1.z.union([
    zod_1.z.literal("constant"),
    zod_1.z.literal("flashing"),
]);
exports.ledAnimationSchema = zod_1.z.object({
    animationMode: exports.ledAnimationModeLiteralsSchema,
    flashingFrequency: zod_1.z.number().optional(),
});
// Combining animation and color to define the state:
exports.ledStateSchema = zod_1.z.object({
    rgbValue: exports.ledRGBValueSchema,
    ledAnimation: exports.ledAnimationSchema,
});
// Creating the actual robotic LED state to allow overrides:
exports.botLEDStateSchema = zod_1.z.object({
    // The default color / state for the bot
    base: exports.ledStateSchema,
    // System override for displaying errors, etc
    systemOverride: exports.ledStateSchema.optional(),
});
