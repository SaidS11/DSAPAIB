import threading
import time
import nidaqmx


# ser = serial.Serial('COM5', 9600, timeout=1)
with nidaqmx.Task() as task:
    task.ai_channels.add_ai_voltage_chan("Dev1/ai0")
    lectura = task.read()
    print (lectura)