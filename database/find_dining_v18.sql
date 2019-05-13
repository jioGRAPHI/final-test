DROP DATABASE IF EXISTS `find_dining`;

CREATE Database `find_dining`;
USE `find_dining`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(50) NOT NULL,
  `firstname` varchar(30) DEFAULT 'First Name',
  `lastname` varchar(30) DEFAULT 'Last Name',
  `contactno` varchar(20) DEFAULT NULL,
  `user_type` int(1) DEFAULT 0,
  `is_deleted` int(1) DEFAULT 0,
  PRIMARY KEY (`user_id`)
);

DROP TABLE IF EXISTS `restaurant`;
CREATE TABLE `restaurant` (
  `restaurant_id` int(10) NOT NULL AUTO_INCREMENT,
  `restaurant_name` varchar(30) NOT NULL,
  `restaurant_rating` float(3,2) DEFAULT 0.0,
  `restaurant_likes` int DEFAULT 0,
  `restaurant_cuisine` varchar(20) DEFAULT 'Others',
  `restaurant_type` varchar(20) DEFAULT 'Others',
  `restaurant_price` varchar(1) DEFAULT 1,
  `restaurant_openingtime` time DEFAULT '9:00:00',
  `restaurant_closingtime` time DEFAULT '9:00:00',
  `restaurant_days` varchar(10) DEFAULT NULL,
  `restaurant_address` varchar(75) DEFAULT NULL,
  `latitude` float DEFAULT 0.0,
  `longitude` float  DEFAULT 0.0,
  `added_by` int(10) NOT NULL,
  `updated_by` int(10) NOT NULL,
  `is_deleted` int(1) DEFAULT 0,
  CONSTRAINT `fk_resto_added_by_user` FOREIGN KEY (added_by)
  REFERENCES user(user_id),
  CONSTRAINT `fk_resto_updated_by_user` FOREIGN KEY (updated_by)
  REFERENCES user(user_id),
  PRIMARY KEY (`restaurant_id`)
);

DROP TABLE IF EXISTS `report`;
CREATE TABLE `report` (
  `report_id` int(10) NOT NULL AUTO_INCREMENT,
  `report_details` varchar(200) DEFAULT NULL,
  `report_category` varchar(50) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `reported_by` int(10) NOT NULL,
  `restaurant_id` int(10) NOT NULL,
  `resolved_by` int(10) DEFAULT NULL,
  `is_resolved` int(1) DEFAULT 0,
  PRIMARY KEY (`report_id`),
  CONSTRAINT `fk_reported_by` FOREIGN KEY (reported_by)
  REFERENCES user(user_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT `fk_resolved_by` FOREIGN KEY (resolved_by)
  REFERENCES user(user_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT `fk_restaurant_id6` FOREIGN KEY (restaurant_id)
  REFERENCES restaurant(restaurant_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `comment_id` int(10) NOT NULL AUTO_INCREMENT,
  `content` varchar(250) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(10) NOT NULL,
  `restaurant_id` int(10) NOT NULL,
  PRIMARY KEY (`comment_id`),
  CONSTRAINT `fk_commented_by` FOREIGN KEY (user_id)
  REFERENCES user(user_id),
  CONSTRAINT `fk_commented_for` FOREIGN KEY (restaurant_id)
  REFERENCES restaurant(restaurant_id)
);

DROP TABLE IF EXISTS `photocomment`;
CREATE TABLE `photocomment` (
  `photocomment_id` int(10) NOT NULL AUTO_INCREMENT,
  `photo_path` varchar(100) DEFAULT NULL,
  `is_deleted` int(1) DEFAULT 0,
  `user_id` int (10),
  `restaurant_id` int(10),
  `comment_id` int(10),
  CONSTRAINT `pk_photocomment_id` PRIMARY KEY (photocomment_id),
  CONSTRAINT `fk_user_id2`  FOREIGN KEY (user_id)
  REFERENCES user(user_id),
  CONSTRAINT `fk_restaurant_id2` FOREIGN KEY (restaurant_id)
  REFERENCES restaurant(restaurant_id),
  CONSTRAINT `fk_comment_id` FOREIGN KEY (comment_id)
  REFERENCES comment(comment_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `photorestaurant`;
CREATE TABLE `photorestaurant` (
  `photorestaurant_id` int(10) NOT NULL AUTO_INCREMENT,
  `photo_path` varchar(100) DEFAULT NULL,
  `is_deleted` int(1) DEFAULT 0,
  `user_id` int(10),
  `restaurant_id` int(10),
  CONSTRAINT `pk_photorestaurant_id` PRIMARY KEY (photorestaurant_id),
  CONSTRAINT `fk_user_id3`  FOREIGN KEY (user_id)
  REFERENCES user(user_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT `fk_restaurant_id3` FOREIGN KEY (restaurant_id)
  REFERENCES restaurant(restaurant_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `userphoto`;
CREATE TABLE `photouser` (
  `userphoto_id` int(10) NOT NULL AUTO_INCREMENT,
  `photo_path` varchar(100) DEFAULT NULL,
  `is_deleted` int(1) DEFAULT 0,
  `user_id` int(10),
  CONSTRAINT `pk_userphoto_id` PRIMARY KEY (userphoto_id),
  CONSTRAINT `fk_user_id6`  FOREIGN KEY (user_id)
  REFERENCES user(user_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes` (
  `like_id` int(5) NOT NULL AUTO_INCREMENT,
  `user_id` int(10),
  `restaurant_id` int(10),
  CONSTRAINT `pk_like_id` PRIMARY KEY (like_id),
  CONSTRAINT `fk_user_id4`  FOREIGN KEY (user_id)
  REFERENCES user(user_id),
  CONSTRAINT `fk_restaurant_id4`  FOREIGN KEY (restaurant_id)
  REFERENCES restaurant(restaurant_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `rating`;
CREATE TABLE `rating` (
  `rating_id` int(5) NOT NULL AUTO_INCREMENT,
  `user_id` int(10),
  `restaurant_id` int(10),
  `rating` float(3,2),
  CONSTRAINT `pk_rating_id` PRIMARY KEY (rating_id),
  CONSTRAINT `fk_user_id5`  FOREIGN KEY (user_id)
  REFERENCES user(user_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT `fk2_restaurant_id5`  FOREIGN KEY (restaurant_id)
  REFERENCES restaurant(restaurant_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `activity_log`;
CREATE TABLE `activity_log` (
  `activity_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `log_details` varchar(100) DEFAULT NULL,
  `table_affected` varchar(50) DEFAULT NULL,
  `affected_id` int(10) DEFAULT NULL,
  `name_of_affected` varchar(50) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`activity_id`)
);

DROP TABLE IF EXISTS `cuisines`;
CREATE TABLE `cuisines` (
	`cuisine_id` int(10) NOT NULL AUTO_INCREMENT,
	`restaurant_id` int(10),
	`cuisine_name` varchar(20) NOT NULL,
	CONSTRAINT `pk_cuisine_id` PRIMARY KEY (cuisine_id),
	CONSTRAINT `fk_restaurant_id7` FOREIGN KEY (restaurant_id)
	REFERENCES restaurant(restaurant_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `restaurant_day`;
CREATE TABLE `open_days` (
	`day_id` int(10) NOT NULL AUTO_INCREMENT,
	`restaurant_id` int(10) NOT NULL,
	`day_open` varchar(20) NOT NULL,
	CONSTRAINT `pk_day_id` PRIMARY KEY (day_id),
	CONSTRAINT `fk_restaurant_id8` FOREIGN KEY (restaurant_id)
	REFERENCES restaurant(restaurant_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);
