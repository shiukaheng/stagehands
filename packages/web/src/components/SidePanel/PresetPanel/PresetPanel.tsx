import { ReactNode, useCallback, useContext, useMemo } from "react"
import { getRecallFleetState } from "schema/dist/schemas/bot/bot";
import { ServiceContext, TopicContext } from "../../../contexts/ServerContext";
import { Preset as PresetT } from "schema";
import PresetWidget from "../BotOverviewPanel/PresetWidget";
import { AnimatePresence, Reorder } from "framer-motion";

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
    const serviceProvider = useContext(ServiceContext);
    const reorder = useCallback((newPresets: { id: string, value: PresetT }[]) => {
        console.log("Reordering", newPresets);
        if (serviceProvider?.reorderPreset) {
            serviceProvider.reorderPreset.callback(newPresets.map((preset) => preset.id));
        }
    }, [serviceProvider?.reorderPreset]);
    return (
        <div className="overflow-hidden w-full flex-grow safari-canvas-overflow-fix flex flex-col">
            <div id="MiddleSection" className="w-full snap-center flex flex-col gap-4 px-6 flex-grow overflow-y-auto">
                {/* map the record by key and value pairs into the preset component, if presets is not null */}
                {topicProvider?.stage?.presets && (
                    <Reorder.Group axis="y" className="flex flex-col gap-4" values={topicProvider.stage.presets} onReorder={(values) => {
                        console.log("Reordering", values);
                        reorder(values);
                    }}>
                        <AnimatePresence>
                            {
                                topicProvider.stage.presets.map((presetEntry, index) => (
                                    <Reorder.Item key={presetEntry.id} value={presetEntry}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}>
                                        <PresetWidget preset={presetEntry.value} key={presetEntry.id} id={presetEntry.id} />
                                    </Reorder.Item>
                                ))
                            }
                        </AnimatePresence>
                    </Reorder.Group>
                )}
            </div>
            <div id="BottomSection" className="flex flex-row gap-2 w-full">
                <button
                    id="createButton" // For creating a new preset based on the current mic positions
                    onClick={() => {
                        const name = prompt("Enter a name for the preset");
                        let presetName = "Preset";
                        if (name) {
                            presetName = name;
                        }
                        console.log("Creating preset", serviceProvider?.createPreset);
                        if (topicProvider?.fleet !== undefined) {
                            serviceProvider?.createPreset.callback({
                                name: presetName,
                                state: getRecallFleetState(topicProvider?.fleet)
                            })
                        } else {
                            throw new Error("Fleet is undefined");
                        }

                    }}
                    className="font-bold box-border flex-shrink ui-div ui-highlight-solid ui-shadow m-6 p-4 w-full">
                    Create a preset +</button>
            </div>
        </div>
    )
}

export default PresetPanel
