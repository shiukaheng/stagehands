"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStageBoundaryServiceChannel = exports.updateStageBoundaryServiceChannel = exports.createStageBoundaryServiceChannel = exports.deleteStageBoundaryRequestSchema = exports.updateStageBoundaryRequestSchema = exports.createStageBoundaryRequestSchema = void 0;
const zod_1 = require("zod");
const serverResponse_1 = require("../../serverResponse");
const webtopics_1 = require("webtopics");
const stageState_1 = require("../../stage/stageState");
exports.createStageBoundaryRequestSchema = zod_1.z.object({
    stageBoundaryId: zod_1.z.string(),
    stageBoundary: stageState_1.stageBoundarySchema
});
exports.updateStageBoundaryRequestSchema = zod_1.z.object({
    stageBoundaryId: zod_1.z.string(),
    stageBoundary: stageState_1.stageBoundarySchema
});
exports.deleteStageBoundaryRequestSchema = zod_1.z.object({
    stageBoundaryId: zod_1.z.string(),
});
exports.createStageBoundaryServiceChannel = (0, webtopics_1.createService)("createStageBoundary", exports.createStageBoundaryRequestSchema, serverResponse_1.responseMessageSchema);
exports.updateStageBoundaryServiceChannel = (0, webtopics_1.createService)("createStageBoundary", exports.updateStageBoundaryRequestSchema, serverResponse_1.responseMessageSchema);
exports.deleteStageBoundaryServiceChannel = (0, webtopics_1.createService)("createStageBoundary", exports.deleteStageBoundaryRequestSchema, serverResponse_1.responseMessageSchema);
