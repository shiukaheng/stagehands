#pragma once

struct MotorPinout {
    int pwm_pin;
    int l_pin;
    int r_pin;
    int hall_a_pin;
    int hall_b_pin;
};

struct MotorConfig : MotorPinout {
    double gear_ratio;
    int ppr;
    int smoothener_window_size;
    //double maxSpeed;
};

struct PIDMotorConfig : MotorConfig {
    double kp;
    double ki;
    double kd;
};