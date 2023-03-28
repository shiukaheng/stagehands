import { useContext } from "react";
import { TopicContext } from "web/src/contexts/ServerContext";
import { AvailableBotWidget } from "./AvailableBotWidget";

function AvailableBotsPanel() {
    const provider = useContext(TopicContext);
    return (
        <div id="AvailableBotsPanel" className="min-w-[300px] m-5 overflow-clip ui-div ui-shadow ui-highlight flex flex-col">
            <div id="MiddleSection" className=" border-solid h-full snap-center overflow-y-auto overflow-x-hidden">
                <div className="text-lg font-bold mb-4 ui-div ui-shadow ui-highlight-extra mx-6 p-2 m-5">
                    Available Bots
                </div>
                <div className="w-full snap-center flex flex-col items-center gap-4">
                {provider?.fleet && Object.entries(provider.fleet).map(([key, value]) => (
                        <AvailableBotWidget botState={value} key={key} botID ={key} />))} {/* CHANGE THIS TO BROADCAST WHEN ITS READY */}
                </div>
            </div> 
        </div>
    )
}

export default AvailableBotsPanel;