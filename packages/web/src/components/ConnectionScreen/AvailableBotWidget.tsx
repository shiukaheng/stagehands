import { useContext } from "react";
import { BotState } from "schema"
import { hoveredBotContext } from "./ConnectionScreen";

export function AvailableBotWidget({ botState, botID }: { botState: BotState, botID: string}) {
    const { hoverBotID, setBotID } = useContext(hoveredBotContext);
    return (
        <button
                    id={"nameOfBot"}
                    className="ui-shadow ui-highlight ui-div font-bold box-border h-20 w-64 rounded m-2 px-8" // Could change colour here depending on connection status
                    onClick={() => { console.log("Connection button clicked") }} 
                    onMouseEnter={() => { 
                        setBotID(botID)
                        console.log("Mouse hovering!") }}> {/* onClick to connect? */}
                    {botState.name}
                </button>
    )
}