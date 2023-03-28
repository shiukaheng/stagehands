#include "rbc.h" // Robocock source code modified for position control
#include <math.h>

int zero = 4;

// Runs a PWM on pin 3 and measures the frequency on pin 2 using interrupts

SerialPositionalPIDClient* client;

void isr() {
    client->isr();
}

void isr2() {
    client->isr2();
}

void setup() {
    Serial.begin(115200);

    // Defining a config struct
    PIDMotorConfig config;
    config.pwm_pin = 11;
    config.l_pin = 6;
    config.r_pin = 5;
    config.hall_a_pin = 3;
    config.hall_b_pin = 10;
    config.ppr = 64;
    config.gear_ratio = 1.0 / 30;
    config.smoothener_window_size = 5;
    config.kp = 2;
    config.ki = 0.;
    config.kd = 0.1;

    PIDMotorConfig config2;
    config2.pwm_pin = 9;
    config2.l_pin = 12;
    config2.r_pin = 13;
    config2.hall_a_pin = 2;
    config2.hall_b_pin = 8;
    config2.ppr=64;
    config2.gear_ratio = 1.0/30.0;
    config2.smoothener_window_size = 5;
    config2.kp = 2;
    config2.ki = 0.;
    config2.kd = 0.1;

    pinMode(zero, INPUT_PULLUP);

    // Initializing the client (which includes PID logic, motor control, and serial communication)
    client = new SerialPositionalPIDClient(config, config2);

    // Attaches the interrupt to the pin to count the pulses (can't be done in the class constructor due to Arduino limitations)

    zeroBot();

    attachInterrupt(digitalPinToInterrupt(config.hall_a_pin), isr, RISING);
    attachInterrupt(digitalPinToInterrupt(config2.hall_a_pin), isr2, RISING);
}

void loop() {
    // Run client logic
    client->update();
}

void zeroBot(){
  while(digitalRead(zero) == HIGH){
    analogWrite(11, 80);
    digitalWrite(6, HIGH);
    digitalWrite(5, LOW);
    Serial.println("ZEROING");
  }
  digitalWrite(11, LOW);
  digitalWrite(6, LOW);
  digitalWrite(5, LOW);
}
