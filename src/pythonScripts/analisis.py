import sys
import pandas as pd
import numpy as np
# import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
import scikitplot as skplt
from pandas.plotting import parallel_coordinates
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn import metrics
from sklearn.naive_bayes import GaussianNB
from sklearn.model_selection import cross_validate
from sklearn.model_selection import cross_val_score
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis, QuadraticDiscriminantAnalysis
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
import json
from joblib import dump, load
import os

def classificationTree(modelArgs, nombre, headers):
    maxDepth =  modelArgs["profundidad"]
    randomState = modelArgs["estado"]
    # or load through local csv
    ruta_actual = os.path.dirname(__file__)
    nombre_archivo = "test8Nombres.csv"
    data = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    # number of instances in each class
    data.groupby('etiqueta').size()
    # train, test = train_test_split(data, test_size = 0, stratify = data['etiqueta'], random_state = 42)

    # Model development
    X_test = data[headers]
    y_test = data.etiqueta
    script_dir = os.path.dirname(__file__)
    existente = True
    clf = load(f'{script_dir}/Modelos/{nombre}.joblib') 
    prediction=clf.predict(X_test)
    
    fn = headers
    cn = ['sano', 'diabetico']
    # set figure size
    plt.figure(figsize = (10,8))
    plot_tree(clf, feature_names = fn, class_names = cn, filled = True)
    # print(script_dir)
    #plt.savefig(my_path + "Tree.png")
    plt.savefig(os.path.join(script_dir, "Tree.png"))
    skplt.metrics.plot_confusion_matrix(y_test, prediction, normalize=True)
    plt.savefig(os.path.join(script_dir,"Confusion.png"))
    # print(my_path)
    datos_nuevos = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    X_nuevos = datos_nuevos[headers]
    y_pred = clf.predict(X_nuevos)

    datos_nuevos['etiqueta'] = y_pred
    resulJson = datos_nuevos.to_json(compression="str")
    # print(my_path)
    print("Tree"+"|"+"{:.3f}".format(metrics.accuracy_score(prediction,y_test))+
    "|"+ "{:.3f}".format(metrics.f1_score(y_test, prediction, average='micro')) + 
    "|"+ "{:.3f}".format(metrics.recall_score(y_test, prediction, average='macro')) + 
    "|" + "0.99" +
    "|" "0.99" +
    "|" + resulJson +
    "|" + f"{'true' if existente else 'false'}")
    sys.stdout.flush()

def classKNN(nombre):
    data = pd.read_csv('D:/DocumentosLap/Modular/App de Escritorio/Electron Modular/electron-app/src/pythonScripts/data.csv')
    # number of instances in each class
    data.groupby('species').size()
    train, test = train_test_split(data, test_size = 0.4, stratify = data['species'], random_state = 42)

    # Model development
    X_test = test[['sepal_length','sepal_width','petal_length','petal_width']]
    y_test = test.species
    script_dir = os.path.dirname(__file__)
    clf = load(f'{script_dir}/Modelos/{nombre}.joblib') 
    prediction=clf.predict(X_test)
    skplt.metrics.plot_confusion_matrix(y_test, prediction, normalize=True)
    plt.savefig(os.path.join(script_dir,"Confusion.png"))
    print("KNN"+"|"+"{:.3f}".format(metrics.accuracy_score(prediction,y_test))+"|"+ "{:.3f}".format(metrics.f1_score(y_test, prediction, average='micro')) + "|"+ "{:.3f}".format(metrics.recall_score(y_test, prediction, average='macro')))
    sys.stdout.flush() 

def classSVM(nombre):
    data = pd.read_csv('D:/DocumentosLap/Modular/App de Escritorio/Electron Modular/electron-app/src/pythonScripts/data.csv')
    # number of instances in each class
    data.groupby('species').size()
    train, test = train_test_split(data, test_size = 0.4, stratify = data['species'], random_state = 42)

    # Model development
    X_test = test[['sepal_length','sepal_width','petal_length','petal_width']]
    y_test = test.species
    script_dir = os.path.dirname(__file__)
    clf = load(f'{script_dir}/Modelos/{nombre}.joblib') 
    prediction=clf.predict(X_test)
    skplt.metrics.plot_confusion_matrix(y_test, prediction, normalize=True)
    plt.savefig(os.path.join(script_dir,"Confusion.png"))
    print("SVM"+"|"+"{:.3f}".format(metrics.accuracy_score(prediction,y_test))+"|"+ "{:.3f}".format(metrics.f1_score(y_test, prediction, average='micro')) + "|"+ "{:.3f}".format(metrics.recall_score(y_test, prediction, average='macro')))
    sys.stdout.flush() 


