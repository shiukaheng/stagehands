import { createContext } from "react"

const presetButtonsContext = createContext({
    presetButtons: [] as any[],
    setPresetButtons: (input:any[]) => {input}
  })

  export default presetButtonsContext