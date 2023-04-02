import rospy

__all__ = ['GroveWS2813RgbStrip', 'PixelStrip', 'Color']

import time
from rpi_ws281x import PixelStrip, Color
from stagehands_ros.msg import ledData

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

def led_callback(data):
    color = Color(data.r, data.g, data.b)
    strip.setColor(Color(data.r, data.g, data.b))

# def publish_current_led_state():
#     rospy.Publisher('/current_led_data', ledData, queue_size=10)
#     rate = rospy.Rate(10)

#     while not rospy.is_shutdown():


if __name__ == "__main__":
    strip = GroveWS2813RgbStrip(12, 30)
    rospy.init_node('led_ros_node', anonymous=True)
    while not rospy.is_shutdown():
        try:
            rospy.wait_for_message('/led_data', ledData,timeout=1.0)
            rospy.Subscriber('/led_data', ledData, led_callback)
            rospy.loginfo('Successfully subscribed to LED topic!')
            break
        except rospy.ROSException:
            rospy.logwarn("Failed to subscribe to LED topic, retrying...")
            rospy.sleep(1.0)

    rospy.spin()

    strip.setColor(Color(0,0,0))