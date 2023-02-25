import { BotState } from "fake-stagehands-backend";
import React, { useContext } from "react";
import componentSelectContext from './ComponentSwitchContext';

/**
 * Renders a module as a clickable button
 * 
 * @param module the module to be rendered
 * @returns 
 */
function ModuleComponent({ module }: { module: BotState }) {
    const { componentSelect, setComponentSelect } = useContext(componentSelectContext);
    return (
        <button
            id={module.name}
            className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-32 w-64 rounded m-2"
            onClick={() => setComponentSelect(2)}>
            <div className="text-left indent-[10.5%]">
                Name: {module.name}
            </div>
            <div className="text-left indent-5">
                Status: <button id="micStatus" className="bg-green-500 text-green-500 font-bold rounded-none border-none h-6 w-32 m-2">.</button>
            </div>
            <div className="text-left indent-[5%]">
                {'Module: \xa0 Microphone'}
            </div>
            {/* onClick = {<MicAttributesPage/>} */}
        </button>
    );
}

export default ModuleComponent;