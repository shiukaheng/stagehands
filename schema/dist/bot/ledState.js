"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEDStateSchema = exports.LEDAnimationSchema = exports.LEDAnimationModeLiteralsSchema = exports.LEDOverwriteModeLiteralsSchema = exports.ledRGBValueSchema = void 0;
const zod_1 = require("zod");
exports.ledRGBValueSchema = zod_1.z.number().array().length(3);
exports.LEDOverwriteModeLiteralsSchema = zod_1.z.union([
    zod_1.z.literal("serverOverwrite"),
    zod_1.z.literal("clientOverwrite"),
]);
exports.LEDAnimationModeLiteralsSchema = zod_1.z.union([
    zod_1.z.literal("stable"),
    zod_1.z.literal("Flashing"),
]);
exports.LEDAnimationSchema = zod_1.z.object({
    animationMode: exports.LEDAnimationModeLiteralsSchema,
    flashingFrequency: zod_1.z.number().optional(),
});
exports.LEDStateSchema = zod_1.z.object({
    ledOverwriteMode: exports.LEDOverwriteModeLiteralsSchema,
    rgbValue: LEDRGBValueSchema,
    ledAnimation: exports.LEDAnimationSchema,
});
