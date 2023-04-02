import math
import time
from rpi_ws281x import PixelStrip, Color
import threading

# LED strip configuration
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 10      # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)

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
    def setColor(self, color):
        for i in range(self.numPixels()):
            self.setPixelColor(i, Color(0,0,0))
        for u in ([num for num in range(6, 14)] + [num for num in range(23, 30)]):
            self.setPixelColor(u, color)
        self.show()
        
class LEDState(object):
    def __init__(self, baseColor=(0,0,0), flashing=False, modulation_freq=None):
        # Base color (r,g,b):
        self.baseColor = baseColor
        # Flashing (True/False)
        self.flashing = flashing
        # Flashing frequency (Hz) or None if not flashing
        self.modulation_freq = modulation_freq

class LED():
    def __init__(self):
        self.strip = GroveWS2813RgbStrip(12, 30)
        self.frameRate = 30
        self.phase = 0
        self.modulation_freq = 0.5
        self.baseColor = (0,0,0)
        self.flashing = False
        self.running = True
        
        self.ledState = LEDState((0,0,0), False, 1)
        self.overrideLEDState = None # Used for notifications


    def _set(self,r,g,b):
        self.strip.setColor(Color(r,g,b))

    def _update(self, dt):
        # Update phase (0 - 2 * pi)
        self.phase += 2 * math.pi * self.modulation_freq * dt
        if self.phase > 2 * math.pi:
            self.phase -= 2 * math.pi

        # Calculate color
        color = self.baseColor
        if self.flashing:
            color = [int(c * (1 + math.sin(self.phase))) for c in color]

        # Set color
        self._set(*color)

    def _loop(self):
        while self.running:
            # Update
            self._update(1.0 / self.frameRate)

            # Sleep
            time.sleep(1.0 / self.frameRate)

    def _setRawLEDState(self, ledState):
        # Update / call the relevant functions
        self.baseColor = ledState.baseColor
        self.flashing = ledState.flashing
        self.modulation_freq = ledState.modulation_freq if ledState.flashing else 0

    # Below are the functions you ACTUALLY should care about

    def start(self):
        self.thread = threading.Thread(target=self._loop)
        self.thread.daemon = True
        self.thread.start()

    def stop(self):
        self.running = False
        self.thread.join()

    def setLEDState(self, ledState):
        self.ledState = ledState
        self._setRawLEDState(ledState)

    def setOverrideLEDState(self, ledState):
        self.overrideLEDState = ledState
        if (ledState is None):
            self.clearOverrideLEDState()
        else:
            self._setRawLEDState(ledState)

    def clearOverrideLEDState(self):
        self.overrideLEDState = None
        self._setRawLEDState(self.ledState)