export declare class PairingClient {
    private mdns;
    private name;
    private ip;
    constructor();
    startAdvertise(): Promise<void>;
    stopAdvertise(): Promise<void>;
}
export declare class PairingServer {
    private mdns;
    /**
     * Getter $mdns
     * @return {makeMdns.MulticastDNS}
     */
    private dnsMap;
    private pointerMap;
    private dnsPortMap;
    constructor();
    getDnsMap(): Map<string, string>;
    getdnsPortMap(): Map<string, number>;
    updatePointerMap(key: string, value: string): void;
    startDiscoverListener(): void;
    sendDiscoveryPacket(): void;
}
