import './App.css'
import SidePanel from './components/SidePanel/SidePanel'
import MenuBar from './components/MenuBar'
import { AppContexts } from './contexts/AppContexts'
import { Stage } from './components/Stage/Stage'
import { ConnectionScreen } from './components/ConnectionScreen/ConnectionScreen'
import { createContext, useContext } from 'react'
import screenSelectionContext from './contexts/WhichScreenContext'

function ScreenSelection() {
  const { screenSelection } = useContext(screenSelectionContext);
if (screenSelection === "main_screen") { {/* display main screen */}
    return(
    <div className='ui-div ui-shadow flex flex-col h-full'>
        <MenuBar/>
        <div className="flex h-full overflow-hidden flex-row">
          <SidePanel /> {/* Side panel that displays either preset or bot panel */}
          <Stage /> {/* Stage that displays the 3D scene */}
        </div>
      </div>
    )
    } else if (screenSelection === "connection_screen") { {/* display connection screen */}
      return <ConnectionScreen />
}
}

function App() {
    return(
    <AppContexts> {/* This is the root component that holds all the contexts for the app */}
      {ScreenSelection()}
    </AppContexts>
    )
}

export default App
