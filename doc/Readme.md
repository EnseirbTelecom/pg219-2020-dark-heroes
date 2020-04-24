Sujet

Le projet a pour but de développer une application de géo-localisation d’amis. Cette application se nommera FriendFinder. Pour cela il sera nécessaire de mettre en oeuvre une architecture client serveur. L’application à développer comportera ainsi un serveur utilisant Node / Express / MongoDB, et un client destiné à s’exécuter sur plateforme Android, développé via Framework7 / Cordova.

Le rendu final du projet se trouvera sur le dernier commit de votre dépôt GitHub. Il doit contenir:
Le code source de la partie serveur dans le répertoire src/api
Le code source de la partie client dans le répertoire src/client
Une documentation exhaustive de l’API REST du serveur au format OpenAPi (http://spec.openapis.org/oas/v3.0.3) dans le répertoire doc/api, incluant une génération au format HTML. Regardez du côté de l’outil Redoc (https://github.com/Redocly/redoc) pour cela.

Les fichiers sources doivent être correctement indentés, avec un nommage approprié des fonctions et variables. Un malus sera appliqué aux groupes ne respectant pas ces règles. Enfin faites particulièrement attention à la copie, nous utilisons un logiciel qui permet de détecter automatiquement les copier-coller, tout projet suspect sera étudié avec la plus grande attention…

La date de rendu du projet est le 20 mai 2020 à 18h00.
Sujet
Fonctionnalités serveur
Inscription et authentification des utilisateurs
Il doit être possible de s’inscrire sur le serveur. Les informations qui doivent être fournies en cas d’inscription sont : 
e-mail (unique dans la base)
mot de passe
nom
prénom
pseudo
date de naissance
Pour s’authentifier il faut fournir son adresse mail et son mot de passe. Une authentification fournit un token (une clé) qui doit être conservée par le client et est fourni lors de la demande d’information. Une authentification est valable pour une durée maximale de 24h.
Un utilisateur peut se déconnecter. Pour mettre en place des tokens sécurisés, regardez du côté de JWT.
Poster la position courante
Pour un utilisateur authentifié, il doit être possible d’envoyer sa position. Les informations à fournir sont :
Coordonnées (latitude - longitude)
Date et heure d’activation
Un message optionel
Durée de validité

Les positions sont archivées de manière à ce que l’utilisateur puisse en consulter l’historique. Une position est automatiquement archivée quand elle dépasse la date d’activation plus la durée. Si une position courante est ajoutée alors qu’une est déjà active, alors la position active est automatiquement archivée.
Désactiver la position courante
Pour un utilisateur authentifié, il doit être possible d’envoyer sa position. Les informations à fournir sont :
Coordonnées (latitude - longitude)
Date et heure d’activation
Durée de validité

Les positions sont archivées de manière à ce que l’utilisateur puisse en consulter l’historique. Une position est automatiquement archivée quand elle dépasse la date d’activation plus la durée.
Supprimer une position de l’historique
Pour un utilisateur authentifié, il doit être possible de supprimer une position donnée dans l’historique.
Les positions sont archivées de manière à ce que l’utilisateur puisse en consulter l’historique. Une position est automatiquement archivée quand elle dépasse la date d’activation plus la durée.
Ajout et suppression d’amis
Un utilisateur authentifié peut ajouter des amis sur sa liste. Il pourra consulter la position courante des amis qui en auront posté une. Pour ajouter un ami, il faut spécifier son e-mail, et cet ami doit confirmer qu’il est d’accord pour l’ajout. Il est possible aussi de supprimer un ami de sa liste, dans ce cas là la relation d’amitié est supprimée pour les deux personnes.
Fonctionnalités client
Inscription - connection
Un visiteur doit pouvoir s’inscrire sur le site. Il doit aussi pouvoir se connecter afin de devenir un utilisateur authentifié.
Éditer les amis
L’utilisateur authentifié doit pouvoir visualiser sa liste d’ami, ajouter des amis, ou supprimer des amis.
Envoyer votre position
Un utilisateur authentifié doit pouvoir poster sa position courante.
Supprimer votre position
Un utilisateur authentifié doit pouvoir supprimer sa position courante.
Consulter et éditer l’historique des positions
Un utilisateur authentifié doit pouvoir consulter l’historique de ses position, idéalement sur une carte. Il doit pouvoir aussi supprimer une position donnée de son historique.
Visualisation des positions des amis
Un utilisateur authentifié doit pouvoir afficher les positions courantes de tous les amis qui en ont défini une. Idéalement cette visualisation doit pouvoir se faire en utilisant une carte.

