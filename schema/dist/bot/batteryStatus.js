"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batteryStatusSchema = exports.batteryLevelLiteralsSchema = exports.batteryPercentageSchema = void 0;
const zod_1 = require("zod");
exports.batteryPercentageSchema = zod_1.z.number();
exports.batteryLevelLiteralsSchema = zod_1.z.union([
    zod_1.z.literal("low"),
    zod_1.z.literal("medium"),
    zod_1.z.literal("high"),
]);
exports.batteryStatusSchema = zod_1.z.object({
    batteryPercentage: exports.batteryPercentageSchema,
    batteryLevel: exports.batteryLevelLiteralsSchema,
});
