import { Context } from "./Context";
import { JSONValue, RequestType, ServiceResponseType, TopicServer } from "webtopics";
import { Server } from "socket.io";
import { io } from "socket.io-client";
import { Channel } from "webtopics";
import { ServiceChannel,TopicChannel,TopicClient } from "webtopics";
import { selectTopic } from "../topicSelector"
import {PairingServer} from "../../../bot_pairing_client/src/index"
import { values } from "lodash";
import{retrieveIps,getNetworkPortion} from"../utils/ipRetrival"
import { botParingService } from "schema";
export class Controller {
    private context: Context;



    private _server: TopicServer;
    private bridgePort;
    constructor(port:number=3000) {
        this.context = new Context();
        //this._server = new TopicServer(new Server(port, {cors: {origin: "*"}}), { logTopics: false});
        this._server = new TopicServer(new Server(port))
        this.bridgePort = port;
        console.log(`✅ bridge server running on port ${port}`);
    }


    public async runService<T extends RequestType,U extends ServiceResponseType>(serviceChannel:ServiceChannel<any,any>,serviceHandler:(requestData:any,context:Context,server:TopicServer)=>any){
        
        this.server.srv(serviceChannel, (req)=>
        {
            return serviceHandler(req,this.context,this._server);
        })   
        }
    
    public serverPub(topicChannel:TopicChannel<any>){
        const topic = selectTopic(topicChannel,this.context);
        this.server.pub(topicChannel,topic);
    }
    
    public serverSub(topicChannel:TopicChannel<any>,topicHandler:(topicData:any,context:Context)=>void){
        this.server.sub(topicChannel,(topic)=>{
            topicHandler(topic,this.context);
        })
    }
    public runParingService(){
        let server:PairingServer
        setTimeout(() => {
            server = new PairingServer();
            server.startDiscoverListener();
            server.sendDiscoveryPacket();
        }, 100);

        setTimeout(()=>{
            setInterval(()=>{

                this.context.getcurrentdnsMap().forEach((key,value)=>{
                    if(server.getDnsMap().get(key)===undefined){
                        console.log(`${key} disconnnected`);
                        this.context.getcurrentdnsMap().delete(key)
                    }
                })
                server.getDnsMap().forEach(async (key,value)=>{
                    if(this.context.getcurrentdnsMap().get(key)===undefined){
                        const port = server.getdnsPortMap().get(key)
                        console.log(`Connecting to botClient with ip:${value} and port:${port}`);
                        
                        const socket =io(value+":"+port?.toString())
                        const pairingCLient = new TopicClient(socket)
                        
                        const currentIps =retrieveIps();
                        const botNetworkPortion =getNetworkPortion(value)
                        let bridgeIp:string;
                        for(const ip of currentIps){
                            if(botNetworkPortion===getNetworkPortion(ip)){
                                bridgeIp = ip
                                const serverID = await pairingCLient.getServerID()
                                pairingCLient.req(botParingService,serverID,{bridgeIp:bridgeIp,bridgePort:this.bridgePort})
                                .then(()=>{
                                    console.log(key+"connected");
                                    
                                })
                                .catch((error)=>{
                                    throw error
                                })
                                break;
                            }
                        }
                        this.context.getcurrentdnsMap().set(key,value)
                        console.log(`${key} connected`);
                    }
                }) 
            },5000)
        },500)
        
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
function then(arg0: (response: any) => any): any {
    throw new Error("Function not implemented.");
}

