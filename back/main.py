from flask import Flask, request, jsonify
import sys
import redis
import re
import json
import calendar
import time
import hashlib
from flask_cors import CORS

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
cors = CORS(app, resources={r"/*": {"origins": "*"}})

rUser = redis.Redis(host='twitter_redis', port=6379, db=0, decode_responses=True)
rTweet = redis.Redis(host='twitter_redis', port=6379, db=1, decode_responses=True)


@app.route("/", methods=['GET'])
def accueil():
    return jsonify({"message": "Bienvenue sur notre réseau social de la mère-patrie!"})


@app.route('/healthz', methods=['GET'])
def healthcheck():
    """
        Permet de vérifier si le serveur est en vie

        :return: 200 si le serveur est en vie
    """
    # curl -X GET http://localhost:5000/healthz

    return '', 200


@app.route("/inscription", methods=['POST'])
def inscription():
    """
        Permet à un utilisateur de s'inscrire

        nom: nom de la personne
        password: mot de passe de la personne

        :return: Si l'inscription s'est bien passée, retourne un message de succès et un code 200. Si l'inscription n'a pas pu se faire, retourne un message d'erreur et un code 400
    """
    # curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"nom\":\"Lucas\",\"password\":\"pechakuchaDeMerde\"}" http://localhost:5000/inscription

    data = request.get_json()
    nom = data.get('nom')
    password = data.get('password').encode('utf-8')

    hash_password = hashlib.sha256(password).hexdigest()

    tmp = rUser.get("nom." + nom)
    if tmp is not None:
        return jsonify({"message": "Le nom d'utilisateur " + nom + " n'est pas disponible."}), 400

    else:
        rUser.set("nom." + nom, nom)
        rUser.set("password." + nom, hash_password)
        rUser.set("tweet." + nom, json.dumps([]))
        rUser.set("retweet." + nom, json.dumps([]))
        return jsonify({"message": "Bienvenue " + nom + "!"}), 200


@app.route("/connexion", methods=['POST'])
def connexion():
    """
        Permet à un utilisateur de se connecter

        nom: nom de la personne
        password: mot de passe de la personne

        :return: Si la connexion s'est bien passée, retourne un message de succès et un code 200. Si la connexion n'a pas pu se faire, retourne un message d'erreur et un code 400
    """
    # curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"nom\":\"Lucas\",\"password\":\"pechakuchaDeMerde\"}" http://localhost:5000/connexion

    data = request.get_json()
    nom = data.get('nom')
    password = data.get('password').encode('utf-8')

    hash_password = hashlib.sha256(password).hexdigest()

    tmp = rUser.get("nom." + nom)
    if tmp is None:
        return jsonify({"message": "Le nom d'utilisateur " + nom + " n'existe pas."}), 400

    else:
        if rUser.get("password." + nom) == hash_password:
            return jsonify({"message": "Bienvenue " + nom + "!"}), 200
        else:
            return jsonify({"message": "Le mot de passe est incorrect."}), 400


@app.route("/tweeter", methods=['POST'])
def tweeter():
    """
        Permet à un utilisateur de tweeter

        nom: nom de la personne
        tweet: tweet de la personne

        :return: Si le tweet s'est bien passé, retourne un message de succès et un code 200. Si le tweet n'a pas pu se faire, retourne un message d'erreur et un code 400
    """
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


@app.route("/retweet", methods=['POST'])
def retweet():
    """
        Permet à un utilisateur de retweeter

        nom: nom de la personne
        id: id du tweet
        nom_user_tweet: nom de l'utilisateur qui a tweeté

        :return: Si le retweet s'est bien passé, retourne un message de succès et un code 200. Si le retweet n'a pas pu se faire, retourne un message d'erreur et un code 400
    """
    # curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"nom\":\"Lucas\", \"nom_user_tweet\":\"Benjamin\", \"id\":\"1\"}" http://localhost:5000/retweet

    data = request.get_json()
    nom = data.get('nom')
    nom_user_tweet = data.get('nom_user_tweet')
    id_tweet = data.get('id')

    nom_user = rUser.get("nom." + nom)
    if nom_user is None:
        return jsonify({"message": "Le nom d'utilisateur " + nom + " n'existe pas."}), 400

    nom_user_tweet = rUser.get("nom." + nom_user_tweet)
    if nom_user_tweet is None:
        return jsonify({"message": "Le nom d'utilisateur " + nom_user_tweet + " n'existe pas."}), 400

    tweet = rTweet.get("tweet." + str(id_tweet))
    if tweet is None:
        return jsonify({"message": "Le tweet avec l'id " + str(id_tweet) + " n'existe pas."}), 400

    liste_tweet = json.loads(rUser.get("retweet." + nom))
    time_stamp = calendar.timegm(time.gmtime())
    liste_tweet.append(time_stamp)

    for j in range(len(liste_tweet)):
        if rTweet.get("retweet." + str(liste_tweet[j])) is not None:
            tweet = json.loads(rTweet.get("retweet." + str(liste_tweet[j])))
            if str(tweet["id"]) == str(id_tweet):
                return jsonify({"message": "Vous avez déjà retweeté ce tweet."}), 400

    rUser.set("retweet." + nom, json.dumps(liste_tweet))
    rTweet.set("retweet." + str(time_stamp), json.dumps(dict(nom=nom_user_tweet, id=id_tweet)))

    return jsonify({"message": "Le tweet a bien été retweeté."}), 200


