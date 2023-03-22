import { PointLightProps, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BotLEDState, LEDState } from "schema";

export function LED({ledState, ...props}: {ledState: LEDState} & PointLightProps) {

    const lightRef = useRef<THREE.PointLight>(null);
    const ledStateRef = useRef<LEDState>(ledState);
    const cycleRef = useRef<number>(0);

    useEffect(() => {
        // Copy the new state into the ref
        // console.log("LED", ledState);
        ledStateRef.current = ledState;
    }, [ledState]);

    // Create render loop using animation frame
    useFrame((state, delta) => {
        if (lightRef.current) {
            // Wrap around cycleRef in range [0, 1]
            if (ledStateRef.current?.ledAnimation?.flashingFrequency) {
                cycleRef.current = (cycleRef.current + delta * 0.5* ledStateRef.current?.ledAnimation?.flashingFrequency) % 1;
            }
            // Get the current state
            const displayColor = structuredClone(ledStateRef.current.rgbValue as [number, number, number]);
            if (ledStateRef.current?.ledAnimation?.animationMode === "flashing") {
                // Apply the animation
                const intensity = Math.abs(Math.sin(cycleRef.current * Math.PI * 2));
                displayColor[0] *= intensity;
                displayColor[1] *= intensity;
                displayColor[2] *= intensity;
            }
            // console.log("LED", cycleRef.current)
            // Apply the color
            lightRef.current.color.setRGB(displayColor[0], displayColor[1], displayColor[2]);
        }
    });
        
    return (
        <pointLight ref={lightRef} {...props}/>
    )

}