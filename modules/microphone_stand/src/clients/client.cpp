#include "client.h"
#include <string.h>

const int zeroingPin = 9;
double motorHeight = 0;
double motorAngle = 0;

// PID Client for a single motor

SerialPositionalPIDClient::SerialPositionalPIDClient(PIDMotorConfig config, PIDMotorConfig config2) {
    _motor = new PositionalPIDMotor(config);
    _motor2 = new PositionalPIDMotor(config2);
    _config = config;
    _config2 = config2;
    _inputBuffer = "";
    _zeroing = true;

    // Use zeroingPin, it is a pin connnected to button then ground
    // When pressed, we need to set _zeroing to false
    // By default the button is not pressed, so _zeroing is true
    pinMode(zeroingPin, INPUT_PULLUP);
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
    double maxDist = 47.0;
    long _lastTime = 0;

    // _motor->update();
    // _motor2->update();

    // If the zeroing pin is pressed, zero the motor
    if (digitalRead(zeroingPin) == LOW) {
        _zeroing = false;
        _motor->zero();
    }

    // If zeroing, move down motor1
    if (_zeroing) {
        analogWrite(_config.l_pin, _config.max_pwm);
        Serial.println("ZEROING");
    } else {
        _motor->update();
        _motor2->update();
    }
    
    
    // Run every 50ms
    if (millis() - _lastTime > 50) {
        // Output the values if not zeroing
        if (!_zeroing) {
            Serial.print(rotToDist(_motor->getAngle()));
            Serial.print(", ");
            Serial.println(_motor2->getAngle());
        }
        // Update the last time
        _lastTime = millis();

    }

    while (Serial.available() > 0) {

        char inChar = (char)Serial.read();
        _inputBuffer += inChar; // Add the character to the buffer
        if (inChar == '\n') {

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
            }
            else if(motorHeight < 0){
                motorHeight = 0;
            }

            double angle = distToRot(motorHeight);

            _motor->setAngle(angle);
            _motor2->setAngle(motorAngle);

            // Clear the buffer
            _inputBuffer = "";
        }

    }
}
