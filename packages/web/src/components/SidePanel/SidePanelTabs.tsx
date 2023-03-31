import { useContext, useState } from "react";
import componentSelectContext from "../../contexts/ComponentSwitchContext";
import { PresetPanelSelection, MicPanelSelection } from "./PresetPanel/PresetPanelSelection";

export function SidePanelTabs() {
  const { setComponentSelect } = useContext(componentSelectContext);
  const [style, setStyle] = useState(["","ui-highlight-extra"])
  return (
  <div className="flex flex-row gap-2">
    {/* preset button*/}
    <div id="PresetsButton" 
    className= {"rounded flex-1 p-4 cursor-pointer border-zinc-400 active:border " + style[0]} 
    onClick={() => {
      setStyle(["ui-highlight-extra shadow-inner ",""])
      setComponentSelect(({type :"preset_panel"} as PresetPanelSelection))
      }}>
      Presets
    </div>
    {
      /* Mics Button */
    }
    <div id="LiveViewButton" 
    className={"rounded flex-1 p-4 cursor-pointer border-zinc-400 active:border "+ style[1] } 
    
    onClick={() => {
      setStyle(["","ui-highlight-extra shadow-inner"])
      setComponentSelect(({type: "mic_panel",presetID: null} as MicPanelSelection))}
    }>
      Live view
    </div>
  </div>);
}
