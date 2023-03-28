var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import id from "uuid-readable";
// Import uuidv4
import { v4 as uuidv4 } from "uuid";
// Get async fs
import fs from "fs/promises";
import path from "path";
import os from "os";
/**
 * Generate a random memorable name
 * @returns A random name in camelCase
 */
function generateName() {
    const words = id.short(uuidv4()).split(" ");
    // Capitalize the first letter of each word
    const capitalized = words.map(word => word[0].toUpperCase() + word.slice(1));
    // Return first 4 words in camelCase
    return capitalized.slice(0, 4).join("");
}
function readName(cachePath) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if file exists
        const resolvedPath = cachePath ? path.resolve(cachePath) : path.resolve(os.homedir(), "stagehands-config", "name.json");
        let file;
        try {
            file = yield fs.readFile(resolvedPath, "utf-8");
        }
        catch (err) {
            return null;
        }
        // If it does, read it
        try {
            return JSON.parse(file);
        }
        catch (err) {
            return null;
        }
    });
}
function writeName(name, cachePath) {
    return __awaiter(this, void 0, void 0, function* () {
        // Resolve path
        const resolvedPath = cachePath ? path.resolve(cachePath) : path.resolve(os.homedir(), "stagehands-config", "name.json");
        // Write file and overwrite if it exists
        yield fs.mkdir(path.dirname(resolvedPath), { recursive: true });
        try {
            yield fs.writeFile(resolvedPath, JSON.stringify(name), { flag: "w" });
        }
        catch (err) {
            throw err;
        }
        return;
    });
}
/**
 * Get the device's name, which is cached on a json file
 * @returns The device's name
 */
export function getName(cachePath) {
    return __awaiter(this, void 0, void 0, function* () {
        // Read name from cache
        const name = yield readName(cachePath);
        // If it exists, return it
        if (name)
            return name;
        // Otherwise, generate a new name
        const newName = generateName();
        // Write it to the cache
        yield writeName(newName, cachePath);
        // Return it
        return newName;
    });
}
