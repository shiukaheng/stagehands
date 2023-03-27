"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stageBoundarySchema = void 0;
const zod_1 = require("zod");
exports.stageBoundarySchema = zod_1.z.object({
    polygonVertexCoordinates: zod_1.z.number().array().length(2).array(), // assuming stageBoundary would be polygon
});
