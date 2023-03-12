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
    nom = request.form['nom']
    email = request.form['email']
    password = request.form['password']

    tmp = rUser.get(request.form.get("email." + nom))
    if tmp is not None:
        return "Le nom d'utilisateur " + nom + " n'est pas dispoible."
    else:
        rUser.set("email." + nom, email)
        rUser.set("password." + nom, password)
        rUser.set("tweet." + nom, [])
        return "Bienvenue " + nom + "!"


@app.route("/tweeter", methods=['POST'])
def tweeter():
    nom = request.form['nom']
    tweet = request.form['tweet']

    liste_tweet = rUser.get(request.form.get("tweet." + nom))
    taille = len(liste_tweet)
    liste_tweet[taille] = taille
    rUser.set("tweet." + nom, liste_tweet)
    rTweet.set("tweet." + str(taille), tweet)

    return True


@app.route("/getAllTweets", methods=['GET'])
def getAllTweets():
    liste_tweet = []
    for i in range(0, len(rTweet.keys())):
        liste_tweet.append(rTweet.get("tweet." + str(i)))

    return liste_tweet


@app.route("/getAllTweetsByUser", methods=['GET'])
def getAllTweetsByUser():
    nom = request.form['nom']
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