@app.route("/getAllTweets", methods=['GET'])
def get_all_tweets():
    """
        Permet de récupérer tous les tweets au format JSON

        :return: Un JSON contenant tous les tweets
    """
    # curl -X GET http://localhost:5000/getAllTweets

    liste_tweet_final = []
    liste_users = get_all_users()

    for i in range(len(liste_users)):
        if rUser.get(("tweet." + liste_users[i])) is not None:
            liste_tweet = json.loads(rUser.get(("tweet." + liste_users[i])))
            for j in range(len(liste_tweet)):
                liste_tweet_final.append(
                    dict(tweet=rTweet.get("tweet." + str(liste_tweet[j])), nom=liste_users[i],
                         id=liste_tweet[j], retweet_user=None))
        if rUser.get(("retweet." + liste_users[i])) is not None:
            liste_retweet = json.loads(rUser.get(("retweet." + liste_users[i])))
            for j in range(len(liste_retweet)):
                tweet = json.loads(rTweet.get("retweet." + str(liste_retweet[j])))
                liste_tweet_final.append(
                    dict(tweet=rTweet.get("tweet." + str(tweet["id"])), nom=tweet["nom"], id=liste_retweet[j],
                         retweet_user=liste_users[i]))

    return liste_tweet_final, 200


@app.route("/getAllTweetsByUser", methods=['POST'])
def get_all_tweets_by_user():
    """
        Permet de récupérer tous les tweets d'un utilisateur au format JSON

        nom: nom de la personne

        :return: Un JSON contenant tous les tweets de l'utilisateur
    """
    # curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"nom\":\"Lucas\"}" http://localhost:5000/getAllTweetsByUser

    data = request.get_json()
    nom = data.get('nom')

    nom_user = rUser.get("nom." + nom)
    if nom_user is None:
        return jsonify({"message": "Le nom d'utilisateur " + nom + " n'existe pas."}), 400

    liste_tweet = json.loads(rUser.get(("tweet." + nom)))
    liste_tweet_final = []
   
    for i in range(len(liste_tweet)):
        liste_tweet_final.append(dict(tweet=rTweet.get("tweet." + str(liste_tweet[i])), nom=nom, retweet_user=None, id=liste_tweet[i]))

    if rUser.get(("retweet." + nom)) is not None:
        liste_retweet = json.loads(rUser.get(("retweet." + nom)))
        for i in range(len(liste_retweet)):
            tweet = json.loads(rTweet.get("retweet." + str(liste_retweet[i])))
            liste_tweet_final.append(dict(tweet=rTweet.get("tweet." + str(tweet["id"])), nom=tweet["nom"], retweet_user=nom, id=liste_retweet[i]))

    return liste_tweet_final, 200


@app.route("/getAllSujet", methods=['GET'])
def get_all_sujet():
    """
        Permet de récupérer tous les sujets au format JSON

        :return: Un JSON contenant tous les sujets
    """
    # curl -X GET http://localhost:5000/getAllSujet

    liste_res = []
    tmp = rTweet.keys("sujet.*")
    for i in range(len(tmp)):
        liste_res.append(tmp[i][6:])
    return liste_res


@app.route("/getAllTweetsBySujet", methods=['POST'])
def get_all_tweets_by_sujet():
    """
        Permet de récupérer tous les tweets d'un sujet au format JSON

        sujet: sujet du tweet

        :return: Un JSON contenant tous les tweets du sujet
    """
    # curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"sujet\":\"gange\"}" http://localhost:5000/getAllTweetsBySujet
    # curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"sujet\":\"ESIREM\"}" http://localhost:5000/getAllTweetsBySujet

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
    """
        Permet de chercher les hashtags dans un tweet

        :param tweet: tweet ou il faut chercher les hashtags

        :return: liste des hashtags
    """
    return re.findall(r"#(\w+)", tweet)


