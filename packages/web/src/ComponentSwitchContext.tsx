import { createContext } from "react"

const componentSelectContext = createContext({
    componentSelect: 0,
    setComponentSelect: (input:number) => {input}
  })

  export default componentSelectContext