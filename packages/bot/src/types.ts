// StagehandsCommandState

// float64 xPos
// float64 yPos
// float64[] rotationQuaternion
// float64 micHeight
// float64 micAngle
// bool isFlashing
// uint8[] ledRGBColour
// float64 flashFrequency

// StagehandsFeedbackState

// float64 xPos
// float64 yPos
// float64[] rotationQuaternion
// float64 currentMicHeight
// float64 currentMicAngle

export type StagehandsCommandState = {
    xPos: number
    yPos: number
    rotationQuaternion: [number, number, number, number]
    micHeight: number
    micAngle: number
    isFlashing: boolean
    ledRGBColour: [number, number, number]
    flashFrequency: number
}

export type StagehandsFeedbackState = {
    xPos: number
    yPos: number
    rotationQuaternion: [number, number, number, number]
    micHeight: number
    micAngle: number
}