"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joystickStateSchema = void 0;
const zod_1 = require("zod");
exports.joystickStateSchema = zod_1.z.object({
    x: zod_1.z.number(),
    y: zod_1.z.number(),
    in_use_by: zod_1.z.string().nullable(),
});
