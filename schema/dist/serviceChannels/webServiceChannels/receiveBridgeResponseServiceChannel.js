"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveBridgeResponseServiceChannel = void 0;
const zod_1 = require("zod");
const serverResponse_1 = require("../../serverResponse");
const webtopics_1 = require("webtopics");
exports.receiveBridgeResponseServiceChannel = (0, webtopics_1.createService)("responseMessage", serverResponse_1.responseMessageSchema, zod_1.z.void());
