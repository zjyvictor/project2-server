DROP DATABASE IF EXISTS current;
DROP USER IF EXISTS schedule_user@localhost;

CREATE DATABASE current CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER schedule_user@localhost IDENTIFIED BY 'zjyzjy';
GRANT ALL PRIVILEGES ON current.* TO schedule_user@localhost;