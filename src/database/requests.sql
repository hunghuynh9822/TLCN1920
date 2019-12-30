/*
 Navicat Premium Data Transfer

 Source Server         : TLCN_SERVER
 Source Server Type    : PostgreSQL
 Source Server Version : 100010
 Source Host           : localhost:5432
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 100010
 File Encoding         : 65001

 Date: 05/12/2019 20:00:24
*/


-- ----------------------------
-- Table structure for requests
-- ----------------------------
DROP TABLE IF EXISTS "public"."requests";
CREATE TABLE "public"."requests" (
  "id" int8 NOT NULL,
  "employeeid" int8,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "position" varchar(255) COLLATE "pg_catalog"."default",
  "timestart" int8,
  "timeend" int8,
  "reason" varchar(255) COLLATE "pg_catalog"."default",
  "confirm" bool
)
;

-- ----------------------------
-- Records of requests
-- ----------------------------
INSERT INTO "public"."requests" VALUES (15752142668940, 15751881480165, 'Thai Thanh  Liem', 'Team Leader', 1575214255103, 1575300600000, 'Di hoc', 't');
INSERT INTO "public"."requests" VALUES (15752142925351, 15751881480165, 'Thai Thanh  Liem', 'Team Leader', 1577460660000, 1577547060000, 'Di ban nha', 'f');
INSERT INTO "public"."requests" VALUES (15752541704051, 15751881480165, 'Thai Thanh  Liem', 'Team Leader', 1575254100000, 1575340500000, 'Đi học ', 't');
INSERT INTO "public"."requests" VALUES (15752542004592, 15751881480165, 'Thai Thanh  Liem', 'Team Leader', 1575254188067, 1575254188067, 'Đi làm', 'f');

-- ----------------------------
-- Primary Key structure for table requests
-- ----------------------------
ALTER TABLE "public"."requests" ADD CONSTRAINT "requests_pkey" PRIMARY KEY ("id");
