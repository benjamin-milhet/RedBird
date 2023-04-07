

# Documentation du front-end

Le front end est réalisé avec [React](https://reactjs.org/) en TypeScript.

![alt text](https://github.com/benjamin-milhet/4A_ILC_GHYS_MILHET_CLOUD_COMPUTING/blob/main/images/meme5.jpg?raw=true)

Il est composé de 4 pages principale et de différents composants :
 - La page de démarrage (fichier app.tsx) a pour but de ne s'afficher qu'une seule fois au lancement du front. Elle permet principalement de peupler la base de donnée Redis au premier démarrage de l'application.
 - La page Connexion permet de se connecter, on peut accéder à la page inscription depuis celle-ci.
 - La page Inscription permet à un nouvel utilisateur de s'inscrire sur notre appli web.
 - La page Accueil est la page principale de notre application et c'est sur celle-ci que l'on pourra utiliser la majorité des fonctionnalités de l'application.
 - La page User sert à afficher les tweets d'un utilisateur.



## Liste des fonctionnalités


### Fonctionnalités attendues :
- [Afficher tous les tweets](#affichage-de-tous-les-tweets)
- [Afficher les sujets](#affichage-de-tous-les-sujets)
- [Afficher les tweets liés à un sujet](#afficher-les-tweets-liés-à-un-sujet)
- [Retweeter](#retweeter)
- [Tweeter](#tweeter)
- [Afficher les tweets liés à une personne](#afficher-les-tweets-liés-à-une-personne)

### Fonctionnalités supplémentaires :
- [Rechercher un sujet](#rechercher-un-sujet)
- [Rechercher  du texte contenu dans un tweet](#rechercher-du-texte-contenu-dans-un-tweet)
- [Afficher la liste des utilisateurs](#afficher-la-liste-des-utilisateurs)
- [Rechercher un utilisateur](#rechercher-un-utilisateur)
- [Se connecter](#se-connecter)
- [S'inscrire](#sinscrire)
- [Déconnexion](#déconnexion)

## Détail des Fonctionnalités

### Affichage de tous les tweets
Sur la page [Accueil]() sur la partie de gauche sont affichés les tweets et les retweets triés de manière que les tweets/retweets les plus récents soient affichés en premier. Pour les récupérer, la page fait une requête au back à son lancement puis les stocke dans un tableau de tweet.

### Affichage de tous les sujets
La liste de tous les sujets est affichée sur la partie droite de la page Accueil et sont récupérés de manière analogue à la liste des tweets.

### Afficher les tweets liés à un sujet
Dans la liste des sujets chaque sujet est cliquable, lorsque l'on [clique sur un sujet](), une requête au back-end est effectuée. On récupère ainsi la liste des tweets liés au sujet sélectionné, ceux-ci sont ensuite affichés dans la partie de gauche.
Pour revenir à la liste de tweet d'origine, il suffit de cliquer sur la croix de la barre de recherche au-dessus de la liste des sujets.

### Retweeter
Chaque tweet possède un bouton "retweeter" ce qui permet à l'utilisateur de retweeter le tweet en question en son nom. À noter que nous avons fait en sort qu'il soit impossible pour un même utilisateur de retweeter un même tweet. 

### Tweeter
Pour tweeter, il suffit d'appuyer sur le bouton tweeter situé en haut à gauche de la page Accueil. Cette action entraine l'ouverture d'un ["modal"]() qui est une sorte de fenêtre qui s'ouvre par-dessus la page. Cette fenêtre permet de saisir un tweet et de le poster en son nom en appuyant sur le bouton "Envoyer". Le tweet est posté grâce à une requête envoyée au back-end.
Il est possible de fermer le modal sans tweeter, soit en utilisant la croix en haut à droite du modal, soit en cliquant en dehors de celui-ci.

### Afficher les tweets liés à une personne
Pour afficher les tweets liés à une personne, nous avons créé la page [User](). Cette page prend en paramètre un nom d'utilisateur qui est récupéré pour permettre d'effectuer la requête permettant de récupérer tous les tweets d'un utilisateur. De cette façon, on peut afficher les tweets de n'importe quel utilisateur  avec une seule page.
Cette page User est accessible de deux manières :
- En cliquant sur un nom d'utilisateur dans un tweet 
- En utilisant le [Finder](#afficher-la-liste-des-utilisateurs) qui s'ouvre en cliquant sur le bouton "trouver un utilisateur"
Un bouton "retour" permet de retourner à la page Accueil.

## Détail des fonctionnalités supplémentaires

### Rechercher un sujet
Au-dessus de la liste des sujets se trouve une barre de recherche permettant de rechercher un sujet en particulier.
Pour réinitialiser la recherche, il suffit de cliquer sur la croix à droite de la barre.

### Rechercher du texte contenu dans un tweet 
Au-dessus des deux listes (tweets et sujets) se trouve une grande barre de recherche permettant de rechercher du texte contenu dans un tweet. À noter que les sujets s'actualisent également en fonction des tweets affichés.

### Afficher la liste des utilisateurs
En cliquant sur le bouton "trouver un utilisateur" on ouvre le [Finder]() qui est un modal qui permet via une requête d'afficher la liste de tous les utilisateurs. Chaque utilisateur est cliquable et renvoie sur la page User de l'utilisateur sélectionné.

### Rechercher un utilisateur
Dans le Finder, se trouve une barre de recherche basée sur le même fonctionnement que celles sur la page d'accueil et permet de rechercher un utilisateur par son nom.

### Se connecter
La page [Connexion]() possède deux champs texte pour remplir un nom d'utilisateur et un mot de passe.
En cliquant sur le bouton "Se connecter" une requête est envoyé au back pour vérifier les informations saisies.
Une fois la connexion validée, le nom d'utilisateur est stocké dans le localstorage pour pouvoir le récupérer et l'utiliser dans les requêtes pour tweeter ou retweeter.
On est ensuite envoyé vers la page Accueil.

### S'inscrire
La page [Inscription]() est accessible depuis la page connexion et permet à un nouvel utilisateur de saisir un nom et un mot de passe.
En cliquant sur le bouton "S'inscrire" une requête est envoyé au back pour vérifier que le nom d'utilisateur n'est pas déjà pris.
Une fois l'inscription validée, on est envoyé vers la page Connexion pour se connecter au site.

### Déconnexion
Le bouton "Déconnexion" situé en haut à droite de la page permet de supprimer le nom d'utilisateur du localstorage et de renvoyer vers la page connexion.


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
