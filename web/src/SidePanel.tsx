import { useState } from "react"
import generateSidePanelButton from "./GenerateSidePanelButton"

function SidePanel() {
    const [buttons, setButtons] = useState([] as any[])
  
    return (
      <div className="SidePanel">
        <div className="absolute inset-y-10 left-10 w-80 border-solid border-2 rounded-md p-5 overflow-auto" id="hi"> {/* Left side panel where a list of mics will be displayed */}
          {buttons} {/* The list of mics */}
          {/* The button that adds a new mic to the list */}
          <button 
            id="mainButton"
            className="bg-gray-100 hover:bg-gray-200 font-bold box-border h-32 w-64 rounded m-2"
            onClick={() => setButtons(generateSidePanelButton(buttons))}>
            +</button>
        </div>
      </div>
    )
  }

export default SidePanel