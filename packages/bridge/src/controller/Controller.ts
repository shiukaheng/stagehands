import { Context } from "./Context";
import { JSONValue, RequestType, ServiceResponseType, TopicServer } from "webtopics";
import { Server } from "socket.io";
import { io } from "socket.io-client";
import { Channel } from "webtopics";
import { ServiceChannel, TopicChannel, TopicClient } from "webtopics";
import { selectTopic } from "../topicSelector"
import { PairingServer } from "../../../bot/src/discovery"
import { values } from "lodash";
import { retrieveIps, getNetworkPortion } from "../utils/ipRetrival"
import { botParingService } from "schema";
import{Listener} from "../../../bot/src/discovery"
export class Controller {
    private context: Context;
    private _server: TopicServer;
    private bridgePort;
    constructor(port: number = 3000) {
        this.context = new Context();
        //this._server = new TopicServer(new Server(port, {cors: {origin: "*"}}), { logTopics: false});
        this._server = new TopicServer(new Server(port))
        this.bridgePort = port;
        console.log(`✅ bridge server running on port ${port}`);
    }

    public async runService<T extends RequestType, U extends ServiceResponseType>(serviceChannel: ServiceChannel<any, any>, serviceHandler: (requestData: any, context: Context, server: TopicServer) => any) {

        this.server.srv(serviceChannel, (req) => {
            return serviceHandler(req, this.context, this._server);
        })
    }

    public serverPub(topicChannel: TopicChannel<any>) {
        const topic = selectTopic(topicChannel, this.context);
        this.server.pub(topicChannel, topic);
    }

    public serverSub(topicChannel: TopicChannel<any>, topicHandler: (topicData: any, context: Context) => void) {
        this.server.sub(topicChannel, (topic) => {
            topicHandler(topic, this.context);
        })
    }

    public runParingService() {
        let server: PairingServer

        // Regularly sends discover packets, and starts a pairing server
        setTimeout(() => {
            server = new PairingServer();
            server.startDiscoverListener();
        }, 100);

        setTimeout(() => {
            setInterval(() => {
                server.sendDiscoveryPacket();
                server.subBots((availableBots)=>{
                    for(const botName of availableBots.keys()){
                        if(this.context.getBotConnectionState().find((BCS)=>BCS.domainName===botName)===undefined){
                            this.context.getBotConnectionState().push({domainName:botName,connectionStatus:"disconnected"})
                        }
                    }
                })
                console.log(this.context.getBotConnectionState());
                
            }, 2000)
        }, 500)

    }

    public get server(): TopicServer {
        return this._server;
    }
    public set server(value: TopicServer) {
        this._server = value;
    }
    public getContext(): Context {
        return this.context;
    }

    public setContext(context: Context): void {
        this.context = context;
    }
}