import './App.css'
import SidePanel from './components/SidePanel/SidePanel'
import MenuBar from './components/MenuBar'
import { AppContexts } from './contexts/AppContexts'
import { Stage } from './components/Stage/Stage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactJson from 'react-json-view'
import { useContext } from 'react'
import { TopicContext } from './contexts/ServerContext'

function ControlPanel() {
  return (
    <div className='ui-div ui-shadow flex flex-col h-full'>
      <MenuBar/>
      <div className="flex h-full overflow-hidden flex-row">
        <SidePanel /> {/* Side panel that displays either preset or bot panel */}
        <Stage /> {/* Stage that displays the 3D scene */}
      </div>
    </div>
  )
}

function Debug() {
  const topics = useContext(TopicContext)
  return (
    <div className='w-full h-full ui-div text-left'>
      {
        (topics === null) ?
          <div className='text-center'>
            <h1 className='text-2xl p-8 w-full h-full'>Not connected to server</h1>
          </div>
        :
        <div className='p-8 w-full h-full bg-white flex flex-col'>
          <div>
            <h1 className="text-black text-2xl">
              Topics
            </h1>
            <ReactJson src={topics} />
          </div>
          <div>
            <h1 className="text-black text-2xl">
              Services
            </h1>
            <div>
              {

              }
            </div>
          </div>
        </div>

      }
    </div>
  )
}

function App() {
  return (
    <AppContexts> {/* This is the root component that holds all the contexts for the app */}
      <Router>
        <Routes>
          <Route path='/' element={<ControlPanel />} />
          <Route path='/debug' element={<Debug />} />
        </Routes>
      </Router>
    </AppContexts>
  )
}

export default App
