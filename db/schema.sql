CREATE DATABASE borrowing_db;
USE borrowing_db;

CREATE TABLE users(
  id int auto_increment NOT NULL,
  firstName varchar(50) NOT NULL,
  lastName varchar(50) NOT NULL,
  email varchar(50) NOT NULL,
  password varchar(12) NOT NULL,
  PRIMARY KEY(id)
);
