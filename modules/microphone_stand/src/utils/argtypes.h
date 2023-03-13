#pragma once

struct MotorPinout {
    int lpwm_pin;
    int rpwm_pin;
    int hall_a_pin;
    int hall_b_pin;
};

struct MotorConfig : MotorPinout {
    double gear_ratio;
    int ppr;
    int smoothener_window_size;
};

struct PIDMotorConfig : MotorConfig {
    double kp;
    double ki;
    double kd;
};