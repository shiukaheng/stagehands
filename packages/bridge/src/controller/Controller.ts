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
import { Socket } from "dgram";
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
                console.log("all domain name");
                
                console.log(this.context.getdomainNameConnectionState());
                
                server.getDnsMap().forEach(async (ip,domainName)=>{
                    let socket:any;
                    let pairingCLient:TopicClient;
                    const dN=this.context.getdomainNameConnectionState().find((d)=>d.domainName===domainName)
                    console.log(domainName);
                    const port = server.getdnsPortMap().get(domainName)
                    console.log(`Connecting to botClient with ip:${ip} and port:${port}`);
                    const socketInput="http://"+ip+":"+port?.toString()
                    if(dN===undefined){
                        socket =io("http://"+ip+":"+port?.toString())
                        pairingCLient = new TopicClient(socket)
                        this.context.getDomainnameTopicClientMap().set(domainName,pairingCLient)
                        this.context.getDomainnameIpMap().set(domainName,socketInput)
                        
                    }
                    else{
                        if(this.context.getDomainnameIpMap().get(domainName)!==socketInput){
                            socket =io("http://"+ip+":"+port?.toString())
                            pairingCLient = new TopicClient(socket)
                            this.context.getDomainnameTopicClientMap().set(domainName,pairingCLient)
                            this.context.getDomainnameIpMap().set(domainName,socketInput)
                        }
                        pairingCLient= this.context.getDomainnameTopicClientMap().get(domainName) as TopicClient
                    }
                    const currentIps =retrieveIps();
                    const botNetworkPortion =getNetworkPortion(ip)

                    for(const ip of currentIps){
                        if(botNetworkPortion===getNetworkPortion(ip)){
                            pairingCLient.getServerID()
                            .then((serverID)=>{
                                pairingCLient.req(botParingService,serverID,{bridgeIp:ip,bridgePort:this.bridgePort})
                                .then(()=>{
                                    if(dN===undefined){
                                        console.log(ip+"connected");
                                        this.context.getdomainNameConnectionState().push({domainName:domainName,connectionStatus:"connected"})
                                    }
                                    
                                })
                                .catch((error)=>{
                                    console.log(domainName);
                                    
                                    console.log(error);
                                    
                                })
                                
                            })
                            .catch((error)=>{
                                if(dN?.connectionStatus==="connected"){
                                    console.log(dN.domainName+" disconnected");
                                    const disconnectionIndex=this.context.getdomainNameConnectionState().findIndex((d)=>d.domainName===domainName)
                                    this.context.getdomainNameConnectionState()[disconnectionIndex].connectionStatus="disconnected"
                                    
                                }
                                else{
                                    console.log(domainName+"not in same network");
                                }
                                //socket.close()
                            })
                            
                        }
                    }

                    

                }) 
            },2000)
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

