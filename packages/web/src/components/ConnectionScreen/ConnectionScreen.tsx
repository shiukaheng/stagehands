import BackButton from './BackButton';
import AvailableBotsPanel from './AvailableBotsPanel';
import PreviewBotCanvas from './PreviewBotCanvas';
import { ServiceContext, TopicContext } from 'web/src/contexts/ServerContext';
import { createContext, useContext, useState } from 'react';
import screenSelectionContext from 'web/src/contexts/WhichScreenContext';

export interface IHoveredBot {
  hoverBotID: string
  setBotID: (input: string) => void
}

export const hoveredBotContext = createContext<IHoveredBot>({
  hoverBotID: "",
  setBotID: (input: string) => { input }
})

{/*export function hoverContext({children}): { children: ReactNode; } {
  const [botID, setBotID] = useState<string>("");
  const hoverContextValue = { botID, setBotID};

  return (

  )*/}

export function ConnectionScreen() {
  const serviceProvider = useContext(ServiceContext);
  const { screenSelection } = useContext(screenSelectionContext);
  const [hoverBotID, setBotID] = useState<string>("");
  const hoverContextValue = { hoverBotID, setBotID};
  // const provider = useContext(TopicContext);
    return (
      <div className="ui-div ui-shadow flex flex-col h-full">
        
        {/* top bar holding back button and title of page */}
        <div className="flex relative h-20 w-4/5 flex-row"> 
          <BackButton />
          <div className="absolute top-1/4 left-1/2 text-center font-bold text-4xl">Connect Bots</div> {/* title of page */}
        </div>

        {/* main body of page */}
        <div className="flex overflow-auto flex-row">
          <hoveredBotContext.Provider value={hoverContextValue}><AvailableBotsPanel /></hoveredBotContext.Provider>
          <div className="w-full flex-col overflow-visible"> {/* div for canvas and below details */}
            <div className="m-5 h-4/5 ui-shadow ui-div ui-highlight safari-canvas-overflow-fix">
              <PreviewBotCanvas />
              {/* below canvas details start */}
            </div>
            <div className="m-5 h-28 ui-shadow ui-div ui-highlight p-2 font-bold">Bot info {hoverBotID}</div> {/* selected bot info goes here */}
          </div>
          {/* below canvas details end */}

        </div>
        
        </div>
    )
}