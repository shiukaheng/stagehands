import './App.css'
import SidePanel from './components/SidePanel/SidePanel'
import MenuBar from './components/MenuBar'
import { AppContexts } from './contexts/AppContexts'
import { Stage } from './components/Stage/Stage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactJson from 'react-json-view'
import { useContext, useEffect } from 'react'
import { ServiceContext, TopicContext } from './contexts/ServerContext'
import { ConnectionScreen } from './components/ConnectionScreen/ConnectionScreen'
import Tutorials from './components/TutorialScreen/Tutorials'

function ControlPanel() {
	return (
		<div className='ui-div ui-shadow flex flex-col h-full'>
			<MenuBar />
			<div className="flex h-full overflow-hidden flex-row">
				<SidePanel /> {/* Side panel that displays either preset or bot panel */}
				<Stage /> {/* Stage that displays the 3D scene */}
			</div>
		</div>
	)
}

function Debug() {
	const topics = useContext(TopicContext)
	const services = useContext(ServiceContext)
	return (
		<div className='w-full h-full ui-div text-left'>
			<div className='p-8 w-full h-full bg-gray-300 flex flex-row overflow-x-auto text-xs gap-4'>
				<div className='flex flex-col gap-1'>
					<h1 className="text-black font-bold text-2xl">
						Topics
					</h1>
					{
						(topics === null) ? <div>Topics are null</div> : <ReactJson src={topics} />
					}
				</div>
				<div className='flex flex-col gap-1'>
					<h1 className="text-black font-bold text-2xl">
						Services
					</h1>
					<div className="text-black text-sm">
						Note: Services can be accessed in the browser console with global variable <code>services</code>
					</div>
					<div>
						{
							(services === null) ? <div>Services are null</div> : <ReactJson src={services} />
						}
					</div>
				</div>
			</div>
		</div>
	)
}

function ServicesExposer() {
	const services = useContext(ServiceContext)
	useEffect(() => {
		// @ts-ignore
		window.services = services
		return () => {
			// @ts-ignore
			delete window.services
		}
	}, [services])
	return null
}

function App() {
	return (
		<AppContexts> {/* This is the root component that holds all the contexts for the app */}
			<ServicesExposer />
			<Router>
				<Routes>
					<Route path='/' element={<ControlPanel />} />
					<Route path='/debug' element={<Debug />} />
					<Route path='/connectionscreen' element={<ConnectionScreen />} />
					<Route path='/tutorials' element={<Tutorials/>} />
				</Routes>
			</Router>
		</AppContexts>
	)
}

export default App
