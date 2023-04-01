from motor import MicModule
from led import LED

def dataHandler(data):
    if data == "ZEROING":
        print("Mic module is zeroing")

    else:
        height, angle = data
        print("Mic is at height",height,"and angle",angle)

if __name__ == "__main__":
    l = LED()
    m = MicModule('/dev/ttyACM0', 115200, dataHandler)

    l.set(255,0,0)
    m.write("25,180\n")

    l.set(0,255,0)
    m.write("100,60\n")

    l.set(0,0,255)
    m.write("15,75\n")

    l.set(255,0,255)
    m.write("0,0\n")