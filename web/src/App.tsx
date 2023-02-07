import { useState } from 'react'
import './App.css'
import { Stage } from './Stage'
import { Menu } from './Menu'

/**
 * App component
 *
 * react entry point
 *
 * @returns {JSX.Element} App component
 */
function App() {
  return (
    <div className="w-full h-full p-0">
      <Menu />
      <div className="w-full">
        <Stage />
      </div>
    </div>
  )
}

export default App
