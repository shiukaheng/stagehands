import { getName } from "./name";
import { TopicClient, TopicServer } from "webtopics";
import { io } from "socket.io-client";
import os from "os";
import { Server } from "socket.io";
import { botPairingService, botDisconnectionService } from "schema";
// Get IP address of the device on the local network 
import makeMdns from 'multicast-dns';
var mdns = require('multicast-dns')() as makeMdns.MulticastDNS;
function getMdns() {
    return mdns;
}

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

export interface IPairingClientOptions {
    pairingPort: number;
    periodicAdvertisementInterval: number;
}

export const defaultPairingClientOptions: IPairingClientOptions = {
    pairingPort: 3535,
    periodicAdvertisementInterval: 5000
}

export type PairingRequestArgs = {
    bridgeIp: string,
    bridgePort: number,
}

export type PairingListener = (args: PairingRequestArgs) => void
export type DisconnectionListener = () => void

export class PairingClient {
    private mdns: makeMdns.MulticastDNS;
    private name: string | null;
    private ips: string[];
    private ioServer: Server;
    private webTopicsServer: TopicServer;
    private options: IPairingClientOptions;
    private pairingSubscribers: Set<PairingListener> = new Set();
    private disconnectionSubscribers: Set<DisconnectionListener> = new Set();
    private periodicAdvertisementInterval: NodeJS.Timeout | null = null;

    constructor(options: Partial<IPairingClientOptions> = {}) {
        this.options = { ...defaultPairingClientOptions, ...options };
        this.name = null;
        this.mdns = getMdns();
        this.ips = retrieveIps();

        // Create a webtopics server
        this.ioServer = new Server(this.options.pairingPort, {
            cors: {
                origin: "*",
            }
        })

        // Create a webtopics server
        this.webTopicsServer = new TopicServer(this.ioServer);

        // Implement services
        this.webTopicsServer.srv(botPairingService, ({bridgeIp, bridgePort}) => {
            this.publishRequest({bridgeIp, bridgePort});
        });

        this.webTopicsServer.srv(botDisconnectionService, () => {
            this.publishDisconnect();
        });
    }

    private publishRequest(args: PairingRequestArgs) {
        this.pairingSubscribers.forEach((listener) => listener(args));
    }

    subscribeRequest(listener: PairingListener): Unsubscriber {
        this.pairingSubscribers.add(listener);
        return () => this.pairingSubscribers.delete(listener);
    }

    unsubscribeRequest(listener: PairingListener) {
        this.pairingSubscribers.delete(listener);
    }

    private publishDisconnect() {
        this.disconnectionSubscribers.forEach((listener) => listener());
    }

    subscribeDisconnect(listener: DisconnectionListener): Unsubscriber {
        this.disconnectionSubscribers.add(listener);
        return () => this.disconnectionSubscribers.delete(listener);
    }

    unsubscribeDisconnect(listener: DisconnectionListener) {
        this.disconnectionSubscribers.delete(listener);
    }   

    async startAdvertise() {
        // Advertise stagehands_pairing service
        this.name = await getName();
        console.log(`Advertising stagehands_pairing service as ${this.name}-stagehands.local`);
        this.mdns.on('query', (query) => {
            let deviceAns = [];
            for (const ip of this.ips) {
                deviceAns.push({
                    name: `${this.name}-stagehands.local`,
                    type: 'A',
                    ttl: 300,
                    data: ip
                })
            }
            const [question] = query.questions;
            if (question && question.type === 'PTR' && question.name === '_stagehands_pairing._tcp.local') {
                console.log('Responding to stagehands_pairing query');
                this.mdns.respond({
                    answers: [{
                        name: '_stagehands_pairing._tcp.local',
                        type: 'PTR',
                        data: `${this.name} Pairing Service._stagehands_pairing._tcp.local`
                    }, {
                        name: `${this.name} Pairing Service._stagehands_pairing._tcp.local`,
                        type: 'SRV',
                        data: {
                            port: 3535,
                            weight: 0,
                            priority: 0,
                            target: `${this.name}-stagehands.local`
                        }
                    },
                    //@ts-ignore
                    ...deviceAns
                    ]
                });
            }
        });
        this.periodicAdvertisementInterval = setInterval(
            () => this.periodicAdvertise(), this.options.periodicAdvertisementInterval);
    }

