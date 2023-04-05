#! /usr/bin/env python
import stagehands_ros2.test
import stagehands_ros2.led
import stagehands_ros2.motor
import time

def onMicData(data):
    # print(data)
    pass

if __name__ == '__main__':

    # Test for LEDs

    # Create controller
    ledController = stagehands_ros2.led.LED()

    # Declare colors
    flashingWhite = stagehands_ros2.led.LEDState((255,255,255), True, 3)
    black = stagehands_ros2.led.LEDState((0,0,0))
    white = stagehands_ros2.led.LEDState((255,255,255))
    orange = stagehands_ros2.led.LEDState((255,165,0))
    pink = stagehands_ros2.led.LEDState((255,192,203))
    teal = stagehands_ros2.led.LEDState((0,255,255))
    lime = stagehands_ros2.led.LEDState((50,255,0))
    
    # Run commands
    ledController.setLEDState(flashingWhite) # Set the state
    ledController.start() # Start rendering loop
    print("Testing flash")
    time.sleep(2) # Let it run for 2 seconds
    ledController.setLEDState(black) # Turn it off
    print("Flash test done")

    # Test for mic module

    # Create controller
    micController = stagehands_ros2.motor.MicModule("/dev/ttyACM0", 115200, onMicData) # Initialize the mic
    micController.start() # Start the read serial
    print("Waiting for zeroing to be done")
    micController.waitForReady() # Wait for zeroing to finish
    print("Zeroing done, running test")

    print("State 1/5")
    micController.setState(10,90) # Set state 1
    ledController.setLEDState(white) # Set the state
    time.sleep(5)

    print("State 2/5")
    micController.setState(30,75)
    ledController.setLEDState(orange)
    time.sleep(8)

    print("State 3/5")
    micController.setState(20,120)
    ledController.setLEDState(pink)
    time.sleep(5)

    print("State 4/5")
    micController.setState(40,135)
    ledController.setLEDState(teal)
    time.sleep(5)

    print("State 5/5")
    micController.setState(50,90)
    ledController.setLEDState(lime)
    time.sleep(5)

    print("Test done")
    micController.setState(0,0) # Set state 1
    ledController.setLEDState(black) # Set the state

    time.sleep(0.1) # Give rendering loop some time to set it

    micController.stop() # Stop readline
    ledController.stop() # Stop the rendering loop