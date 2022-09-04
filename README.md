# Groupomania - Openclassrooms - P7

## A propos du projet

Projet 7 du parcours Développeur Web Openclassrooms.
Ce projet consiste à créer un réseau social d'entreprise.

## Technos utilisés

- Node.js (Permet d'éxecuter du Javascript coté serveur)
- Express.js (Framework Node.js pour la création de l'API)
- React.js (Framework Javascript pour le Frontend)
- MariaDB (Base de données equivalente a MySQL mais en opensource)

**Les images du site (photos de profils, photos de couvertures, photos des posts) sont hébérgés sur Cloudinary pour alleger le serveur et faciliter l'hébergement futur du site.**

## Installer et lancer le projet

### Prérequis

**Assurez vous d'avoir installé les outils suivants sur votre ordinateur :**

- Git (https://git-scm.com/downloads)
- Node.js (https://nodejs.org/en)
- MariaDB (https://mariadb.org/download) ou MySQL (https://dev.mysql.com/downloads/mysql/)

### Installation

1. **Clonez le depot Github du projet**

Ouvrez un nouveau terminal puis executez les commandes suivantes :

```bash
cd installation-path # Se déplacer dans le dossier ou vous souhaitez installer le projet (remplacer 'installation-path' par le chemin d'accés souhaité)
git clone https://github.com/Bastien-Pruvost/groupomania-p7.git
cd groupomania-p7 # Se déplacer dans le dossier que vous venez de cloner
```

2. **Initialisez la base de données**

Vous pouvez initialiser la base de données avec MariaDB ou MySQL, les commandes sont identiques pour les deux services.

Toujours dans le dossier 'groupomania-p7', executez :

```bash
mysql -u root -p # Lancer MySQL (ou MariaDB) avec l'utilisateur 'root'
# On vous demande le mot de passe de l'utilisateur root (Si vous n'avez pas encore créé de mot de passe root, pressez simplement la touche Entrée)
```

Une fois le CLI MySQL lancé, executez les commandes suivantes :

```sql
CREATE DATABASE groupomania; -- Créer une nouvelle base de données 'groupomania'
CREATE USER 'groupomania-public'@'localhost' IDENTIFIED BY 'QmSpUsXuZw4z6B9EbGdK'; -- Créer l'utilisateur utilisé par l'API
GRANT ALL PRIVILEGES ON groupomania.* TO 'groupomania-public'@'localhost'; -- Attribuer tout les droits à l'utilisateur créé pour pouvoir interagir avec la BD
USE groupomania; -- Acceder a la base de données créé
source database/groupomania.sql; -- Importer le dump sql situé dans le dossier database du projet cloné
```

3. **Initialisez le Backend**

Pour éviter de rendre publique certaines données (dont les clés de l'API Cloudinary pour l'hébérgement des images), les fichiers '.env' sont disponibles dans les livrables dans le dossier 'PRUVOST_Bastien_04_fichiers-env_062022'

- Copiez le fichier '.env' du dossier 'server' dans le dossier '/groupomania-p7/server'

- Dans le dossier 'groupomania-p7', executez les commandes suivantes dans un nouveau terminal :

```bash
cd server # Se déplacer dans le dossier server
npm install # Installer les packages et dépendances nécessaires
npm start # Démarrer le serveur
```

4. **Initialisez le frontend**

- Copiez le fichier '.env' du dossier 'client' dans le dossier '/groupomania-p7/client'

- Dans le dossier 'groupomania-p7', executez les commandes suivantes dans un nouveau terminal:

```bash
cd client # Se déplacer dans le dossier client
npm install # Installer les packages et dépendances nécessaires
npm start # Démarrer l'application React
```

5. **Lancer l'application**

- Verifiez que le service MySQL ou MariaDB est bien lancé

- Verifiez que le serveur Node.js (backend) est bien lancé dans une fenêtre de terminal.

- Verifiez que l'application React (frontend) est bien lancé dans une fenêtre de terminal.

- Accédez à `localhost:3000` depuis un navigateur internet. Vous êtes désormais sur le site de Groupomania.

**De la fake data a été intégrée dans le réseau social pour remplir l'application et faciliter les tests**

**Les identifiants du compte administrateur sont disponibles dans les livrables, dans le fichier 'PRUVOST_Bastien_03_compte-admin_062022.txt'**

## Credits

Projet développé par Bastien Pruvost pour la formation Openclassrooms - Développeur Web
