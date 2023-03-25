import { Context } from "./Context";
import { RequestType, ServiceResponseType, TopicServer } from "webtopics";
import { ServiceChannel, TopicChannel } from "webtopics";
import { selectTopic } from "../topicSelector";
import { PairingServer } from "../../../utils/src/discovery";
import { botConnectionStatusTopic } from "schema";

/**
 * The Controller class is responsible for handling all communication with the WebTopics
 * messaging system, as well as managing the application's state through the Context class.
 */
export class Controller {
    private context: Context;
    public server: TopicServer;
    private bridgePort: number;

    /**
     * Constructs a new instance of the Controller class with the specified port.
     * @param port The port to use for the TopicServer.
     */
    constructor(port: number = 2324) {
        this.context = new Context();
        this.server = this.context.getServer();
        this.bridgePort = port;
        console.log(`✅ Bridge server running on port ${port}`);
    }

    /**
     * Runs a WebTopics service with the specified serviceChannel and serviceHandler.
     * @param serviceChannel The service channel to use for the service.
     * @param serviceHandler The handler function for the service.
     */
    public async runService<T extends RequestType, U extends ServiceResponseType>(
        serviceChannel: ServiceChannel<any, any>,
        serviceHandler: (requestData: any, context: Context, server: TopicServer) => any
    ) {
        this.server.srv(serviceChannel, (req) => {
            return serviceHandler(req, this.context, this.server);
        });
    }

    /**
     * Publishes a message to the specified topicChannel on the TopicServer.
     * @param topicChannel The topic channel to use for the message.
     */
    public serverPub(topicChannel: TopicChannel<any>) {
        const topic = selectTopic(topicChannel, this.context);
        this.server.pub(topicChannel, topic);
    }

    /**
     * Subscribes to the specified topicChannel on the TopicServer with the specified topicHandler.
     * @param topicChannel The topic channel to subscribe to.
     * @param topicHandler The handler function for the topic.
     */
    public serverSub(topicChannel: TopicChannel<any>, topicHandler: (topicData: any, context: Context) => void) {
        this.server.sub(topicChannel, (topic) => {
            topicHandler(topic, this.context);
        });
    }

    /**
     * Runs the pairing service for discovering available bots.
     */
    public runPairingService() {
        const server = new PairingServer();
        server.startDiscoverListener();
        setInterval(() => {
            server.sendDiscoveryPacket();
            server.subBots((availableBots) => {
                this.context.setAvailableBotNameTopicClientMap(availableBots);
                for (const botName of availableBots.keys()) {
                    if (this.context.getBotConnectionState().find((BCS) => BCS.domainName === botName) === undefined) {
                        this.context.getBotConnectionState().push({ domainName: botName, connectionStatus: "disconnected" });
                    }
                }
            });
            this.server.pub(botConnectionStatusTopic, this.context.getBotConnectionState());
        }, 2000);
    }

    /**
     * Gets the current Context instance for the Controller.
     * @returns The current Context instance.
     */
    public getContext(): Context {
        return this.context;
    }

    /**
     * Sets the current Context instance for the Controller.
     * @param context The Context instance to set.
     */
    public setContext(context: Context): void {
        this.context = context;
    }
}