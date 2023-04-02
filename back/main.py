from flask import Flask, request, jsonify
import sys
import redis
import re
import json
import calendar
import time
from flask_cors import CORS

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
cors = CORS(app, resources={r"/*": {"origins": "*"}})

rUser = redis.Redis(host='twitter_redis', port=6379, db=0, decode_responses=True)
rTweet = redis.Redis(host='twitter_redis', port=6379, db=1, decode_responses=True)


@app.route("/", methods=['GET'])
def accueil():
    return "Bienvenue sur notre réseau social de la mère-patrie!"


@app.route("/inscription", methods=['POST'])
def inscription():
    # curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"nom\":\"Lucas\",\"password\":\"pechakuchaDeMerde\"}" http://localhost:5000/inscription

    data = request.get_json()
    nom = data.get('nom')
    password = data.get('password')

    tmp = rUser.get("nom." + nom)
    if tmp is not None:
        return jsonify({"message": "Le nom d'utilisateur " + nom + " n'est pas disponible."}), 400

    else:
        rUser.set("nom." + nom, nom)
        rUser.set("password." + nom, password)
        rUser.set("tweet." + nom, json.dumps([]))
        return jsonify({"message": "Bienvenue " + nom + "!"}), 200


@app.route("/tweeter", methods=['POST'])
def tweeter():
    # curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"nom\":\"Lucas\",\"tweet\":\"Salut l'elite, c'est El Pueblo, 18-25, 2 sucres #gange #pizza7Fromage\"}" http://localhost:5000/tweeter

    data = request.get_json()
    nom = data.get('nom')
    tweet = data.get('tweet')

    nom_user = rUser.get("nom." + nom)
    if nom_user is None:
        return jsonify({"message": "Le nom d'utilisateur " + nom + " n'existe pas."}), 400

    liste_tweet = json.loads(rUser.get("tweet." + nom))
    time_stamp = calendar.timegm(time.gmtime())
    liste_tweet.append(time_stamp)

    liste_sujet = chercher_hashtag(tweet)
    for i in range(len(liste_sujet)):
        if rTweet.get("sujet." + liste_sujet[i]) is None:
            rTweet.set("sujet." + liste_sujet[i], json.dumps([]))
        liste_tweets_sujet = json.loads(rTweet.get("sujet." + liste_sujet[i]))
        liste_tweets_sujet.append(json.dumps(dict(nom=nom, id=str(time_stamp))))
        rTweet.set("sujet." + liste_sujet[i], json.dumps(liste_tweets_sujet))

    rUser.set("tweet." + nom, json.dumps(liste_tweet))
    rTweet.set("tweet." + str(time_stamp), tweet)

    return jsonify({"message": "Le tweet a bien été posté."}), 200


@app.route("/getAllTweets", methods=['GET'])
def get_all_tweets():
    # curl -X GET http://localhost:5000/getAllTweets

    liste_tweet_final = []
    liste_users = get_all_users()

    for i in range(len(liste_users)):
        liste_tweet = json.loads(rUser.get(("tweet." + liste_users[i])))
        for j in range(len(liste_tweet)):
            liste_tweet_final.append(
                dict(tweet=rTweet.get("tweet." + str(liste_tweet[j])), nom=liste_users[i],
                     id=liste_tweet[j]))

    return liste_tweet_final, 200


@app.route("/getAllTweetsByUser", methods=['POST'])
def get_all_tweets_by_user():
    # curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"nom\":\"Lucas\"}" http://localhost:5000/getAllTweetsByUser

    data = request.get_json()
    nom = data.get('nom')

    nom_user = rUser.get("nom." + nom)
    if nom_user is None:
        return jsonify({"message": "Le nom d'utilisateur " + nom + " n'existe pas."}), 400

    liste_tweet = json.loads(rUser.get(("tweet." + nom)))
    liste_tweet_final = []

    for i in range(len(liste_tweet)):
        liste_tweet_final.append(dict(tweet=rTweet.get("tweet." + str(liste_tweet[i])), nom=nom, id=liste_tweet[i]))

    return liste_tweet_final, 200


