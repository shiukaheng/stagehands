import { TopicClient } from "webtopics";
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
export type Listener = (new_clients: Map<string, TopicClient>) => void;
type Unsubscriber = () => void;
export declare class PairingServer {
    private mdns;
    /**
     * Getter $mdns
     * @return {makeMdns.MulticastDNS}
     */
    private dnsMap;
    private pointerMap;
    private servicesMap;
    private stagehandServices;
    private availableBots;
    private botChangeListeners;
    constructor();
    updatePointerMap(key: string, value: string): void;
    startDiscoverListener(): void;
    private onNewServicePointer;
    private connectBotPairingService;
    private updateListeners;
    /**
     * Function to listen to change of available bots
     * @param listener A listener function called on available bots changing
     * @returns Unsubscriber function
     */
    subBots(listener: Listener): Unsubscriber;
    sendDiscoveryPacket(): void;
}
export {};
