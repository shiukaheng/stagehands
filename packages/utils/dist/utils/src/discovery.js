import makeMdns from "multicast-dns";
import { getName } from "./name";
import { retrieveIps } from "../../bridge/src/utils/ipRetrival";
import { TopicClient } from "webtopics";
import { io } from "socket.io-client";
// Get IP address of the device on the local network 
let mdns = makeMdns();
function getMdns() {
    return mdns;
}
export class PairingClient {
    mdns;
    name;
    ips;
    constructor() {
        this.name = null;
        this.mdns = getMdns();
        this.ips = retrieveIps();
    }
    async startAdvertise() {
        // Advertise stagehands_pairing service
        this.name = await getName();
        this.mdns.on('query', (query) => {
            let deviceAns = [];
            for (const ip of this.ips) {
                deviceAns.push({
                    name: `${this.name}-stagehands.local`,
                    type: 'A',
                    ttl: 300,
                    data: ip
                });
            }
            const [question] = query.questions;
            if (question && question.type === 'PTR' && question.name === '_stagehands_pairing._tcp.local') {
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
    }
    async stopAdvertise() {
        // Stop advertising stagehands_pairing service
        this.mdns.destroy();
    }
}
export class PairingServer {
    mdns;
    /**
     * Getter $mdns
     * @return {makeMdns.MulticastDNS}
     */
    dnsMap = new Map(); // A map of all domain names to IP addresses, no need to use as system already resolves them
    pointerMap = new Map(); // A map that points a particular service to a list of devices
    servicesMap = new Map();
    stagehandServices = new Set();
    availableBots = new Map();
    botChangeListeners = new Set();
    constructor() {
        this.mdns = getMdns();
    }
    // Updates the pointer map given a key and value
    updatePointerMap(key, value) {
        if (this.pointerMap.has(key)) { // If the type of service already has an set
            const valueSet = this.pointerMap.get(key);
            if (valueSet.has(value)) {
                // Do nothing
            }
            else {
                valueSet.add(value);
                this.onNewServicePointer(key, value);
            }
        }
        else { // If it doesn't, lets just add it
            this.pointerMap.set(key, new Set([value])); // This is guaranteed to be a new service
            this.onNewServicePointer(key, value);
        }
    }
    // Handling of responses from the network
    startDiscoverListener() {
        // Discover stagehands_pairing services on the local network
        this.mdns.on('response', (response) => {
            const answers = response.answers;
            for (const answer of answers) {
                if (answer.type === 'A') { // For resolving domain names to IP addresses - DOESNT HAVE TO BE USED
                    this.dnsMap.set(answer.name, answer.data); // Add the IP address to the map
                }
                else if (answer.type === 'SRV') { // Answers that declare a certain service
                    this.servicesMap.set(answer.name, { name: answer.name, host: answer.data.target, port: answer.data.port });
                }
                else if (answer.type === 'PTR') { // Answers that declare a host runs a type of service
                    this.updatePointerMap(answer.name, answer.data); // Add the service to the pointer map
                    // console.log(answer)
                }
            }
        });
    }
    onNewServicePointer(key, service_name, tries = 3) {
        if (key === "_stagehands_pairing._tcp.local") {
            const service = this.servicesMap.get(service_name);
            if (service === undefined) {
                // Remove service pointer
                if (tries <= 0) {
                    this.pointerMap.get(key)?.delete(service_name);
                }
                else {
                    // Retry
                    setTimeout(() => {
                        this.onNewServicePointer(key, service_name, tries - 1);
                    }, 100);
                }
            }
            else {
                this.stagehandServices.add(service);
                this.connectBotPairingService(service);
            }
        }
    }
    connectBotPairingService(service) {
        // Connect to the bot pairing service
        const host = this.dnsMap.get(service.host) ?? service.host; // Lookup in case the host OS doesn't resolve it (Windows)
        const socket = io(`http://${host}:${service.port}`);
        const topicClient = new TopicClient(socket);
        const botName = service.name;
        console.log("Trying to connect to bot...", botName.replace("._stagehands_pairing._tcp.local", ""));
        socket.on('connect', () => {
            console.log('Connected to bot pairing service');
            // Add to available bots
            this.availableBots.set(botName, topicClient);
            this.updateListeners();
        });
        socket.on('disconnect', () => {
            console.log('Disconnected from bot pairing service');
            // Remove from available bots
            this.availableBots.delete(botName);
            this.updateListeners();
        });
    }
    updateListeners() {
        this.botChangeListeners.forEach((listener) => {
            listener(this.availableBots);
        });
    }
    /**
     * Function to listen to change of available bots
     * @param listener A listener function called on available bots changing
     * @returns Unsubscriber function
     */
    subBots(listener) {
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
                    name: '_stagehands_pairing._tcp.local'
                }]
        });
    }
}
