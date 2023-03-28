import { useContext } from "react";
import { BotState } from "schema"
import { ServiceContext } from "web/src/contexts/ServerContext";
import { hoveredBotContext } from "./ConnectionScreen";

export function AvailableBotWidget({ botStatus, botID }: { botStatus: string, botID: string}) {
    const { hoverBotID, setBotID } = useContext(hoveredBotContext);
    const serviceProvider = useContext(ServiceContext);
    {/* TODO */}
    {/* want know if the bot is connected or not so we can highlight it red or green (or have some indication of its connection status) */}
    {/* also so if its connected we can call the disconnect service and vice-versa */}
    return (
        <button
                    id={"nameOfBot"}
                    className="ui-shadow ui-highlight ui-div font-bold box-border h-20 w-64 rounded m-2 px-8" // Could change colour here depending on connection status
                    onClick={() => { console.log("Connection button clicked")
                    {serviceProvider?.connectBot.callback(botID)}}} 
                    onMouseEnter={() => { 
                        setBotID(botStatus)
                        console.log("Mouse hovering!") }}> {/* onClick to connect? */}
                    {botID} - {botStatus}{/*{botState.name} - {botState.status}/disconnected*/}
                </button>
    )
}