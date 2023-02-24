import { useContext, useState } from "react"
import generatePresetPanelButton from "./GeneratePresetPanelButton"
import presetButtonsContext from './PresetButtonsContext'

// placeholder function for the open button
function doNothing() {
    return
  }

// displays the preset panel which consists of a list of presets (MiddleSection div) and two buttons to create a new preset (BottomSection div)
function PresetPanel() {
    const {presetButtons, setPresetButtons} = useContext(presetButtonsContext);

    return (
        <div className="overflow-clip h-full">
            <div id="MiddleSection" className="border-solid w-72 h-4/5 snap-center overflow-y-auto overflow-x-hidden">
                {presetButtons} {/* The list of presets */}
            </div>
            <div id="BottomSection" className="flex">
                <button
                    id="openButton" // For opening a preset from file, currently it does nothing
                    className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-10 w-28 rounded m-2"
                    onClick={() => doNothing()}>
                Open</button>
                <button
                    id="createButton" // For creating a new preset based on the current mic positions
                    className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-10 w-28 rounded m-2"
                    onClick={() => setPresetButtons(generatePresetPanelButton(presetButtons))}>
                Create</button>
            </div>
        </div>
    )
}

export default PresetPanel