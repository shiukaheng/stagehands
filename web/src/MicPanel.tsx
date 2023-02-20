import { useContext, useState } from "react"
import componentSelectContext from "./ComponentSwitchContext";
import generateMicPanelButton from "./GenerateMicPanelButton"
import GetMicStands from "./GetMicStands"
import presetButtonsContext from "./PresetButtonsContext";


function MicPanel () {
    const micStands = GetMicStands()

    return (
        <div>
            <div id="MiddleSection" className=" overflow-y-auto overflow-x-hidden border-solid w-72 h-full snap-center">
                { micStands.map((micStand) => micStand.button()) } {/* The list of mics */}
            </div>
            {/* The button that adds a new mic to the list */}
            <div id="BottomSection" className="flex flex-row bottom-0 m-5">
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
