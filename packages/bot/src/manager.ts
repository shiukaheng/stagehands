import { WebtopicROSInterface } from "src";
import { PairingClient } from "utils";
import { botPairingService } from "schema";

export interface IStagehandsManagerOptions {
    pairingPort: number;
}

export const defaultOptions: IStagehandsManagerOptions = {
    pairingPort: 3435,
};

class StagehandsManager {

    // Pairing client for advertising this bot
    private pairingClient: PairingClient;
    // Interface for communicating with web UI
    private interface: WebtopicROSInterface | null = null;
    private options = defaultOptions;

    constructor(options: Partial<IStagehandsManagerOptions> = {}) {
        this.options = { ...defaultOptions, ...options }; // Merge options with defaults
        this.pairingClient = new PairingClient();
    }
}