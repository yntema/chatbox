CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id int NOT NULL AUTO_INCREMENT,
  text varchar(144) NOT NULL,
  userId int NOT NULL,
  roomId int,
  PRIMARY KEY(id)
);

CREATE TABLE users (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(20),
  PRIMARY KEY(id)
);

CREATE TABLE rooms (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(20),
  PRIMARY KEY(id)
);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

