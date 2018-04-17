create database rkhangraphy;
use rkhangraphy;
create table album (id_album int NOT NULL AUTO_INCREMENT, category VARCHAR(100) NOT NULL, preview BLOB, likes int NULL, created_date datetime,  PRIMARY KEY (id_album, category), UNIQUE (category));
insert into album (category, preview, likes, created_date) VALUES ('Nature', '/Users/theblurosx/Desktop/rkhangraphy\ site/database_photo/home.jpg',0,now());
insert into album (category, preview, likes, created_date) VALUES ('Nature', '/Users/theblurosx/Desktop/rkhangraphy\ site/database_photo/fire.jpg',  4, now());
insert into album (category, preview, likes, created_date) VALUES ('Nature', '/Users/theblurosx/Desktop/rkhangraphy\ site/database_photo/street.jpg',  8, now());
drop table album;

