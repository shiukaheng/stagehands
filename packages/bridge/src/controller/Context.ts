import { FleetState, StageState, BotConnectionStatus } from "schema";
import { TopicClient, TopicServer } from "webtopics";
import { Server } from "socket.io";

// If this code is just getters and setters, may as well use a object to store the data. You can use typescript to enforce the types of the data.

/**
 * The Context class represents the state and configuration of the application.
 */
export class Context {
    private currentBotState: FleetState;
    private targetBotState: FleetState;
    private stageState: StageState;
    private server: TopicServer;
    private serverPort: number;

    /**
     * Get the server port number.
     * @returns The port number.
     */
    public getServerPort(): number {
        return this.serverPort;
    }

    /**
     * Set the server port number.
     * @param serverPort The port number.
     */
    public setServerPort(serverPort: number): void {
        this.serverPort = serverPort;
    }

    /**
     * Get the TopicServer instance.
     * @returns The TopicServer instance.
     */
    public getServer(): TopicServer {
        return this.server;
    }

    /**
     * Set the TopicServer instance.
     * @param server The TopicServer instance.
     */
    public setServer(server: TopicServer): void {
        this.server = server;
    }

    private botConnectionState: BotConnectionStatus[];
    private availableBotNameTopicClientMap: Map<string, TopicClient>;

    /**
     * Get the available bot name topic client map.
     * @returns The available bot name topic client map.
     */
    public getAvailableBotNameTopicClientMap(): Map<string, TopicClient> {
        return this.availableBotNameTopicClientMap;
    }

    /**
     * Set the available bot name topic client map.
     * @param availableBotNameTopicClientMap The available bot name topic client map.
     */
    public setAvailableBotNameTopicClientMap(availableBotNameTopicClientMap: Map<string, TopicClient>): void {
        this.availableBotNameTopicClientMap = availableBotNameTopicClientMap;
    }

    /**
     * The constructor for the Context class.
     * @param port The server port number (default: 2324).
     */
    constructor(port: number = 2324) {
        this.currentBotState = {};
        this.targetBotState = {};
        this.botConnectionState = [];
        this.server = new TopicServer(new Server(port, { cors: { origin: "*" } }));
        this.serverPort = port;
        this.availableBotNameTopicClientMap = new Map<string, TopicClient>();

        this.stageState = {
            presets: [],
            activePreset: "NoActivePreset",
            presetRecallState: "idle",
            boundary: {
                polygonVertexCoordinates: []
            },
        };
    }

    /**
     * Get the current bot state.
     * @returns The current bot state.
     */
    public getCurrentBotState(): FleetState {
        return this.currentBotState;
    }

    /**
     * Set the current bot state.
     * @param aggregatedBotState The current bot state.
     */
    public setCurrentBotState(aggregatedBotState: FleetState): void {
        this.currentBotState = aggregatedBotState;
    }

    /**
     * Get the stage state.
     * @returns The stage state.
     */
    public getStageState(): StageState {
        return this.stageState;
    }

    /**
     * Set the stage state.
     * @param stageState The stage state.
     */
    public setStageState(stageState: StageState): void {
        this.stageState = stageState;
    }

    /**
     * Set the target bot state.
     * @param targetBotState The target bot state.
     */
    public setTargetBotState(targetBotState: FleetState): void {
        this.targetBotState = targetBotState;
    }

    /**
     * Get the target bot state.
     * @returns The target bot state.
     */
    public getTargetBotState(): FleetState {
        return this.targetBotState;
    }

    /**
     * Get the bot connection state.
     * @returns The bot connection state.
     */
    public getBotConnectionState(): BotConnectionStatus[] {
        return this.botConnectionState;
    }

    /**
     * Set the bot connection state.
     * @param domainNameList The bot connection state.
     * @returns The bot connection status.
     */
    public setBotConnectionState(domainNameList: BotConnectionStatus[]): void {
        this.botConnectionState = domainNameList;
    }

}
