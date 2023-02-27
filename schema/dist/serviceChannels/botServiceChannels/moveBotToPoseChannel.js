"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveBotToPoseServiceChannel = exports.moveBotToPoseRequestSchema = void 0;
const zod_1 = require("zod");
const serverResponse_1 = require("../../serverResponse");
const webtopics_1 = require("webtopics");
const botState_1 = require("../../bot/botState");
exports.moveBotToPoseRequestSchema = zod_1.z.object({
    botPose: botState_1.botPoseSchema
});
exports.moveBotToPoseServiceChannel = (0, webtopics_1.createService)("moveBotToPose", exports.moveBotToPoseRequestSchema, serverResponse_1.responseMessageSchema);
