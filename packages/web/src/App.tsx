import './App.css'
import SidePanel from './components/SidePanel/SidePanel'
import MenuBar from './components/MenuBar'
import { AppContexts } from './contexts/AppContexts'
import { Stage } from './components/Stage/Stage'
import { ConnectionScreen } from './components/ConnectionScreen/ConnectionScreen'
import { createContext, useContext } from 'react'
import screenSelectionContext from './contexts/WhichScreenContext'
import { ScreenSelection } from './ScreenSelection'

function App() {
    return(
    <AppContexts> {/* This is the root component that holds all the contexts for the app */}
      <ScreenSelection/>
    </AppContexts>
    )
}

export default App
