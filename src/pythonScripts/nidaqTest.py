import threading
import time
import nidaqmx
import sys


# ser = serial.Serial('COM5', 9600, timeout=1)
# ser.readline()

returnedList = list()
returnedDict = dict({
    "emg1": [],
    "emg2": [],
    "emg3": [],
    "emg4": [], 
})
duracion = int(sys.argv[1])
cantidadEmgs = int(sys.argv[2])

def funcion_a_ejecutar():
    # Código de la función que quieres ejecutar
    tiempo_inicial = time.time()
    while time.time() - tiempo_inicial < duracion:
        with nidaqmx.Task() as task:
            task.ai_channels.add_ai_voltage_chan("Dev1/ai0")
            task.ai_channels.add_ai_voltage_chan("Dev1/ai1")
            task.ai_channels.add_ai_voltage_chan("Dev1/ai2")
            task.ai_channels.add_ai_voltage_chan("Dev1/ai3")
            line = task.read()

            returnedList.append({"EMG1": line[0]})
            returnedList.append({"EMG2": line[1]})  
            returnedList.append({"EMG3": line[2]})  
            returnedList.append({"EMG4": line[3]})  




            # if(cantidadEmgs >= 1):
            #     task.ai_channels.add_ai_voltage_chan("Dev1/ai0")
            # if(cantidadEmgs >= 2):
            #     task.ai_channels.add_ai_voltage_chan("Dev1/ai1")
            # if(cantidadEmgs >= 3):
            #     task.ai_channels.add_ai_voltage_chan("Dev1/ai2")
            # if(cantidadEmgs >= 4):
            #     task.ai_channels.add_ai_voltage_chan("Dev1/ai3")
            # line = task.read()

            # if(cantidadEmgs >= 1):
            #     returnedList.append({"EMG1": line[0]})  
            #     oldEmg1List = returnedDict['emg1']
            #     returnedDict['emg1'] = oldEmg1List.append(line[0])

            # if(cantidadEmgs >= 2):
            #     returnedList.append({"EMG2": line[1]})
            #     oldEmg2List = returnedDict['emg2']
            #     returnedDict['emg2'] = oldEmg2List.append(line[1])

            # if(cantidadEmgs >= 3):
            #     returnedList.append({"EMG3": line[2]})
            #     oldEmg3List = returnedDict['emg3']
            #     returnedDict['emg3'] = oldEmg3List.append(line[2])

            # if(cantidadEmgs >= 4):
            #     returnedList.append({"EMG4": line[3]})
            #     oldEmg4List = returnedDict['emg4']
            #     returnedDict['emg4'] = oldEmg4List.append(line[3])

        # print("reading", valores)
        # tiempo_actual = time.time()


def controlador():
    # Duración en segundos durante la cual se ejecutará la función
    

    # Crea un hilo que ejecutará la función
    hilo = threading.Thread(target=funcion_a_ejecutar)

    # Inicia el hilo
    hilo.start()

    # Espera el tiempo de duración
    hilo.join(duracion)

    # Si el hilo aún está vivo después del tiempo de duración, lo detiene
    # if hilo.is_alive():
    #     hilo.cancel()
    
    print(returnedList)


# controlador()
def testFunc():
    print("Duration", duracion, "Type", type(duracion))

testFunc()