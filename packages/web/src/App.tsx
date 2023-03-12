import './App.css'
import SidePanel from './components/SidePanel/SidePanel'
import MenuBar from './components/MenuBar'
import { AppContexts } from './contexts/AppContexts'
import { Stage } from './components/Stage/Stage'

function App() {
  return (
    <AppContexts> {/* This is the root component that holds all the contexts for the app */}
      <div className='ui-div ui-shadow flex flex-col h-full'>
        <MenuBar/>
        <div className="flex h-full overflow-hidden flex-row">
          <SidePanel /> {/* Side panel that displays either preset or bot panel */}
          <Stage /> {/* Stage that displays the 3D scene */}
        </div>
      </div>
    </AppContexts>
  )
}

export default App
