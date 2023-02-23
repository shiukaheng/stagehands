import { createContext, Fragment, useState } from 'react'
import './App.css'
import { Stage } from './Stage'
import SidePanel from './SidePanel'
import presetButtonsContext from './PresetButtonsContext'
import MicAttributesPage from './MicAttributesPage'
import componentSelectContext from './ComponentSwitchContext'

function App() {

  const [presetButtons, setPresetButtons] = useState([] as any[]);
  const [componentSelect, setComponentSelect] = useState(0 as number);
  const value1 = { presetButtons, setPresetButtons }; 
  const value2 = {componentSelect, setComponentSelect };

  return (
    <presetButtonsContext.Provider value={value1}> {/* Giving preset button context to children components */}
      <componentSelectContext.Provider value={value2}> {/* Giving component select context to children components */}
      <div className="flex h-screen overflow-hidden">
        <div className="w-1/3 h-5/6">
          <SidePanel />
        </div>
        <div className="flex w-2/3 h-5/6">
          <Stage />
        </div>
      </div>
      </componentSelectContext.Provider>
    </presetButtonsContext.Provider>
  )
}

export default App
