import { BotPose, CompositePose, BotState } from "@schema/dist";
import { Context } from "../controller/Context";
import { ResponseMessage } from "@schema/dist";
import { ICommand } from "../command/ICommand";
import { IServiceHandler } from "../command/IServiceHandler";
import { Controller } from "../controller/Controller";
import{MoveTargetBotToPoseRequest} from "@schema/dist"
import { moveBotToPoseServiceChannel } from "@schema/dist";
export async function MoveBotToPoseServiceHandler(moveTargetBotToPoseRequest :MoveTargetBotToPoseRequest,context:Context):Promise<ResponseMessage>{
    const botID = moveTargetBotToPoseRequest.botId;
    const botPose =moveTargetBotToPoseRequest.botPose;
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
    const moveBotToPoseRequest = {botPose:botPose}
    try{
        const botResponse=await Controller.getInstance().server.req(moveBotToPoseServiceChannel,tempClientId,moveBotToPoseRequest)
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