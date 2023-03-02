import { Context } from "./Context";
import { ICommand } from "../command/ICommand";
import { JSONValue, TopicServer } from "webtopics";
import { Server } from "socket.io";
import { IServiceHandler } from "../command/IServiceHandler";
import { Channel } from "webtopics";
import { ServiceChannel,TopicChannel } from "webtopics/dist/utils/Channel";
import { selectTopic } from "src/topicSelector";
export class Controller {
    private context: Context;
    private static controller:Controller;
    private _server: TopicServer;

    constructor(port:number=3000) {
        this.context = new Context();
        this._server = new TopicServer(new Server(port))
        console.log(`✅ bridge server running on port ${port}`);
        
    }
    public static getInstance():Controller{
        if (this.controller===undefined){
            this.controller=new Controller();
        }
        return this.controller;
    }
    public runCommand(command: ICommand): void {
        command.execute(this.context);
    }
    public async runService(serviceChannel:ServiceChannel<any,any>,serviceHandler:(requestData:any,context:Context)=>any){
        this.server.srv(serviceChannel, (req)=>
        {
            return serviceHandler(req,this.context);
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

    public get server(): TopicServer {
        return this._server;
    }
    public set server(value: TopicServer) {
        this._server = value;
    }
    
}
function then(arg0: (response: any) => any): any {
    throw new Error("Function not implemented.");
}