@app.route("/getAllUsers", methods=['GET'])
def get_all_users():
    """
        Permet de récupérer tous les utilisateurs au format JSON

        :return: Un JSON contenant tous les utilisateurs
    """
    liste_res = []
    tmp = rUser.keys("nom.*")
    for i in range(len(tmp)):
        liste_res.append(tmp[i][4:])
    return liste_res


@app.route("/chargerDonnees", methods=['GET'])
def charger_donnees():
    """
        Permet de charger les données dans la base de données

        :return: Un JSON contenant le message de confirmation
    """
    # curl -X GET http://localhost:5000/chargerDonnees

    # charger users
    rUser.set("nom.Benjamin", "Benjamin")
    rUser.set("password.Benjamin", hashlib.sha256(b"pechakuchaDeMerde").hexdigest())
    rUser.set("tweet.Benjamin", json.dumps([1, 2, 3]))
    rUser.set("retweet.Benjamin", json.dumps([7, 8]))

    rUser.set("nom.Clement", "Clement")
    rUser.set("password.Clement", hashlib.sha256(b"pechakuchaDeMerde").hexdigest())
    rUser.set("tweet.Clement", json.dumps([4, 5, 12]))
    rUser.set("retweet.Clement", json.dumps([9]))

    rUser.set("nom.JeromeMSD", "JeromeMSD")
    rUser.set("password.JeromeMSD", hashlib.sha256(b"Esirem2023").hexdigest())
    rUser.set("tweet.JeromeMSD", json.dumps([6, 11, 10]))
    rUser.set("retweet.JeromeMSD", json.dumps([13]))

    # charger tweets
    rTweet.set("tweet.1", "Salut l'elite, c'est El Pueblo, 18-25, 2 sucres #gange #pizza7Fromage")
    rTweet.set("tweet.2", "Tu vas repartir mal mon copain #gitan")
    rTweet.set("tweet.3",
               "Союз нерушимый республик свободных Сплотила навеки Великая Русь. Да здравствует созданный волей народов Единый, могучий Советский Союз! #USSR")
    rTweet.set("tweet.4", "Franche-Comté > Bourgogne #FrancComtois")
    rTweet.set("tweet.5", "Le Granier m'a écrasé avec ses courbes de baiser #THREEJS #Bezier")
    rTweet.set("tweet.12", "ILC > SE > SQR")
    rTweet.set("tweet.6", "Je suis un tweet de JeromeMSD #firstTweet #ESIREM")
    rTweet.set("tweet.11", "IT > MDD  #ESIREM #IT")
    rTweet.set("tweet.10", "Votez TTL #BDE #ESIREM")


    # charger retweet
    rTweet.set("retweet.7", json.dumps(dict(id=1, nom="Benjamin")))
    rTweet.set("retweet.8", json.dumps(dict(id=2, nom="Benjamin")))
    rTweet.set("retweet.9", json.dumps(dict(id=4, nom="Clement")))
    rTweet.set("retweet.13", json.dumps(dict(id=12, nom="JeromeMSD")))

    # charger sujet
    rTweet.set("sujet.gange", json.dumps([json.dumps(dict(nom="Benjamin", id=1))]))
    rTweet.set("sujet.pizza7Fromage", json.dumps([json.dumps(dict(nom="Benjamin", id=1))]))
    rTweet.set("sujet.gitan", json.dumps([json.dumps(dict(nom="Benjamin", id=2))]))
    rTweet.set("sujet.USSR", json.dumps([json.dumps(dict(nom="Benjamin", id=3))]))
    rTweet.set("sujet.FrancComtois", json.dumps([json.dumps(dict(nom="Clement", id=4))]))
    rTweet.set("sujet.THREEJS", json.dumps([json.dumps(dict(nom="Clement", id=5))]))
    rTweet.set("sujet.Bezier", json.dumps([json.dumps(dict(nom="Clement", id=5))]))
    rTweet.set("sujet.ESIREM", json.dumps([json.dumps(dict(nom="JeromeMSD", id=6)), json.dumps(dict(nom="JeromeMSD", id=11)), json.dumps(dict(nom="JeromeMSD", id=10))]))
    rTweet.set("sujet.firstTweet", json.dumps([json.dumps(dict(nom="JeromeMSD", id=6))]))
    rTweet.set("sujet.IT", json.dumps([json.dumps(dict(nom="JeromeMSD", id=11))]))
    rTweet.set("sujet.BDE", json.dumps([json.dumps(dict(nom="JeromeMSD", id=10))]))

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
