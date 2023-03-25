import os from "os";
import net from "net";
import chalk from "chalk";
// Get all the IPs
function retrieveIps() {
    const interfaces = os.networkInterfaces();
    const ips = [];
    for (const name of Object.keys(interfaces)) {
        for (const net of interfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                ips.push(net.address);
            }
        }
    }
    return ips;
}
// Get system architecture
function getArch() {
    return os.arch();
}
/**
 * @param port Port to check
 * @param host Hostname, defaults to localhost
 * @returns Promise that resolves to true if port is available, false otherwise
 */
async function portInUse(port, host = 'localhost', timeout = 50) {
    return new Promise((resolve, reject) => {
        const client = net.createConnection({ port, host });
        client.setTimeout(timeout); // set timeout to specified value (in milliseconds)
        client.on('connect', () => {
            client.end();
            resolve(true);
        });
        client.on('timeout', () => {
            client.destroy();
            reject(new Error(`Connection to ${host}:${port} timed out`));
        });
        client.on('error', (err) => {
            client.destroy();
            if (err.message.includes('ECONNREFUSED')) {
                resolve(false);
            }
            else {
                reject(err);
            }
        });
    });
}
const ports = {
    "bridge": 2324,
    "pairing": 3435,
    "ui": 5056,
    "mapUpload": 4565,
    "rosCore": 11311
};
// Bold and bright cyan
console.log("\n");
console.log(chalk.cyanBright.bold("=== System information ==="));
console.log(`Operating System: ${chalk.yellowBright(os.type())} ${chalk.yellowBright(os.release())}`);
console.log(`Architecture: ${chalk.yellowBright(getArch())}`);
console.log(`Hostname: ${chalk.yellowBright(os.hostname())}`);
console.log(`IPs: ${chalk.yellowBright(retrieveIps().join(", "))}`);
console.log(`Node.js version: ${chalk.yellowBright(process.version)}`);
console.log("\n");
console.log(chalk.cyanBright.bold("=== Services running ==="));
const bridgeRunning = await portInUse(ports.bridge);
console.log(`Bridge (${ports.bridge}): ${bridgeRunning ? chalk.greenBright("Running") : chalk.redBright("Not running")}`);
const pairingRunning = await portInUse(ports.pairing);
console.log(`Pairing service (${ports.pairing}): ${pairingRunning ? chalk.greenBright("Running") : chalk.redBright("Not running")}`);
const uiRunning = await portInUse(ports.ui);
console.log(`UI (${ports.ui}): ${uiRunning ? chalk.greenBright("Running") : chalk.redBright("Not running")}`);
const mapUploadRunning = await portInUse(ports.mapUpload);
console.log(`Map upload service (${ports.mapUpload}): ${mapUploadRunning ? chalk.greenBright("Running") : chalk.redBright("Not running")}`);
const rosCoreRunning = await portInUse(ports.rosCore);
console.log(`ROS core (${ports.rosCore}): ${rosCoreRunning ? chalk.greenBright("Running") : chalk.redBright("Not running")}`);
