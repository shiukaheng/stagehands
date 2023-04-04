#include "positional_pid_motor.h"

PositionalPIDMotor::PositionalPIDMotor(PIDMotorConfig config) {
    // Set parameter variables
    _l_pin = config.l_pin;
    _r_pin = config.r_pin;
    _hall_a_pin = config.hall_a_pin;
    _hall_b_pin = config.hall_b_pin;
    _gear_ratio = config.gear_ratio;
    //_max_speed = config.maxSpeed;
    // PID variables
    _setpoint = 0;
    _input = 0;
    _output = 0;
    // Initialize PID controller
    _pid_controller.setOutputLimits(-config.max_pwm, config.max_pwm);
    _pid_controller.begin(&_input, &_output, &_setpoint, config.kp, config.ki, config.kd);
    // Initialize encoder
    _encoder = new PositionalEncoderReader(config.hall_a_pin, config.hall_b_pin, config.ppr, config.gear_ratio);
    // Initialize motor
    _motor = new RawMotor(config.l_pin, config.r_pin, config.smoothener_window_size);
}

PositionalPIDMotor::~PositionalPIDMotor() {
    delete _encoder;
    delete _motor;
}

void PositionalPIDMotor::setPWMRaw(int pwm_value) {
    // Disable PID
    _pid_controller.stop();
    _pid_controller.reset(); // TODO: Optimize so it only gets called on change
    _motor->setPWMRaw(pwm_value);
}

void PositionalPIDMotor::setPWM(int pwm_value) {
    _pid_controller.stop();
    _pid_controller.reset();
    _motor->setPWM(pwm_value);
}

void PositionalPIDMotor::setAngle(double angle) {
    _pid_controller.start();
    _setpoint = angle;
}

void PositionalPIDMotor::update() {
    // Update PID
    _input = _encoder->getAngle();
    _pid_controller.compute();
    // Update motor
    _motor->setPWM(_output);
    _motor->update();
}

void PositionalPIDMotor::isr() {
    _encoder->isr();
}

double PositionalPIDMotor::getAngle() {
    return _encoder->getAngle();
}

ArduPID PositionalPIDMotor::getPID() {
    return _pid_controller;
}

void PositionalPIDMotor::zero() {
    _encoder->zero();
}