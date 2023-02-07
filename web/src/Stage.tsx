import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { StageScene } from './StageScene'

/**
 * Stage component
 *
 * @returns Canvas with the stage scene
 */
export function Stage() {
  return (
    <div style={{ height: "100vh" }}>
      <Canvas>
        <OrbitControls />
        <StageScene />
      </Canvas>
    </div>
  );
}
