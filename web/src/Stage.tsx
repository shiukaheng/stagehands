import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { StageScene } from './StageScene'

export function Stage() {
  return (
    <div className="flex items-center justify-center w-full inset-y-10 border-solid border-2 rounded-md overflow-auto">
      <Canvas camera={
        {
          position: [0, 10, 28],
          fov: 50
        }
      }>
        <OrbitControls />
        <StageScene />
      </Canvas>
    </div>
  );
}
