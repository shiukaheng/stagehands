import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei'
import { createContext, useCallback, useRef } from "react";
import { StageScene } from "../Stage/StageScene";
import { PreviewScene } from "./PreviewScene";

export type cursorOverride = 'default' | 'pointer' | 'grab' | 'grabbing';
export interface IPreviewContext {
  setCursor: (cursor: cursorOverride) => void;
}
export const PreviewContext = createContext<IPreviewContext>({
  setCursor: () => {}
});

function PreviewBotCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
  const setCursor = useCallback((cursor: cursorOverride) => {
    if (canvasRef.current && cursor !== null) {
      canvasRef.current.style.cursor = cursor;
    }
  }, [canvasRef]);
    return (
        <Canvas
        ref={canvasRef}
        shadows
        camera={{
          position: [0, 10, 28],
          fov: 50
        }
        }>
        <PreviewContext.Provider value={{ setCursor }}>
        <color attach="background" args={['#222']} />
        <OrbitControls
          minDistance={1}
          maxDistance={7}
        />
        <spotLight position={[5, 5, 5]} penumbra={1} intensity={0.1}/>
        <spotLight position={[-5, 5, 5]} penumbra={1} intensity={0.1}/>
        <spotLight position={[5, 5, -5]} penumbra={1} intensity={0.1}/>
        <PreviewScene />
        </PreviewContext.Provider>
      </Canvas>
    )
}

export default PreviewBotCanvas;