-- @block
SHOW DATABASES;
-- @block 
CREATE DATABASE IF NOT EXISTS `my-portfolio`;
USE `my-portfolio`;
-- @block
SELECT *
FROM calendar;
-- @block
DROP DATABASE `portfolio`;
-- @block
CREATE TABLE IF NOT EXISTS calendar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date_field DATE NOT NULL
);