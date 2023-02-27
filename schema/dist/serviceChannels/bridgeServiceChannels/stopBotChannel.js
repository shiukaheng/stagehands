"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopBotServiceChannel = exports.stopBotRequestSchema = void 0;
const zod_1 = require("zod");
const serverResponse_1 = require("../../serverResponse");
const webtopics_1 = require("webtopics");
exports.stopBotRequestSchema = zod_1.z.object({
    botId: zod_1.z.string()
});
exports.stopBotServiceChannel = (0, webtopics_1.createService)("stopBot", exports.stopBotRequestSchema, serverResponse_1.responseMessageSchema);