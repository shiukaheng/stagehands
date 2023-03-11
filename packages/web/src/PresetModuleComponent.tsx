import { BotState, RecallBotState, RecallFleetState } from 'schema';
import React, { useContext } from "react";
import componentSelectContext from './ComponentSwitchContext';

function presetModuleComponent({ module: recallBot, name }: { module: RecallBotState, name: string | undefined}) {
    const { componentSelect, setComponentSelect } = useContext(componentSelectContext);

    return (
        <button
            id={name}
            className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-32 w-64 rounded m-2"
            onClick={() => {
                setComponentSelect({type: "preset_mic_attributes_page", bot :recallBot, name : name})
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
export default presetModuleComponent;
