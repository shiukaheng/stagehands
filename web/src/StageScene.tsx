import { Plane } from '@react-three/drei';
import { Fragment } from 'react';

/**
 * StageScene
 *
 * @return Fragment with the lighting and plane for the stage
 */
export function StageScene() {
  return (
    <Fragment>
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <Plane args={[2, 2]} />
        <meshStandardMaterial attach="material" color="red"/>
      </mesh> 
    </Fragment>
  )
}
