import { TopicClient } from "webtopics";
import { io } from "socket.io-client";
import makeMdns from 'multicast-dns';

type Service = {
    name: string;
    host: string;
    port: number;
};

export type Listener = (new_clients: Map<string, TopicClient>) => void;
type Unsubscriber = () => void;

export type IPairingServerOptions = {
    logDebug: boolean;
}

const defaultPairingServerOptions: IPairingServerOptions = {
    logDebug: false
}

export class PairingServer {
    private mdns: makeMdns.MulticastDNS;

    /**
     * Getter $mdns
     * @return {makeMdns.MulticastDNS}
     */
    private dnsMap: Map<string, string> = new Map(); // A map of all domain names to IP addresses, no need to use as system already resolves them
    private pointerMap: Map<string, Set<string>> = new Map(); // A map that points a particular service to a list of devices
    private servicesMap: Map<string, Service> = new Map();
    private stagehandServices: Set<Service> = new Set();
    private availableBots: Map<string, TopicClient> = new Map();
    private botChangeListeners: Set<Listener> = new Set();
    private options: IPairingServerOptions;

    constructor(options: IPairingServerOptions = defaultPairingServerOptions) {
    this.options = { ...defaultPairingServerOptions, ...options}
        this.mdns = makeMdns();
    }

    // Updates the pointer map given a key and value
    updatePointerMap(key: string, value: string) {
        if (this.pointerMap.has(key)) { // If the type of service already has an set
            const valueSet = this.pointerMap.get(key) as Set<string>;
            if (valueSet.has(value)) {
                // Do nothing
            } else {
                valueSet.add(value);
                this.onNewServicePointer(key, value);
            }
        } else { // If it doesn't, lets just add it
            this.pointerMap.set(key, new Set([value])); // This is guaranteed to be a new service
            this.onNewServicePointer(key, value);
        }
    }

    // Handling of responses from the network
    startDiscoverListener() {
        // Discover stagehands_pairing services on the local network
        this.mdns.on('response', (response) => {
            const answers = response.answers;
            this.options.logDebug && console.log(answers);
            for (const answer of answers) {
                if (answer.type === 'A') { // For resolving domain names to IP addresses - DOESNT HAVE TO BE USED
                    // If doesnt start with 192.168.194 (zerotier stuff)
                    if (!answer.data.startsWith('192.168.194')) {
                        this.dnsMap.set(answer.name, answer.data); // Add the IP address to the map
                        this.options.logDebug && console.log(`🌍 DNS: ${answer.name} -> ${answer.data}`);
                    }
                } else if (answer.type === 'SRV') { // Answers that declare a certain service
                    this.servicesMap.set(answer.name, { name: answer.name, host: answer.data.target, port: answer.data.port });
                    this.options.logDebug && console.log(`🎀 Service: ${answer.name} -> ${answer.data.target}:${answer.data.port}`);
                } else if (answer.type === 'PTR') { // Answers that declare a host runs a type of service
                    this.updatePointerMap(answer.name, answer.data); // Add the service to the pointer map
                    this.options.logDebug && console.log(`👆 Service Pointer: ${answer.name} -> ${answer.data}`);
                }
            }
        });
    }

    private onNewServicePointer(key: string, service_name: string, tries = 3) {
        if (key === "_stagehands_pairing._tcp.local") {
            const service = this.servicesMap.get(service_name);
            if (service === undefined) {
                // Remove service pointer
                if (tries <= 0) {
                    this.pointerMap.get(key)?.delete(service_name);
                } else {
                    // Retry
                    setTimeout(() => {
                        this.onNewServicePointer(key, service_name, tries - 1);
                    }, 100);
                }
            } else {
                this.stagehandServices.add(service);
                this.connectBotPairingService(service);

                
            }
        }
    }

    private connectBotPairingService(service: Service) {
        // Connect to the bot pairing service
        const host = this.dnsMap.get(service.host) ?? service.host; // Lookup in case the host OS doesn't resolve it (Windows)
        const socket = io(`http://${host}:${service.port}`);
        const topicClient = new TopicClient(socket);
        const botName = service.name;
        console.log("Trying to connect to bot...", botName.replace("._stagehands_pairing._tcp.local", ""), " at ", host, " on port ", service.port);
        socket.on('connect', () => {
            // console.log('Connected to bot pairing service');
            // Add to available bots
            this.availableBots.set(botName, topicClient);
            this.updateListeners();
        });
        socket.on('disconnect', () => {
            console.log('Disconnected from bot pairing service');
            this.pointerMap.get("_stagehands_pairing._tcp.local")?.delete(service.name)
            // Remove from available bots
            this.availableBots.delete(botName);
            this.updateListeners();
            socket.close()
        });
    }

    private updateListeners() {
        // Display bot keys, just show first word of key string (seperated by space)
        console.log("🤖 Updated bot to listeners: " + Array.from(this.availableBots.keys()).map((key) => key.split(" ")[0]).join(", "));
        this.botChangeListeners.forEach((listener) => {
            listener(this.availableBots);
        });
    }

    /**
     * Function to listen to change of available bots
     * @param listener A listener function called on available bots changing
     * @returns Unsubscriber function
     */
    subBots(listener: Listener): Unsubscriber {
        listener(this.availableBots);
        this.botChangeListeners.add(listener);
        return () => {
            this.botChangeListeners.delete(listener);
        };
    }

    sendDiscoveryPacket() {
        // Send a discovery packet
        this.mdns.query({
            questions: [{
                type: 'PTR',
                name: '_stagehands_pairing._tcp.local.'
            }]
        });
    }
}
