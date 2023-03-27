import { PairingClient } from "utils";

console.log("ℹ️ Starting bot discovery emulator");
const pairingClient = new PairingClient();
console.log("ℹ️ Pairing client created");
// await pairingClient.startAdvertise()
pairingClient.startAdvertise()