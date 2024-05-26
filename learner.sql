CREATE DATABASE learner

CREATE TABLE `learner`.`web`  (
  `id` bigint NOT NULL COMMENT '网站id',
  `name` varchar(10) NOT NULL COMMENT '网站名称',
  `describe` varchar(255) NULL COMMENT '网站描述',
  `database` varchar(10) NOT NULL COMMENT '数据库名称',
  `website` varchar(255) NOT NULL COMMENT '网站地址',
  `logo` varchar(255) NOT NULL COMMENT '网站图标',
  `creatime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
);

CREATE TABLE `learner`.`table`  (
  `id` bigint NOT NULL COMMENT '表id',
  `wid` bigint NOT NULL COMMENT '网站id',
  `name` varchar(10) NOT NULL COMMENT '表名称',
  `describe` varchar(255) NULL COMMENT '表描述',
  `table` varchar(10) NOT NULL COMMENT '数据库表名称',
  `creatime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
);

ALTER TABLE `learner`.`table` 
ADD CONSTRAINT `web_table_id` FOREIGN KEY (`wid`) REFERENCES `learner`.`web` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE `learner`.`field`  (
  `id` bigint NOT NULL COMMENT '字段id',
  `tid` bigint NOT NULL COMMENT '表id',
  `name` varchar(10) NOT NULL COMMENT '字段名称',
  `describe` varchar(255) NULL COMMENT '字段描述',
  `creatway` varchar(10) NOT NULL COMMENT '创建方式',
  `showay` varchar(10) NOT NULL COMMENT '展示方式',
  `type` varchar(10) NOT NULL COMMENT '字段类型',
  `size` int NOT NULL COMMENT '字段大小',
  `field` varchar(10) NOT NULL COMMENT '数据库字段名称',
  `creatime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
);

ALTER TABLE `learner`.`field` 
ADD CONSTRAINT `table_field_id` FOREIGN KEY (`tid`) REFERENCES `learner`.`table` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
