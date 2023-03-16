from flask import Flask, request
import sys
import redis
import re

app = Flask(__name__)
rUser = redis.Redis(host='localhost', port=6379, db=0)
rTweet = redis.Redis(host='localhost', port=6379, db=1)


@app.route("/")
def accueil():
    return "Bienvenue sur notre reseau social de la mère-patrie!"


@app.route("/inscription", methods=['POST'])
def inscription():
    data = request.get_json()
    nom = data.get('nom')
    password = data.get('password')

    tmp = rUser.get(request.form.get("nom." + nom, nom))
    if tmp is not None:
        return "Le nom d'utilisateur " + nom + " n'est pas dispoible."
    else:
        rUser.set("nom." + nom, nom)
        rUser.set("password." + nom, password)
        rUser.set("tweet." + nom, [])
        return "Bienvenue " + nom + "!"

@app.route("/tweeter", methods=['POST'])
def tweeter():
    # curl -X POST -d "nom=Lucas" -d "tweet=Salut l'élite, c'est El Pueblo, 18-25, 2 sucres #gange #pizza7Fromage" http://localhost:5000/tweeter

    data = request.get_json()
    nom = data.get('nom')
    tweet = data.get('tweet')

    liste_tweet = rUser.get(request.form.get("tweet." + nom))
    taille = len(rTweet.keys())
    liste_tweet[taille] = taille

    liste_sujet = chercherHashtag(tweet)
    for i in range(len(liste_sujet)):
        liste_sujet[i] = liste_sujet[i].lower()
        rTweet.set("sujet." + liste_sujet[i], {nom, taille})

    rUser.set("tweet." + nom, liste_tweet)
    rTweet.set("tweet." + str(taille), tweet)

    return True


@app.route("/getAllTweets", methods=['GET'])
def getAllTweets():
    liste_tweet = []
    for i in range(0, len(rTweet.keys())):
        liste_tweet.append(rTweet.get("tweet." + str(i)))

    return liste_tweet


@app.route("/getAllTweetsByUser", methods=['POST'])
def getAllTweetsByUser():
    data = request.get_json()
    nom = data.get('nom')
    
    liste_tweet = rUser.get(request.form.get("tweet." + nom))
    liste_tweet_final = []
    for i in range(0, len(liste_tweet)):
        liste_tweet_final.append(rTweet.get("tweet." + str(i)))

    return liste_tweet_final

def chercherHashtag(tweet):
    return re.findall(r"#(\w+)", tweet)



if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == "check_syntax":
            print("Build [ OK ]")
            exit(0)
        else:
            print("Passed argument not supported ! Supported argument : check_syntax")
            exit(1)
    app.run(debug=True)
