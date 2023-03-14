import { Fragment, useState, useContext } from 'react';
import { TopicContext } from '../../contexts/ServerContext';
import Bot from './3d/Bot';
import { SpotLight, useDepthBuffer } from '@react-three/drei';

/**
 * StageScene
 *
 * @return Fragment with the lighting and plane for the stage
 */
export function StageScene() {
  const provider = useContext(TopicContext);
  const depthBuffer = useDepthBuffer()
  // render the mic stands on the plane
  return (
    <Fragment>
      <SpotLight
        depthBuffer={depthBuffer}
        intensity={6}
        position={[0, 20, 0]}
        distance={25}
        angle={2}
        penumbra={1}
        castShadow
        attenuation={20}
      />
      <fog attach="fog" args={['#222', 0, 100]} />
      <ambientLight intensity={0.1} receiveShadow color={[0.87,0.86,1]}/>
      <mesh
        position={[0, -0.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {
        provider?.fleet && Object.entries(provider.fleet).map(([key, value]) => (
          <Bot module={value} key={key} />
        ))
      }
    </Fragment>
  )
}
