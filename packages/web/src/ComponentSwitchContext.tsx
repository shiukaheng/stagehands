import { createContext } from "react"
import { SidePanelSelection, PresetPanelSelection } from "./SidePanel"

const componentSelectContext = createContext({
    componentSelect: "preset_panel" as PresetPanelSelection,
    setComponentSelect: (input:SidePanelSelection) => {input}
  })

  export default componentSelectContext