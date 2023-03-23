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
            className="ui-shadow ui-highlight ui-div font-bold box-border h-32 w-64 rounded p-4"
            onClick={() => {
                setComponentSelect({type: "preset_mic_attributes_page", bot :recallBot, name : name, presetID : presetID, botID : botID})
            }}>
            {/* <div className="text-left indent-[10.5%]">
                Name: {name}
            </div>
            <div className="text-left indent-5">
                Status: <button id="micStatus" className="bg-green-500 text-green-500 font-bold border-none h-6 w-32 m-2 rounded-3xl">.</button>
            </div>
            <div className="text-left indent-[5%]">
                Preset Module: {recallBot.module.type}
            </div> */}
            {/* Redo whole thing with tables, including name, status, module, with left being header and right being value */}
            <table className="table-fixed">
                <tbody>
                    <tr>
                        <td className="w-1/2">Name</td>
                        <td className="w-1/2">{name}</td>
                    </tr>
                    <tr>
                        <td className="w-1/2">Status</td>
                        <td className="w-1/2"><button id="micStatus" className="bg-green-500 text-green-500 font-bold border-none h-6 w-32 m-2 rounded-3xl">.</button></td>
                    </tr>
                    <tr>
                        <td className="w-1/2">Module</td>
                        <td className="w-1/2">{recallBot.module.type}</td>
                    </tr>
                </tbody>
            </table>
        </button>
    );
}
export default PresetBotWidget;
