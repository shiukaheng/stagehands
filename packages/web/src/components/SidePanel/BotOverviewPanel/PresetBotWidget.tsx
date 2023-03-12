import { RecallBotState } from 'schema';
import { useContext } from "react";
import componentSelectContext from '../../../contexts/ComponentSwitchContext';

/**
 * Widget representing the state of a particular bot in a preset
 */
function PresetBotWidget({ recallBot, name, presetID, botID }: { recallBot: RecallBotState, name: string | undefined, presetID: string, botID : string}) {
    const { setComponentSelect } = useContext(componentSelectContext);
    return (
        <button
            id={name}
            className="bg-zinc-100 hover:bg-zinc-200 font-bold box-border h-32 w-64 rounded m-2"
            onClick={() => {
                setComponentSelect({type: "preset_mic_attributes_page", bot :recallBot, name : name, presetID : presetID, botID : botID})
            }}>
            <div className="text-left indent-[10.5%]">
                Name: {name}
            </div>
            <div className="text-left indent-5">
                Status: <button id="micStatus" className="bg-green-500 text-green-500 font-bold rounded-none border-none h-6 w-32 m-2">.</button>
            </div>
            <div className="text-left indent-[5%]">
                Preset Module :{recallBot.module.type}
            </div>
        </button>
    );
}
export default PresetBotWidget;
