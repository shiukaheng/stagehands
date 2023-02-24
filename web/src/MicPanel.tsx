import { useContext, useState } from "react"
import componentSelectContext from "./ComponentSwitchContext";
import generateMicPanelButton from "./GenerateMicPanelButton"
import GetMicStands from "./GetMicStands"
import presetButtonsContext from "./PresetButtonsContext";


function MicPanel () {
    const micStands = GetMicStands()

    return (
        <div className="h-full overflow-clip">
            <div id="MiddleSection" className=" border-solid w-72 h-4/5 snap-center overflow-y-auto overflow-x-hidden">
                { micStands.map((micStand) => micStand.button()) } {/* The list of mics */}
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
