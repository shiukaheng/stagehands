import { Context } from "./Context";
import { ICommand } from "../command/ICommand";
import { JSONValue, TopicServer } from "webtopics";
import { Server } from "socket.io";
import { IServiceHandler } from "../command/IServiceHandler";
import { Channel } from "webtopics";
import { ServiceChannel } from "webtopics/dist/utils/Channel";

export class Controller {
    private context: Context;
    private static controller:Controller;
    private _server: TopicServer;

    constructor() {
        this.context = new Context();
        this._server = new TopicServer(new Server(3000))
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
    public async runService(serviceChannel:ServiceChannel<any,JSONValue>,serviceHandler:(requestData:any,context:Context)=>any){
        this.server.srv(serviceChannel, (req)=>
        {
            return serviceHandler(req,this.context);
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

