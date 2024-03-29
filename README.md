#  <img src="https://github.com/benjamin-milhet/RedBird/blob/main/images/logo-redbird.png" height="40" width="50" /> RedBird

<img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue" /> <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" /> <img src="https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white" /> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" /> <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" />


[![checkSyntax](https://github.com/benjamin-milhet/RedBird/actions/workflows/CheckSyntax.yml/badge.svg)](https://github.com/benjamin-milhet/RedBird/actions/workflows/CheckSyntax.yml)
[![Docker Image CI](https://github.com/benjamin-milhet/RedBird/actions/workflows/docker-image.yml/badge.svg)](https://github.com/benjamin-milhet/RedBird/actions/workflows/docker-image.yml)
[![Docker Image front](https://github.com/benjamin-milhet/RedBird/actions/workflows/docker-image-front.yml/badge.svg)](https://github.com/benjamin-milhet/RedBird/actions/workflows/docker-image-front.yml)
[![Node.js CI - React](https://github.com/benjamin-milhet/RedBird/actions/workflows/node.js.yml/badge.svg)](https://github.com/benjamin-milhet/RedBird/actions/workflows/node.js.yml)


L'objectif du projet est de reproduire le très célèbre réseau social Twitter.


## Membres du groupe
 - Clément GHYS
 - Benjamin MILHET
 
## ILC

## Lancement des conteneurs

### DOCKER BUILD 
```
docker-compose build
```

### DOCKER RUN
```
docker-compose up
```

## Identifiants

- Username: ```JeromeMSD```
- Password: ```Esirem2023```

## Déroulement du projet
Benjamin s'est principalement occupé de la partie Backend avec Python et le Framework Flask et du lien avec la base de données REDIS. Clément s'est occupé de la partie Frontend avec la bibliothèque React et de la mise en place de l'interface utilisateur. Chacun d'entre nous s'est occupé du Dockerfile de leur partie. Nous avons aussi mis en place 4 Github actions pour vérifier la syntaxe de notre fichier main.py, le build de nos Dockerfile pour le back et le front, et le test de notre application React.

## Langages
Pour réaliser notre API, nous avons utiliser le langage Python avec le framework Flask permettant le dévelopement web avec Python. Pour le stockage des données, nous utilisons le système de gestion de base de données clé-valeur Redis qui est de type NoSQL. Enfin, pour l'interface utilisateur, nous utilisons la bibliothèque React, très utile pour rendre nos pages web interactive.


## Documentations

 - [Readme du backend](https://github.com/benjamin-milhet/RedBird/blob/main/back/README.md)
 - [Documentation du dockerfile du back](https://github.com/benjamin-milhet/RedBird/blob/main/back/Readme-Dockerfile.md)
 - [Readme du frontend](https://github.com/benjamin-milhet/RedBird/blob/main/front/README.md)


 ## Rendu final

### Page d'accueil
![alt text](https://github.com/benjamin-milhet/RedBird/blob/main/images/menu1.png?raw=true)

### Page de recherche
![alt text](https://github.com/benjamin-milhet/RedBird/blob/main/images/menu2.png?raw=true)

### Tri par sujet
![alt text](https://github.com/benjamin-milhet/RedBird/blob/main/images/menu3.png?raw=true)

