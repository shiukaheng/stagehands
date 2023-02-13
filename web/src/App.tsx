import { Fragment, useState } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'
import { Stage } from './Stage'
import SidePanel from './SidePanel'
import React from 'react'

function App() {
  const [buttons, setButtons] = useState([] as any[])

  return (
    document.body.style.backgroundColor = "grey", // for debugging to see where 3D plane is
    <Fragment>
    <SidePanel />
    <Stage />
    </Fragment>
  )
}

export default App
