import { useContext } from "react";
import componentSelectContext from "../../contexts/ComponentSwitchContext";
import { PresetPanelSelection, MicPanelSelection } from "./PresetPanel/PresetPanelSelection";

export function SidePanelTabs() {
  const { setComponentSelect } = useContext(componentSelectContext);
  return (<div className="flex flex-row gap-2">
    <div id="PresetsButton" className="rounded flex-1 p-4 cursor-pointer" onClick={() => setComponentSelect(("preset_panel" as PresetPanelSelection))}>
      Presets
    </div>
    {
      /* Mics Button */
    }
    <div id="MicsButton" className="rounded flex-1 p-4 cursor-pointer" onClick={() => setComponentSelect(({
      type: "mic_panel",
      presetID: null
    } as MicPanelSelection))}>
      Live view
    </div>
  </div>);
}
