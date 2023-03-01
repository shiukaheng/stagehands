import { BotPose, CompositePose, BotState } from "schema";
import { Context } from "../../controller/Context";
import { ResponseMessage } from "../../../../schema/src/serverResponse";
import { ICommand } from "../ICommand";
import { IServiceHandler } from "../IServiceHandler";
import { Controller } from "../../controller/Controller";
import { moveBotToPoseCommandServiceChannel } from "../../Channels/moveBotToPoseServiceChannel";

export class MoveBotToPoseCommand implements IServiceHandler {
    private botPose: BotPose;
    private botID: string;
    constructor(botID: string, botPose: BotPose) {
        this.botID = botID;
        this.botPose = botPose;
    }
    async execute(context: Context): Promise<ResponseMessage> {
        let tempBotState = context
            .getTargetBotState()
            .find((botState: { name: string }) => botState.name === this.botID);
        let tempClientId = context.getbotClientIDMap().get(this.botID)
        if (tempBotState === undefined) {
            return new Promise((resolve,reject)=>{
                resolve({
                    responseType: "error",
                    message: `MoveBotToPoseCommand error: ${this.botID} not registered`,
                })
                
            })   
        }
        if (tempBotState.status === "error") {

            return new Promise((resolve,reject)=>{
                resolve({
                    responseType: "error",
                    message: `${this.botID} not functioning`,
                })
                
            })
        }
        
        if (tempClientId===undefined){
            return new Promise((resolve,reject)=>{
                resolve({
                    responseType: "error",
                    message: `${this.botID} not connected to the server`,
                })
                
            })
        }
        tempBotState.pose = this.botPose;

        try{
            
            const botResponse=await Controller.getInstance().server.req(moveBotToPoseCommandServiceChannel,this.botPose,tempClientId)
            if (botResponse.responseType==="error"){
                return new Promise((resolve,reject)=>{
                    resolve({
                        responseType: "error",
                        message: botResponse.message,
                    })
                    
                })
            }
            else{
                return new Promise((resolve,reject)=>{
                    resolve({
                        responseType: "success",
                        message: `${this.botID} move to ${JSON.stringify(this.botPose)}`,
                    })
                    
                })
            }

        }
        catch(error){
            return new Promise((resolve,reject)=>{
                resolve({
                    responseType: "error",
                    message: error as string,
                })
                
            })
        }

        
    }
}
