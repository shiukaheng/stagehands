import makeMdns from "multicast-dns"
import { getName } from "./name";
import { retrieveIps } from "../../bridge/src/utils/ipRetrival"
import { SrvAnswer } from "dns-packet";
import { TopicClient } from "webtopics";
import { io } from "socket.io-client";
// Get IP address of the device on the local network 

let mdns = makeMdns();
function getMdns() {
    return mdns;
}


export class PairingClient {
    private mdns: makeMdns.MulticastDNS;
    private name: string | null;
    private ip: string = "172.0.0.1"
    private ips: string[];
    constructor() {
        this.name = null;
        this.mdns = getMdns();
        this.ips = retrieveIps();
        console.log(this.ips)
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
                })
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

type StageHandsService = {
    name: string,
    host: string,
    port: number,
}

export class PairingServer {
    private mdns: makeMdns.MulticastDNS;

    /**
     * Getter $mdns
     * @return {makeMdns.MulticastDNS}
     */

    private dnsMap: Map<string, string> = new Map(); // A map of all domain names to IP addresses, no need to use as system already resolves them
    private pointerMap: Map<string, string[]> = new Map(); // A map that points a particular service to a list of devices
    private stagehandsServices: Map<string, StageHandsService> = new Map(); // A map of all stagehands services, using ip and service name concatenated as unique keys
    constructor() {
        this.mdns = getMdns();
    }

    // Updates the pointer map given a key and value
    updatePointerMap(key: string, value: string) {
        if (this.pointerMap.has(key)) {
            const values = this.pointerMap.get(key);
            if (values && !values.includes(value)) { // Check if the value is already in the list
                values.push(value); // Add the value to the list
                this.pointerMap.set(key, values); // Update the map
            }
        } else {
            this.pointerMap.set(key, [value]);
            // This is guaranteed to be a new service
        }
    }

    startDiscoverListener() {
        // Discover stagehands_pairing services on the local network
        this.mdns.on('response', (response) => { // Handles all responses from the network
            const answers = response.answers;
            for (const answer of answers) {
                if (answer.type === 'A') { // For resolving domain names to IP addresses - DOESNT HAVE TO BE USED
                    this.dnsMap.set(answer.name, answer.data); // Add the IP address to the map
                } else if (answer.type === 'SRV') { // Answers that tell you about a particular service's host and port
                    this.addService(answer);
                } else if (answer.type === 'PTR' && answer.name !== '_stagehands_pairing._tcp.local') { // Answers that tell you about a particular service that is available
                    this.updatePointerMap(answer.name, answer.data); // Add the service to the pointer map
                }
            }
        });
    }

    private addService(answer: SrvAnswer) {
        const key = `${answer.data.target}${answer.name}`;
        const service: StageHandsService = {
            name: answer.name,
            host: answer.data.target,
            port: answer.data.port
        }
        // Check if the service is already in the map, its a new discovery
        if (!this.stagehandsServices.has(key)) {
            console.log(answer)
        }
        this.stagehandsServices.set(`${answer.data.target}${answer.name}`, service);
    }

    private connectBotPairingService(service: StageHandsService) {
        // Connect to the bot pairing service
        const socket = io(`http://${service.host}:${service.port}`)
        const topicClient = new TopicClient(socket);
        socket.on('disconnect', () => {
            console.log('Disconnected from bot pairing service');
        });
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

const client = new PairingClient();
client.startAdvertise();

setTimeout(() => {
    const server = new PairingServer();
    server.startDiscoverListener();
    server.sendDiscoveryPacket();
}, 100);