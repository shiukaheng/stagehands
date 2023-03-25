import { TopicClient } from "webtopics";
export declare class PairingClient {
    private mdns;
    private name;
    private ips;
    constructor();
    startAdvertise(): Promise<void>;
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
