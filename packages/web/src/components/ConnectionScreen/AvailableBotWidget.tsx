import { useContext } from "react";
import { BotState } from "schema"
import { ServiceContext } from "web/src/contexts/ServerContext";
import { hoveredBotContext } from "./ConnectionScreen";

export function AvailableBotWidget({ botStatus, botID }: { botStatus: string, botID: string}) {
    const { hoverBotID, setBotID, hoverBotName, setBotName } = useContext(hoveredBotContext);
    setBotName(botID)
    const serviceProvider = useContext(ServiceContext);
    {/* TODO */}
    {/* want know if the bot is connected or not so we can highlight it red or green (or have some indication of its connection status) */}
    {/* also so if its connected we can call the disconnect service and vice-versa */}
    if (botStatus === "connected") {
    return (
        <button
                    id={"connectedBot"}
                    className="ui-shadow ui-highlight ui-div font-bold box-border h-20 w-64 rounded m-2 px-8 bg-green-500" // Could change colour here depending on connection status
                    onClick={() => { console.log("Connection button clicked to disconnect")
                    {serviceProvider?.disConnectBot.callback(botID)}}} 
                    onMouseEnter={() => { 
                        setBotID(botStatus)
                        console.log("Mouse hovering!") }}> {/* onClick to connect? */}
                    {botID} - {botStatus}{/*{botState.name} - {botState.status}/disconnected*/}
                </button>
    )
    } else if (botStatus === "disconnected") {
            return (
                <button
                    id={"disconnectedBot"}
                    className="ui-shadow ui-highlight ui-div font-bold box-border h-20 w-64 rounded m-2 px-8 bg-red-900" // Could change colour here depending on connection status
                    onClick={() => { console.log("Connection button clicked to connect")
                    {serviceProvider?.connectBot.callback(botID)}}} 
                    onMouseEnter={() => { 
                        setBotID(botStatus)
                        console.log("Mouse hovering!") }}> {/* onClick to connect? */}
                    {botID} - {botStatus}{/*{botState.name} - {botState.status}/disconnected*/}
                </button>
            )
    } else{
        throw new Error("Bot status not recognised")
    }
}