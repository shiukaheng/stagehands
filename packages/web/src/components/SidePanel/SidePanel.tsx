import { SidePanelSwitcher } from "./PresetPanel/PresetPanelSelection";
import { SidePanelTabs as SidePanelTabs } from "./SidePanelTabs";

function SidePanel() {
  return (
    <div id="SidePanel" className="min-w-[300px] m-5 overflow-clip ui-div ui-shadow ui-highlight flex flex-col"> {/* Left side panel where a list of mics will be displayed */}
      <SidePanelTabs/>
      <SidePanelSwitcher/>
    </div>
  )
}

export default SidePanel