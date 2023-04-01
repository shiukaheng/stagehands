import serial
import time
import threading

class MicModule:
    def __init__(self, serialPort, baudRate, onMicData):
        self.serialPort = serialPort
        self.baudRate = baudRate
        self.connected = False
        self.serial = None
        self.serialThread = None
        self.onMicData = onMicData
        

    def start(self):
        # time.sleep(2)
        self.connected = True
        ramp_up_duration = 20
        iterator = list(range(0, 50))
        self.serial = serial.Serial(self.serialPort, self.baudRate)
        time.sleep(2)
        motor.startSerialRead()
        i = 0
        while True:
            # print(i)
            # print(i
            # self.serial.write((str(i)+","+str(i)+"\n").encode())
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
        self.serial.write(data.encode())

    # The callback funciton
    def serialInputHandler(self, data):
        # Check if the data is castable to float
        try:
            raw = data.decode()
            processed = raw.strip()
            if processed == "ZEROING":
                self.onMicData(processed)
            split = processed.split(",")
            for x in split:
                if (len(split) == 2 ):
                    try:
                        height, angle = split
                        height = float(height)
                        angle = float(angle)
                        # print(height, angle)
                        self.onMicData((height,angle))
                    except:
                        pass
            
        except ValueError:
            # If not, do nothing
            pass

def dataHandler(data):
    if data == "ZEROING":
        print("Mic module is zeroing")
    else:
        height, angle = data
        print("Mic is at height",height,"and angle",angle)

if __name__ == '__main__':
    motor = MicModule('/dev/ttyACM0', 115200, dataHandler)
    motor.start()