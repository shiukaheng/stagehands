import os from "os";

/**
 * Retrieves all IPv4 addresses of the current machine.
 * @returns An array of IPv4 addresses.
 * @throws An error if no IP addresses are found.
 */
export function retrieveIps(): string[] {
    const interfaces = os.networkInterfaces();
    const allAddresses: string[] = [];
    for (const interfaceName of Object.keys(interfaces)) {
        const addresses = interfaces[interfaceName];
        if (addresses === undefined) {
            throw new Error("No IP address found");
        } else {
            for (const address of addresses) {
                if (address.family === "IPv4" && !address.internal) {
                    allAddresses.push(address.address);
                }
            }
        }
    }
    return allAddresses;
}

/**
 * Retrieves the network portion of an IPv4 address.
 * @param ipAddress - The IPv4 address.
 * @returns The network portion of the IPv4 address.
 */
export function getNetworkPortion(ipAddress: string): string {
    const subnetMask = "255.255.255.0";
    const maskOctets = subnetMask.split(".").map(Number);
    const ipOctets = ipAddress.split(".").map(Number);

    // Perform the bitwise AND operation between the IP address and subnet mask
    const networkOctets = ipOctets.map((octet, i) => octet & maskOctets[i]);

    // Convert the network portion back to a string
    const networkAddress = networkOctets.join(".");
    return networkAddress;
}