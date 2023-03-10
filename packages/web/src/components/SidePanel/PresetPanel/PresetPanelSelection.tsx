import PresetPanel from "./PresetPanel";
import { BotState, RecallBotState } from 'schema';
import { useContext } from "react";
import componentSelectContext from "../../../contexts/ComponentSwitchContext";
import BotOverviewPanel from "../BotOverviewPanel/BotOverviewPanel";
import LiveBotAttributesEditor from "../BotOverviewPanel/LiveBotAttributesEditor";
import PresetBotAttributesEditor from "../BotOverviewPanel/PresetBotAttributesEditor";


export type PresetPanelSelection = "preset_panel";
export type MicPanelSelection = {
	type: "mic_panel";
	presetID: string | null;
};

export type PresetMicAttributesPageSelection = {
	type: "preset_mic_attributes_page";
	name: string | undefined;
	presetID: string;
	botID: string;
	bot: RecallBotState;
};

export type LiveAttributesPageSelection = {
	type: "live_attributes_page";
	bot: BotState;
	botID: string;

};

export type SidePanelSelection = PresetPanelSelection | MicPanelSelection | PresetMicAttributesPageSelection | LiveAttributesPageSelection;

/**
 * Switches the component that displays the main body of the side panel
 */
export function SidePanelSwitcher() {
	const { componentSelect } = useContext(componentSelectContext);
	if (componentSelect === "preset_panel") {
		console.log("preset panel");
		return (<PresetPanel />);
	} else if (componentSelect.type === "mic_panel") {
		console.log("mic panel");
		return (<BotOverviewPanel presetID={componentSelect.presetID} />);
	} else if (componentSelect.type === "preset_mic_attributes_page") {
		console.log("preset mic attributes page");
		return (<PresetBotAttributesEditor bot={componentSelect.bot} name={componentSelect.name} presetID={componentSelect.presetID} botID={componentSelect.botID} />); // TODO add mic attributes page
	} else if (componentSelect.type === "live_attributes_page") {
		console.log("live mic attributes page");
		return (<LiveBotAttributesEditor bot={componentSelect.bot} botID = {componentSelect.botID} />);
	} else {
		return null;
	}
}
