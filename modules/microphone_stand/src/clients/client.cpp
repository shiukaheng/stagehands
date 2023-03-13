#include "client.h"

// PID Client for a single motor

SerialPositionalPIDClient::SerialPositionalPIDClient(PIDMotorConfig config) {
    _motor = new PositionalPIDMotor(config);
    _inputBuffer = "";
}

SerialPositionalPIDClient::~SerialPositionalPIDClient() {
    delete _motor;
}

void SerialPositionalPIDClient::isr() {
    _motor->isr();
}

void SerialPositionalPIDClient::update() {
    _motor->update();
    Serial.println(_motor->getAngle());
    while (Serial.available() > 0) {
        char inChar = (char)Serial.read();
        _inputBuffer += inChar;
        if (inChar == '\n') {
            // Parse the input buffer
            double angle = _inputBuffer.toDouble();
            // TODO: Set the speed
            _motor->setAngle(angle);
            // Clear the buffer
            _inputBuffer = "";
        }
    }
}