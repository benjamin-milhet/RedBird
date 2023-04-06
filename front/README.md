

# Documentation du front-end

Le front end est réalisé avec [React](https://reactjs.org/) en Typescript.
Il est composé de 4 pages principale et de différents composants:
 - La page de démarrage (fichier app.tsx) à pour but de ne s'afficher qu'une seule fois au lancement du font. Elle permet principalement de peupler la base de donnée Redis au premier demarrage de l'application.
 - La page Connexion permet de se connecter, on peut acceder à la page incription depuis celle-ci.
 - La page Inscription permet à un nouvel utilisateur de s'inscrire sur notre appli web.
 - La page Accueil est la page principal de notre application et c'est sur celle-ci que l'on pourra utiliser la majorité des fonctionnalité de l'application.
 - La page User sert à afficher les tweets d'un utilisateur.



# Liste des fonctionnalités


## Fonctionnélité attendues:
- Afficher tous les tweets.
- Twetter.
- Afficher les tweets liés à une personne.
- Retweeter.
- Afficher les sujets.
- Afficher les tweets liés à un sujet.

## Fonctionnalités supplémentaires:
- Afficher la liste des utilisateurs
- Rechercher un utilisateur
- Rechercher un sujet
- Rechecher  du texte comptenu dans un tweet 
- S'inscire
- Se connecter


## Commandes pour lancer le front sans utiliser le Docker compose

### Docker build
```
docker build . --file Dockerfile --tag imagefrontend
```

### Docker run
```
docker run -p 3000:3000 imagefrontend 
```


![alt text](https://github.com/benjamin-milhet/4A_ILC_GHYS_MILHET_CLOUD_COMPUTING/blob/main/images/meme4.png?raw=true)
