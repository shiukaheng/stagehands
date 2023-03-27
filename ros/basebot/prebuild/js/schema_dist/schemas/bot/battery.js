"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batteryStatusSchema = exports.batteryPercentageSchema = void 0;
const zod_1 = require("zod");
// Battery state
exports.batteryPercentageSchema = zod_1.z.number();
exports.batteryStatusSchema = zod_1.z.object({
    batteryPercentage: exports.batteryPercentageSchema,
});
