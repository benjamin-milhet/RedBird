

# Documentation du front-end

Le front end est réalisé avec [React](https://reactjs.org/) en Typescript.
Il est composé de 4 pages principale et de différents composants:
 - La page de démarrage (fichier app.tsx) à pour but de ne s'afficher qu'une seule fois au lancement du font. Elle permet principalement de peupler la base de donnée Redis au premier demarrage de l'application.
 - La page Connexion permet de se connecter, on peut acceder à la page incription depuis celle-ci.
 - La page Inscription permet à un nouvel utilisateur de s'inscrire sur notre appli web.
 - La page Accueil est la page principal de notre application et c'est sur celle-ci que l'on pourra utiliser la majorité des fonctionnalité de l'application.
 - La page User sert à afficher les tweets d'un utilisateur.



## Liste des fonctionnalités


### Fonctionnélité attendues:
- Afficher tous les tweets.
- Afficher les sujets.
- Afficher les tweets liés à un sujet.
- Retweeter.
- Twetter.
- Afficher les tweets liés à une personne.

### Fonctionnalités supplémentaires:
- Afficher la liste des utilisateurs
- Rechercher un utilisateur
- Rechercher un sujet
- Rechecher  du texte comptenu dans un tweet 
- S'inscire
- Se connecter
- Deconnexion

## Detail des Fonctionnalités

### Affichage de tous les tweet
Sur la page [Accueil]() sur la partie de gauche sont affiché les tweets et les retweets triés de manière à ce que les tweets/retweets les plus récents soient affichés en premier. Pour les recuppérer la page fait une requête au back à sont lancement puis les stocke dans un tableau de tweet.

### Affichage de tous les sujets
La liste de tous les sujets sont affichés sur la partie droite de la page Accueil et sont récupérés de manière analogue à la liste des tweets.

### Afficher les tweets liés à un sujet
Dans la liste des [sujets]() chaque sujet est cliquable, lorsque l'on clique sur un sujet, une requête au back-end est effecutuée. On recupère ainsi la liste des tweets liés au sujet selectionné, ceux-ci sont ensuite [affichés]() dans la partie de gauche.
Pour revenir à la liste de tweet d'origine il suffit de cliquer sur la croix de la barre de recherche au dessus de la liste des sujets.

### Retweeter
Chaque tweet possède un boutton retweeter ce qui permet à l'utilisateur de retweeter le tweet en question en son nom. A noter que nous avons fait en sort qu'il soit impossible pour un même utilisateur de retweeter un même tweet. 

### Tweeter
Pour tweeter il suffit d'appuyer sur le boutton tweeter situé en haut à gauche de la page Accueil. Cette action entraine l'ouverture d'un "modal" qui est une sorte de fennetre qui s'ouvre par dessus la page. Cette fenêtre permet de saisir un tweet et de le poster en son nom en appuyant sur le button Envoyer. Le tweet est posté grâce à une requête envoyée au back-end.
Il est possible de fermer le modal sans tweeter soit en utilisant la croix en haut à droite du modal soit en cliquant en dehors de celui-ci.



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
