import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { StageScene } from './StageScene'

export function Stage() {
  return (
    <div className="flex items-center justify-center w-screen inset-y-10 border-solid border-2 rounded-md overflow-auto">
      <Canvas>
        <OrbitControls />
        <StageScene />
      </Canvas>
    </div>
  );
}
