import { SidePanelSwitcher } from "./PresetPanel/PresetPanelSelection";
import { SidePanelTabs as SidePanelTabs } from "./SidePanelTabs";

function SidePanel() {
  return (
    <div id="SidePanel" className="min-w-[300px] m-8 overflow-clip ui-div ui-shadow ui-highlight"> {/* Left side panel where a list of mics will be displayed */}
      <SidePanelTabs/>
      <SidePanelSwitcher/>
    </div>
  )
}

export default SidePanel