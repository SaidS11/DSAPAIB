import csv
import threading
import time
import os
import nidaqmx
import sys
# import zlib

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
directorioActual = sys.argv[3]

def funcion_a_ejecutar():
    # Código de la función que quieres ejecutar

    


    tiempo_inicial = time.time()
    while time.time() - tiempo_inicial < duracion:
        # returnedList.append({"EMG1": 0})
        # returnedList.append({"EMG2": 1})
        # returnedList.append({"EMG3": 2})
        # returnedList.append({"EMG4": 3})
        with nidaqmx.Task() as task:
            task.ai_channels.add_ai_voltage_chan("Dev1/ai0")
            task.ai_channels.add_ai_voltage_chan("Dev1/ai1")
            task.ai_channels.add_ai_voltage_chan("Dev1/ai2")
            task.ai_channels.add_ai_voltage_chan("Dev1/ai3")
            line = task.read()

            returnedList.append({"emg1": line[0]})
            returnedList.append({"emg2": line[1]})  
            returnedList.append({"emg3": line[2]})  
            returnedList.append({"emg4": line[3]})  




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


    result = {}

    # Recorrer la lista y agrupar los valores por clave
    for item in returnedList:
        for key, value in item.items():
            if key in result:
                result[key].append(value)
            else:
                result[key] = [value]


    keys = list(result.keys())


    csv_file = directorioActual + "/archivosCsv/resultadoEmgs.csv"
    # csv_file = "resultadoEmgs.csv"
    with open(csv_file, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(keys)  # Escribir las claves como encabezados de las columnas
        max_values = max(len(values) for values in result.values())  # Obtener la longitud máxima de las listas de valores
        for i in range(max_values):
            row = [result[key][i] if i < len(result[key]) else "" for key in keys]
            writer.writerow(row)


    # strData = str(returnedList)
    # with open('./TEST2.txt','w+') as file:
    #     file.write(strData)
    # print(returnedList)


controlador()
