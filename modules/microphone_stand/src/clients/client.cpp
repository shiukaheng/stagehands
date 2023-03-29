#include "client.h"
#include <string.h>

double motorHeight = 0;
double motorAngle = 0;

// PID Client for a single motor

SerialPositionalPIDClient::SerialPositionalPIDClient(PIDMotorConfig config, PIDMotorConfig config2) {
    _motor = new PositionalPIDMotor(config);
    _motor2 = new PositionalPIDMotor(config2);
    _inputBuffer = "";
}

SerialPositionalPIDClient::~SerialPositionalPIDClient() {
    delete _motor;
    delete _motor2;
}

void SerialPositionalPIDClient::isr() {
    _motor->isr();
}

void SerialPositionalPIDClient::isr2() {
    _motor2->isr();
}


double distToRot(double dist){
    
    double rotationDist = 4; //in mm
    //distance to travel -> number of rotations req
    return (dist/rotationDist)*360;

}

double rotToDist(double rot){

    double rotationDist = 4; //in mm
    //number of rotations -> distance req
    return (rot/360)*rotationDist;

}

void SerialPositionalPIDClient::update() {
    double maxDist = 45.0;
    long _lastTime = 0;

    _motor->update();
    _motor2->update();
    
    
    // This needs to run every 50ms
    if (millis() - _lastTime > 50) {
        Serial.print(-rotToDist(_motor->getAngle()));
        Serial.print(", ");
        Serial.println(_motor2->getAngle());
        // Update the last time
        _lastTime = millis();
    }

    while (Serial.available() > 0) {
        //receives data in the form of "height,angle"

        //String motorHeightStr = Serial.readStringUntil(','); // Read a character
        //double motorAngle = Serial.parseFloat();
        //double motorHeight = motorHeightStr.toDouble();

        char inChar = (char)Serial.read();
        _inputBuffer += inChar; // Add the character to the buffer
        if (inChar == '\n') {

            Serial.print("Input: ");
            Serial.println(_inputBuffer);

            int post = 0;
            for(int i = 0; i < _inputBuffer.length(); i++){
                if(_inputBuffer[i] == ','){
                    post = i;
                    break;
                }
            }

            motorHeight = (_inputBuffer.substring(0, post)).toDouble();
            motorAngle = (_inputBuffer.substring(post+1, _inputBuffer.length())).toDouble();

                
            if (motorHeight > maxDist){
                motorHeight = maxDist;
                Serial.println("Cannot go higher than extrusion - set max in client.cpp");
            }
            else if(motorHeight < 0){
                motorHeight = 0;
                Serial.println("Cannot go below zero! - if you need to go lower then zero the bot again");
            }

            Serial.print(motorHeight);
            Serial.print(", ");
            Serial.println(motorAngle);

            //dist = distance in cm (mm?)
            //translate distance to rotations
            double angle = distToRot(motorHeight);

            Serial.print("Motor Height: ");
            Serial.print(-motorHeight);
            Serial.print(" Motor Angle: ");
            Serial.println(motorAngle);

            // TODO: Set the speed
            _motor->setAngle(-angle);
            _motor2->setAngle(motorAngle);

            // Log motor2 input, setpoint, and output

            /*
            
            class ArduPID
            {
            public:
                double* input;
                double* output;
                double* setpoint;
                
            */

            // Clear the buffer
            _inputBuffer = "";
        }

    }
}