def trainTree(modelArgs, nombre, iteraciones, reducedPercentage, headers):
    maxDepth =  modelArgs["profundidad"]
    randomState = modelArgs["estado"]
    # or load through local csv
    ruta_actual = os.path.dirname(__file__)
    nombre_archivo = "test8Nombres.csv"
    data = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    # number of instances in each class
    data.groupby('etiqueta').size()
    train, test = train_test_split(data, test_size = reducedPercentage, stratify = data['etiqueta'], random_state = 42)

    # Model development
    X_train = train[headers]
    y_train = train.etiqueta
    X_test = test[headers]
    y_test = test.etiqueta


    # first try decision tree
    existente = False
    script_dir = os.path.dirname(__file__)
    if os.path.exists(f'{script_dir}/Modelos/{nombre}.joblib'):
        mod_dt = load(f'{script_dir}/Modelos/{nombre}.joblib') 
        existente = True
    else:
        mod_dt = DecisionTreeClassifier(max_depth = int(maxDepth), random_state = int(randomState))
    cv_results = cross_validate(mod_dt, X_train, y_train, cv=iteraciones, return_estimator=True)
    promedio = list()
    for i in range(len(cv_results['estimator'])):
        promedio.append(cv_results['test_score'][i])
    avg = sum(promedio) / len(promedio)
    closest = min(promedio, key=lambda x:abs(x-avg))
    for i in range(len(cv_results['estimator'])):
        if cv_results['test_score'][i] == closest:
            avgModel = cv_results['estimator'][i]
    scores = cross_val_score(avgModel, X_train, y_train, cv=iteraciones)
    prediction=avgModel.predict(X_test)
    fn = headers
    cn = ['sano', 'diabetico']
    # set figure size
    plt.figure(figsize = (10,8))
    plot_tree(avgModel, feature_names = fn, class_names = cn, filled = True)
    script_dir = os.path.dirname(__file__)
    dump(avgModel, f'{script_dir}/Modelos/{nombre}.joblib')
    # print(script_dir)
    #plt.savefig(my_path + "Tree.png")
    plt.savefig(os.path.join(script_dir, "Tree.png"))
    skplt.metrics.plot_confusion_matrix(y_test, prediction, normalize=True)
    plt.savefig(os.path.join(script_dir,"Confusion.png"))
    # print(my_path)
    datos_nuevos = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    X_nuevos = datos_nuevos[headers]
    y_pred = avgModel.predict(X_nuevos)

    datos_nuevos['etiqueta'] = y_pred
    resulJson = datos_nuevos.to_json(compression="str")


    print("Tree"+"|"+"{:.3f}".format(metrics.accuracy_score(prediction,y_test))+
    "|"+ "{:.3f}".format(metrics.f1_score(y_test, prediction, average='micro')) + 
    "|"+ "{:.3f}".format(metrics.recall_score(y_test, prediction, average='macro')) + 
    "|" + "{:.2f}".format(scores.mean()) +
    "|" "{:.2f}".format(scores.std()) +
    "|" + resulJson +
    "|" + f"{'true' if existente else 'false'}")
    sys.stdout.flush()

def trainKNN(modelArgs, nombre, iteraciones, reducedPercentage, headers):
    vecinos = modelArgs["vecinos"]
    # or load through local csv
    ruta_actual = os.path.dirname(__file__)
    nombre_archivo = "test8Nombres.csv"
    data = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    # number of instances in each class
    # number of instances in each class
    data.groupby('etiqueta').size()
    train, test = train_test_split(data, test_size = reducedPercentage, stratify = data['etiqueta'], random_state = 42)

    # Model development
    X_train = train[headers]
    y_train = train.etiqueta
    X_test = test[headers]
    y_test = test.etiqueta
    # KNN, first try 5
    existente = False
    script_dir = os.path.dirname(__file__)
    if os.path.exists(f'{script_dir}/Modelos/{nombre}.joblib'):
        mod_5nn = load(f'{script_dir}/Modelos/{nombre}.joblib') 
        existente = True
    else:
        mod_5nn=KNeighborsClassifier(n_neighbors=int(vecinos)) 
    cv_results = cross_validate(mod_5nn, X_train, y_train, cv=iteraciones, return_estimator=True)
    promedio = list()
    for i in range(len(cv_results['estimator'])):
        promedio.append(cv_results['test_score'][i])
    avg = sum(promedio) / len(promedio)
    closest = min(promedio, key=lambda x:abs(x-avg))
    for i in range(len(cv_results['estimator'])):
        if cv_results['test_score'][i] == closest:
            avgModel = cv_results['estimator'][i]
    scores = cross_val_score(avgModel, X_train, y_train, cv=iteraciones)
    prediction=avgModel.predict(X_test)
    script_dir = os.path.dirname(__file__)
    dump(avgModel, f'{script_dir}/Modelos/{nombre}.joblib')
    skplt.metrics.plot_confusion_matrix(y_test, prediction, normalize=True)
    plt.savefig(os.path.join(script_dir,"Confusion.png"))
    datos_nuevos = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    X_nuevos = datos_nuevos[headers]
    y_pred = avgModel.predict(X_nuevos)

    datos_nuevos['etiqueta'] = y_pred
    resulJson = datos_nuevos.to_json(compression="str")
    print("KNN"+"|"+"{:.3f}".format(metrics.accuracy_score(prediction,y_test))+
    "|"+ "{:.3f}".format(metrics.f1_score(y_test, prediction, average='micro')) + 
    "|"+ "{:.3f}".format(metrics.recall_score(y_test, prediction, average='macro')) + 
    "|" + "{:.2f}".format(scores.mean()) +
    "|" "{:.2f}".format(scores.std()) +
    "|" + resulJson +
    "|" + f"{'true' if existente else 'false'}")
    sys.stdout.flush() 

