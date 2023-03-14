import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { StageScene } from './StageScene'
import { createContext, useCallback, useRef } from 'react';

export type cursorOverride = 'default' | 'pointer' | 'grab' | 'grabbing';
export interface IStageContext {
  setCursor: (cursor: cursorOverride) => void;
}
export const StageContext = createContext<IStageContext>({
  setCursor: () => {}
});

export function Stage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const setCursor = useCallback((cursor: cursorOverride) => {
    if (canvasRef.current && cursor !== null) {
      canvasRef.current.style.cursor = cursor;
    }
  }, [canvasRef]);
  return (
    <div className="flex-grow m-5 ui-shadow ui-div ui-highlight safari-canvas-overflow-fix">
      <Canvas
        ref={canvasRef}
        shadows
        camera={{
          position: [0, 10, 28],
          fov: 50
        }
        }>
        <StageContext.Provider value={{ setCursor }}>
        <color attach="background" args={['#222']} />
        <OrbitControls
          minDistance={1}
          maxDistance={7}
        />
        <spotLight position={[5, 5, 5]} penumbra={1} intensity={0.1}/>
        <spotLight position={[-5, 5, 5]} penumbra={1} intensity={0.1}/>
        <spotLight position={[5, 5, -5]} penumbra={1} intensity={0.1}/>
        <StageScene />
        </StageContext.Provider>
      </Canvas>
    </div>
  );
}
