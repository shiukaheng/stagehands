#include "rbc.h" // Robocock source code modified for position control
#include <math.h>

// Runs a PWM on pin 3 and measures the frequency on pin 2 using interrupts

SerialPositionalPIDClient* client;

void isr() {
    client->isr();
}

void setup() {
    Serial.begin(115200);

    // Defining a config struct
    PIDMotorConfig config;
    config.lpwm_pin = 5;
    config.rpwm_pin = 6;
    config.hall_a_pin = 9;
    config.hall_b_pin = 10;
    config.ppr = 64;
    config.gear_ratio = 1.0 / 30.0;
    config.smoothener_window_size = 5;
    config.kp = 0.1;
    config.ki = 0.0;
    config.kd = 0.0;

    // Initializing the client (which includes PID logic, motor control, and serial communication)
    client = new SerialPositionalPIDClient(config);

    // Attaches the interrupt to the pin to count the pulses (can't be done in the class constructor due to Arduino limitations)
    attachInterrupt(digitalPinToInterrupt(INT_PIN), isr, RISING);
}

void loop() {
    // Run client logic
    client->update();
}