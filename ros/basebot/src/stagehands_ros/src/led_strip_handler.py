import time
from rpi_ws281x import PixelStrip, Color

class GroveWS2813RgbStrip(PixelStrip):
    '''
    Wrapper Class for Grove - WS2813 RGB LED Strip Waterproof - XXX LED/m

    Args:
        pin(int)  : 12, 18 for RPi
        count(int): strip LEDs count
        brightness(int): optional, set to 0 for darkest and 255 for brightest, default 255
    '''
    def __init__(self, pin, count, brightness = None):
        ws2812_pins = { 12:0, 13:1, 18:0, 19:1}
        if not pin in ws2812_pins.keys():
            print("OneLedTypedWs2812: pin {} could not used with WS2812".format(pin))
            return
        channel = ws2812_pins.get(pin)

        if brightness is None:
            brightness = LED_BRIGHTNESS

        # Create PixelStrip object with appropriate configuration.
        super(GroveWS2813RgbStrip, self).__init__(
            count,
            pin,
            LED_FREQ_HZ,
            LED_DMA,
            LED_INVERT,
            brightness,
            channel
        )

        # Intialize the library (must be called once before other functions).
        self.begin()

    # light every single led up
    def light_all_leds(self, color: Color):
        for i in range(self.numPixels()):
            self.setPixelColor(i, color)
        self.show()

    # set leds to flash (although this obviously stops after a while)
    def flashing_leds(self, color: Color, frequency: int):
        for i in range(10):
            for i in range(self.numPixels()):
                self.setPixelColor(i, color)
                self.show()

            time.sleep(1/frequency)

            for i in range(self.numPixels()):
                self.setPixelColour(i, Color(0, 0, 0))
                self.show()
            time.sleep(1/frequency)