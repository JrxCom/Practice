-- version:0.1.0

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
	`sex` ENUM ( '1', '2' ) NOT NULL COMMENT '用户性别(1:男,2:女)',
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
`id` INT ( 2 ) NOT NULL COMMENT '标签id', 
`name` VARCHAR ( 255 ) NOT NULL COMMENT '标签名称',
`creat_time` VARCHAR ( 45 ) NOT NULL COMMENT '标签创建时间',
PRIMARY KEY ( `id` ) 
);
CREATE TABLE MUSIC.MUSIC_LABEL (
	`id` INT ( 2 ) NOT NULL COMMENT '子标签id',
	`p_id` INT ( 2 ) NOT NULL COMMENT '父标签id',
	`name` VARCHAR ( 255 ) NOT NULL COMMENT '子标签名称',
	`creat_time` VARCHAR ( 45 ) NOT NULL COMMENT '子标签创建时间',
	PRIMARY KEY ( `id` ) ,
	CONSTRAINT `filtrate_label_id` FOREIGN KEY (`p_id`) REFERENCES `music_filtrate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE MUSIC.MUSIC_SINGER (
	`id` INT ( 7 ) NOT NULL COMMENT '歌手id',
	`name` VARCHAR ( 50 ) NOT NULL COMMENT '歌手名称',
	`photo` VARCHAR ( 255 ) NULL COMMENT '歌手照片',
	`intro` VARCHAR ( 255 ) NULL COMMENT '歌手简介',
	`country` VARCHAR ( 50 ) NULL COMMENT '歌手国籍',
	`label` ENUM ( '1', '2', '3' ) NOT NULL COMMENT '歌手标签',
	`birthday` DATE NOT NULL COMMENT '歌手生日',
	`creat_time` VARCHAR ( 45 ) NOT NULL COMMENT '歌手信息创建时间',
	PRIMARY KEY ( `id` ) 
);
CREATE TABLE MUSIC.MUSIC_SONG (
	`id` INT ( 7 ) NOT NULL COMMENT '歌曲id',
	`name` VARCHAR ( 50 ) NOT NULL COMMENT '歌曲名称',
	`singer` VARCHAR ( 50 ) NOT NULL COMMENT '歌手',
	`duration` VARCHAR ( 50 ) NULL COMMENT '时长',
	`lyric_path` VARCHAR ( 255 ) NULL COMMENT '歌词路径',
	`song_path` VARCHAR ( 255 ) NOT NULL COMMENT '歌曲路径',
	`creat_time` VARCHAR ( 45 ) NOT NULL COMMENT '歌曲信息创建时间(发行时间)',
	PRIMARY KEY ( `id` ) 
);