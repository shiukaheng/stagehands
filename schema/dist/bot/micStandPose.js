"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.micStandPoseSchema = void 0;
const zod_1 = require("zod");
exports.micStandPoseSchema = zod_1.z.object({
    gripPosition: zod_1.z.number(),
});