    periodicAdvertise() {
        const deviceAns = [];
        for (const ip of this.ips) {
            deviceAns.push({
                name: `${this.name}-stagehands.local`,
                type: 'A',
                ttl: 300,
                data: ip
            })
        }
        console.log('Periodic advertisement');
        this.mdns.respond({
            answers: [{
                name: '_stagehands_pairing._tcp.local',
                type: 'PTR',
                data: `${this.name} Pairing Service._stagehands_pairing._tcp.local`
            }, {
                name: `${this.name} Pairing Service._stagehands_pairing._tcp.local`,
                type: 'SRV',
                data: {
                    port: 3535,
                    weight: 0,
                    priority: 0,
                    target: `${this.name}-stagehands.local`
                }
            },
            //@ts-ignore
            ...deviceAns
            ]
        });
    }

    async stopAdvertise() {
        // Stop advertising stagehands_pairing service
        this.mdns.destroy();
        if (this.periodicAdvertisementInterval) {
            clearInterval(this.periodicAdvertisementInterval);
            this.periodicAdvertisementInterval = null;
        }
    }
}

type Service = {
    name: string,
    host: string,
    port: number,
}

export type Listener = (new_clients: Map<string, TopicClient>) => void

type Unsubscriber = () => void

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
    constructor() {
        this.mdns = getMdns();
    }

    // Updates the pointer map given a key and value
    updatePointerMap(key: string, value: string) {
        if (this.pointerMap.has(key)) { // If the type of service already has an set
            const valueSet = this.pointerMap.get(key) as Set<string>;
            if (valueSet.has(value)) {
                // Do nothing
            } else {
                valueSet.add(value)
                this.onNewServicePointer(key, value)
            }
        } else { // If it doesn't, lets just add it
            this.pointerMap.set(key, new Set([value])); // This is guaranteed to be a new service
            this.onNewServicePointer(key, value);
        }
    }

    // Handling of responses from the network
    startDiscoverListener() {
        // Discover stagehands_pairing services on the local network
        this.mdns.on('response', (response) => { // Handles all responses from the network
            const answers = response.answers;
            for (const answer of answers) {
                if (answer.type === 'A') { // For resolving domain names to IP addresses - DOESNT HAVE TO BE USED
                    this.dnsMap.set(answer.name, answer.data); // Add the IP address to the map
                } else if (answer.type === 'SRV') { // Answers that declare a certain service
                    this.servicesMap.set(answer.name, { name: answer.name, host: answer.data.target, port: answer.data.port })
                } else if (answer.type === 'PTR') { // Answers that declare a host runs a type of service
                    this.updatePointerMap(answer.name, answer.data); // Add the service to the pointer map
                    // console.log(answer)
                }
            }
        });
    }

    private onNewServicePointer(key: string, service_name: string, tries = 3) {
        if (key === "_stagehands_pairing._tcp.local") {
            const service = this.servicesMap.get(service_name)
            if (service === undefined) {
                // Remove service pointer
                if (tries <= 0) {
                    this.pointerMap.get(key)?.delete(service_name)
                } else {
                    // Retry
                    setTimeout(() => {
                        this.onNewServicePointer(key, service_name, tries - 1)
                    }, 100)
                }
            } else {
                this.stagehandServices.add(service)
                this.connectBotPairingService(service)
            }
        }
    }

    private connectBotPairingService(service: Service) {
        // Connect to the bot pairing service
        const host = this.dnsMap.get(service.host) ?? service.host // Lookup in case the host OS doesn't resolve it (Windows)
        const socket = io(`http://${host}:${service.port}`)
        const topicClient = new TopicClient(socket);
        const botName = service.name
        console.log("Trying to connect to bot...", botName.replace("._stagehands_pairing._tcp.local", ""))
        socket.on('connect', () => {
            console.log('Connected to bot pairing service')
            // Add to available bots
            this.availableBots.set(botName, topicClient)
            this.updateListeners()
        })
        socket.on('disconnect', () => {
            console.log('Disconnected from bot pairing service');
            // Remove from available bots
            this.availableBots.delete(botName)
            this.updateListeners()
        });
    }

    private updateListeners() {
        this.botChangeListeners.forEach((listener) => {
            listener(this.availableBots)
        })
    }

    /**
     * Function to listen to change of available bots
     * @param listener A listener function called on available bots changing
     * @returns Unsubscriber function
     */
    subBots(listener: Listener): Unsubscriber {
        this.botChangeListeners.add(listener)
        return () => {
            this.botChangeListeners.delete(listener)
        }
    }

    sendDiscoveryPacket() {
        // Send a discovery packet
        this.mdns.query({
            questions: [{
                type: 'PTR',
                name: '_stagehands_pairing._tcp.local'
            }]
        });
    }
}