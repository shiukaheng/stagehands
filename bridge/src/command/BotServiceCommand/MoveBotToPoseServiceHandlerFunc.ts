import { BotPose, CompositePose, BotState } from "../../../../schema/dist";
import { Context } from "../../controller/Context";
import { ResponseMessage } from "../../../../schema/src/serverResponse";
import { ICommand } from "../ICommand";
import { IServiceHandler } from "../IServiceHandler";
import { Controller } from "../../controller/Controller";
import { moveBotToPoseCommandServiceChannel } from "../../Channels/moveBotToPoseServiceChannel";
import{MoveBotToPoseRequest} from "../../../../schema/src/serverRequest/moveBotToPoseRequest"

export async function MoveBotToPoseServiceHandler(moveBotToPoseRequest :MoveBotToPoseRequest,context:Context):Promise<ResponseMessage>{
    const botID = moveBotToPoseRequest.botId;
    const botPose =moveBotToPoseRequest.botPose;
    let tempBotState = context
            .getTargetBotState()
            .find((botState: { name: string }) => botState.name === botID);
    let tempClientId = context.getbotClientIDMap().get(botID)

    if (tempBotState === undefined) {
        return new Promise((resolve,reject)=>{
            resolve({
                responseType: "error",
                message: `MoveBotToPoseCommand error: ${botID} not registered`,
            })
            
        })   
    }
    if (tempBotState.status === "error") {

        return new Promise((resolve,reject)=>{
            resolve({
                responseType: "error",
                message: `${botID} not functioning`,
            })
            
        })
    }
    if (tempClientId===undefined){
        return new Promise((resolve,reject)=>{
            resolve({
                responseType: "error",
                message: `${botID} not connected to the server`,
            })
            
        })
    }
    tempBotState.pose = botPose;

    try{
        const botResponse=await Controller.getInstance().server.req(moveBotToPoseCommandServiceChannel,tempClientId,botPose)
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
                    message: `${botID} move to ${JSON.stringify(botPose)}`,
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