def trainSVM(modelArgs, iteraciones, reducedPercentage):
    kernelArg = modelArgs["kernel"]
    # or load through local csv
   # or load through local csv
    ruta_actual = os.path.dirname(__file__)
    nombre_archivo = "test8Nombres.csv"
    data = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    # number of instances in each class
    # number of instances in each class
    data.groupby('etiqueta').size()
    train, test = train_test_split(data, test_size = reducedPercentage, stratify = data['etiqueta'], random_state = 42)

    # Model development
    X_train = train[headers]
    y_train = train.etiqueta
    X_test = test[headers]
    y_test = test.etiqueta
    # SVC with linear kernel
    # for SVC, may be impractical beyond tens of thousands of samples
    #almacenar matriz de confusion y promediarla al final
    existente = False
    script_dir = os.path.dirname(__file__)
    if os.path.exists(f'{script_dir}/Modelos/{nombre}.joblib'):
        linear_svc = load(f'{script_dir}/Modelos/{nombre}.joblib') 
        existente = True
    else:
        linear_svc = SVC(kernel=kernelArg).fit(X_train, y_train)
    cv_results = cross_validate(linear_svc, X_train, y_train, cv=iteraciones, return_estimator=True)
    promedio = list()
    for i in range(len(cv_results['estimator'])):
        promedio.append(cv_results['test_score'][i])
    avg = sum(promedio) / len(promedio)
    closest = min(promedio, key=lambda x:abs(x-avg))
    for i in range(len(cv_results['estimator'])):
        if cv_results['test_score'][i] == closest:
            avgModel = cv_results['estimator'][i]
    scores = cross_val_score(avgModel, X_train, y_train, cv=iteraciones)
    prediction=avgModel.predict(X_test)
    script_dir = os.path.dirname(__file__)
    dump(avgModel, f'{script_dir}/Modelos/{nombre}.joblib')
    skplt.metrics.plot_confusion_matrix(y_test, prediction, normalize=True)
    plt.savefig(os.path.join(script_dir,"Confusion.png"))
    datos_nuevos = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    X_nuevos = datos_nuevos[headers]
    y_pred = avgModel.predict(X_nuevos)

    datos_nuevos['etiqueta'] = y_pred
    resulJson = datos_nuevos.to_json(compression="str")
    print("SVM"+"|"+"{:.3f}".format(metrics.accuracy_score(prediction,y_test))+
    "|"+ "{:.3f}".format(metrics.f1_score(y_test, prediction, average='micro')) + 
    "|"+ "{:.3f}".format(metrics.recall_score(y_test, prediction, average='macro')) + 
    "|" + "{:.2f}".format(scores.mean()) +
    "|" "{:.2f}".format(scores.std()) +
    "|" + resulJson +
    "|" + f"{'true' if existente else 'false'}")
    sys.stdout.flush() 

