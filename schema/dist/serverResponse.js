"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMessageSchema = exports.responseType = void 0;
const zod_1 = require("zod");
exports.responseType = zod_1.z.union([zod_1.z.literal("error"), zod_1.z.literal("success")]);
exports.responseMessageSchema = zod_1.z.object({
    responseType: zod_1.z.string(),
    message: zod_1.z.string(),
    responseData: zod_1.z.any().optional(),
});
