import threading
import time
import serial

ser = serial.Serial('/dev/pts/4', baudrate=9600)

if not ser.is_open:
    print('serial port not available')
    exit()

def print_time():
    while True:
        data = ser.readline().decode('utf-8').strip()
        if not data:
            continue

        print('\033[92m' + data + '\033[0m')

def listen_input():
    while True:
        inp = input()
        ser.write((inp + '\n').encode('utf-8'))

threading.Thread(target=print_time).start()
threading.Thread(target=listen_input).start()
