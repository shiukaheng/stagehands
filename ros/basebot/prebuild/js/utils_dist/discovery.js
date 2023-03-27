"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PairingServer = exports.PairingClient = exports.defaultPairingClientOptions = exports.retrieveIps = void 0;
const name_1 = require("./name");
const webtopics_1 = require("webtopics");
const socket_io_client_1 = require("socket.io-client");
const os_1 = __importDefault(require("os"));
const socket_io_1 = require("socket.io");
const schema_1 = require("schema");
var mdns = require('multicast-dns')();
function getMdns() {
    return mdns;
}
/**
 * Retrieves all IPv4 addresses of the current machine.
 * @returns An array of IPv4 addresses.
 * @throws An error if no IP addresses are found.
 */
function retrieveIps() {
    const interfaces = os_1.default.networkInterfaces();
    const allAddresses = [];
    for (const interfaceName of Object.keys(interfaces)) {
        const addresses = interfaces[interfaceName];
        if (addresses === undefined) {
            throw new Error("No IP address found");
        }
        else {
            for (const address of addresses) {
                if (address.family === "IPv4" && !address.internal) {
                    allAddresses.push(address.address);
                }
            }
        }
    }
    return allAddresses;
}
exports.retrieveIps = retrieveIps;
exports.defaultPairingClientOptions = {
    pairingPort: 3535,
    periodicAdvertisementInterval: 5000
};
class PairingClient {
    constructor(options = {}) {
        this.pairingSubscribers = new Set();
        this.disconnectionSubscribers = new Set();
        this.periodicAdvertisementInterval = null;
        this.options = Object.assign(Object.assign({}, exports.defaultPairingClientOptions), options);
        this.name = null;
        this.mdns = getMdns();
        this.ips = retrieveIps();
        // Create a webtopics server
        this.ioServer = new socket_io_1.Server(this.options.pairingPort, {
            cors: {
                origin: "*",
            }
        });
        // Create a webtopics server
        this.webTopicsServer = new webtopics_1.TopicServer(this.ioServer);
        // Implement services
        this.webTopicsServer.srv(schema_1.botPairingService, ({ bridgeIp, bridgePort }) => {
            this.publishRequest({ bridgeIp, bridgePort });
        });
        this.webTopicsServer.srv(schema_1.botDisconnectionService, () => {
            this.publishDisconnect();
        });
    }
    publishRequest(args) {
        this.pairingSubscribers.forEach((listener) => listener(args));
    }
    subscribeRequest(listener) {
        this.pairingSubscribers.add(listener);
        return () => this.pairingSubscribers.delete(listener);
    }
    unsubscribeRequest(listener) {
        this.pairingSubscribers.delete(listener);
    }
    publishDisconnect() {
        this.disconnectionSubscribers.forEach((listener) => listener());
    }
    subscribeDisconnect(listener) {
        this.disconnectionSubscribers.add(listener);
        return () => this.disconnectionSubscribers.delete(listener);
    }
    unsubscribeDisconnect(listener) {
        this.disconnectionSubscribers.delete(listener);
    }
    startAdvertise() {
        return __awaiter(this, void 0, void 0, function* () {
            // Advertise stagehands_pairing service
            this.name = yield (0, name_1.getName)();
            console.log(`Advertising stagehands_pairing service as ${this.name}-stagehands.local`);
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
            this.periodicAdvertisementInterval = setInterval(() => this.periodicAdvertise(), this.options.periodicAdvertisementInterval);
        });
    }
    periodicAdvertise() {
        const deviceAns = [];
        for (const ip of this.ips) {
            deviceAns.push({
                name: `${this.name}-stagehands.local`,
                type: 'A',
                ttl: 300,
                data: ip
            });
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
    stopAdvertise() {
        return __awaiter(this, void 0, void 0, function* () {
            // Stop advertising stagehands_pairing service
            this.mdns.destroy();
            if (this.periodicAdvertisementInterval) {
                clearInterval(this.periodicAdvertisementInterval);
                this.periodicAdvertisementInterval = null;
            }
        });
    }
}
exports.PairingClient = PairingClient;
class PairingServer {
    constructor() {
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
exports.PairingServer = PairingServer;
