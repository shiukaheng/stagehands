"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveTargetBotToPoseServiceChannel = exports.moveTargetBotToPoseRequestSchema = void 0;
const zod_1 = require("zod");
const serverResponse_1 = require("../../serverResponse");
const webtopics_1 = require("webtopics");
const botState_1 = require("../../bot/botState");
exports.moveTargetBotToPoseRequestSchema = zod_1.z.object({
    botId: zod_1.z.string(),
    botPose: botState_1.botPoseSchema
});
exports.moveTargetBotToPoseServiceChannel = (0, webtopics_1.createService)("moveBotToPose", exports.moveTargetBotToPoseRequestSchema, serverResponse_1.responseMessageSchema);