if __name__ == '__main__':
    first = sys.argv[1]
    second = sys.argv[2]
    params = sys.argv[3]
    nombre = sys.argv[4]
    iteraciones = int(sys.argv[5])
    porcentaje = int(sys.argv[6])
    datosConNombre = sys.argv[7]
    reducedPercentage = porcentaje / 100
    jsonParams = json.loads(params)

    # datosConNombre = '[[{"colMediaABSEMG1":"3.33","colMedianaEMG1":"3","colRMSEMG1":"3.56","colMediaABSEMG2":"8.5","colMedianaEMG2":"8.5","colRMSEMG2":"8.57","colMediaABSGsr":"3.33","colMedianaGsr":"3","colRMSGsr":"3.56","colMediaABSTemp":"3.33","colMedianaTemp":"3","colRMSTemp":"3.56","etiqueta":"diabetico","nombre": "Karla"},{"colMediaABSEMG1":"10.75","colMedianaEMG1":"10.5","colRMSEMG1":"10.85","colMediaABSEMG2":"16","colMedianaEMG2":"16","colRMSEMG2":"16.06","colMediaABSGsr":"10.75","colMedianaGsr":"10.5","colRMSGsr":"10.85","colMediaABSTemp":"10.75","colMedianaTemp":"10.5","colRMSTemp":"10.85","etiqueta":"diabetico","nombre": "Karla"}],[{"colMediaABSEMG1":"3.33","colMedianaEMG1":"3","colRMSEMG1":"3.56","colMediaABSEMG2":"8.5","colMedianaEMG2":"8.5","colRMSEMG2":"8.57","colMediaABSGsr":"3.33","colMedianaGsr":"3","colRMSGsr":"3.56","colMediaABSTemp":"3.33","colMedianaTemp":"3","colRMSTemp":"3.56","etiqueta":"diabetico","nombre": "Martha Garcia Lopez"},{"colMediaABSEMG1":"10.75","colMedianaEMG1":"10.5","colRMSEMG1":"10.85","colMediaABSEMG2":"16","colMedianaEMG2":"16","colRMSEMG2":"16.06","colMediaABSGsr":"10.75","colMedianaGsr":"10.5","colRMSGsr":"10.85","colMediaABSTemp":"10.75","colMedianaTemp":"10.5","colRMSTemp":"10.85","etiqueta":"diabetico","nombre": "Martha Garcia Lopez"}],[{"colMediaABSEMG1":"2.50","colMedianaEMG1":"2.5","colRMSEMG1":"2.55","colMediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.81","colMediaABSGsr":"2.50","colMedianaGsr":"2.5","colRMSGsr":"2.55","colMediaABSTemp":"2.50","colMedianaTemp":"2.5","colRMSTemp":"2.55","etiqueta":"sano","nombre": "Sujeto Prueba 1"},{"colMediaABSEMG1":8,"colMedianaEMG1":"8","colRMSEMG1":"8.12","colMediaABSEMG2":"14.5","colMedianaEMG2":"14.5","colRMSEMG2":"14.60","colMediaABSGsr":8,"colMedianaGsr":"8","colRMSGsr":"8.12","colMediaABSTemp":8,"colMedianaTemp":"8","colRMSTemp":"8.12","etiqueta":"sano","nombre": "Sujeto Prueba 1"}], [{"colMediaABSEMG1":"2.50","colMedianaEMG1":"2.5","colRMSEMG1":"2.55","colMediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.81","colMediaABSGsr":"2.50","colMedianaGsr":"2.5","colRMSGsr":"2.55","colMediaABSTemp":"2.50","colMedianaTemp":"2.5","colRMSTemp":"2.55","etiqueta":"sano","nombre": "Sujeto Prueba 2"},{"colMediaABSEMG1":8,"colMedianaEMG1":"8","colRMSEMG1":"8.12","colMediaABSEMG2":"14.5","colMedianaEMG2":"14.5","colRMSEMG2":"14.60","colMediaABSGsr":8,"colMedianaGsr":"8","colRMSGsr":"8.12","colMediaABSTemp":8,"colMedianaTemp":"8","colRMSTemp":"8.12","etiqueta":"sano","nombre": "Sujeto Prueba 2"}]]'
    parsed = json.loads(datosConNombre)
    newList = list()

    for i in range(len(parsed)):
        for c in range(len(parsed[i])):
            newList.append(parsed[i][c])

    df = pd.DataFrame.from_dict(newList) 
    ruta_actual = os.path.dirname(__file__)
    nombre_archivo = "test8Nombres.csv"
    df.to_csv(os.path.join(ruta_actual, nombre_archivo), index=False, header=True)
    

    headers = list(parsed[0][0].keys())
    headers.remove('etiqueta')
    headers.remove('nombre')
    

    try:
        if (first == "Train"):
            if (second == "Tree"):
                trainTree(jsonParams, nombre, iteraciones, reducedPercentage, headers)
            if(second == "KNN"):
                trainKNN(jsonParams, nombre, iteraciones, reducedPercentage, headers)
            if(second == "SVM"):
                trainSVM(jsonParams, nombre, iteraciones, reducedPercentage, headers)
        if (first == "Class"):
            if (second == "Tree"):
                classificationTree(jsonParams, nombre, headers)
            if(second == "KNN"):
                classKNN(nombre)
            if(second == "SVM"):
                classSVM(nombre)
    except  Exception as e:
        print("Error" + "|" + str(e))