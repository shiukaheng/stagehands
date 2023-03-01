import { createContext, Fragment, useState } from 'react'
import './App.css'
import { Stage } from './Stage'
import SidePanel from './SidePanel'
import presetButtonsContext from './PresetButtonsContext'
import MicAttributesPage from './MicAttributesPage'
import componentSelectContext from './ComponentSwitchContext'
import MenuBar from './MenuBar'
//import { ServerProvider } from './ServerContext'
import useStickyState from './utils/useStickyState';
import { TopicClientCacher } from './utils/TopicClientCacher'

function App() {

  const [presetButtons, setPresetButtons] = useState([] as any[]);
  const [componentSelect, setComponentSelect] = useState(0 as number);
  const value1 = { presetButtons, setPresetButtons }; 
  const value2 = {componentSelect, setComponentSelect };

  const [url, setUrl] = useStickyState<string | null>(null, "url");

  return (
    <TopicClientCacher>
      <ServerProvider url={url} realServer={false}>
      <presetButtonsContext.Provider value={value1}> {/* Giving preset button context to children components */}
        <componentSelectContext.Provider value={value2}> {/* Giving component select context to children components */}
        <MenuBar setUrl={setUrl}/>
        <div className="flex h-screen overflow-hidden">
          <div className="w-1/3 h-5/6 pr-16">
            <SidePanel />
          </div>
          <div className="flex w-2/3 h-5/6">
            <Stage />
          </div>
        </div>
        </componentSelectContext.Provider>
      </presetButtonsContext.Provider>
      </ServerProvider>
    </TopicClientCacher>
  )
}

export default App
