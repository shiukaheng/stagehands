import os from "os";
const interfaces = os.networkInterfaces();
export function retrieveIps() {
    const allAddressses = [];
    for (const interfaceName of Object.keys(interfaces)) {
        const addresses = interfaces[interfaceName];
        if (addresses === undefined) {
            throw new Error("not ip found");
        }
        else {
            for (const address of addresses) {
                if (address.family === "IPv4" && !address.internal) {
                    allAddressses.push(address.address);
                }
            }
        }
    }
    return allAddressses;
}
export function getNetworkPortion(ipAddress) {
    const subnetMask = "255.255.255.0";
    const maskOctets = subnetMask.split(".").map(Number);
    const ipOctets = ipAddress.split(".").map(Number);
    // Perform the bitwise AND operation between the IP address and subnet mask
    const networkOctets = ipOctets.map((octet, i) => octet & maskOctets[i]);
    // Convert the network portion back to a string
    const networkAddress = networkOctets.join(".");
    return networkAddress;
}
