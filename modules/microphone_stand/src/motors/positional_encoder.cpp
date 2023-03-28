#include "positional_encoder.h"
#include "math.h"

// /**
//  * @brief Converts the pulse period to wheel RPM
//  * 
//  * @param period The pulse period
//  * @return double The wheel RPM
//  */
// double period_to_rpm(int period, int ppr, double gear_ratio) {
//     // Microseconds in a second / period / pulses per revolution / gear down ratio * 60 (to get RPM)
//     return 1e6 / period / ppr * gear_ratio * 60;
// }

/**
 * @brief Converts the number of pulses to angle
 * 
 * @param pulses The number of pulses
 * @param ppr The pulses per revolution of the encoder
 * @param gear_ratio The gear ratio of the motor
 * @return double The angle in radians
 */
double pulses_to_angle(int pulses, int ppr, double gear_ratio) {

    return (pulses * M_PI / ppr / gear_ratio)/2;
}

// ========== IMPLEMENTATION ==========

PositionalEncoderReader::PositionalEncoderReader(int hall_a_pin, int hall_b_bin, int ppr = PPR, double gear_ratio = GEAR_RATIO) {
    _hall_a_pin = hall_a_pin;
    _hall_b_pin = hall_b_bin;
    _ppr = ppr;
    _gear_ratio = gear_ratio;
    pulse_count = 0;
    pinMode(_hall_b_pin, INPUT);
}

void PositionalEncoderReader::isr() {
    bool cws = digitalRead(_hall_b_pin);
    // Increment the number of pulses
    if (cws) {
        pulse_count++;
    } else {
        pulse_count--;
    }
}

double PositionalEncoderReader::getAngle() {
    return pulses_to_angle(pulse_count, _ppr, _gear_ratio);
}