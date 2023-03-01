import { Fragment, useState, useContext } from 'react';
import { ServerContext } from './ServerContext';
import Module3DComponent from './Module3DComponent';

/**
 * StageScene
 *
 * @return Fragment with the lighting and plane for the stage
 */
export function StageScene() {
  const provider = useContext(ServerContext);

  // render the mic stands on the plane
  return (
    <Fragment>
      <pointLight position={[0, 100, 0]} />
      <ambientLight intensity={0.3} />
      <mesh>
        <mesh
          position={[0, -0.5, 0]}
        >
          <boxGeometry args={[20, 0.1, 20]} />
          <meshStandardMaterial attach="material" color="slate"/>
        </mesh>
          { 
          //    provider?.fleet && Object.entries(provider.fleet).map(([key, value]) => (
          //    <Module3DComponent module={value} key={key} />))
          }
      </mesh> 
    </Fragment>
  )
}
