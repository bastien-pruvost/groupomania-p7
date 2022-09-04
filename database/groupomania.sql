-- -------------------------------------------------------------
-- TablePlus 4.8.2(436)
--
-- https://tableplus.com/
--
-- Database: groupomania
-- Generation Time: 2022-09-04 13:56:39.7640
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `content` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `postId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  CONSTRAINT `comments_ibfk_33` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_34` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `content` text DEFAULT NULL,
  `imagePath` varchar(2083) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `user_like_comment`;
CREATE TABLE `user_like_comment` (
  `userId` int(10) unsigned NOT NULL,
  `commentId` int(10) unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`,`commentId`),
  UNIQUE KEY `user_like_comment_commentId_userId_unique` (`userId`,`commentId`),
  KEY `commentId` (`commentId`),
  CONSTRAINT `user_like_comment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_like_comment_ibfk_2` FOREIGN KEY (`commentId`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `user_like_post`;
CREATE TABLE `user_like_post` (
  `userId` int(10) unsigned NOT NULL,
  `postId` int(10) unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`,`postId`),
  UNIQUE KEY `user_like_post_postId_userId_unique` (`userId`,`postId`),
  KEY `postId` (`postId`),
  CONSTRAINT `user_like_post_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_like_post_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(320) NOT NULL,
  `password` varchar(250) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `profilePicPath` varchar(2083) DEFAULT NULL,
  `coverPicPath` varchar(2083) DEFAULT NULL,
  `profession` varchar(75) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `city` varchar(75) DEFAULT NULL,
  `phoneNumber` varchar(10) DEFAULT NULL,
  `linkedinUrl` varchar(2083) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

INSERT INTO `comments` (`id`, `content`, `createdAt`, `updatedAt`, `userId`, `postId`) VALUES
(1, 'Cela serait super de pouvoir mettre des \"J\'aime\" sur les commentaires !', '2022-09-02 11:04:39', '2022-09-02 11:05:36', 9, 12),
(2, 'Merci pour cette idée Patrice, nous ajoutons cela à la liste des fonctionnalités à ajouter !', '2022-09-02 11:06:55', '2022-09-02 11:06:55', 1, 12),
(3, 'Une barre de recherche en haut de la page pour trouver des collègues serait vraiment appréciée 🤔', '2022-09-02 11:08:38', '2022-09-02 11:08:38', 21, 12),
(4, 'Merci pour votre idée Juliette.\nLa barre de recherche est prévu vous devriez la retrouver sur le site d\'ici la fin du mois de septembre.', '2022-09-02 11:11:39', '2022-09-02 11:11:39', 1, 12),
(6, 'Pour moi ce sera repos, la semaine a été dur !', '2022-09-02 11:15:59', '2022-09-02 11:15:59', 14, 5),
(7, 'Travaux de rénovation a la maison... On est bienôt sur la fin !', '2022-09-02 11:15:59', '2022-09-02 11:15:59', 19, 5),
(8, 'Randonnée pour ma part ! Dans quel coin fais tu tes sorties VTT ?', '2022-09-02 11:15:59', '2022-09-02 11:15:59', 3, 5),
(9, 'Ah super ! Ce week end c\'est une sortie organisée dans les Alpes je n\'y suis jamais allé encore..', '2022-09-02 11:15:59', '2022-09-02 11:15:59', 9, 5),
(10, 'Week end à la mer, j\'espère qu\'il va faire aussi beau que cette semaine.', '2022-09-02 11:15:59', '2022-09-02 11:15:59', 5, 5),
(11, 'Télétravail sans hésiter !', '2022-09-02 11:34:56', '2022-09-02 11:34:56', 8, 8),
(12, 'Team télétravail :)', '2022-09-02 11:34:56', '2022-09-02 11:34:56', 12, 8),
(13, 'Avec les nouveaux locaux je dirais presque présentiel 🤔', '2022-09-02 11:34:56', '2022-09-02 11:34:56', 16, 8),
(14, 'Les deux ! Ca évite la routine c\'est top !', '2022-09-02 11:34:56', '2022-09-02 11:34:56', 20, 8),
(15, 'Super beau paysage, j\'adore les Pyrénées 😍', '2022-09-02 11:38:18', '2022-09-02 11:38:18', 11, 17),
(16, 'Bienvenue dans la capitale ;)', '2022-09-02 11:39:18', '2022-09-02 11:39:18', 10, 15),
(17, 'C\'est grand je m\'y perds 😂', '2022-09-02 11:41:21', '2022-09-02 11:41:21', 21, 7),
(18, 'Ça me rajoute du temps de trajet c\'est dommage... Mais sinon ce sont des jolis locaux !', '2022-09-02 11:42:36', '2022-09-02 11:42:36', 12, 7);

INSERT INTO `posts` (`id`, `content`, `imagePath`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'Bonjour à toutes et à tous ! 👋\r\nBienvenue sur le nouveau réseau social d\'entreprise réservé aux employés de Groupomania.', NULL, '2022-08-02 07:51:56', '2022-08-02 07:51:56', 1),
(2, 'Retour de vacances, il faut se remettre au boulot maintenant !\r\nSuper idée ce réseau social en tout cas !', NULL, '2022-08-04 09:49:57', '2022-08-04 09:49:57', 10),
(3, 'Magnifique plage sur la côte Ouest des Etats-Unis. \r\nOn a pas pu y accéder malheureusement mais la vue nous a suffit 😍', 'groupomania/post/1662112595591-2', '2022-08-10 09:56:36', '2022-08-10 09:56:36', 4),
(4, 'C\'est vendredi, bientôt le week end bonne journée à tous ! 😁', NULL, '2022-08-10 09:58:11', '2022-08-10 09:58:11', 16),
(5, 'Ce week-end ce sera sortie VTT pour ma part ! \r\nEt vous qu\'avez vous prévu avec ce magnifique temps ? ☀️', NULL, '2022-08-14 09:59:40', '2022-08-14 09:59:40', 9),
(6, 'J\'ai profité de mon jour de congé pour entretenir le jardin ! C\'est pas de tout repos...', 'groupomania/post/1662112913773-2', '2022-08-20 10:01:55', '2022-08-20 10:01:55', 5),
(7, 'J\'adore les nouveau locaux de l\'entreprise, c\'est grand, ça fait tout drôle ! Et maintenant on à la clim, quel bonheur ! \r\nEt vous que pensez-vous des nouveaux locaux ?', NULL, '2022-08-20 10:05:25', '2022-08-20 10:05:25', 20),
(8, 'Petit sondage : Vous préférez le télétravail ou le présentiel ? \r\nC\'est top qu\'on ait le choix 3 jours dans la semaine je trouve !', NULL, '2022-08-21 10:11:54', '2022-08-21 10:11:54', 15),
(9, 'Aujourd\'hui j\'ai visité le data center de Google. C\'est impressionnant !\r\nCe que vous voyez la c\'est juste leur système de refroidissement pour maintenir a bonne température le matériel 😱', 'groupomania/post/1662113701951-2', '2022-08-21 10:15:02', '2022-08-21 10:15:02', 6),
(10, 'Dur dur la fin des vacances... 😢', NULL, '2022-08-22 10:16:11', '2022-08-22 10:16:11', 23),
(11, 'Sympa ce réseau social ! 😁  Il parait que c\'est pour améliorer l\'ambiance au sein de l\'entreprise, super idée je trouve !', NULL, '2022-08-23 10:19:34', '2022-08-23 10:19:34', 7),
(12, 'Bonjour tout le monde !\r\n\r\nSi vous avez des idées pour améliorer ce réseau social d\'entreprise, n\'hésitez pas a les mettre en commentaire de ce post. \r\nNous étudierons toute proposition.\r\n\r\nBonne journée 🙂', NULL, '2022-08-25 10:23:06', '2022-08-25 10:23:06', 1),
(13, 'Nouveau bureau tout neuf et tout propre, prêt pour le télétravail !\r\nMaintenant il faut le maintenir rangé et ne pas l\'encombrer de tasses de café 😅', 'groupomania/post/1662114436543-2', '2022-08-27 10:27:17', '2022-08-27 10:27:17', 8),
(14, 'Je suis ravi d\'avoir travaillé sur la création de ce réseau social.\r\nContent de voir que cela vous plait 😁', NULL, '2022-08-27 10:38:17', '2022-08-27 10:38:17', 2),
(15, 'Ça y est j\'ai déménagé sur Paris, fini les 2h de transports pour venir travailler..\r\nEt la vue ne me déplait pas 😅', 'groupomania/post/1662115208483-2', '2022-08-29 10:40:09', '2022-08-29 10:40:09', 13),
(16, 'Lundi c\'est la rentrée, je suis content de revoir toute l\'équipe :)', NULL, '2022-09-01 10:42:53', '2022-09-01 10:42:53', 12),
(17, 'Petite randonnée dans les Pyrénées avant de rentrer sur Paris.', 'groupomania/post/1662115779025-2', '2022-09-02 10:49:40', '2022-09-02 12:02:19', 3);

INSERT INTO `user_like_post` (`userId`, `postId`, `createdAt`, `updatedAt`) VALUES
(1, 14, '2022-09-02 11:15:01', '2022-09-02 11:15:01'),
(2, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(2, 5, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(2, 6, '2022-09-02 11:15:33', '2022-09-02 11:15:33'),
(2, 9, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(2, 10, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(2, 11, '2022-09-02 11:15:22', '2022-09-02 11:15:22'),
(2, 13, '2022-09-02 11:34:16', '2022-09-02 11:34:16'),
(3, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(3, 6, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(3, 8, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(3, 9, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(3, 11, '2022-09-02 11:15:22', '2022-09-02 11:15:22'),
(3, 12, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(3, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(4, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(4, 5, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(4, 6, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(4, 8, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(4, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(5, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(5, 2, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(5, 3, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(5, 4, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(5, 5, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(5, 6, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(5, 7, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(5, 8, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(5, 9, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(5, 10, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(5, 11, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(5, 12, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(5, 13, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(5, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(5, 15, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(5, 16, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(6, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(6, 5, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(6, 7, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(6, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(6, 15, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(7, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(7, 3, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(7, 6, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(7, 8, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(7, 9, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(7, 10, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(7, 13, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(7, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(8, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(8, 2, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(8, 3, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(8, 4, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(8, 7, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(8, 8, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(8, 9, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(8, 10, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(8, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(9, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(9, 3, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(9, 9, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(9, 12, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(9, 13, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(9, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(10, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(10, 2, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(10, 4, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(10, 5, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(10, 7, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(10, 11, '2022-09-02 11:15:22', '2022-09-02 11:15:22'),
(10, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(11, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(11, 5, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(11, 8, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(11, 9, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(11, 13, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(11, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(11, 16, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(11, 17, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(12, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(12, 3, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(12, 6, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(12, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(12, 15, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(13, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(13, 7, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(13, 8, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(13, 9, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(13, 10, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(13, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(14, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(14, 2, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(14, 4, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(14, 7, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(14, 11, '2022-09-02 11:15:22', '2022-09-02 11:15:22'),
(14, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(14, 16, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(14, 17, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(15, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(15, 3, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(15, 8, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(15, 12, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(15, 13, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(15, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(16, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(16, 2, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(16, 5, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(16, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(17, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(17, 7, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(17, 8, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(17, 12, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(17, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(17, 15, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(18, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(18, 6, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(18, 10, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(18, 13, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(18, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(19, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(19, 5, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(19, 6, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(19, 11, '2022-09-02 11:15:22', '2022-09-02 11:15:22'),
(19, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(20, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(20, 2, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(20, 3, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(20, 5, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(20, 6, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(20, 11, '2022-09-02 11:15:22', '2022-09-02 11:15:22'),
(21, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(21, 4, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(21, 7, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(21, 8, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(22, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(22, 2, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(22, 3, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(22, 6, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(22, 11, '2022-09-02 11:15:22', '2022-09-02 11:15:22'),
(22, 13, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(22, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(23, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(23, 4, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(23, 5, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(23, 7, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(23, 9, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(23, 14, '2022-09-02 11:11:56', '2022-09-02 11:11:56'),
(23, 15, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(24, 1, '2022-09-02 10:06:20', '2022-09-02 10:06:20'),
(24, 8, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(24, 9, '2022-09-02 11:15:17', '2022-09-02 11:15:17'),
(24, 10, '2022-09-02 11:15:17', '2022-09-02 11:15:17');

INSERT INTO `users` (`id`, `email`, `password`, `lastname`, `firstname`, `profilePicPath`, `coverPicPath`, `profession`, `birthDate`, `city`, `phoneNumber`, `linkedinUrl`, `bio`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@groupomania.fr', '$argon2id$v=19$m=17408,t=3,p=1$nvso4JBkRO9c/65x079s4g$hqlJCfKlSmOM6GAatvj+JtR+rci/W9NIO5k+ZIcuhHw', 'Groupomania', 'Administrateur', 'groupomania/profile/1661946780019-1', NULL, 'Administrateur du site', NULL, NULL, NULL, NULL, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra ipsum nunc aliquet bibendum. Aliquam nulla facilisi cras fermentum. Etiam dignissim diam quis enim lobortis scelerisque. Risus commodo viverra maecenas accumsan lacus.', 1, '2022-06-30 22:20:56', '2022-08-31 11:53:31'),
(2, 'bastien@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$anBhW/Y/davUeW3gtFp/Mw$AABBq4glKEbXo0zySqDFnUlWndc/VLdK9SKkbRKUlBc', 'Pruvost', 'Bastien', 'groupomania/profile/1661945337469-2', 'groupomania/cover/1661945336745-2', 'Développeur Web', '2000-07-08', 'Toulouse', '0612345678', 'https://www.linkedin.com/in/bastien-pruvost-dev/', 'Développeur Web Junior en formation.', 0, '2022-06-30 22:26:59', '2022-08-31 14:30:39'),
(3, 'linette.pouchard@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$7rzT+iPxDRWu0XRmY3FeJA$Toz8V1yhLqzFmz/k5ZDDag/hc1B98PNu/iXq7Cnha0w', 'Pouchard', 'Linette', 'groupomania/profile/1661948572549-1', 'groupomania/cover/1661948975192-1', 'Ingénieur DevOps', '2000-09-12', 'Aubervilliers', NULL, 'https://www.linkedin.com/', 'Passionnée de rando et de photos. Je suis DevOps chez Groupomania depuis 4 ans.', 0, '2022-06-30 22:28:02', '2022-08-31 12:29:36'),
(4, 'marie.dubeau@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$iabf+HMFhCh3VonMctKVKg$G2R6KVHO01drJ9Dl/N8Js3epGURG6IX/cohzkbvx6OA', 'Dubeau', 'Marie', 'groupomania/profile/1661948580979-1', 'groupomania/cover/1661949066793-1', 'UI / UX Designer', NULL, 'Paris', '0612345678', 'https://www.linkedin.com/', NULL, 0, '2022-06-30 22:30:13', '2022-08-31 12:31:07'),
(5, 'julie.monrency@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$XzNiaWUuFCmh57saSa8lGQ$20+cGE2RcJurRQZclcsVn4L8CEzag5GbP3rukHiLcfA', 'Monrency', 'Julie', 'groupomania/profile/1661948591022-1', 'groupomania/cover/1661949121539-1', 'Business analyst', '2000-05-02', 'Yerres', NULL, NULL, NULL, 0, '2022-06-30 22:31:03', '2022-08-31 12:32:02'),
(6, 'christophe.rancourt@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$AKZUqCVMX7ZwuLkS+0A2dQ$foLsgUYM4BgE5tVpbAWODL1v8XL+QFyKWqlo6rwGF9I', 'Rancourt', 'Christophe', 'groupomania/profile/1661948603254-1', 'groupomania/cover/1661949315947-1', 'Développeur Web Frontend', '2000-12-09', 'Paris', NULL, 'https://www.linkedin.com/', 'Je suis passionné par le développement web et l\'informatique en général.', 0, '2022-06-30 22:31:57', '2022-08-31 12:35:16'),
(7, 'remy.millard@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$gzQmxgEZd+IUejuLyQ2ong$PCv6Vxb5XVQ9pmXFwav6CdpOtoSpURVnifalaIo19Kg', 'Millard', 'Rémy', 'groupomania/profile/1661948613631-1', 'groupomania/cover/1661949403410-1', 'Lead Développeur', NULL, 'Saint-Denis', NULL, 'https://www.linkedin.com/', 'J\'adore voyager. Et je suis Papa depuis quelques mois 😁', 0, '2022-06-30 22:33:26', '2022-08-31 12:37:52'),
(8, 'roger.sirois@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$21X6v9JUCH+/WhV1VWnxBQ$tWq5puZZBT1w+bBpByPmEIIFb4PyxWrv4EMdW1EslFk', 'Sirois', 'Roger', 'groupomania/profile/1661948622688-1', 'groupomania/cover/1661949554633-1', 'Agent administratif', '2000-03-25', 'Saint-Germain-en-Laye', '0612345678', '', NULL, 0, '2022-06-30 22:34:44', '2022-08-31 12:39:15'),
(9, 'patrice.bourdette@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$3ekhfgRyosLTIDzFAdp+2Q$LxdhyuGF6HLTTsu6pM93h3dooGP1X10wI40H/NEEk7Q', 'Bourdette', 'Patrice', 'groupomania/profile/1661948634263-1', 'groupomania/cover/1661949609001-1', 'Ingénieur Data', NULL, NULL, NULL, 'https://www.linkedin.com/', NULL, 0, '2022-06-30 22:35:31', '2022-08-31 12:40:10'),
(10, 'elodie.vaillancourt@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$27i1Gk5sbDKDyg5s8vnnhw$5xiTFVcByiH3FoAV2Go6l9zYdCc5sf6SJ1xOpljMCnc', 'Vaillancourt', 'Élodie', 'groupomania/profile/1661948643770-1', 'groupomania/cover/1661949801443-1', 'Développeuse Web Frontend', NULL, 'Paris', NULL, '', '', 0, '2022-06-30 22:36:13', '2022-08-31 12:43:22'),
(11, 'brice.turcotte@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$WpJGhkO3WnqzLZnjAUEtPw$BXC9TtZH2DwoSwgKYucBOi8fp6DuvECv6R9Gj3T3Zrk', 'Turcotte', 'Brice', 'groupomania/profile/1661948652752-1', NULL, 'Ingénieur logiciel', NULL, 'Gif-sur-Yvette', NULL, 'https://www.linkedin.com/', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra et ultrices neque ornare aenean.', 0, '2022-06-30 22:36:42', '2022-08-31 12:43:56'),
(12, 'yves.rossignol@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$RFppwpYWz/moaLY0HVUbKw$cyTguGCb6bASB1FZJk3CG/fz5jOgjeZnJU1+xhPAwFQ', 'Rossignol', 'Yves', 'groupomania/profile/1661948662877-1', 'groupomania/cover/1661949853561-1', 'UX Designer', NULL, 'Montigny', '0612345678', NULL, NULL, 0, '2022-06-30 22:37:19', '2022-09-02 12:02:41'),
(13, 'audrey.melville@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$Fskehvv13ziH8AKr0ojvmQ$zK8K83YOp0l1t5YWx4JZBGIl84wKYfaLB7im3LTkdeE', 'Melville', 'Audrey', 'groupomania/profile/1661948672188-1', 'groupomania/cover/1661949902653-1', 'Community Manager', '2000-06-13', 'Paris', NULL, 'https://www.linkedin.com/', NULL, 0, '2022-06-30 22:37:56', '2022-08-31 12:45:03'),
(14, 'eric.allard@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$1I0VRYh28SgG+qfol75THQ$CGl38W5UDe34czIruvNhzzCLJ3Iq5NYvxl31eQlLP94', 'Allard', 'Eric', 'groupomania/profile/1661948684956-1', 'groupomania/cover/1661949919830-1', 'Chef de projet', NULL, 'Vitry-sur-Seine', '0612345678', 'https://www.linkedin.com/', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra ipsum nunc aliquet bibendum. Aliquam nulla facilisi cras fermentum. Etiam dignissim diam quis enim lobortis scelerisque. Risus commodo viverra maecenas accumsan lacus vel.', 0, '2022-06-30 22:38:47', '2022-08-31 12:45:20'),
(15, 'christian.gaillard@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$AicRNoPzYU2tB0IjxfP4Bg$YoqPClk5YQahgwiyUyIDjuWUJBlR0lZUkgetgl8Pf/4', 'Delmas', 'Christian', 'groupomania/profile/1661948693800-1', 'groupomania/cover/1661949951647-1', 'Data scientist', NULL, 'Versailles', NULL, 'https://www.linkedin.com/', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra et ultrices neque ornare aenean. Sed viverra ipsum nunc aliquet bibendum enim. Ac ut consequat semper viverra nam libero. Sit amet dictum sit amet. A condimentum vitae sapien pellentesque habitant morbi. Ornare suspendisse sed nisi lacus sed viverra tellus in hac. Viverra accumsan in nisl nisi scelerisque eu. Lacinia quis vel eros donec ac odio tempor orci. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Sed sed risus pretium quam. Viverra mauris in aliquam sem fringilla ut. Mi ipsum faucibus vitae aliquet. Malesuada pellentesque elit eget gravida cum sociis natoque. Eu sem integer vitae justo eget magna fermentum. Nulla facilisi morbi tempus iaculis urna id. Mauris rhoncus aenean vel elit scelerisque.', 0, '2022-06-30 22:39:55', '2022-08-31 12:45:52'),
(16, 'mathilde.voleta@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$3f2Z1zyptkin3tmmC88s1Q$50ByjE2A9TUziHlZ6OYsenE0YKa9kENe0XUdR9jztq8', 'Voleta', 'Mathilde', 'groupomania/profile/1661948705552-1', 'groupomania/cover/1661949974077-1', 'Assistante de direction', NULL, 'Saint-Ouen', NULL, '', '', 0, '2022-06-30 22:40:30', '2022-08-31 12:46:15'),
(17, 'laurent.gosselin@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$7kDBkqCI2zQcSlMik3FF7A$UpvDg/s4eV+WrZLckEXMbThI+EbavcuLTg6lBUJhOmU', 'Gosselin', 'Laurent', 'groupomania/profile/1661948717958-1', 'groupomania/cover/1661950009944-1', 'Développeur Web Backend', '2000-07-30', 'Paris', '0612345678', 'https://www.linkedin.com/', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra et ultrices neque ornare aenean. Sed viverra ipsum nunc aliquet bibendum enim. Ac ut consequat semper viverra nam libero. Sit amet dictum sit amet. A condimentum vitae sapien pellentesque habitant morbi. Ornare suspendisse sed nisi lacus sed viverra tellus in hac. Viverra accumsan in nisl nisi scelerisque eu. Lacinia quis vel eros donec ac odio tempor orci. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Sed sed risus pretium quam. Viverra mauris in aliquam sem fringilla ut. Mi ipsum faucibus vitae aliquet. Malesuada pellentesque elit eget gravida cum sociis natoque. Eu sem integer vitae justo eget magna fermentum. Nulla facilisi morbi tempus iaculis urna id.', 0, '2022-06-30 22:41:06', '2022-08-31 12:46:51'),
(18, 'daniel.chapin@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$QgUMzZsX/u/U1kAUwafU2g$SqmbJJHpIpUohCo17ok+s+pkQaQgjkGqdJrKgyFFsJs', 'Chapin', 'Daniel', 'groupomania/profile/1661948728494-1', 'groupomania/cover/1661950028918-1', 'Technicien informatique', NULL, 'Saint-Denis', NULL, 'https://www.linkedin.com/', 'Je suis passionnée de VTT en montagne !', 0, '2022-06-30 22:41:55', '2022-08-31 12:47:09'),
(19, 'anais.guerin@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$GIdD1YxJsaM4BueFpgvGCQ$h+ZdB6THEOhy/DnbxZ0uDfHbI4mGinzPF3O8ygK1fxU', 'Guerin', 'Anaïs', 'groupomania/profile/1661948740548-1', 'groupomania/cover/1661950044037-1', 'Comptable', NULL, 'Créteil', NULL, '', NULL, 0, '2022-06-30 22:42:28', '2022-08-31 12:47:25'),
(20, 'john.dufour@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$D/aFh17BAoBokCoaF5iBOA$gHQkGiIhHxrRtb2SxqEmoD+K1nzLqAEpBdCtODtARgs', 'Dufour', 'John', 'groupomania/profile/1661948752980-1', 'groupomania/cover/1661950069517-1', 'Ingénieur en Cybersécurité', NULL, 'Paris', NULL, 'https://www.linkedin.com/', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam id leo in vitae turpis massa sed. Neque viverra justo nec ultrices dui. Lacus vestibulum sed arcu non odio. Nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis. Ut etiam sit amet nisl purus in. Aliquam nulla facilisi cras fermentum odio eu feugiat. Interdum consectetur libero id faucibus nisl tincidunt eget nullam non. Sed adipiscing diam donec adipiscing tristique risus nec feugiat.', 0, '2022-06-30 22:44:19', '2022-08-31 12:47:50'),
(21, 'juliette.durand@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$ybxYQBfthT870SQX8TC98g$CTEIVyCcORYrEFEo7tZGwE+KZHgIMNNIx3J5A3TC1IQ', 'Durand', 'Juliette', 'groupomania/profile/1661948770132-1', 'groupomania/cover/1661950089843-1', 'UI Designer', NULL, 'Ivry', '0612345678', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra et ultrices neque ornare aenean. Sed viverra ipsum nunc aliquet bibendum enim. Ac ut consequat semper viverra nam libero. Sit amet dictum sit amet. A condimentum vitae sapien pellentesque habitant morbi. Ornare suspendisse sed nisi lacus sed viverra tellus in hac. Viverra accumsan in nisl nisi scelerisque eu. Lacinia quis vel eros donec ac odio tempor orci. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Sed sed risus pretium quam. Viverra mauris in aliquam sem fringilla ut. Mi ipsum faucibus vitae aliquet. Malesuada pellentesque elit eget gravida cum sociis natoque. Eu sem integer vitae justo eget magna fermentum. Nulla facilisi morbi tempus iaculis urna id. Mauris rhoncus aenean vel elit scelerisque. Mus mauris vitae ultricies leo integer malesuada nunc vel risus.', 0, '2022-06-30 22:45:19', '2022-08-31 12:48:10'),
(22, 'william.johnson@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$DmIW9u/wMI9FM6LSXjDnEw$H+7H6MhGmJYLnMInytoaFuLFxzwu8OBJ+UYEl9M/syg', 'Johnson', 'William', 'groupomania/profile/1661948784125-1', 'groupomania/cover/1661950112796-1', 'Data analyst', NULL, 'Gif-sur-Yvette', NULL, 'https://www.linkedin.com/', '', 0, '2022-06-30 22:46:44', '2022-08-31 12:48:33'),
(23, 'andrea.dario@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$PJrYp4lKtmBWG1Isopp7AQ$Eb8aTd6Q8eXR+zY7HObJ9IARA2WE/NzU0kIseomAc1s', 'Dario', 'Andréa', 'groupomania/profile/1661948799513-1', 'groupomania/cover/1661950134566-1', 'Manager', NULL, 'Paris', '0612345678', 'https://www.linkedin.com/', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra et ultrices neque ornare aenean. Sed viverra ipsum nunc aliquet bibendum enim. Ac ut consequat semper viverra nam libero. Sit amet dictum sit amet. A condimentum vitae sapien pellentesque habitant morbi. Ornare suspendisse sed nisi lacus sed viverra tellus in hac. Viverra accumsan in nisl nisi scelerisque eu. Lacinia quis vel eros donec ac odio tempor orci. Ridiculus mus mauris vitae ultricies leo integer.', 0, '2022-06-30 22:48:16', '2022-08-31 12:48:55'),
(24, 'sophia.krylova@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$O5n6lOrvh92sa6d//6Etnw$0Hh9C7ftFn6cAVRaW6hvgNB1JoR9Mp0zudG5ZuNFG1Y', 'Krylova', 'Sophia', 'groupomania/profile/1661948810647-1', 'groupomania/cover/1661950154993-1', 'Assistante de gestion', NULL, 'Mantes-la-Jolie', NULL, 'https://www.linkedin.com/', '', 0, '2022-06-30 22:49:43', '2022-08-31 12:49:15');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;