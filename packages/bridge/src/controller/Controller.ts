import { Context } from "./Context";
import { JSONValue, RequestType, ServiceResponseType, TopicServer } from "webtopics";
import { Server } from "socket.io";
import { Channel } from "webtopics";
import { ServiceChannel,TopicChannel } from "webtopics";
import { selectTopic } from "../topicSelector";
export class Controller {
    private context: Context;



    private _server: TopicServer;

    constructor(port:number=3000) {
        this.context = new Context();
        this._server = new TopicServer(new Server(port, {cors: {origin: "*"}}), {logTopicValidationErrors: false, logTopics: false});
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

