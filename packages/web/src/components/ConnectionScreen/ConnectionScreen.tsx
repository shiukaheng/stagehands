import BackButton from './BackButton';
import AvailableBotsPanel from './AvailableBotsPanel';
import PreviewBotCanvas from './PreviewBotCanvas';
import { ServiceContext, TopicContext } from 'web/src/contexts/ServerContext';
import { createContext, useContext, useState } from 'react';
import screenSelectionContext from 'web/src/contexts/WhichScreenContext';
import { BotState } from 'schema';

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

export function ConnectedBotInfo({ botState, botID }: { botState: BotState, botID: string}) {
  const [hoverBotID] = useState<string>("");
  if (botState.name === hoverBotID) {
    return (
      "it works"
    )
  }
}

export function ConnectionScreen() {
  const serviceProvider = useContext(ServiceContext);
  const { screenSelection } = useContext(screenSelectionContext);
  const [hoverBotID, setBotID] = useState<string>("");
  const hoverContextValue = { hoverBotID, setBotID};
  // const provider = useContext(TopicContext);
  const hoverConditionalConnected = hoverBotID === "connected"
  const hoverConditionalDisconnected = hoverBotID === "disconnected"
  const hoverConditionalNone = hoverBotID === ""
    return (
      <div className="ui-div ui-shadow flex flex-col h-full">
        
        {/* top bar holding back button and title of page */}
        <div className="flex flex-row h-12 w-full overflow-auto items-center ui-highlight"> 
          <BackButton /> 
          <div className="flex-grow font-bold text-lg">Connect Bots</div> {/* title of page */}
        </div> {/* absolute top-1/4 left-1/2 text-center font-bold text-4xl */}

        {/* main body of page */}
        <div className="flex overflow-auto flex-row">
          <hoveredBotContext.Provider value={hoverContextValue}><AvailableBotsPanel /></hoveredBotContext.Provider>
          <div className="w-full flex-col overflow-visible"> {/* div for canvas and below details */}
            <div className="m-5 h-4/5 ui-shadow ui-div ui-highlight safari-canvas-overflow-fix">
              <PreviewBotCanvas />
              {/* below canvas details start */}
            </div>
            { hoverConditionalConnected ? (
              <div className="m-5 h-12 ui-shadow ui-div ui-highlight p-2 font-bold">
                {serviceProvider?.fleet && Object.entries(serviceProvider.fleet).map(([key, value]) => (
                                <ConnectedBotInfo botStatus={value} key={key} botID={key} />))}
              </div>
            ) : (
              hoverConditionalDisconnected ? (
                <div className="m-5 h-12 ui-shadow ui-div ui-highlight p-2 font-bold">This bot is disconnected</div>
              ) : (
                <div className="m-5 h-12 ui-shadow ui-div ui-highlight p-2 font-bold">Hover over an available bot for potential information</div>
            )
            )
            }
            
          </div>
          {/* below canvas details end */}

        </div>
        
        </div>
    )
}