import { BotState, RecallFleetState } from 'schema';
import React, { useContext } from "react";
import componentSelectContext from '../../../contexts/ComponentSwitchContext';

/**
 * Widget representing the live state of a bot
 */
function LiveBotWidget({ botState, botID }: { botState: BotState, botID: string}) {
    const { componentSelect, setComponentSelect } = useContext(componentSelectContext);
    return (
        <button
            id={botState.name}
            className="ui-shadow ui-highlight ui-div snap-center font-bold box-border h-32 w-64 rounded px-8"
            onClick={() => {
                setComponentSelect({type: "live_attributes_page", bot :botState, botID : botID})
            }}>
            {/* <div className="text-left indent-[10.5%]">
                Name: {botState.name}
            </div>
            <div className="text-left indent-5">
                Status: <button id="micStatus" className="bg-green-500 text-green-500 font-bold rounded-full border-none h-6 w-32 m-2">.</button>
            </div>
            <div className="text-left indent-[5%]">
                live Module :{botState.module.type}
            </div> */}
            <table className="table-fixed">
                <tbody>
                    <tr>
                        <td className="w-1/2">Name</td>
                        <td className="w-1/2">{botState.name}</td>
                    </tr>
                    <tr>
                        <td className="w-1/2">Status</td>
                        <td className="w-1/2"><button id="micStatus" className="bg-green-500 text-green-500 font-bold border-none h-6 w-32 m-2 rounded-3xl">.</button></td>
                    </tr>
                    <tr>
                        <td className="w-1/2">Module</td>
                        <td className="w-1/2">{botState.module.type}</td>
                    </tr>
                </tbody>
            </table>
            {/* onClick = {<MicAttributesPage/>} */}
        </button>
    );
}

export default LiveBotWidget;