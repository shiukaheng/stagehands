import { WebtopicROSInterface } from "./interface";
import { PairingClient, PairingRequestArgs } from "utils";

export interface IStagehandsManagerOptions {
    pairingPort: number;
}

export const defaultOptions: IStagehandsManagerOptions = {
    pairingPort: 3435,
};

export class StagehandsManager {
    // Pairing client for advertising this bot
    private pairingClient: PairingClient;
    // Interface for communicating with web UI
    private interface: WebtopicROSInterface | null = null;
    private options = defaultOptions;

    constructor(options: Partial<IStagehandsManagerOptions> = {}) {
        console.log("🎤 Stagehands Manager");
        this.options = { ...defaultOptions, ...options }; // Merge options with defaults
        this.pairingClient = new PairingClient({
            pairingPort: this.options.pairingPort,
        });
        this.pairingClient.subscribeRequest(this.onRequestConnect);
        this.pairingClient.subscribeDisconnect(this.onRequestDisconnect);
    }
    onRequestDisconnect() {
        console.log("💔 Disconnected from web UI");
        this.interface ?? this.interface.shutdown();
        this.interface = null;
    }
    onRequestConnect(args: PairingRequestArgs) {
        console.log("🔌 Request to connect from", args.bridgeIp);
        this.interface = new WebtopicROSInterface(args.bridgeIp, args.bridgePort.toString());
    }
}