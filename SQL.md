-- VERSION(1.0.1)
CREATE DATABASE PRACTICE;

CREATE TABLE PRACTICE.USERINFO  (
  `u_id` varchar(45) NOT NULL COMMENT '用户账号',
  `password` varchar(255) NOT NULL COMMENT '用户密码',
  `music_state` enum('0','1') NOT NULL DEFAULT '0' COMMENT '音乐网站权限',
  `video_state` enum('0','1') NULL DEFAULT '0' COMMENT '视频网站权限',
 PRIMARY KEY (`u_id`)
);

CREATE DATABASE MUSIC;

CREATE TABLE MUSIC.MUSIC_USER (
	`u_id` VARCHAR ( 9 ) PRIMARY KEY NOT NULL COMMENT '用户id',
	`name` VARCHAR ( 50 ) NOT NULL COMMENT '用户名称',
	`age` INT ( 3 ) NULL COMMENT '用户年龄',
	`sex` ENUM ('男','女') NOT NULL COMMENT '用户性别',
	`address` VARCHAR ( 255 ) NULL COMMENT '用户地址',
	`phone` VARCHAR ( 11 ) NULL COMMENT '用户电话',
	`emil` VARCHAR ( 255 ) NULL COMMENT '用户邮箱',
	`photo` VARCHAR ( 255 ) NULL COMMENT '用户头像',
	`state` ENUM ( '0', '1' ) NOT NULL COMMENT '用户状态(0:禁用,1:开放)',
	`creat_time` VARCHAR ( 45 ) NOT NULL COMMENT '用户创建时间',
	`login_time` VARCHAR ( 45 ) NOT NULL COMMENT '用户最后一次登录时间',
	INDEX `state_index`(`state`)  USING BTREE
);
CREATE TABLE MUSIC.MUSIC_LOGIN (
	`u_id` VARCHAR ( 9 ) PRIMARY KEY NOT NULL COMMENT '账号（用户id）',
	`password` VARCHAR ( 255 ) NOT NULL COMMENT '密码',
	`state` ENUM ( '0', '1' ) NOT NULL COMMENT '用户状态' ,
	CONSTRAINT `user_login_id` FOREIGN KEY (`u_id`) REFERENCES `music_user`(`u_id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE MUSIC.MUSIC_FILTRATE (
`id` INT ( 2 ) NOT NULL COMMENT '类别id', 
`name` VARCHAR ( 255 ) NOT NULL COMMENT '类别名称',
`creat_time` VARCHAR ( 45 ) NOT NULL COMMENT '类别创建时间',
PRIMARY KEY ( `id` ) 
);
CREATE TABLE MUSIC.MUSIC_LABEL (
	`id` INT ( 2 ) NOT NULL COMMENT '标签id',
	`p_id` INT ( 2 ) NOT NULL COMMENT '类别id',
	`name` VARCHAR ( 255 ) NOT NULL COMMENT '标签名称',
	`creat_time` VARCHAR ( 45 ) NOT NULL COMMENT '标签创建时间',
	PRIMARY KEY ( `id` ) ,
	CONSTRAINT `filtrate_label_id` FOREIGN KEY (`p_id`) REFERENCES `music_filtrate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE MUSIC.MUSIC_SINGER (
	`id` INT ( 9 ) NOT NULL COMMENT '歌手id',
	`name` VARCHAR ( 50 ) NOT NULL COMMENT '歌手名称',
	`photo` VARCHAR ( 255 ) NULL COMMENT '歌手照片',
	`intro` VARCHAR ( 255 ) NULL COMMENT '歌手简介',
	`label` ENUM ('华语男歌手','华语女歌手','华语组合/乐队','欧美男歌手','欧美女歌手','欧美组合/乐队','日本男歌手','日本女歌手','日本组合/乐队','韩国男歌手','韩国女歌手','韩国组合/乐队','其他男歌手','其他女歌手','其他组合乐队') NOT NULL COMMENT '歌手标签',
	`birthday` VARCHAR ( 100 ) NOT NULL COMMENT '歌手生日',
	`creat_time` VARCHAR ( 45 ) NOT NULL COMMENT '歌手信息创建时间',
	PRIMARY KEY ( `id` ) 
);
CREATE TABLE MUSIC.MUSIC_SONG (
	`id` VARCHAR ( 9 ) NOT NULL COMMENT '歌曲id',
	`name` VARCHAR ( 50 ) NOT NULL COMMENT '歌曲名称',
	`s_id` INT ( 9 ) NOT NULL COMMENT '歌手id',
	`singer` VARCHAR ( 50 ) NOT NULL COMMENT '歌手',
	`duration` VARCHAR ( 50 ) NULL COMMENT '时长',
	`lyric_path` VARCHAR ( 255 ) NULL COMMENT '歌词路径',
	`song_path` VARCHAR ( 255 ) NOT NULL COMMENT '歌曲路径',
	`creat_time` VARCHAR ( 45 ) NOT NULL COMMENT '歌曲信息创建时间(发行时间)',
	CONSTRAINT `song_singer_id` FOREIGN KEY (`s_id`) REFERENCES `music_singer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY ( `id` ) 
);