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
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis, QuadraticDiscriminantAnalysis
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
import json
from joblib import dump, load
import os

def classificationTree(nombre):
    
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
    
    fn = ["sepal_length", "sepal_width", "petal_length", "petal_width"]
    cn = ['setosa', 'versicolor', 'virginica']
    # set figure size
    plt.figure(figsize = (10,8))
    plot_tree(clf, feature_names = fn, class_names = cn, filled = True)
    # print(script_dir)
    #plt.savefig(my_path + "Tree.png")
    plt.savefig(os.path.join(script_dir, "Tree.png"))
    skplt.metrics.plot_confusion_matrix(y_test, prediction, normalize=True)
    plt.savefig(os.path.join(script_dir,"Confusion.png"))
    # print(my_path)
    print("Tree"+"|"+"{:.3f}".format(metrics.accuracy_score(prediction,y_test))+"|"+ "{:.3f}".format(metrics.f1_score(y_test, prediction, average='micro')) + "|"+ "{:.3f}".format(metrics.recall_score(y_test, prediction, average='macro')))
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


def trainTree(modelArgs, nombre):
    maxDepth =  modelArgs["profundidad"]
    randomState = modelArgs["estado"]
    # or load through local csv
    data = pd.read_csv('D:/DocumentosLap/Modular/App de Escritorio/Electron Modular/electron-app/src/pythonScripts/data.csv')
    # number of instances in each class
    data.groupby('species').size()
    train, test = train_test_split(data, test_size = 0.4, stratify = data['species'], random_state = 42)

    # Model development
    X_train = train[['sepal_length','sepal_width','petal_length','petal_width']]
    y_train = train.species
    X_test = test[['sepal_length','sepal_width','petal_length','petal_width']]
    y_test = test.species

    # first try decision tree
    mod_dt = DecisionTreeClassifier(max_depth = int(maxDepth), random_state = int(randomState))
    mod_dt.fit(X_train,y_train)
    prediction=mod_dt.predict(X_test)


    fn = ["sepal_length", "sepal_width", "petal_length", "petal_width"]
    cn = ['setosa', 'versicolor', 'virginica']
    # set figure size
    plt.figure(figsize = (10,8))
    plot_tree(mod_dt, feature_names = fn, class_names = cn, filled = True)
    my_path = os.path.abspath(__file__)
    script_dir = os.path.dirname(__file__)
    dump(mod_dt, f'{script_dir}/Modelos/{nombre}.joblib')
    # print(script_dir)
    #plt.savefig(my_path + "Tree.png")
    plt.savefig(os.path.join(script_dir, "Tree.png"))
    skplt.metrics.plot_confusion_matrix(y_test, prediction, normalize=True)
    plt.savefig(os.path.join(script_dir,"Confusion.png"))
    # print(my_path)
    print("Tree"+"|"+"{:.3f}".format(metrics.accuracy_score(prediction,y_test))+"|"+ "{:.3f}".format(metrics.f1_score(y_test, prediction, average='micro')) + "|"+ "{:.3f}".format(metrics.recall_score(y_test, prediction, average='macro')))
    sys.stdout.flush()

def trainKNN(modelArgs, nombre):
    vecinos = modelArgs["vecinos"]
    # or load through local csv
    data = pd.read_csv('D:/DocumentosLap/Modular/App de Escritorio/Electron Modular/electron-app/src/pythonScripts/data.csv')
    # number of instances in each class
    data.groupby('species').size()
    train, test = train_test_split(data, test_size = 0.4, stratify = data['species'], random_state = 42)

    # Model development
    X_train = train[['sepal_length','sepal_width','petal_length','petal_width']]
    y_train = train.species
    X_test = test[['sepal_length','sepal_width','petal_length','petal_width']]
    y_test = test.species
    # KNN, first try 5
    mod_5nn=KNeighborsClassifier(n_neighbors=int(vecinos)) 
    mod_5nn.fit(X_train,y_train)
    prediction=mod_5nn.predict(X_test)


    script_dir = os.path.dirname(__file__)
    dump(mod_5nn, f'{script_dir}/Modelos/{nombre}.joblib')
    skplt.metrics.plot_confusion_matrix(y_test, prediction, normalize=True)
    plt.savefig(os.path.join(script_dir,"Confusion.png"))
    print("KNN"+"|"+"{:.3f}".format(metrics.accuracy_score(prediction,y_test))+"|"+ "{:.3f}".format(metrics.f1_score(y_test, prediction, average='micro')) + "|"+ "{:.3f}".format(metrics.recall_score(y_test, prediction, average='macro')))
    sys.stdout.flush() 

def trainSVM(modelArgs):
    kernelArg = modelArgs["kernel"]
    # or load through local csv
    data = pd.read_csv('D:/DocumentosLap/Modular/App de Escritorio/Electron Modular/electron-app/src/pythonScripts/data.csv')
    # number of instances in each class
    data.groupby('species').size()
    train, test = train_test_split(data, test_size = 0.4, stratify = data['species'], random_state = 42)

    # Model development
    X_train = train[['sepal_length','sepal_width','petal_length','petal_width']]
    y_train = train.species
    X_test = test[['sepal_length','sepal_width','petal_length','petal_width']]
    y_test = test.species
    # SVC with linear kernel
    # for SVC, may be impractical beyond tens of thousands of samples
    #sklearn model persistence
    #permitir elegir el numero de iteraciones, porcentaje prueba-entrenamiento, y al final mostrar el promedio
    #por ejemplo 30 iteraciones
    #almacenar matriz de confusion y promediarla al final
    #almacenar desempeño del modelo al final para mostrar al usuario en la prediccion
    linear_svc = SVC(kernel=kernelArg).fit(X_train, y_train)
    prediction=linear_svc.predict(X_test)
    script_dir = os.path.dirname(__file__)
    dump(linear_svc, f'{script_dir}/Modelos/{nombre}.joblib')
    skplt.metrics.plot_confusion_matrix(y_test, prediction, normalize=True)
    plt.savefig(os.path.join(script_dir,"Confusion.png"))
    print("SVM"+"|"+"{:.3f}".format(metrics.accuracy_score(prediction,y_test))+"|"+ "{:.3f}".format(metrics.f1_score(y_test, prediction, average='micro')) + "|"+ "{:.3f}".format(metrics.recall_score(y_test, prediction, average='macro')))
    sys.stdout.flush() 

if __name__ == '__main__':
    first = sys.argv[1]
    second = sys.argv[2]
    params = sys.argv[3]
    nombre = sys.argv[4]
    jsonParams = json.loads(params)
    if (first == "Train"):
        if (second == "Tree"):
            trainTree(jsonParams, nombre)
        if(second == "KNN"):
            trainKNN(jsonParams, nombre)
        if(second == "SVM"):
            trainSVM(jsonParams, nombre)
    if (first == "Class"):
        if (second == "Tree"):
            classificationTree(nombre)
        if(second == "KNN"):
            classKNN(nombre)
        if(second == "SVM"):
            classSVM(nombre)

""" def testing():
    return["Hola","Amigos","Como estan"]
if __name__ == '__main__':
    print(testing())
    sys.stdout.flush() """

""" ### Working code
import sys
from sklearn import datasets
first = sys.argv[1]
iris= datasets.load_iris()
print(iris.data.shape, "Hola")
# print("Greetings from python " + first)
sys.stdout.flush() """