@app.route("/getAllSujet", methods=['GET'])
def get_all_sujet():
    # curl -X GET http://localhost:5000/getAllSujet

    liste_res = []
    tmp = rTweet.keys("sujet.*")
    for i in range(len(tmp)):
        liste_res.append(tmp[i][6:])
    return liste_res


@app.route("/getAllTweetsBySujet", methods=['POST'])
def get_all_tweets_by_sujet():
    # curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"sujet\":\"gange\"}" http://localhost:5000/getAllTweetsBySujet

    data = request.get_json()
    sujet = data.get('sujet')

    liste_tweet = rTweet.get("sujet." + sujet)
    liste_tweet_final = []

    if liste_tweet is None:
        return jsonify({"message": "Le sujet " + sujet + " n'existe pas."}), 400

    liste_tweet = json.loads(liste_tweet)
    for i in range(len(liste_tweet)):
        tmp = json.loads(liste_tweet[i])
        liste_tweet_final.append(dict(tweet=rTweet.get("tweet." + str(tmp["id"])), nom=tmp["nom"], id=tmp["id"]))

    return liste_tweet_final, 200


def chercher_hashtag(tweet):
    return re.findall(r"#(\w+)", tweet)


@app.route("/getAllUsers", methods=['GET'])
def get_all_users():
    liste_res = []
    tmp = rUser.keys("nom.*")
    for i in range(len(tmp)):
        liste_res.append(tmp[i][4:])
    return liste_res


@app.route("/chargerDonnees", methods=['GET'])
def charger_donnees():
    # curl -X GET http://localhost:5000/chargerDonnees

    # charger users
    rUser.set("nom.Benjamin", "Benjamin")
    rUser.set("password.Benjamin", "pechakuchaDeMerde")
    rUser.set("tweet.Benjamin", json.dumps([1, 2, 3]))

    rUser.set("nom.Clement", "Clement")
    rUser.set("password.Clement", "pechakuchaDeMerde")
    rUser.set("tweet.Clement", json.dumps([4, 5, 6]))

    # charger tweets
    rTweet.set("tweet.1", "Salut l'elite, c'est El Pueblo, 18-25, 2 sucres #gange #pizza7Fromage")
    rTweet.set("tweet.2", "Tu vas repartir mal mon copain #gitan")
    rTweet.set("tweet.3",
               "Союз нерушимый республик свободных Сплотила навеки Великая Русь. Да здравствует созданный волей народов Единый, могучий Советский Союз! #USSR")
    rTweet.set("tweet.4", "Franche-Comté > Bourgogne #FrancComtois")
    rTweet.set("tweet.5", "Le Granier m'a écrasé avec ses courbes de baiser #THREEJS # Bezier")
    rTweet.set("tweet.6", "ILC > SE > SQR")

    # charger sujet
    rTweet.set("sujet.gange", json.dumps([json.dumps(dict(nom="Benjamin", id=1))]))
    rTweet.set("sujet.pizza7Fromage", json.dumps([json.dumps(dict(nom="Benjamin", id=1))]))
    rTweet.set("sujet.gitan", json.dumps([json.dumps(dict(nom="Benjamin", id=2))]))
    rTweet.set("sujet.USSR", json.dumps([json.dumps(dict(nom="Benjamin", id=3))]))
    rTweet.set("sujet.FrancComtois", json.dumps([json.dumps(dict(nom="Clement", id=4))]))
    rTweet.set("sujet.THREEJS", json.dumps([json.dumps(dict(nom="Clement", id=5))]))
    rTweet.set("sujet.Bezier", json.dumps([json.dumps(dict(nom="Clement", id=5))]))

    return jsonify({"message": "Le chargement des données à réussi."}), 200


if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == "check_syntax":
            print("Build [ OK ]")
            exit(0)
        else:
            print("Passed argument not supported ! Supported argument : check_syntax")
            exit(1)
    app.run(debug=True)
