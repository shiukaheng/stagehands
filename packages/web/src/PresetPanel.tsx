import { useContext, useState } from "react"
import { FleetState, getRecallFleetState} from "schema/dist/schemas/bot/bot";
import generatePresetPanelButton from "./GeneratePresetPanelButton"
import Preset from "./Preset";
import presetButtonsContext from './PresetButtonsContext'
import { ServiceContext, TopicContext } from "./ServerContext";
import { Preset as PresetT } from "schema";

// placeholder function for the open button
function doNothing() {
    return
}


function openPreset() {
    // open file picker 
    const input = document.createElement('input');

    let presetType: PresetT | null = null;
      
    input.type = 'file';
    input.accept = 'application/json';
    input.click();
    // read file
    input.onchange = () => {
        const file = input?.files[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = () => {
            const preset: PresetT = JSON.parse(reader.result as string);
            presetType = preset;
        }

    }

    //const topicProvider = useContext(TopicContext);
    //const ServiceProvider = useContext(ServiceContext);

    //ServiceProvider?.createPreset.callback({name: "test", preset: presetType?.state});
}

// displays the preset panel which consists of a list of presets (MiddleSection div) and two buttons to create a new preset (BottomSection div)
function PresetPanel() {
    const topicProvider = useContext(TopicContext);
    const ServiceProvider = useContext(ServiceContext);

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
                    onClick={() => {
                        openPreset();
                    }}>
                Open</button>
                <button
                    id="createButton" // For creating a new preset based on the current mic positions
                    onClick={() => {
                        const name = prompt("Enter a name for the preset");
                        
                        let presetName = "Preset";

                        if (name) {
                            presetName = name;
                        }

                        console.log("Creating preset", ServiceProvider?.createPreset);
                        if (topicProvider?.fleet !== undefined) {
                            ServiceProvider?.createPreset.callback({name: presetName,
                                state: getRecallFleetState(topicProvider?.fleet)})
                        }else {
                            throw new Error("Fleet is undefined");
                        }

                    }}
                    className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-10 w-28 rounded m-2">
                Create</button>
            </div>
        </div>
    )
}

export default PresetPanel
