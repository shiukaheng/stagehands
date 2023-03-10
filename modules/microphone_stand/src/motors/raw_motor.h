#pragma once

#include <Arduino.h>
#include "../utils/smoothener.h"

/**
 * @brief Raw motor class for directly controlling the motor without encoder feedback
 * 
 */
class RawMotor {
    public:
        /**
         * @brief Construct a new Raw Motor object, sets the pins to output
         * 
         * @param pwm_pin the pin to control the motor speed
         * @param l_pin the pin to control the left motor direction
         * @param r_pin the pin to control the right motor direction
         * @param smoothener_window_size the size of the window for the smoothener
         */
        RawMotor(int pwm_pin, int lpwm_pin, int rpwm_pin, int smoothener_window_size = 5);
        ~RawMotor();
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
         * @brief Updates the motor, should be called in the main loop
         * 
         */
        void update();
    private:
        Smoothener* _smoothener;
        int _pwm_pin;
        int _l_pin;
        int _r_pin;
        int _target_pwm = 0;
        int _actual_pwm = 0;
        bool _use_smoothener = true;
};