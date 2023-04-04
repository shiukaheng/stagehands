"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PairingServer = void 0;
const webtopics_1 = require("webtopics");
const socket_io_client_1 = require("socket.io-client");
const multicast_dns_1 = __importDefault(require("multicast-dns"));
const defaultPairingServerOptions = {
    logDebug: false
};
class PairingServer {
    constructor(options = defaultPairingServerOptions) {
        /**
         * Getter $mdns
         * @return {makeMdns.MulticastDNS}
         */
        this.dnsMap = new Map(); // A map of all domain names to IP addresses, no need to use as system already resolves them
        this.pointerMap = new Map(); // A map that points a particular service to a list of devices
        this.servicesMap = new Map();
        this.stagehandServices = new Set();
        this.availableBots = new Map();
        this.botChangeListeners = new Set();
        this.options = Object.assign(Object.assign({}, defaultPairingServerOptions), options);
        this.mdns = (0, multicast_dns_1.default)();
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
            this.options.logDebug && console.log(answers);
            for (const answer of answers) {
                if (answer.type === 'A') { // For resolving domain names to IP addresses - DOESNT HAVE TO BE USED
                    // If doesnt start with 192.168.194 (zerotier stuff)
                    if (!answer.data.startsWith('192.168.194')) {
                        this.dnsMap.set(answer.name, answer.data); // Add the IP address to the map
                        this.options.logDebug && console.log(`🌍 DNS: ${answer.name} -> ${answer.data}`);
                    }
                }
                else if (answer.type === 'SRV') { // Answers that declare a certain service
                    this.servicesMap.set(answer.name, { name: answer.name, host: answer.data.target, port: answer.data.port });
                    this.options.logDebug && console.log(`🎀 Service: ${answer.name} -> ${answer.data.target}:${answer.data.port}`);
                }
                else if (answer.type === 'PTR') { // Answers that declare a host runs a type of service
                    this.updatePointerMap(answer.name, answer.data); // Add the service to the pointer map
                    this.options.logDebug && console.log(`👆 Service Pointer: ${answer.name} -> ${answer.data}`);
                }
            }
        });
    }
    onNewServicePointer(key, service_name, tries = 3) {
        var _a;
        if (key === "_stagehands_pairing._tcp.local") {
            const service = this.servicesMap.get(service_name);
            if (service === undefined) {
                // Remove service pointer
                if (tries <= 0) {
                    (_a = this.pointerMap.get(key)) === null || _a === void 0 ? void 0 : _a.delete(service_name);
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
        var _a;
        // Connect to the bot pairing service
        const host = (_a = this.dnsMap.get(service.host)) !== null && _a !== void 0 ? _a : service.host; // Lookup in case the host OS doesn't resolve it (Windows)
        const socket = (0, socket_io_client_1.io)(`http://${host}:${service.port}`);
        const topicClient = new webtopics_1.TopicClient(socket);
        const botName = service.name;
        console.log("Trying to connect to bot...", botName.replace("._stagehands_pairing._tcp.local", ""), " at ", host, " on port ", service.port);
        socket.on('connect', () => {
            // console.log('Connected to bot pairing service');
            // Add to available bots
            this.availableBots.set(botName, topicClient);
            this.updateListeners();
        });
        socket.on('disconnect', () => {
            var _a;
            console.log('Disconnected from bot pairing service');
            (_a = this.pointerMap.get("_stagehands_pairing._tcp.local")) === null || _a === void 0 ? void 0 : _a.delete(service.name);
            // Remove from available bots
            this.availableBots.delete(botName);
            this.updateListeners();
            socket.close();
        });
    }
    updateListeners() {
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
    subBots(listener) {
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
exports.PairingServer = PairingServer;
