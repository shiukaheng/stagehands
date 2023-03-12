import { useContext } from 'react';
import Popup from 'reactjs-popup';
import { ServiceContext } from '../contexts/ServerContext';
import { SettingsPanel } from './SettingsPanel';
import {IoSettingsSharp} from 'react-icons/io5';

function MenuBar() {
    const serviceProvider = useContext(ServiceContext);
    return (
        <div className="flex flex-row h-12 w-full overflow-auto items-center ui-highlight">
            <Popup trigger={<button className="px-4 py-2"><IoSettingsSharp/></button>} position="bottom left">
                <SettingsPanel/>
            </Popup>
            <div className='flex-grow font-bold text-lg'>
                Stagehands Control Panel
            </div>
            <button onClick={() => {
                serviceProvider?.emergencyStop.callback();
                let resume = confirm("Resume?");
                if (resume) {
                    serviceProvider?.emergencyStopClear.callback();
                }
            }} className="bg-red-600 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-600 transition-colors duration-500 text-white px-4 py-2 h-full">Stop</button>
        </div>
    );
}

export default MenuBar;

