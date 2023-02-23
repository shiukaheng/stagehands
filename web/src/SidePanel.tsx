import { Fragment, useContext, useState } from "react"
import componentSelectContext from "./ComponentSwitchContext"
import MicAttributesPage from "./MicAttributesPage"
import MicPanel from "./MicPanel"
import PresetPanel from "./PresetPanel"

// simply switches the component that displays the main body of the side panel (these don't display the top two buttons)
function ComponentToDisplay(ComponentSelect: number) {
  if(ComponentSelect === 0) {
    return (<PresetPanel/>)
  } else if (ComponentSelect === 1){
    return (<MicPanel/>)
  } else if (ComponentSelect === 2) {
    return (<MicAttributesPage/>)
  }
}

function SidePanel() {
  // const [ComponentSelect, ComponentSwitch] = useState(1) // simple hook for switching between the two main components of the side panel
  const {componentSelect, setComponentSelect} = useContext(componentSelectContext);

  return (
    <Fragment>
    <div id="SidePanel" className="absolute inset-y-10 left-10 w-80 border-solid border-2 rounded-md p-5"> {/* Left side panel where a list of mics will be displayed */}
      {/* Preset Button */}
      <button
        id="PresetsButton"
        className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-10 w-28 rounded m-2"
        onClick={() => setComponentSelect(0)}>
        Presets
      </button>
      {/* Mics Button */}
      <button
        id="MicsButton"
        className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-10 w-28 rounded m-2"
        onClick={() => setComponentSelect(1)}>
        Mics
      </button>
      {ComponentToDisplay(componentSelect)} {/* The main body of the side panel, displayed here, is determined through this fucntion */}
    </div>
    </Fragment>
  )
}

export default SidePanel