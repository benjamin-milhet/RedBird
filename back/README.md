# <img src="https://github.com/benjamin-milhet/4A_ILC_GHYS_MILHET_CLOUD_COMPUTING/blob/main/images/logo-redbird.png" height="40" width="50" /> Documentation du Backend

<img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue" /> <img src="https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white" /> <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" />

## Moi après avoir fini le JSON
![alt text](https://github.com/benjamin-milhet/4A_ILC_GHYS_MILHET_CLOUD_COMPUTING/blob/main/images/meme3.jpg?raw=true)


## Format de la base de données REDIS

```
Redis
├── rUser - 0
│   ├── nom.user : nom de l'utilisateur (String)
│   ├── password.user : Mot de passe (String)
│   ├── tweet.user : Liste des id des tweets (Array)
│   └── retweet.user : Liste des id des retweets (Array)
│
├── rTweet - 1
│   ├── tweet.id : Tweet correspondant à un id
│   ├── retweet.id : Retweet correspondant à l'id d'un tweet et de l'utilisateur du tweet original
│   └── sujet.sujet : Liste des id des tweets ayant ce sujet
```

## Fonctionnalités

 - [Inscription d'un utilisateur](#inscription-dun-utilisateur)
 - [Connexion d'un utilisateur](#connexion-dun-utilisateur)
 - [Création d'un tweet](#création-dun-tweet)
 - [Création d'un retweet](#création-dun-retweet)
 - [Retourner l'ensemble des tweets](#retourner-lensemble-des-tweets)
 - [Retourner l'ensemble des sujets](#retourner-lensemble-des-sujets)
 - [Retourner l'ensemble des utilisateurs](#retourner-lensemble-des-utilisateurs)
 - [Retourner les tweets d'un utilisateur](#retourner-les-tweets-dun-utilisateur)
 - [Retourner les tweets d'un sujet](#retourner-les-tweets-dun-sujet)

### Inscription d'un utilisateur

Permet d'inscrire un utilisateur dans la base de données REDIS

#### Données envoyées

Méthode : POST

```
{
    "nom": "Nom de l'utilisateur",
    "password": "Mot de passe"
}
```

#### Données reçues

```
{
    "message": "Bienvenue " + nom + "!",
    "status": 200
}

ou

{
    "message": "Le nom d'utilisateur " + nom + " n'est pas disponible.",
    "status": 400
}
```

#### Exemple de requête

```
curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"nom\":\"Lucas\",\"password\":\"pechakuchaDeMerde\"}" http://localhost:5000/inscription
```

### Connexion d'un utilisateur

Permet de vérifier si un utilisateur est dans la base de données REDIS

#### Données envoyées

Méthode : POST

```
{
    "nom": "Nom de l'utilisateur",
    "password": "Mot de passe"
}
```

#### Données reçues

```
{
    "message": "Bienvenue " + nom + "!",
    "status": 200
}

ou

{
    "message": "Le nom d'utilisateur " + nom + " n'existe pas.",
    "status": 400
}

ou

{
    "message": "Le mot de passe est incorrect.",
    "status": 400
}
```

#### Exemple de requête

```
curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"nom\":\"Lucas\",\"password\":\"pechakuchaDeMerde\"}" http://localhost:5000/connexion
```

### Création d'un tweet

Permet de créer un tweet

#### Données envoyées

Méthode : POST

```
{
    "nom": "Nom de l'utilisateur",
    "tweet": "Tweet à poster",
}
```

#### Données reçues

```
{
    "message": "Le tweet a bien été posté.",
    "status": 200
}

ou

{
    "message": "Le nom d'utilisateur " + nom + " n'existe pas.",
    "status": 400
}
```

#### Exemple de requête

```
curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"nom\":\"Lucas\",\"tweet\":\"Salut l'elite, c'est El Pueblo, 18-25, 2 sucres #gange #pizza7Fromage\"}" http://localhost:5000/tweeter
```

### Création d'un retweet

Permet de retweeter un tweet

#### Données envoyées

Méthode : POST

```
{
    "nom": "Nom de l'utilisateur",
    "id": "Id du tweet à retweeter",
    "nom_user_tweet": "Nom de l'utilisateur qui a posté le tweet"
}
```

#### Données reçues

```
{
    "message": "Le tweet a bien été retweeté.",
    "status": 200
}

ou

{
    "message": "Le nom d'utilisateur " + nom + " n'existe pas.",
    "status": 400
}

ou

{
    "message": "Le nom d'utilisateur " + nom_user_tweet + " n'existe pas.",
    "status": 400
}

ou

{
    "message": "Le tweet avec l'id " + str(id_tweet) + " n'existe pas.",
    "status": 400
}
```

#### Exemple de requête

```
curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"nom\":\"Lucas\", \"nom_user_tweet\":\"Benjamin\", \"id\":\"1\"}" http://localhost:5000/retweet
```

### Retourner l'ensemble des tweets

Permet de retourner l'ensemble des tweets

#### Données reçues

Méthode : GET

```
{
    "liste_tweet_final": [
        {
            "id": "Id du tweet",
            "nom": "Nom de l'utilisateur",
            "tweet": "Tweet"
        }
    ],
    "status": 200
}
```

#### Exemple de requête

```
curl -X GET http://localhost:5000/getAllTweets
```

### Retourner l'ensemble des sujets

Permet de retourner l'ensemble des sujets

#### Données reçues

Méthode : GET

```
{
    "liste_sujets": [
        "Sujet"
    ],
    "status": 200
}
```

#### Exemple de requête

```
curl -X GET http://localhost:5000/getAllSujet
```

### Retourner l'ensemble des utilisateurs

Permet de retourner l'ensemble des utilisateurs

#### Données reçues

Méthode : GET

```
{
    "liste_utilisateurs": [
        "Utilisateur"
    ],
    "status": 200
}
```

#### Exemple de requête

```
curl -X GET http://localhost:5000/getAllUsers
```

### Retourner l'ensemble des tweets d'un utilisateur

Permet de retourner l'ensemble des tweets d'un utilisateur

#### Données envoyées

Méthode : POST

```
{
    "nom": "Nom de l'utilisateur"
}
```

#### Données reçues

```
{
    "liste_tweet": [
        {
            "id": "Id du tweet",
            "nom": "Nom de l'utilisateur",
            "tweet": "Tweet"
        }
    ],
    "status": 200
}

ou

{
    "message": "Le nom d'utilisateur " + nom + " n'existe pas.",
    "status": 400
}
```

#### Exemple de requête

```
curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"nom\":\"Lucas\"}" http://localhost:5000/getAllTweetsByUser
```

### Retourner l'ensemble des tweets d'un sujet

Permet de retourner l'ensemble des tweets d'un sujet

#### Données envoyées

Méthode : POST

```
{
    "sujet": "Sujet"
}
```

#### Données reçues

```
{
    "liste_tweet": [
        {
            "id": "Id du tweet",
            "nom": "Nom de l'utilisateur",
            "tweet": "Tweet"
        }
    ],
    "status": 200
}

ou

{
    "message": "Le sujet " + sujet + " n'existe pas.",
    "status": 400
}
```

#### Exemple de requête

```
curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"sujet\":\"gange\"}" http://localhost:5000/getAllTweetsBySujet
```

## Documentation

 - [Documentation du dockerfile](https://github.com/benjamin-milhet/4A_ILC_GHYS_MILHET_CLOUD_COMPUTING/blob/main/back/Readme-Dockerfile.md)


## Commandes docker pour lancer le Backend sans utiliser le Docker compose


### REDIS
```
docker run --name myredis -p 6379:6379 redis
```

### BACKEND
```
docker build . --tag imagebackend
```

```
docker run --name imagebackend -p 5000:5000 imagebackend
```

![alt text](https://github.com/benjamin-milhet/4A_ILC_GHYS_MILHET_CLOUD_COMPUTING/blob/main/images/meme2.jpeg?raw=true)
