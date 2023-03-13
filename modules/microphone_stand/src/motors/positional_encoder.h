#pragma once

#include <Arduino.h>

#define PPR 64
#define GEAR_RATIO 1./30.

/* USAGE:
 * 1. Create an EncoderReader object:
 *      EncoderReader* encoder = new EncoderReader(hall_a_pin, hall_b_pin);
 * 2. Create a static ISR function that calls the isr() function of the encoder object:
 *      void isr() {
 *         encoder->isr();
 *      }
 * 3. Attach the ISR to the interrupt pin:
 *      attachInterrupt(digitalPinToInterrupt(INT_PIN), isr, RISING);
 * 4. Call update() in the main loop and get the angle:
 *       void loop() {
 *          ...
 *          encoder->update();
 *          double angle = encoder->getAngle();
 *          ...
 *       }
 */

// ========== MAIN CLASS DECLARATION =========

/**
 * @brief A class that monitors the encoder and calculates the angle
 * 
 */
class PositionalEncoderReader {
    private:
        // Params
        int _hall_a_pin;
        int _hall_b_pin;
        int _ppr;
        double _gear_ratio;
        // ISR vars
        volatile long pulse_count;
    public:
        PositionalEncoderReader(int hall_a_pin, int hall_b_bin, int ppr = PPR, double gear_ratio = GEAR_RATIO);
        ~PositionalEncoderReader();
        /**
         * @brief The ISR hook that should be triggered by the A pin of the encoder
         * 
         */
        void isr();
        /**
         * @brief Gets the angle of the motor
         * 
         * @return double The angle of the motor in radians
         */
        double getAngle();
};