import React, { useContext } from 'react';
import Popup from 'reactjs-popup';
import { emergencyStopService } from 'schema';
import { ServiceProvider, ServiceContext } from './ServerContext';

function MenuBar({setUrl}: {setUrl: (url: string) => void}) {
    const ipRef = React.useRef<HTMLInputElement>(null);
    const refreshRef = React.useRef<HTMLInputElement>(null);
    const portRef = React.useRef<HTMLInputElement>(null);

    const serviceProvider = useContext(ServiceContext);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const ip = ipRef.current?.value;
        const refresh = refreshRef.current?.value;
        const port = portRef.current?.value;

        setUrl(`http://${ip}:${port}`);
    }

    return (
        <div className="flex flex-row bg-white shadow-xl space-x-96 w-full border-solid border-2 p-2 mb-10 rounded-md overflow-auto">
            <Popup trigger={<button className="ml-10">Settings</button>} position="bottom left">
                <div className='absolute bg-white rounded-md text-black p-10 border-solid border-2'>
                    <h2 className='pb-10'>Settings</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Server IP Address
                        </label>
                        <input className="text-black rounded-md border-solid border-2 mb-10" type="text" name="ip" ref={ipRef} />

                        <label>
                            Server Port
                        </label>
                        <input className="text-black rounded-md border-solid border-2 mb-10" type="text" name="port" ref={portRef} />
                        
                        <label>
                            Refresh Rate
                        </label>
                        <input className="text-black rounded-md border-solid border-2 mb-10" type="text" name="refresh" ref={refreshRef} />

                        <button type="submit">Connect</button>
                    </form>
                </div>
            </Popup>
            <button>StageHand</button>
            <button onClick={() => {
              serviceProvider?.emergencyStop.callback();
              let resume = confirm("Resume?");
              
              if (resume) {
                serviceProvider?.emergencyStopClear.callback();
              }

            }} className="bg-red-600 text-white px-10">Stop</button>
        </div>
    );    
}

export default MenuBar;
