import serial
import time
import threading

class MicModule:
    def __init__(self, serialPort, baudRate, onMicData=None):
        self.serialPort = serialPort
        self.baudRate = baudRate
        self.connected = False
        self.serial = None
        self.serialThread = None
        self.onMicData = onMicData
        self.writeInitialized = False
        self.lastWriteMsg = None
        self.lastReadMsg = None

    def start(self):
        self.connected = True
        self.serial = serial.Serial(self.serialPort, self.baudRate)
        time.sleep(0.5)
        self.startSerialRead()
        self.writeInitialized = True
        if not (self.lastWriteMsg == None):
            self.serial.write(self.lastWriteMsg.encode())

    def setState(self, height=0, angle=0):
        msg = (str(height)+","+str(angle)+"\n")
        if (self.writeInitialized):
            self.serial.write(msg.encode())
        else:
            self.lastWriteMsg = msg

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

    def stop(self):
        self.connected = False
        self.serialThread.join() 

    def write(self,data):
        self.serial = serial.Serial(self.serialPort, self.baudRate)
        time.sleep(2)
        self.serial.write((data+'\n').encode())

    def waitForReady(self):
        while ((self.lastReadMsg is None) or (self.lastReadMsg == "ZEROING")):
            time.sleep(0.05)

    # The callback funciton
    def serialInputHandler(self, data):
        # Check if the data is castable to float
        try:
            raw = data.decode()
            processed = raw.strip()
            if processed == "ZEROING":
                if not (onMicData is None):
                    self.onMicData(processed)
                self.lastReadMsg = "ZEROING"
            split = processed.split(",")
            for x in split:
                if (len(split) == 2 ):
                    try:
                        height, angle = split
                        height = float(height)
                        angle = float(angle)
                        # print(height, angle)
                        self.lastReadMsg = (height,angle)
                        if not (onMicData is None):
                           self.onMicData(processed)
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