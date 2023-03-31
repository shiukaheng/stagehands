import { createContext } from "react"
import { SidePanelSelection } from "../components/SidePanel/PresetPanel/PresetPanelSelection"

export interface IComponentSelectContext {
	componentSelect: SidePanelSelection
	setComponentSelect: (input: SidePanelSelection) => void
}

const componentSelectContext = createContext<IComponentSelectContext>({
	componentSelect: { type: "mic_panel", presetID: null },
	setComponentSelect: (input: SidePanelSelection) => { input }
})

export default componentSelectContext