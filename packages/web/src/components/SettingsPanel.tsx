import React, { useContext } from 'react';
import { settingsContext } from '../contexts/SettingsContext';
import { useParsedUrl } from '../utils/useParsedUrl';

export function SettingsPanel() {
    const { serverUrl, setServerUrl } = useContext(settingsContext);
    const ipRef = React.useRef<HTMLInputElement>(null);
    const portRef = React.useRef<HTMLInputElement>(null);
    const parsedUrl = useParsedUrl(serverUrl);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const ip = ipRef.current?.value;
        const port = portRef.current?.value;
        setServerUrl(`http://${ip}:${port}`);
    };
    return (
        <div className='absolute bg-white rounded-3xl text-black p-10 border-solid border-2'>
            <form onSubmit={handleSubmit}>
                <label>
                    Server IP Address
                </label>
                <input className="text-black rounded-3xl border-solid border-2 mb-10" type="text" name="ip" ref={ipRef} defaultValue={parsedUrl?.hostname} />
                <label>
                    Server Port
                </label>
                <input className="text-black rounded-3xl border-solid border-2 mb-10" type="text" name="port" ref={portRef} defaultValue={parsedUrl?.port} />
                <button type="submit">Connect</button>
            </form>
        </div>
    );
}
