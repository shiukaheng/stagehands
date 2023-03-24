import makeMdns from "multicast-dns";
import { getName } from "./name";
// Get IP address of the device on the local network 
let mdns = makeMdns();
function getMdns() {
    return mdns;
}
export class PairingClient {
    mdns;
    name;
    ip = "172.0.0.1";
    constructor() {
        this.name = null;
        this.mdns = getMdns();
    }
    async startAdvertise() {
        // Advertise stagehands_pairing service
        this.name = await getName();
        this.mdns.on('query', (query) => {
            // console.log('Got a query:', query);
            const [question] = query.questions;
            if (question && question.type === 'PTR' && question.name === '_stagehands_pairing._tcp.local') {
                console.log('✅ Got a query for stagehands_pairing service');
                this.mdns.respond({
                    answers: [{
                            name: '_stagehands_pairing._tcp.local.',
                            type: 'PTR',
                            data: `${this.name} Pairing Service._stagehands_pairing._tcp.local.`
                        }, {
                            name: `${this.name} Pairing Service._stagehands_pairing._tcp.local.`,
                            type: 'SRV',
                            data: {
                                port: 3535,
                                weight: 0,
                                priority: 0,
                                target: `${this.name}-stagehands.local`
                            }
                        }, {
                            name: `${this.name}-stagehands.local`,
                            type: 'A',
                            ttl: 300,
                            data: this.ip
                        }]
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
    dnsMap = new Map();
    pointerMap = new Map();
    dnsPortMap = new Map();
    constructor() {
        this.mdns = getMdns();
    }
    getDnsMap() {
        return this.dnsMap;
    }
    getdnsPortMap() {
        return this.dnsPortMap;
    }
    updatePointerMap(key, value) {
        if (this.pointerMap.has(key)) {
            const values = this.pointerMap.get(key);
            if (values) {
                values.push(value);
                this.pointerMap.set(key, values);
            }
        }
        else {
            this.pointerMap.set(key, [value]);
        }
    }
    startDiscoverListener() {
        // Discover stagehands_pairing services on the local network
        this.mdns.on('response', (response) => {
            const answers = response.answers;
            // if (answer && answer.type === 'PTR' && answer.name === '_stagehands_pairing._tcp.local') {
            //     console.log('✅ Found a stagehands_pairing service');
            // }
            for (const answer of answers) {
                if (answer.type === 'A') {
                    this.dnsMap.set(answer.name, answer.data);
                    console.log('📡 Found a device:', answer.name, answer.data);
                }
                else if (answer.type === 'SRV') {
                    this.dnsMap.set(answer.data.target, answer.data.target);
                    this.dnsPortMap.set(answer.data.target, answer.data.port);
                    console.log('📡 Found a stagehands_pairing service:', answer.data.target, answer.data.target);
                }
                else if (answer.type === 'PTR' && answer.name !== '_stagehands_pairing._tcp.local') {
                    this.updatePointerMap(answer.name, answer.data);
                    console.log('📡 Found a pointer:', answer.data, answer.name);
                }
            }
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
        console.log('Sent a discovery packet');
    }
}
const client = new PairingClient();
client.startAdvertise();
setTimeout(() => {
    const server = new PairingServer();
    server.startDiscoverListener();
    server.sendDiscoveryPacket();
}, 100);
