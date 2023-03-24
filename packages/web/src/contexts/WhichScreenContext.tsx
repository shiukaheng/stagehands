import { createContext } from "react";

export type ScreenSelection = "main_screen" | "connection_screen";

export interface IScreenSelectionContext {
	screenSelection: ScreenSelection
	setScreenSelection: (input: ScreenSelection) => void
}

const screenSelectionContext = createContext<IScreenSelectionContext>({
	screenSelection: "main_screen",
	setScreenSelection: (input: ScreenSelection) => { input }
})

export default screenSelectionContext