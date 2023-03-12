import { ReactNode, useState } from 'react';
import presetButtonsContext from './PresetButtonsContext';
import componentSelectContext from './ComponentSwitchContext';
import { ServiceProvider, TopicProvider } from './ServerContext';
import { TopicClientCacher } from '../utils/TopicClientCacher';
import { SettingsProvider } from './SettingsContext';
import { SidePanelSelection } from '../components/SidePanel/PresetPanel/PresetPanelSelection';


export function AppContexts({ children }: { children: ReactNode; }) {
  const [presetButtons, setPresetButtons] = useState([] as any[]);
  const [componentSelect, setComponentSelect] = useState("preset_panel" as SidePanelSelection);
  const value1 = { presetButtons, setPresetButtons };
  const value2 = { componentSelect, setComponentSelect };

  return (
    <SettingsProvider>
      <TopicClientCacher>
        <ServiceProvider>
          <TopicProvider>
            <presetButtonsContext.Provider value={value1}> {/* Giving preset button context to children components */}
              <componentSelectContext.Provider value={value2}> {/* Giving component select context to children components */}
                {children}
              </componentSelectContext.Provider>
            </presetButtonsContext.Provider>
          </TopicProvider>
        </ServiceProvider>
      </TopicClientCacher>
    </SettingsProvider>
  );
}
