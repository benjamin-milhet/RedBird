# Redbird

## Membres du groupe
 - Clément GHYS
 - Benjamin MILHET
 
## ILC

### Documentation du fichier Dockerfile

#### Description

Le fichier Dockerfile permet de créer une image Docker à partir d'un fichier de configuration. Il est possible de créer une image Docker à partir d'un fichier Dockerfile en utilisant la commande suivante :

```bash
docker build -t <nom_de_l'image> <chemin_vers_le_dossier_contenant_le_fichier_Dockerfile>
```

#### Instructions

Le fichier Dockerfile contient plusieurs instructions. Chaque instruction est écrite sur une ligne et commence par une instruction en majuscule. Les instructions sont les suivantes :

- FROM : permet de spécifier l'image de base à partir de laquelle on va créer notre image. Cette instruction doit être la première instruction du fichier Dockerfile.
- RUN : permet d'exécuter une commande dans le conteneur.
- CMD : permet d'exécuter une commande dans le conteneur lorsqu'on lance le conteneur.
- COPY : permet de copier des fichiers du système hôte vers le conteneur.
- EXPOSE : permet d'indiquer le port sur lequel le conteneur va écouter.
- ENV : permet de définir une variable d'environnement.

Dans notre cas, nous avons utilisé les instructions suivantes :


- FROM python:3.8 <br/>
On utilise l'image python:3.8 comme image de base car c'est une image légère qui permet un build rapide.

- RUN apt-get update
- RUN apt-get install python3-pip -y
- RUN pip install redis
- RUN pip install flask-cors <br/>
On installe pip pour pouvoir installer les dépendances du projet.

- RUN pip install Flask <br/>
On installe Flask pour pouvoir utiliser l'API.

- ENV FLASK_APP=main.py
- ENV FLASK_ENV=development<br/>
On initialise les variables d'environements

- COPY . . <br/>
On copie le dossier courant dans le dossier courant du conteneur.

- EXPOSE 5000 <br/>
On indique que le conteneur va écouter sur le port 5000.

- CMD [ "flask","run", "-h", "0.0.0.0"] <br/>
On exécute la commande flask run pour lancer l'API.
