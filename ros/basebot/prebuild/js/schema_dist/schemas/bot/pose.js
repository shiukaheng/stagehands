"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.poseSchema = void 0;
const zod_1 = require("zod");
// Generic pose
exports.poseSchema = zod_1.z.object({
    position: zod_1.z.number().array().length(3),
    quaternion: zod_1.z.number().array().length(4),
});
