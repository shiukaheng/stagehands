import { RecallBotState } from "schema";
export declare class WebtopicROSInterface {
    private client;
    private ioClient;
    private nodeHandle;
    private connectedToROSResolver;
    private connectedToROS;
    private initBotState;
    constructor(ip: string, port: string);
    /**
     * Start the ros node and webtopics client
     */
    startNode(): void;
    /**
     * Publishes the bot's current state to the fleet topic, taken from ROS
     */
    currentPosePublisher(): void;
    /**
     * Function that takes a recall bot state schema as input and executes it on the robot
     */
    targetPoseSender(): void;
    sendPose(data: RecallBotState): void;
    waitForConnection(): Promise<unknown>;
    shutdown(): void;
}
