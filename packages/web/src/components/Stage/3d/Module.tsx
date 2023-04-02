import { BotState, RecallBotState } from "schema";

export default function Module({bot, stickHeight}:{bot : BotState | RecallBotState, stickHeight: number}){
    if(bot.module.type === "micStand"){
        const micHeight = 0.135 +(stickHeight-0.2) * bot.module.state?.gripPosition!/100
        const radian = bot.module.state?.gripAngle!/180 * Math.PI
        return(
            <mesh position = {[0,micHeight,0]}>
                <boxGeometry args={[0.1, 0.1, 0.15]} />
                <meshPhysicalMaterial color="black" roughness={0.7} metalness={0.5} />
                
                <mesh position = {[0.1,0,0]} rotation = {[radian,Math.PI/2,Math.PI/2]}>
                    <boxGeometry args={[0.1, 0.05, 0.05] } />
                </mesh>
            </mesh>

        )
    }else{
        return null;
    }
}