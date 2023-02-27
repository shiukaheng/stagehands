"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTargetBotLEDStateServiceChannel = exports.setTargetBotLEDStateRequestSchema = void 0;
const zod_1 = require("zod");
const serverResponse_1 = require("../../serverResponse");
const webtopics_1 = require("webtopics");
const ledState_1 = require("../../bot/ledState");
exports.setTargetBotLEDStateRequestSchema = zod_1.z.object({
    botId: zod_1.z.string(),
    LEDId: zod_1.z.string(),
    LEDState: ledState_1.LEDStateSchema
});
exports.setTargetBotLEDStateServiceChannel = (0, webtopics_1.createService)("setLEDState", exports.setTargetBotLEDStateRequestSchema, serverResponse_1.responseMessageSchema);
