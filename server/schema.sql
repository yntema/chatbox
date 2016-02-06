CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id int NOT NULL AUTO_INCREMENT,
  text varchar(144),
  userId int NOT NULL,
  roomId int NOT NULL
);

CREATE TABLE users (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(20)
);

CREATE TABLE rooms (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(20)
);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

