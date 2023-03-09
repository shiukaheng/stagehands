import { createContext } from "react"
import { SidePanelSelection, PresetPanelSelection } from "./SidePanel"

export interface IComponentSelectContext {
	componentSelect: SidePanelSelection
	setComponentSelect: (input: SidePanelSelection) => void
}

const componentSelectContext = createContext<IComponentSelectContext>({
	componentSelect: "preset_panel",
	setComponentSelect: (input: SidePanelSelection) => { input }
})

export default componentSelectContext