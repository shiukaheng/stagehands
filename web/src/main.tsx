import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ServerProvider } from './ServerContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ServerProvider>
        <App />
    </ServerProvider>
)
