class Personne:

    name = ""
    email = 0
    liste_tweet = {}

    def __init__(self, _name, _email):
        self.name = _name
        self.email = _email
        self.liste_tweet = {}
    
    def add_tweet(self, _tweet):
        self.liste_tweet[_tweet.id] = _tweet