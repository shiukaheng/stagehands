#pragma once

#include <Arduino.h>
#include "../ardupid/ArduPID.h"
#include "positional_encoder.h"
#include "raw_motor.h"
#include "../utils/argtypes.h"

// #define MIN_MOVING_PWM 11 // Assumes symmetric PWMs

class PositionalPIDMotor {
    public:
        PositionalPIDMotor(PIDMotorConfig config);
        ~PositionalPIDMotor();
        /**
         * @brief Directly set the PWM value of the motor
         * 
         * @param pwm_value the pwm_value to set the motor to [-255, 255]
         */
        void setPWMRaw(int pwm_value);
        /**
         * @brief Set the PWM value of the motor with smoothening as a safety measure
         * 
         * @param pwm_value the pwm_value to set the motor to [-255, 255]
         */
        void setPWM(int pwm_value);
        /**
         * @brief Set the angle of the motor in radians
         * 
         * @param angle the angle to set the motor to in radians
         */
        void setAngle(double angle);
        /**
         * @brief Updates the motor, should be called in the main loop
         * 
         */
        void update();
        void isr();
        double getAngle();
        // PID functions and variables
        ArduPID getPID();
    private:
        // Internal PID variables
        ArduPID _pid_controller;
        PositionalEncoderReader* _encoder;
        double _setpoint;
        double _input;
        double _output;
        // Motor parameters
        int _lpwm_pin; // Left pwm pin
        int _rpwm_pin; // Right pwm pin
        int _hall_a_pin; // Meant to be attached to interrupt
        int _hall_b_pin; // Read in update function
        double _gear_ratio;
        // Motor
        RawMotor* _motor;
};