#include "rbc.h"
#include <math.h>

// Runs a PWM on pin 3 and measures the frequency on pin 2 using interrupts

// Motor pins
#define RPWM_PIN 5
#define LPWM_PIN 6
#define INT_PIN 9
#define DIR_PIN 10 // HALL B

SerialPositionalPIDClient* client;

// PIDMotorConfig config = {
//     6, // lpwm_pin
//     5, // rpwm_pin
//     9, // hall_a_pin
//     10, // hall_b_pin
//     64, // ppr
//     1.0 / 30.0, // gear_ratio
//     5, // smoothener_window_size
//     0.1, // kp
//     0.0, // ki
//     0.0 // kd
// };

void isr() {
    client->isr();
}

void setup() {
    Serial.begin(115200);

    PIDMotorConfig config;
    config.lpwm_pin = LPWM_PIN;
    config.rpwm_pin = RPWM_PIN;
    config.hall_a_pin = INT_PIN;
    config.hall_b_pin = DIR_PIN;
    config.ppr = 64;
    config.gear_ratio = 1.0 / 30.0;
    config.smoothener_window_size = 5;
    config.kp = 0.1;
    config.ki = 0.0;
    config.kd = 0.0;

    client = new SerialPositionalPIDClient(config);
    attachInterrupt(digitalPinToInterrupt(INT_PIN), isr, RISING);
}

void loop() {
    client->update();
}