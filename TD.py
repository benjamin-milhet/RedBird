import sys
from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello, world!"

@app.route("/calculatrice", methods=['POST'])
def calculatrice(operateur, nombre1, nombre2):
    return eval(nombre1 + operateur + nombre2)
