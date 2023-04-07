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
    "nom": "nom",
    "password": "password"
}
```

#### Données reçues

```
{
    "message": "Bienvenue " + nom + "!",
    "status": 200
}
```

#### Exemple de requête

```
curl -X POST -H "Content-Type: application/json; charset=utf-8" --data "{\"nom\":\"Lucas\",\"password\":\"pechakuchaDeMerde\"}" http://localhost:5000/inscription
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
