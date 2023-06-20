import threading
import time
import nidaqmx


# ser = serial.Serial('COM5', 9600, timeout=1)
returnedList = list()
duracion = 5

def funcion_a_ejecutar():
    # Código de la función que quieres ejecutar
    tiempo_inicial = time.time()
    while time.time() - tiempo_inicial < duracion:
        with nidaqmx.Task() as task:
            task.ai_channels.add_ai_voltage_chan("Dev1/ai0")
            line = task.read()
            returnedList.append({"EMG1": line})
            task.ai_channels.add_ai_voltage_chan("Dev1/ai1")
            line = task.read()
            returnedList.append({"EMG2": line})
            task.ai_channels.add_ai_voltage_chan("Dev1/ai2")
            line = task.read()
            returnedList.append({"EMG3": line})
            task.ai_channels.add_ai_voltage_chan("Dev1/ai3")
            line = task.read()
            returnedList.append({"EMG4": line})
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


controlador()