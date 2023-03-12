import { BotState, RecallFleetState } from 'schema';
import React, { useContext } from "react";
import componentSelectContext from '../../../contexts/ComponentSwitchContext';

/**
 * Widget representing the live state of a bot
 */
function LiveBotWidget({ botState }: { botState: BotState}) {
    const { componentSelect, setComponentSelect } = useContext(componentSelectContext);
    return (
        <button
            id={botState.name}
            className="bg-zinc-100 hover:bg-zinc-200 font-bold box-border h-32 w-64 rounded m-2"
            onClick={() => {
                setComponentSelect({type: "live_attributes_page", bot :botState})
            }}>
            <div className="text-left indent-[10.5%]">
                Name: {botState.name}
            </div>
            <div className="text-left indent-5">
                Status: <button id="micStatus" className="bg-green-500 text-green-500 font-bold rounded-none border-none h-6 w-32 m-2">.</button>
            </div>
            <div className="text-left indent-[5%]">
                live Module :{botState.module.type}
            </div>
            {/* onClick = {<MicAttributesPage/>} */}
        </button>
    );
}

export default LiveBotWidget;