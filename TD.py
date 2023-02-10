import sys
from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello, world!"

@app.route("/calculatrice", methods=['POST'])
def calculatrice(operateur, nombre1, nombre2):
    return eval(nombre1 + operateur + nombre2)



if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == "check_syntax":
            print("Build [ OK ]")
            exit(0)
        else:
            print("Passed argument not supported ! Supported argument : check_syntax")
            exit(1)
    app.run(debug=True)
