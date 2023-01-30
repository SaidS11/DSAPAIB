import sys
import pandas as pd
import numpy as np
# import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from pandas.plotting import parallel_coordinates
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn import metrics
from sklearn.naive_bayes import GaussianNB
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis, QuadraticDiscriminantAnalysis
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
import os

# load through url
def classificationTree(): 
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
    mod_dt = DecisionTreeClassifier(max_depth = 3, random_state = 1)
    mod_dt.fit(X_train,y_train)
    prediction=mod_dt.predict(X_test)
    
    fn = ["sepal_length", "sepal_width", "petal_length", "petal_width"]
    cn = ['setosa', 'versicolor', 'virginica']
    # set figure size
    plt.figure(figsize = (10,8))
    plot_tree(mod_dt, feature_names = fn, class_names = cn, filled = True)
    my_path = os.path.abspath(__file__)
    script_dir = os.path.dirname(__file__)
    # print(script_dir)
    #plt.savefig(my_path + "Tree.png")
    plt.savefig(os.path.join(script_dir, "Tree.png"))
    # print(my_path)
    print("{:.3f}".format(metrics.accuracy_score(prediction,y_test))+"|"+ "Hola")
    sys.stdout.flush() 
def classKNN():
    # or load through local csv
    data = pd.read_csv('data.csv')
    # number of instances in each class
    data.groupby('species').size()
    train, test = train_test_split(data, test_size = 0.4, stratify = data['species'], random_state = 42)

    # Model development
    X_train = train[['sepal_length','sepal_width','petal_length','petal_width']]
    y_train = train.species
    X_test = test[['sepal_length','sepal_width','petal_length','petal_width']]
    y_test = test.species
    # KNN, first try 5
    mod_5nn=KNeighborsClassifier(n_neighbors=5) 
    mod_5nn.fit(X_train,y_train)
    prediction=mod_5nn.predict(X_test)
    print("{:.3f}".format(metrics.accuracy_score(prediction,y_test)))
    sys.stdout.flush() 
def classSVM():
    # or load through local csv
    data = pd.read_csv('data.csv')
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
    linear_svc = SVC(kernel='linear').fit(X_train, y_train)
    prediction=linear_svc.predict(X_test)
    print("{:.3f}".format(metrics.accuracy_score(prediction,y_test)))
    sys.stdout.flush() 

if __name__ == '__main__':
    first = sys.argv[1]
    if (first == "Tree"):
        classificationTree()
    if(first == "Red"):
        classKNN()
    if(first == "SVM"):
        classSVM()

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