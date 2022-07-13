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
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

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
  `profilePicPath` varchar(2083) NOT NULL DEFAULT 'groupomania/profile/default-profile-pic.jpg',
  `coverPicPath` varchar(2083) NOT NULL DEFAULT 'groupomania/profile/default-cover-pic.jpg',
  `profession` varchar(150) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `city` varchar(150) DEFAULT NULL,
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
(1, 'Premier commentaire', '2022-07-13 07:45:11', '2022-07-13 07:45:11', 12, 21);
INSERT INTO `comments` (`id`, `content`, `createdAt`, `updatedAt`, `userId`, `postId`) VALUES
(2, '2eme commentaire', '2022-07-13 07:45:12', '2022-07-13 07:45:12', 14, 21);
INSERT INTO `comments` (`id`, `content`, `createdAt`, `updatedAt`, `userId`, `postId`) VALUES
(3, '3eme commentaire', '2022-07-13 07:45:20', '2022-07-13 07:45:20', 18, 21);
INSERT INTO `comments` (`id`, `content`, `createdAt`, `updatedAt`, `userId`, `postId`) VALUES
(4, '4eme commentaire', '2022-07-13 07:45:30', '2022-07-13 07:45:30', 4, 21),
(5, '5eme commentaire', '2022-07-13 07:45:40', '2022-07-13 07:45:40', 21, 22),
(6, '6eme commentaire', '2022-07-13 07:46:11', '2022-07-13 07:46:11', 7, 22);

INSERT INTO `posts` (`id`, `content`, `imagePath`, `createdAt`, `updatedAt`, `userId`) VALUES
(21, 'Post pour les commentaires 😀', NULL, '2022-07-13 07:41:45', '2022-07-13 07:41:45', 2);
INSERT INTO `posts` (`id`, `content`, `imagePath`, `createdAt`, `updatedAt`, `userId`) VALUES
(22, 'Deuxième post pour les commentaires 🤨', NULL, '2022-07-13 07:43:11', '2022-07-13 07:43:11', 2);
INSERT INTO `posts` (`id`, `content`, `imagePath`, `createdAt`, `updatedAt`, `userId`) VALUES
(24, 'test', NULL, '2022-07-13 10:07:59', '2022-07-13 10:07:59', 2);





