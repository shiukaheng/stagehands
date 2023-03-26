import { PairingRequestArgs } from "utils";
export interface IStagehandsManagerOptions {
    pairingPort: number;
}
export declare const defaultOptions: IStagehandsManagerOptions;
export declare class StagehandsManager {
    private pairingClient;
    private interface;
    private options;
    constructor(options?: Partial<IStagehandsManagerOptions>);
    onRequestDisconnect(): void;
    onRequestConnect(args: PairingRequestArgs): void;
}
