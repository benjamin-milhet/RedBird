from flask import Flask, request
import sys
import redis
import re
import json
import calendar
import time
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
rUser = redis.Redis(host='localhost', port=6379, db=0)
rTweet = redis.Redis(host='localhost', port=6379, db=1)


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
        return "Le nom d'utilisateur " + nom + " n'est pas disponible."
    else:
        rUser.set("nom." + nom, nom)
        rUser.set("password." + nom, password)
        rUser.set("tweet." + nom, json.dumps([]))
        return "Bienvenue " + nom + "!"


@app.route("/tweeter", methods=['POST'])
def tweeter():
    # curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"nom\":\"Lucas\",\"tweet\":\"Salut l'elite, c'est El Pueblo, 18-25, 2 sucres #gange #pizza7Fromage\"}" http://localhost:5000/tweeter

    data = request.get_json()
    nom = data.get('nom')
    tweet = data.get('tweet')

    liste_tweet = json.loads(rUser.get("tweet." + nom))
    time_stamp = calendar.timegm(time.gmtime())
    liste_tweet.append(time_stamp)

    liste_sujet = chercher_hashtag(tweet)
    for i in range(len(liste_sujet)):
        liste_sujet[i] = liste_sujet[i].lower()
        rTweet.set("sujet." + liste_sujet[i], nom + "." + str(time_stamp))

    rUser.set("tweet." + nom, json.dumps(liste_tweet))
    rTweet.set("tweet." + str(time_stamp), tweet)

    return "True"


@app.route("/getAllTweets", methods=['GET'])
def get_all_tweets():
    # curl -X GET http://localhost:5000/getAllTweets

    liste_tweet_final = []
    liste_users = get_all_users()

    for i in range(0, len(liste_users)):
        liste_tweet = json.loads(rUser.get(("tweet." + liste_users[i])))
        for j in range(0, len(liste_tweet)):
            liste_tweet_final.append(dict(tweet = rTweet.get("tweet." + str(liste_tweet[i])).decode('utf-8'), nom = liste_users[i], id = liste_tweet[i]))

    return liste_tweet_final


@app.route("/getAllTweetsByUser", methods=['POST'])
def get_all_tweets_by_user():
    # curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"nom\":\"Lucas\"}" http://localhost:5000/getAllTweetsByUser

    data = request.get_json()
    nom = data.get('nom')

    liste_tweet = json.loads(rUser.get(("tweet." + nom)))
    liste_tweet_final = []

    for i in range(len(liste_tweet)):
        liste_tweet_final.append(rTweet.get("tweet." + str(liste_tweet[i])).decode('utf-8'))

    return liste_tweet_final


@app.route("/getAllSujet", methods=['GET'])
def get_all_sujet():
    # curl -X GET http://localhost:5000/getAllSujet

    liste_res = []
    tmp = rTweet.keys("sujet.*")
    for i in range(len(tmp)):
        liste_res.append(tmp[i].decode('utf-8')[6:])
    return liste_res


def chercher_hashtag(tweet):
    return re.findall(r"#(\w+)", tweet)

@app.route("/getAllUsers", methods=['GET'])
def get_all_users():
    liste_res = []
    tmp = rUser.keys("nom.*")
    for i in range(len(tmp)):
        liste_res.append(tmp[i].decode('utf-8')[4:])
    return liste_res


if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == "check_syntax":
            print("Build [ OK ]")
            exit(0)
        else:
            print("Passed argument not supported ! Supported argument : check_syntax")
            exit(1)
    app.run(debug=True)
