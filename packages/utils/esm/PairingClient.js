var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getName } from "./name";
import { TopicServer } from "webtopics";
import os from "os";
import { Server } from "socket.io";
import { botPairingService, botDisconnectionService } from "schema";
// Get IP address of the device on the local network 
import makeMdns from 'multicast-dns';
/**
 * Retrieves all IPv4 addresses of the current machine.
 * @returns An array of IPv4 addresses.
 * @throws An error if no IP addresses are found.
 */
export function retrieveIps() {
    const interfaces = os.networkInterfaces();
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
export const defaultPairingClientOptions = {
    pairingPort: 3435,
    periodicAdvertisementInterval: 5000
};
export class PairingClient {
    constructor(options = {}) {
        this.pairingSubscribers = new Set();
        this.disconnectionSubscribers = new Set();
        this.periodicAdvertisementInterval = null;
        this.options = Object.assign(Object.assign({}, defaultPairingClientOptions), options);
        this.name = null;
        this.mdns = makeMdns();
        this.ips = retrieveIps();
        // Create a webtopics server
        this.ioServer = new Server(this.options.pairingPort, {
            cors: {
                origin: "*",
            }
        });
        console.log(`Listening for pairing requests on port ${this.options.pairingPort}`);
        // Create a webtopics server
        this.webTopicsServer = new TopicServer(this.ioServer);
        // Implement services
        this.webTopicsServer.srv(botPairingService, ({ bridgeIp, bridgePort }) => {
            this.publishRequest({ bridgeIp, bridgePort });
        });
        this.webTopicsServer.srv(botDisconnectionService, () => {
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
            this.name = yield getName();
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
