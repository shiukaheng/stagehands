import { useContext, useState } from "react"
import componentSelectContext from "./ComponentSwitchContext";
import generateMicPanelButton from "./GenerateMicPanelButton"
import GetMicStands from "./GetMicStands"
import ModuleComponent from "./ModuleComponent";
import presetButtonsContext from "./PresetButtonsContext";
import { ServerContext } from "./ServerContext";


function MicPanel () {
    const micStands = GetMicStands();
    const provider = useContext(ServerContext);

    return (
        <div className="h-full overflow-clip">
            <div id="MiddleSection" className=" border-solid w-72 h-4/5 snap-center overflow-y-auto overflow-x-hidden">
                {provider?.fleet && Object.entries(provider.fleet).map(([key, value]) => (
                    <ModuleComponent module={value} key={key} />
                ))}
            </div>
            {/* The button that adds a new mic to the list */}
            <div id="BottomSection" className="flex flex-row bottom-0 ">
                <button
                    id="addButton"
                    className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-10 w-64 rounded m-2">
                +
                </button>
            </div>
        </div>
    )
}

export default MicPanel
