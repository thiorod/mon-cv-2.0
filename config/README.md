<!-- Mon CV 2.0 - Générateur de CV -->

<!-- Présentation du projet -->
Mon CV 2.0 est une application web que nous avons développée dans le cadre de notre examen de JavaScript à l'Institut Africain de Management (IAM). L'idée est de permettre à n'importe qui de créer facilement un CV professionnel, un peu comme sur FlowCV, mais en version plus simple et adaptée à nos besoins.

L'utilisateur peut remplir ses informations, ajouter ses expériences, formations, langues, etc. Le CV se met à jour en temps réel et on peut choisir entre différents templates. Il y a aussi un système d'inscription pour sauvegarder ses CV en ligne.

 <!-- Ce qu'on a réussi à faire -->

<!--  L'interface -->
- Un design moderne avec un dégradé violet (on aime bien ce style)
- Une interface qui s'adapte aux mobiles et aux tablettes
- 3 templates de CV différents (un simple, un bleu professionnel, un vert moderne)

<!--  Les fonctionnalités dynamiques -->
- On peut ajouter autant d'expériences professionnelles qu'on veut
- Pareil pour les formations et les langues (avec niveaux A1 à C2)
- Tout se met à jour instantanément dans l'aperçu

<!--  La validation des données -->
- Les emails doivent être valides
- Les numéros de téléphone doivent être au format sénégalais (77, 78, 76, 70, 33...)
- Les champs obligatoires sont vérifiés
- Les mots de passe doivent être sécurisés (6 caractères minimum, une majuscule, un chiffre, un caractère spécial)

<!-- La sauvegarde -->
- Si on n'est pas connecté, les données sont sauvegardées automatiquement dans le navigateur
- Si on est connecté, tout est stocké dans une base de données MySQL
- On peut modifier ou supprimer ses CV depuis un tableau de bord

<!-- L'export PDF -->
- On peut télécharger son CV en PDF d'un clic
- Le PDF tient sur une seule page (on a galéré mais on a réussi)

<!-- organisation -->

<!-- Côté frontend -->
- HTML pour la structure
- CSS pour le design (on s'est inspiré d'une page de connexion qu'on aimait bien)
- JavaScript qu'on a découpé en plusieurs fichiers pour bien gerer la modularité du js et que ce soit plus clair :
  - `validation.js` : tout ce qui est validation
  - `templateManager.js` : pour changer de template
  - `uiManager.js` : pour gérer l'affichage et les ajouts dynamiques
  - `storageManager.js` : pour la sauvegarde
  - `auth.js` : pour l'authentification
  - `main.js` : le point de départ

<!-- Côté backend -->
- PHP pour gérer l'authentification et les sauvegardes
- MySQL pour stocker les utilisateurs et leurs CV d'ailleurs c'est pour ça qu'on a le fichier SQL/database.sql
- Une architecture simple avec des dossiers `config/`, `includes/` et `dashboard/`

<!-- gestion des roles -->

Ndeye Thioro DIOP: J'ai principalement travaillé sur le backend : la base de données, l'authentification, la sauvegarde des CV, et la logique principale. J'ai aussi géré l'intégration de toutes les parties pour que ça fonctionne ensemble. 
Maréme KANE : Elle s'est occupée de tout ce qui est frontend : le HTML, le CSS, les templates (codage), et la validation des formulaires. J'ai aussi travaillé sur l'aspect responsive pour que ça marche sur mobile. 


