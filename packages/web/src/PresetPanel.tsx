import { useContext, useState } from "react"
import { getRecallFleetState } from "schema/dist/schemas/bot/bot";
import { Quaternion } from "three";
import generatePresetPanelButton from "./GeneratePresetPanelButton"
import Preset from "./Preset";
import presetButtonsContext from './PresetButtonsContext'
import { ServiceContext, TopicContext } from "./ServerContext";

// placeholder function for the open button
function doNothing() {
    return
  }

// displays the preset panel which consists of a list of presets (MiddleSection div) and two buttons to create a new preset (BottomSection div)
function PresetPanel() {
    const topicProvider = useContext(TopicContext);
    const services = useContext(ServiceContext);
    // topicProvider?.stage?.presets
    // topicProvider?.fleet?
    // getRecallFleetState(topicProvider.fleet)
    return (
        <div className="overflow-clip h-full">
            <div id="MiddleSection" className="border-solid w-72 h-4/5 snap-center overflow-y-auto overflow-x-hidden">
                {/* map the record by key and value pairs into the preset component, if presets is not null */}
                {topicProvider?.stage?.presets && Object.entries(topicProvider.stage.presets).map(([key, value]) => (
                    <Preset preset={value} key={key} id={key}/>
                ))}
            </div>
            <div id="BottomSection" className="flex">
                <button
                    id="openButton" // For opening a preset from file, currently it does nothing
                    className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-10 w-28 rounded m-2"
                    onClick={() => doNothing()}>
                Open</button>
                <button
                    id="createButton" // For creating a new preset based on the current mic positions
                    onClick={() => {
                        console.log("Creating preset", services?.createPreset);
                        // preset that gets alices state
                        services?.createPreset.callback({name: "Preset 1", state: { "test": {module: {type: "hi", state: {gripPosition: 1},},
                                                                                            targetPose: {position: [1,2,3], quaternion: [1,2,3,4]},
                                                                                            baseLEDState: {rgbValue: [0, 255, 0], ledAnimation: {flashingFrequency: undefined, animationMode: "constant"}}}}})
                    }}
                    className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-10 w-28 rounded m-2">
                Create</button>
            </div>
        </div>
    )
}

export default PresetPanel