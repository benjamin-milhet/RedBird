from flask import Flask, request
from personne import *
from tweet import *
import sys
import redis

app = Flask(__name__)
rUser = redis.Redis(host='localhost', port=6379, db=0)
rTweet = redis.Redis(host='localhost', port=6379, db=1)

@app.route("/")
def accueil():
	return "Bienvenue sur notre reseau social de la mère-patrie!"

@app.route("/inscription", methods=['POST'])
def inscription():
    nom = request.form['nom']
    email = request.form['email']
    personne = Personne(nom, email)

    tmp = rUser.get(request.form.get("email." + personne.name))
    if tmp != None:
        return "Le nom d'utilisateur " + personne.name + " est deja pris !"
    else:
        rUser.set("email." + personne.name, personne.email)
        return "Bienvenue " + personne.name + "!"

if __name__ == '__main__':
	if len(sys.argv) > 1:
		if sys.argv[1] == "check_syntax":
			print("Build [ OK ]")
			exit(0)
		else:
			print("Passed argument not supported ! Supported argument : check_syntax")
			exit(1)
	app.run(debug=True)
