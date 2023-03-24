import BackButton from './BackButton';
import AvailableBotsPanel from './AvailableBotsPanel';
import PreviewBotCanvas from './PreviewBotCanvas';
import { TopicContext } from 'src/contexts/ServerContext';
import { useContext } from 'react';
import screenSelectionContext from 'web/src/contexts/WhichScreenContext';

export function ConnectionScreen() {
  const { screenSelection } = useContext(screenSelectionContext);
  // const provider = useContext(TopicContext);
    return (
      <div>
        
        {/* top bar holding back button and title of page */}
        <div className="flex relative h-20 w-4/5 flex-row"> 
          <BackButton />
          <div className="absolute top-1/4 left-1/2 text-center font-bold text-4xl">Connect Bots</div> {/* title of page */}
        </div>

        {/* main body of page */}
        <div className="flex overflow-hidden flex-row">
          <AvailableBotsPanel />
          <div className="w-full flex-col overflow-visible"> {/* div for canvas and below details */}
            <div className="m-5 h-4/5 ui-shadow ui-div ui-highlight safari-canvas-overflow-fix">
              <PreviewBotCanvas />
              {/* below canvas details start */}
            </div>
            <div className="m-5 h-28 ui-shadow ui-div ui-highlight p-2 font-bold">Name</div> {/* selected bot info goes here */}
          </div>
          {/* below canvas details end */}

        </div>
        
        </div>
    )
}