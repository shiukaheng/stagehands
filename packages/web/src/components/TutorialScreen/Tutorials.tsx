import BackButton from "../../utils/BackButton";
import Tutorial from "./Tutorial";
import connectBotVideo from "../../videos/connect-robots.mp4";
import createAndDeleteVideo from "../../videos/create & delete preset.mp4";
import editBotVideo from "../../videos/edit-bot.mp4";
import editPresetVideo from "../../videos/edit-preset.mp4";
import reorderPreset from "../../videos/reorder-preset.mp4";
import runPreset from "../../videos/run-preset.mp4";

export default function Tutorials() {
    return (
        <div className="ui-div ui-shadow flex flex-col h-full overflow-y-auto">

            {/* top bar holding back button and title of page */}
            <div className="flex flex-row h-12 w-full items-center ui-highlight">
                <BackButton />
                <div className="flex-grow font-bold text-lg">Tutorials</div>
            </div>
            <div className="flex flex-col overflow-y-auto gap-20">
                <Tutorial title="Connect Bot" description="connect a bot to the system and start controlling its movement." video={connectBotVideo} />
                <Tutorial title="Create & Delete Preset" description="Create Preset service records the current live view as preset." video={createAndDeleteVideo} />
                <Tutorial title="Edit Bot Attributes" description="edit bot attributes such as X,Y, color, and rotation." video={editBotVideo} />
                <Tutorial title="Edit Preset" description="edit existing presets to fine-tune your bot settings." video={editPresetVideo} />
                <Tutorial title="Reorder Preset" description="reorder presets to control the order of running presets." video={reorderPreset} />
                <Tutorial title="Run Preset" description="run presets to control multiple bots at once with a single click." video={runPreset} />
            </div>



        </div>)
}