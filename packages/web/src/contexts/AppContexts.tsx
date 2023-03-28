import { ReactNode, useState } from 'react';
import presetButtonsContext from './PresetButtonsContext';
import componentSelectContext from './ComponentSwitchContext';
import { ServiceProvider, TopicProvider } from './ServerContext';
import { TopicClientCacher } from '../utils/TopicClientCacher';
import { SettingsProvider } from './SettingsContext';
import { SidePanelSelection } from '../components/SidePanel/PresetPanel/PresetPanelSelection';
import screenSelectionContext, { ScreenSelection } from './WhichScreenContext';


export function AppContexts({ children }: { children: ReactNode; }) {
  const [presetButtons, setPresetButtons] = useState([] as any[]);
  const [componentSelect, setComponentSelect] = useState("preset_panel" as SidePanelSelection);
  const [screenSelection, setScreenSelection] = useState("connection_screen" as ScreenSelection);
  const value1 = { presetButtons, setPresetButtons };
  const value2 = { componentSelect, setComponentSelect };
  const value3 = { screenSelection, setScreenSelection };

  return (
    <SettingsProvider>
      <TopicClientCacher>
        <ServiceProvider>
          <TopicProvider>
            <presetButtonsContext.Provider value={value1}> {/* Giving preset button context to children components */}
              <componentSelectContext.Provider value={value2}> {/* Giving component select context to children components */}
                <screenSelectionContext.Provider value={value3}> {/* Giving screen selection context to children components */}
                {children}
                </screenSelectionContext.Provider>
              </componentSelectContext.Provider>
            </presetButtonsContext.Provider>
          </TopicProvider>
        </ServiceProvider>
      </TopicClientCacher>
    </SettingsProvider>
  );
}