INSERT INTO `users` (`id`, `email`, `password`, `lastname`, `firstname`, `profilePicPath`, `coverPicPath`, `profession`, `birthDate`, `city`, `phoneNumber`, `linkedinUrl`, `bio`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@groupomania.fr', '$argon2id$v=19$m=17408,t=3,p=1$nvso4JBkRO9c/65x079s4g$hqlJCfKlSmOM6GAatvj+JtR+rci/W9NIO5k+ZIcuhHw', 'Administration', 'Groupomania', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 1, '2022-06-30 22:20:56', '2022-06-30 22:20:56');
INSERT INTO `users` (`id`, `email`, `password`, `lastname`, `firstname`, `profilePicPath`, `coverPicPath`, `profession`, `birthDate`, `city`, `phoneNumber`, `linkedinUrl`, `bio`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(2, 'bastien@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$anBhW/Y/davUeW3gtFp/Mw$AABBq4glKEbXo0zySqDFnUlWndc/VLdK9SKkbRKUlBc', 'Pruvost', 'Bastien', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:26:59', '2022-06-30 22:26:59');
INSERT INTO `users` (`id`, `email`, `password`, `lastname`, `firstname`, `profilePicPath`, `coverPicPath`, `profession`, `birthDate`, `city`, `phoneNumber`, `linkedinUrl`, `bio`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(3, 'linette.pouchard@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$7rzT+iPxDRWu0XRmY3FeJA$Toz8V1yhLqzFmz/k5ZDDag/hc1B98PNu/iXq7Cnha0w', 'Pouchard', 'Linette', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:28:02', '2022-06-30 22:28:02');
INSERT INTO `users` (`id`, `email`, `password`, `lastname`, `firstname`, `profilePicPath`, `coverPicPath`, `profession`, `birthDate`, `city`, `phoneNumber`, `linkedinUrl`, `bio`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(4, 'marie.dubeau@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$iabf+HMFhCh3VonMctKVKg$G2R6KVHO01drJ9Dl/N8Js3epGURG6IX/cohzkbvx6OA', 'Dubeau', 'Marie', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:30:13', '2022-06-30 22:30:13'),
(5, 'julie.monrency@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$XzNiaWUuFCmh57saSa8lGQ$20+cGE2RcJurRQZclcsVn4L8CEzag5GbP3rukHiLcfA', 'Monrency', 'Julie', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:31:03', '2022-06-30 22:31:03'),
(6, 'christophe.rancourt@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$AKZUqCVMX7ZwuLkS+0A2dQ$foLsgUYM4BgE5tVpbAWODL1v8XL+QFyKWqlo6rwGF9I', 'Rancourt', 'Christophe', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:31:57', '2022-06-30 22:31:57'),
(7, 'remy.millard@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$gzQmxgEZd+IUejuLyQ2ong$PCv6Vxb5XVQ9pmXFwav6CdpOtoSpURVnifalaIo19Kg', 'Millard', 'Rémy', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:33:26', '2022-06-30 22:33:26'),
(8, 'roger.sirois@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$21X6v9JUCH+/WhV1VWnxBQ$tWq5puZZBT1w+bBpByPmEIIFb4PyxWrv4EMdW1EslFk', 'Sirois', 'Roger', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:34:44', '2022-06-30 22:34:44'),
(9, 'patrice.bourdette@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$3ekhfgRyosLTIDzFAdp+2Q$LxdhyuGF6HLTTsu6pM93h3dooGP1X10wI40H/NEEk7Q', 'Bourdette', 'Patrice', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:35:31', '2022-06-30 22:35:31'),
(10, 'elodie.vaillancourt@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$27i1Gk5sbDKDyg5s8vnnhw$5xiTFVcByiH3FoAV2Go6l9zYdCc5sf6SJ1xOpljMCnc', 'Vaillancourt', 'Élodie', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:36:13', '2022-06-30 22:36:13'),
(11, 'brice.turcotte@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$WpJGhkO3WnqzLZnjAUEtPw$BXC9TtZH2DwoSwgKYucBOi8fp6DuvECv6R9Gj3T3Zrk', 'Turcotte', 'Brice', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:36:42', '2022-06-30 22:36:42'),
(12, 'yves.rossignol@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$RFppwpYWz/moaLY0HVUbKw$cyTguGCb6bASB1FZJk3CG/fz5jOgjeZnJU1+xhPAwFQ', 'Rossignol', 'Yves', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:37:19', '2022-06-30 22:37:19'),
(13, 'audrey.melville@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$Fskehvv13ziH8AKr0ojvmQ$zK8K83YOp0l1t5YWx4JZBGIl84wKYfaLB7im3LTkdeE', 'Melville', 'Audrey', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:37:56', '2022-06-30 22:37:56'),
(14, 'eric.allard@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$1I0VRYh28SgG+qfol75THQ$CGl38W5UDe34czIruvNhzzCLJ3Iq5NYvxl31eQlLP94', 'Allard', 'Eric', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:38:47', '2022-06-30 22:38:47'),
(15, 'christian.gaillard@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$AicRNoPzYU2tB0IjxfP4Bg$YoqPClk5YQahgwiyUyIDjuWUJBlR0lZUkgetgl8Pf/4', 'Gaillard', 'Christian', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:39:55', '2022-06-30 22:39:55'),
(16, 'mathilde.voleta@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$3f2Z1zyptkin3tmmC88s1Q$50ByjE2A9TUziHlZ6OYsenE0YKa9kENe0XUdR9jztq8', 'Voleta', 'Mathilde', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:40:30', '2022-06-30 22:40:30'),
(17, 'laurent.gosselin@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$7kDBkqCI2zQcSlMik3FF7A$UpvDg/s4eV+WrZLckEXMbThI+EbavcuLTg6lBUJhOmU', 'Gosselin', 'Laurent', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:41:06', '2022-06-30 22:41:06'),
(18, 'daniel.chapin@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$QgUMzZsX/u/U1kAUwafU2g$SqmbJJHpIpUohCo17ok+s+pkQaQgjkGqdJrKgyFFsJs', 'Chapin', 'Daniel', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:41:55', '2022-06-30 22:41:55'),
(19, 'anais.guerin@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$GIdD1YxJsaM4BueFpgvGCQ$h+ZdB6THEOhy/DnbxZ0uDfHbI4mGinzPF3O8ygK1fxU', 'Guerin', 'Anaïs', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:42:28', '2022-06-30 22:42:28'),
(20, 'john.dufour@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$D/aFh17BAoBokCoaF5iBOA$gHQkGiIhHxrRtb2SxqEmoD+K1nzLqAEpBdCtODtARgs', 'Dufour', 'John', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:44:19', '2022-06-30 22:44:19'),
(21, 'juliette.durand@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$ybxYQBfthT870SQX8TC98g$CTEIVyCcORYrEFEo7tZGwE+KZHgIMNNIx3J5A3TC1IQ', 'Durand', 'Juliette', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:45:19', '2022-06-30 22:45:19'),
(22, 'william.johnson@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$DmIW9u/wMI9FM6LSXjDnEw$H+7H6MhGmJYLnMInytoaFuLFxzwu8OBJ+UYEl9M/syg', 'Johnson', 'William', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:46:44', '2022-06-30 22:46:44'),
(23, 'andrea.dario@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$PJrYp4lKtmBWG1Isopp7AQ$Eb8aTd6Q8eXR+zY7HObJ9IARA2WE/NzU0kIseomAc1s', 'Dario', 'Andréa', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:48:16', '2022-06-30 22:48:16'),
(24, 'sophia.krylova@email.fr', '$argon2id$v=19$m=17408,t=3,p=1$O5n6lOrvh92sa6d//6Etnw$0Hh9C7ftFn6cAVRaW6hvgNB1JoR9Mp0zudG5ZuNFG1Y', 'Krylova', 'Sophia', 'groupomania/profile/default-profile-pic.jpg', 'groupomania/profile/default-cover-pic.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-06-30 22:49:43', '2022-06-30 22:49:43');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;