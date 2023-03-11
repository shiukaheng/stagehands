import { Fragment, useContext, useState } from "react"
import { Side } from "three"
import componentSelectContext from "./ComponentSwitchContext"
import LiveMicAttributesPage from "./LiveMicAttributesPage"
import MicPanel from "./MicPanel"
import PresetPanel from "./PresetPanel"
import { BotState, RecallBotState } from 'schema';
import PresetMicAttributesPage from "./PresetMicAttributesPage"

export type PresetPanelSelection = "preset_panel"
export type MicPanelSelection = {
  type: "mic_panel"
  presetID : string | null 
}

export type PresetMicAttributesPageSelection = {
  type: "preset_mic_attributes_page"
  name : string | undefined
  bot: RecallBotState
}

export type LiveAttributesPageSelection = {
  type: "live_attributes_page"
  bot : BotState
  
}


export type SidePanelSelection = PresetPanelSelection | MicPanelSelection | PresetMicAttributesPageSelection | LiveAttributesPageSelection

// simply switches the component that displays the main body of the side panel (these don't display the top two buttons)
function ComponentToDisplay(ComponentSelect: SidePanelSelection) {
  if( ComponentSelect  === "preset_panel" ) {
    console.log("preset panel")
    return (<PresetPanel/>)
  } else if (ComponentSelect.type === "mic_panel"){
    console.log("mic panel")
    return (<MicPanel presetID={ComponentSelect.presetID}/>)
  } else if (ComponentSelect.type === "preset_mic_attributes_page") {
    console.log("preset mic attributes page")
    return (<PresetMicAttributesPage bot = {ComponentSelect.bot} name = {ComponentSelect.name} />) // TODO add mic attributes page
  } else if (ComponentSelect.type === "live_attributes_page") {
    console.log("live mic attributes page")
    return (<LiveMicAttributesPage bot = {ComponentSelect.bot}/>)
  }
}

function SidePanel() {
  // const [ComponentSelect, ComponentSwitch] = useState(1) // simple hook for switching between the two main components of the side panel
  const {componentSelect, setComponentSelect} = useContext(componentSelectContext);

  return (
    <Fragment>
    <div id="SidePanel" className="h-full left-10 w-80 border-solid border-2 rounded-md p-5 bg-white shadow-xl"> {/* Left side panel where a list of mics will be displayed */}
      {/* Preset Button */}
      <button
        id="PresetsButton"
        className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-10 w-28 rounded m-2"
        onClick={() => setComponentSelect("preset_panel" as PresetPanelSelection)}>
        Presets
      </button>
      {/* Mics Button */}
      <button
        id="MicsButton"
        className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-10 w-28 rounded m-2"
        onClick={() => setComponentSelect({type :"mic_panel", presetID: null} as MicPanelSelection)}>
        Mics
      </button>
        {ComponentToDisplay(componentSelect)} {/* The main body of the side panel, displayed here, is determined through this fucntion */}
    </div>
    </Fragment>
  )
}

export default SidePanel