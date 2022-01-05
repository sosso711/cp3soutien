/* Enoncé BDD

Nbre table : 2 

CATEGORIE
id
title

POST 
id
author 
title
link_image
content
categorie_id


*/

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
    `id` int AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS `post`;
CREATE TABLE `post`(
    `id` int AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `category_id` int NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (category_id) REFERENCES category(id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

