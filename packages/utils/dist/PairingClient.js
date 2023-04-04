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
exports.PairingClient = exports.defaultPairingClientOptions = exports.retrieveIps = void 0;
const name_1 = require("./name");
const webtopics_1 = require("webtopics");
const os_1 = __importDefault(require("os"));
const socket_io_1 = require("socket.io");
const schema_1 = require("schema");
// Get IP address of the device on the local network 
const multicast_dns_1 = __importDefault(require("multicast-dns"));
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
    pairingPort: 3435,
    periodicAdvertisementInterval: 5000
};
class PairingClient {
    constructor(options = {}) {
        this.pairingSubscribers = new Set();
        this.disconnectionSubscribers = new Set();
        this.periodicAdvertisementInterval = null;
        this.options = Object.assign(Object.assign({}, exports.defaultPairingClientOptions), options);
        this.name = null;
        this.mdns = (0, multicast_dns_1.default)();
        this.ips = retrieveIps();
        // Create a webtopics server
        this.ioServer = new socket_io_1.Server(this.options.pairingPort, {
            cors: {
                origin: "*",
            }
        });
        console.log(`Listening for pairing requests on port ${this.options.pairingPort}`);
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
                    //console.log('Responding to stagehands_pairing query');
                    this.mdns.respond({
                        answers: [{
                                name: '_stagehands_pairing._tcp.local.',
                                type: 'PTR',
                                data: `${this.name} Pairing Service._stagehands_pairing._tcp.local.`
                            }, {
                                name: `${this.name} Pairing Service._stagehands_pairing._tcp.local.`,
                                type: 'SRV',
                                data: {
                                    port: this.options.pairingPort,
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
        // console.log('Periodic advertisement');
        this.mdns.respond({
            answers: [{
                    name: '_stagehands_pairing._tcp.local.',
                    type: 'PTR',
                    data: `${this.name} Pairing Service._stagehands_pairing._tcp.local.`
                }, {
                    name: `${this.name} Pairing Service._stagehands_pairing._tcp.local.`,
                    type: 'SRV',
                    data: {
                        port: this.options.pairingPort,
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
