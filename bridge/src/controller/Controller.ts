import { Context } from "./context";
import { ICommand } from "../command/ICommand";
import { TopicServer } from "webtopics";
import { Server } from "socket.io";

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
    
    

    public get server(): TopicServer {
        return this._server;
    }
    public set server(value: TopicServer) {
        this._server = value;
    }
    
}
