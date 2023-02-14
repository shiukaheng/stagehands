import { Fragment, useState } from 'react';
import MicStand from './MicStand';

/**
 * StageScene
 *
 * @return Fragment with the lighting and plane for the stage
 */
export function StageScene() {
  const micStands = [ new MicStand('Mic 1', 2, 4), new MicStand('Mic 2', 5, 7) ];

  // render the mic stands on the plane
  return (
    <Fragment>
      <pointLight position={[0, 0, 100]} />
      <mesh>
        <mesh>
          <boxGeometry args={[20, 20, 0.1]} />
          <meshStandardMaterial attach="material" color="slate"/>
        </mesh>
        {
          micStands.map((micStand) => micStand.render())
        }
      </mesh> 
    </Fragment>
  )
}
