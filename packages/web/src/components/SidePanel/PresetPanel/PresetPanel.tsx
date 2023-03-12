import { ReactNode, useContext, useMemo } from "react"
import { getRecallFleetState } from "schema/dist/schemas/bot/bot";
import { ServiceContext, TopicContext } from "../../../contexts/ServerContext";
import { Preset as PresetT } from "schema";
import PresetWidget from "../BotOverviewPanel/PresetWidget";
import { Reorder } from "framer-motion";

/**
 * Convenience function for opening a file dialog and reading the file
 */
function openPreset() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.click();
    // read file
    input.onchange = () => {
        const file = input.files?.item(0);
        const reader = new FileReader();
        if (file) {
            reader.readAsText(file, "UTF-8");
            reader.onload = () => {
                const preset: PresetT = JSON.parse(reader.result as string);
                let presetType = preset;
            }
        }
    }
}

/**
 * Panel for viewing, creating, and editing presets
 */
function PresetPanel() {
    const topicProvider = useContext(TopicContext);
    const ServiceProvider = useContext(ServiceContext);
    const entries = useMemo<[string, PresetT][]>(()=>{
        if (topicProvider?.stage?.presets) {
            return Object.entries(topicProvider.stage.presets)
        } else {
            return []
        }
    }, [topicProvider?.stage?.presets])

    return (
        <div className="overflow-clip w-full h-full">
            <div id="MiddleSection" className="border-solid w-full h-4/5 snap-center overflow-y-auto overflow-x-hidden flex flex-col gap-4 p-4">
                {/* map the record by key and value pairs into the preset component, if presets is not null */}
                {topicProvider?.stage?.presets && (
                    <Reorder.Group axis="y" className="flex flex-col gap-4" values={entries} onReorder={(values) => {
                        console.log("Reordering", values);
                    }}>
                        {entries.map(([key, value]) => (
                            // <PresetWidget preset={value} key={key} id={key} />
                            <Reorder.Item key={key} value={[key, value]}>
                                <PresetWidget preset={value} key={key} id={key} />
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                )}
            </div>
            <div id="BottomSection" className="flex flex-row gap-2">
                <button
                    id="openButton" // For opening a preset from file, currently it does nothing
                    className="font-bold box-border h-10 w-28 flex-1"
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
                            ServiceProvider?.createPreset.callback({
                                name: presetName,
                                state: getRecallFleetState(topicProvider?.fleet)
                            })
                        } else {
                            throw new Error("Fleet is undefined");
                        }

                    }}
                    className="font-bold box-border h-10 w-28 flex-1">
                    Create</button>
            </div>
        </div>
    )
}

export default PresetPanel
