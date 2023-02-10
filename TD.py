import sys
from flask import Flask, request

app = Flask(__name__)

id_cpt = [0]
liste_calcule = []

@app.route("/")
def hello_world():
    return "Hello, world!"

@app.route("/calculatrice", methods=['POST'])
def calculatrice():
    # curl -X POST -d "nombre1=3" -d "operateur=*" -d "nombre2=4" http://127.0.0.1:5000/calculatrice
    #global id_cpt
    calcul = eval(request.form.get('nombre1') + request.form.get('operateur') + request.form.get('nombre2'))
    res = str(id_cpt[0]) + " : " + str(calcul)
    liste_calcule.append(res)
    id_cpt[0] = id_cpt[0] + 1
    return res

@app.route("/getId", methods=['GET'])
def calculatrice_id():
    # curl -X GET http://127.0.0.1:5000/getId
    return str(id_cpt[0])

if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == "check_syntax":
            print("Build [ OK ]")
            exit(0)
        else:
            print("Passed argument not supported ! Supported argument : check_syntax")
            exit(1)
    app.run(debug=True)

