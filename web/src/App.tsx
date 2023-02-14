import { Fragment, useState } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'
import { Stage } from './Stage'
import SidePanel from './SidePanel'
import React from 'react'

function App() {
  const [buttons, setButtons] = useState([] as any[])

  return (
    <Fragment>
      <div className="flex h-screen overflow-hidden">
        <div className="w-1/3 h-5/6">
          <SidePanel />
        </div>
        <div className="flex w-2/3 h-5/6">
          <Stage />
        </div>
      </div>
    </Fragment>
  )
}

export default App
