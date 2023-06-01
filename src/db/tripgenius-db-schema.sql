CREATE TABLE `category_resto`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name_category` VARCHAR(255) NOT NULL,
    `min_price` VARCHAR(255) NOT NULL,
    `max_price` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
CREATE TABLE restaurant(
    `id` INT NOT NULL AUTO_INCREMENT,
    `resto_name` VARCHAR(255) NOT NULL,
    `category` INT NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `latitude` VARCHAR(255) NOT NULL,
    `longtitude` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT resto_cat_fk FOREIGN KEY(category) REFERENCES category_resto(id)
);
CREATE TABLE `hotel_category`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
CREATE TABLE `hotel_price`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `min_price` VARCHAR(255) NOT NULL,
    `max_price` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
CREATE TABLE `hotel`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `hotel_name` VARCHAR(255) NOT NULL,
    `hotel_star` INT NOT NULL,
    `hotel_category` INT NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT hotel_cat_fk FOREIGN KEY(hotel_category) REFERENCES hotel_category(id),
    CONSTRAINT hotel_star_fk FOREIGN KEY(hotel_star) REFERENCES hotel_price(id)
);
CREATE TABLE `profileCheck`(
    `id` INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(`id`)
);
CREATE TABLE `user`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NULL,
    `home_town` VARCHAR(255) NULL,
    `age` INT NULL,
    `gender` ENUM('male', 'female') NULL,
    `location` VARCHAR(255) NULL,
    `profileCheck` INT NULL,
    `profile-picture` VARCHAR(255) NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT profileCheck_fk FOREIGN KEY(profileCheck) REFERENCES profileCheck(id)
);
ALTER TABLE `user`
ADD UNIQUE `user_username_unique`(`username`);
ALTER TABLE `user`
ADD UNIQUE `user_email_unique`(`email`);
ALTER TABLE `user`
ADD UNIQUE `user_phone_unique`(`phone`);
CREATE TABLE `transportation`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
CREATE TABLE `tempat_wisata`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `place_name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `category` INT NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `price` VARCHAR(255) NOT NULL,
    `latitude` VARCHAR(255) NOT NULL,
    `longtitude` VARCHAR(255) NOT NULL,
    `coordinate` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
CREATE TABLE `list`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `wisata_fk` INT,
    `hotel_fk` INT,
    `transportation_fk` INT,
    `uid_fk` INT,
    `restaurant_fk` INT,
    `status` ENUM("true", "false") NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT wisata_fk_fk FOREIGN KEY(wisata_fk) REFERENCES tempat_wisata(id),
    CONSTRAINT hotel_fk_fk FOREIGN KEY(hotel_fk) REFERENCES hotel(id),
    CONSTRAINT user_id_fk FOREIGN KEY (uid_fk) REFERENCES user(id),
    CONSTRAINT tranport_fk FOREIGN KEY(transportation_fk) REFERENCES transportation(id),
    CONSTRAINT resto_fk FOREIGN KEY(restaurant_fk) REFERENCES restaurant(id)
);