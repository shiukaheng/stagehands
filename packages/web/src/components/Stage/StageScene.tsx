import { Fragment, useState, useContext } from 'react';
import { TopicContext } from '../../contexts/ServerContext';
import Bot from './3d/Bot';
import { SpotLight, useDepthBuffer } from '@react-three/drei';
import BotTargetPose from './3d/BotTargetPose';
import componentSelectContext from '../../contexts/ComponentSwitchContext';
import PresetBot from './3d/PresetBot';
import { Preset } from 'schema';
import { cp } from 'fs';

/**
 * StageScene
 *
 * @return Fragment with the lighting and plane for the stage
 */
export function StageScene() {
  const provider = useContext(TopicContext);
  const depthBuffer = useDepthBuffer()
  const { componentSelect, setComponentSelect } = useContext(componentSelectContext);
  // const currentPreset = componentSelect.type === "mic_panel" ? (provider?.stage?.presets.find((preset) => preset.id === componentSelect.presetID)?.value.state) : null
  let current: Preset | undefined;
  if (componentSelect.type === "mic_panel" || componentSelect.type === "preset_mic_attributes_page") {
    current = provider?.stage?.presets.find((preset) => preset.id === componentSelect.presetID)?.value
    // console.log("current")
  } else {
    current = undefined;
  }


  // render the mic stands on the plane
  return (
    <Fragment>
      <SpotLight
        depthBuffer={depthBuffer}
        intensity={6}
        position={[0, 8, 0]}
        distance={9}
        angle={0.5}
        penumbra={1}
        castShadow
        attenuation={10}
      />
      <fog attach="fog" args={['#222', 0, 100]} />
      <ambientLight intensity={0.1} receiveShadow color={[0.87, 0.86, 1]} />
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {current ? (
        Object.entries(current.state).map(([key, value]) => (
          <PresetBot module={value} key={key} />
        ))
      ) : (
        provider?.fleet && Object.entries(provider.fleet).map(([key, value]) => (
          <Fragment key={key}>
            <Bot bot={value}/>
            <BotTargetPose module={value}/>
          </Fragment>
        ))
        // provider?.stage?.presets[1] && Object.entries(provider.stage.presets[1].value.state).map(([key, value]) => (
        //   <Bot module={value} key={key} />
        // ))

      )
      }

    </Fragment>
  )
}
