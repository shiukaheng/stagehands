import { createContext } from "react"
import { SidePanelSelection } from "../components/SidePanel/PresetPanel/PresetPanelSelection"

export interface IComponentSelectContext {
	componentSelect: SidePanelSelection
	setComponentSelect: (input: SidePanelSelection) => void
}

const componentSelectContext = createContext<IComponentSelectContext>({
	componentSelect: { type: "preset_panel" },
	setComponentSelect: (input: SidePanelSelection) => { input }
})

export default componentSelectContext