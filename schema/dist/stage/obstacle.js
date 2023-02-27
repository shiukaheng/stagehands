"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obstacleSchema = void 0;
const zod_1 = require("zod");
exports.obstacleSchema = zod_1.z.object({
    polygonVerticeCoordinates: zod_1.z.number().array().length(2).array(), // assuming obstacle would be polygon
});
