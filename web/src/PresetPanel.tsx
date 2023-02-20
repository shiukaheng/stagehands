import { useContext, useState } from "react"
import generatePresetPanelButton from "./GeneratePresetPanelButton"
import { presetButtons } from "./App"

function doNothing() {
    return
  }

function PresetPanel() {
    const [buttons, setButtons] = useState([] as any[])
    const localPresetButtons = useContext(presetButtons);
    return (
        <div>
        <div id="MiddleSection" className="absolute overflow-y-auto overflow-x-hidden border-solid w-72 h-5/6 snap-center">
                {localPresetButtons} {/* The list of mics */}
            </div>
        <div id="BottomSection" className="absolute inset-x-0 bottom-0 m-5">
            <button
                id="openButton"
                className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-10 w-28 rounded m-2"
                onClick={() => doNothing()}>
                Open</button>
            <button
                id="createButton"
                className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-10 w-28 rounded m-2"
                onClick={() => setButtons(generatePresetPanelButton(localPresetButtons))}>
                Create</button>
        </div>
        </div>
    )
}

export default PresetPanel