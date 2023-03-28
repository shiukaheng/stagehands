type Unsubscriber = () => void;
/**
 * Retrieves all IPv4 addresses of the current machine.
 * @returns An array of IPv4 addresses.
 * @throws An error if no IP addresses are found.
 */
export declare function retrieveIps(): string[];
export interface IPairingClientOptions {
    pairingPort: number;
    periodicAdvertisementInterval: number;
}
export declare const defaultPairingClientOptions: IPairingClientOptions;
export type PairingRequestArgs = {
    bridgeIp: string;
    bridgePort: number;
};
export type PairingListener = (args: PairingRequestArgs) => void;
export type DisconnectionListener = () => void;
export declare class PairingClient {
    private mdns;
    private name;
    private ips;
    private ioServer;
    private webTopicsServer;
    private options;
    private pairingSubscribers;
    private disconnectionSubscribers;
    private periodicAdvertisementInterval;
    constructor(options?: Partial<IPairingClientOptions>);
    private publishRequest;
    subscribeRequest(listener: PairingListener): Unsubscriber;
    unsubscribeRequest(listener: PairingListener): void;
    private publishDisconnect;
    subscribeDisconnect(listener: DisconnectionListener): Unsubscriber;
    unsubscribeDisconnect(listener: DisconnectionListener): void;
    startAdvertise(): Promise<void>;
    periodicAdvertise(): void;
    stopAdvertise(): Promise<void>;
}
export {};
