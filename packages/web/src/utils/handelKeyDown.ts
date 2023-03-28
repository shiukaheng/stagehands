import { Preset } from "schema";
import { SidePanelSelection, PresetPanelSelection, RunningPresetSelction } from "src/components/SidePanel/PresetPanel/PresetPanelSelection";
import { IServiceContext } from "src/contexts/ServerContext";

export function handelClickOrKeyDown({componentSelect, setComponentSelect, presets, serviceProvider, isRight} : 
    {componentSelect: SidePanelSelection, setComponentSelect: (componentSelect: SidePanelSelection) => void, presets: {id:string,value :Preset}[],
    serviceProvider: IServiceContext, isRight: 1|-1}) {

    let preset: { id: string, value: Preset } | undefined;
    let presetIndex: number;
    presetIndex = componentSelect.type === "running_preset"? componentSelect.presetIndex + isRight : 0;

    if(presetIndex === -1 ){
        alert("this is the first preset")
        return;
    }

    if (presetIndex === presets.length) {
        setComponentSelect({ type: "preset_panel" } as PresetPanelSelection)
        alert("not preset left to run")
        return;
    } 
    
    preset = presets[presetIndex];
    serviceProvider?.runPreset.callback(preset.id);
    setComponentSelect({ type: "running_preset", presetIndex: presetIndex } as RunningPresetSelction);
    
}