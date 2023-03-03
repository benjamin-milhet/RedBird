class Tweet:

    id = -1
    personne = None
    message = ""
    liste_hashtag = {}
    id_sujet = -1

    def __init__(self, _id, _personne, _message, _liste_hashtag, _id_sujet):
        self.id = _id
        self.personne = _personne
        self.message = _message
        self.liste_hashtag = _liste_hashtag
        self.id_sujet = _id_sujet
    
    def __str__(self):
        return self.message + " " + str(self.liste_hashtag) + " " + str(self.id_sujet)