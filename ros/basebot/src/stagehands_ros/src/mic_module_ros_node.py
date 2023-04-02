import serial
import time
import threading
import rospy

from stagehands_ros.msg import micModuleData

class MicModule:
    def __init__(self, serialPort, baudRate, onMicData=None):
        self.serialPort = serialPort
        self.baudRate = baudRate
        self.connected = False
        self.serial = None
        self.serialThread = None
        self.onMicData = onMicData
        self.status = None
        self.start()

    def start(self):
        # time.sleep(2)
        self.connected = True
        ramp_up_duration = 20
        iterator = list(range(0, 50))
        self.serial = serial.Serial(self.serialPort, self.baudRate)
        time.sleep(2)
        self.startSerialRead()
        i = 0
        while True:
            self.serial.write((str(i*10)+","+str(i*10)+"\n").encode())
            i = (i + 1) % 6
            time.sleep(3)

    # Start multithread: https://stackoverflow.com/questions/17553543/pyserial-non-blocking-read-loop
    def startSerialRead(self):
        # Start _serialRead using new thread
        self.serialThread = threading.Thread(target=self._serialRead)
        self.serialThread.daemon = True
        self.serialThread.start()

    # Loop that continuously reads serial, and calls callback function self.serialInputHandler whenever a newline is received, and interpret as number
    def _serialRead(self):
        while self.connected == True:
            self.serialInputHandler(self.serial.readline())

    def stopSerialRead(self):
        self.connected = False
        self.serialThread.join() 

    def write(self,data):
        self.serial = serial.Serial(self.serialPort, self.baudRate)
        time.sleep(2)
        self.serial.write((data+'\n').encode())

    # The callback funciton
    def serialInputHandler(self, data):
        # Check if the data is castable to float
        try:
            raw = data.decode()
            processed = raw.strip()
            if processed == "ZEROING":
                self.onMicData(processed)
                self.status = processed
            split = processed.split(",")
            for x in split:
                if (len(split) == 2 ):
                    try:
                        height, angle = split
                        height = float(height)
                        angle = float(angle)
                        # print(height, angle)
                        self.onMicData((height,angle))
                        self.status = (height,angle)
                    except:
                        pass
            
        except ValueError:
            # If not, do nothing
            pass

def mic_module_callback(data):
    print(data)
    mic.write(str(data.micHeight) + "," + str(data.micOrientation))

def publish_mic_current_status():
    pub = rospy.Publisher('/mic_data', micModuleData, queue_size=10)

    rate = rospy.Rate(10)
    (height, angle) = mic.status

    while not rospy.is_shutdown():
        msg = micModuleData()
        msg.micHeight = height
        msg.micOrientation = angle
        pub.publish(msg)
        rate.sleep()

if __name__ == "__main__":
    mic = MicModule("/dev/ttyACM0", 115200)

    rospy.init_node('mic_module_node', anonymous=True)

    while not rospy.is_shutdown():
        try:
            rospy.wait_for_message('/mic_data', micModuleData,timeout=1.0)
            rospy.Subscriber('/mic_data', micModuleData, mic_module_callback)
            rospy.loginfo('Successfully subscribed to mic topic!')
            break
        except rospy.ROSException:
            rospy.logwarn("Failed to subscribe to mic topic, retrying...")
            rospy.sleep(1.0)

    rospy.spin()
    
