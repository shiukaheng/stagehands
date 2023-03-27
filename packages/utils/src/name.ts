import id from "uuid-readable"
// Import uuidv4
import { v4 as uuidv4 } from "uuid"
// Get async fs
import fs from "fs/promises"
import path from "path"
import os from "os"

/**
 * Generate a random memorable name
 * @returns A random name in camelCase
 */
function generateName(): string {
	const words = id.short(uuidv4()).split(" ");
	// Capitalize the first letter of each word
	const capitalized = words.map(word => word[0].toUpperCase() + word.slice(1))
	// Return first 4 words in camelCase
	return capitalized.slice(0, 4).join("");
}

async function readName(cachePath?:string): Promise<string | null> {
	// Check if file exists
	const resolvedPath = cachePath ? path.resolve(cachePath) : path.resolve(os.homedir(), "stagehands-config", "name.json");
	let file: string;
	try {
		file = await fs.readFile(resolvedPath, "utf-8");
	} catch (err) {
		return null;
	}
	// If it does, read it
	try {
		return JSON.parse(file);
	} catch (err) {
		return null;
	}
}

async function writeName(name: string, cachePath?:string): Promise<void> {
	// Resolve path
	const resolvedPath = cachePath ? path.resolve(cachePath) : path.resolve(os.homedir(), "stagehands-config", "name.json");
	// Write file and overwrite if it exists
	try {
		await fs.writeFile(resolvedPath, JSON.stringify(name), { flag: "w" });
	}
	catch (err) {
		throw err;
	}
	return;
}

/**
 * Get the device's name, which is cached on a json file
 * @returns The device's name
 */
export async function getName(cachePath?:string): Promise<string> {
	// Read name from cache
	const name = await readName(cachePath);
	// If it exists, return it
	if (name) return name;
	// Otherwise, generate a new name
	const newName = generateName();
	// Write it to the cache
	await writeName(newName, cachePath);
	// Return it
	return newName;
}