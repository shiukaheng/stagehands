"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleStateSchema = exports.modulePoseSchema = void 0;
const zod_1 = require("zod");
const micStandPose_1 = require("./micStandPose");
exports.modulePoseSchema = micStandPose_1.micStandPoseSchema; //Should be an union with more moduleSchemas
exports.moduleStateSchema = zod_1.z.object({
    type: zod_1.z.string(),
    moduleData: zod_1.z.any(),
    modulePose: exports.modulePoseSchema,
});
