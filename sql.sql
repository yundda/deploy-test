-- Active: 1732688622705@@127.0.0.1@3306@sesac

show DATABASES;

CREATE TABLE visitor(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL,
    comment mediumtext
);

INSERT INTO visitor (name,comment) VALUES ('홍길동','내가 왔다.');
INSERT INTO visitor (name,comment) VALUES ('이찬혁','으라차차');

DESC visitor;
select*FROM visitor;

########## DCL
CREATE USER 'sesac'@'%' IDENTIFIED BY '1111';
-- 권한 설정
GRANT ALL PRIVILEGES ON *.* TO 'sesac'@'%' WITH GRANT OPTION;

ALTER USER 'sesac'@'%' IDENTIFIED WITH mysql_native_password BY '1111';
FLUSH PRIVILEGES;

SHOW TABLES;
SELECT * FROM mysql.user;
SHOW GRANTS for 'sesac'@'%'
