import { Fragment, useState, useContext } from 'react';
// import { TopicContext } from '../../contexts/ServerContext';
// import Bot from './3d/Bot';
import { SpotLight, useDepthBuffer } from '@react-three/drei';
import Bot from '../Stage/3d/Bot';
import { TopicContext } from 'web/src/contexts/ServerContext';

/**
 * PreviewScene
 *
 * @return Fragment with the lighting and plane for the stage
 */
export function PreviewScene() {
  const provider = useContext(TopicContext);
  const depthBuffer = useDepthBuffer()
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
      <ambientLight intensity={0.1} receiveShadow color={[0.87,0.86,1]}/>
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {
      provider?.fleet && Object.entries(provider.fleet).map(([key, value]) => (
          <Fragment key={key}>
            <Bot module={value}/>
          </Fragment>
      )) 
      }
    </Fragment>
  )
}
