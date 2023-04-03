#! /usr/bin/env python
import stagehands_ros2.test
import stagehands_ros2.led
import stagehands_ros2.motor
import time

def onMicData(data):
    print(data)
    pass

if __name__ == '__main__':

    # Test for LEDs

    # Create controller
    ledController = stagehands_ros2.led.LED()

    # Declare colors
    flashingRed = stagehands_ros2.led.LEDState((255,0,0), True, 5)
    black = stagehands_ros2.led.LEDState((0,0,0))
    
    # Run commands
    ledController.setLEDState(flashingRed) # Set the state
    ledController.start() # Start rendering loop
    print("Testing flash")
    time.sleep(5) # Let it run for 5 seconds
    ledController.setLEDState(black) # Turn it off
    time.sleep(0.1) # Give rendering loop some time to set it
    ledController.stop() # Stop the rendering loop
    print("Flash test done")

    # Test for mic module

    # Create controller
    micController = stagehands_ros2.motor.MicModule("/dev/ttyACM0", 115200, onMicData) # Initialize the mic
    micController.start() # Start the read serial
    print("Waiting for zeroing to be done")
    micController.waitForReady() # Wait for zeroing to finish
    print("Zeroing done, running test")
    micController.setState(0,0) # Set state 1
    print((0,0))
    time.sleep(2)
    micController.setState(10,45)
    print((10,45))
    time.sleep(2)
    micController.setState(20,90)
    print((20,90))
    time.sleep(2)
    micController.setState(30,135)
    print((30,135))
    time.sleep(2)
    micController.setState(40,180)
    print((40,180))
    time.sleep(2)
    micController.setState(50,225)
    print((50,225))
    time.sleep(2)
    micController.setState(0,0)
    print((0,0))
    micController.stop() # Stop readline