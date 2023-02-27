"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBotLEDStateServiceChannel = exports.setBotLEDStateRequestSchema = void 0;
const zod_1 = require("zod");
const serverResponse_1 = require("../../serverResponse");
const webtopics_1 = require("webtopics");
const ledState_1 = require("../../bot/ledState");
exports.setBotLEDStateRequestSchema = zod_1.z.object({
    LEDId: zod_1.z.string(),
    LEDState: ledState_1.LEDStateSchema
});
exports.setBotLEDStateServiceChannel = (0, webtopics_1.createService)("setLEDState", exports.setBotLEDStateRequestSchema, serverResponse_1.responseMessageSchema);
