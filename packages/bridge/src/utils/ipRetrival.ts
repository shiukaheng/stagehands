import os from "os";

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