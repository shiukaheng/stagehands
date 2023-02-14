import { Fragment, useState } from "react"
import MicPanel from "./MicPanel"
import PresetPanel from "./PresetPanel"

function test(ComponentSelect: number) {
  if(ComponentSelect === 0) {
    return (<PresetPanel />)
  } else {
    return (<MicPanel />)
  }
}

function SidePanel() {
  const [ComponentSelect, ComponentSwitch] = useState(1)

  return (
    <Fragment>
    <div id="SidePanel" className="absolute inset-y-10 left-10 w-80 border-solid border-2 rounded-md p-5"> {/* Left side panel where a list of mics will be displayed */}
      {/* Preset Button */}
      <button
        id="PresetsButton"
        className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-10 w-28 rounded m-2"
        onClick={() => ComponentSwitch(ComponentSelect=>0)}>
        Presets
      </button>
      {/* Mics Button */}
      <button
        id="PresetsButton"
        className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-10 w-28 rounded m-2"
        onClick={() => ComponentSwitch(ComponentSelect=>1)}>
        Mics
      </button>
      {test(ComponentSelect)}
    </div>
    </Fragment>
  )
}

export default SidePanel