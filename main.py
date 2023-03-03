from flask import Flask, request
from personne import *
from tweet import *
import sys

app = Flask(__name__)
r = redis.Redis(host='localhost', port=6379, db=0)

@app.route("/")
def accueil():
	return "Bienvenue sur notre reseau social de la mère-patrie!"

@app.route("/inscription", methods=['POST'])
def inscription():
    nom = request.form['nom']
    email = request.form['email']
    personne = Personne(nom, email)

    r.set("email." + personne.name, personne.email)

    return "Bienvenue " + personne.name + "!"