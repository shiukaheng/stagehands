#pragma once

#include <Arduino.h>
#include "../motors/positional_pid_motor.h"
#include "../motors/positional_encoder.h"
#include "../motors/raw_motor.h"
#include "../utils/argtypes.h"

/**
 * @brief A client that listens for PID RPM targets, and uses closed loop control to achieve them
 * 
 */
class SerialPositionalPIDClient {
    private:
        String _inputBuffer;
        PositionalPIDMotor* _motor;
        PositionalPIDMotor* _motor2;
    public:
        SerialPositionalPIDClient(PIDMotorConfig config, PIDMotorConfig config2);
        ~SerialPositionalPIDClient();
        void update();
        void isr();
        void isr2();
};