#include "raw_motor.h"

RawMotor::RawMotor(int pwm_pin, int l_pin, int r_pin, int smoothener_window_size) {
    _pwm_pin = pwm_pin;
    _l_pin = l_pin;
    _r_pin = r_pin;
    _smoothener = new Smoothener(smoothener_window_size);
    pinMode(_pwm_pin, OUTPUT);
    pinMode(_l_pin, OUTPUT);
    pinMode(_r_pin, OUTPUT);
}

RawMotor::~RawMotor() {
    delete _smoothener;
}


void RawMotor::setPWMRaw(int pwm_value) {
    // Limit range between -255 and 255
    _actual_pwm = constrain(pwm_value, -255, 255); // Constrain is an Arduino function
    _use_smoothener = false;
}

void RawMotor::setPWM(int pwm_value) {
    _target_pwm = constrain(pwm_value, -255, 255);
    _use_smoothener = true;
}

void RawMotor::update() {
    if (_use_smoothener) {
        _actual_pwm = _smoothener->update(_target_pwm);
    }
    if (_actual_pwm > 0) {
        digitalWrite(_l_pin, HIGH);
        digitalWrite(_r_pin, LOW);
        analogWrite(_pwm_pin, _actual_pwm);
    } else {
        digitalWrite(_l_pin, LOW);
        digitalWrite(_r_pin, HIGH);
        analogWrite(_pwm_pin, -_actual_pwm);
    }
}