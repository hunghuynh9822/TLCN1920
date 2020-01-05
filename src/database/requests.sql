/*
 Navicat Premium Data Transfer

 Source Server         : TLCN_SERVER
 Source Server Type    : PostgreSQL
 Source Server Version : 100011
 Source Host           : 192.168.200.1:5432
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 100011
 File Encoding         : 65001

 Date: 06/01/2020 01:47:15
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
INSERT INTO "public"."requests" VALUES (15781546165702, 15714589149401, 'Huỳnh Lê Hữu Hưng', 'Management', 1579277760000, 1579364160000, 'Có việc riêng', 'f');
INSERT INTO "public"."requests" VALUES (15781546341123, 15714589149401, 'Huỳnh Lê Hữu Hưng', 'Management', 1579277760000, 1578241020000, 'Đi khám bệnh', 't');
INSERT INTO "public"."requests" VALUES (15782412682294, 15782398324826, 'Pham Ngoc Dieu', 'Staff', 1578241235742, 1578327600000, 'Vào ngân hàng làm thủ tục', 'f');
INSERT INTO "public"."requests" VALUES (15782425877254, 15782405203918, 'Phan Thị  Thùy  Dương', 'Staff', 1575218520000, 1575304920000, 'Về quê có việc gấp', 'f');
INSERT INTO "public"."requests" VALUES (15782410853822, 15782405203918, 'Phan Thị  Thùy  Dương', 'Staff', 1576599420000, 1576685820000, 'Đi họp phụ huynh cho con', 't');
INSERT INTO "public"."requests" VALUES (15782409956701, 15751881480165, 'Thai Thanh  Liem', 'Team Leader', 1575994560000, 1576080960000, 'Bị đau mắt', 't');

-- ----------------------------
-- Primary Key structure for table requests
-- ----------------------------
ALTER TABLE "public"."requests" ADD CONSTRAINT "requests_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table requests
-- ----------------------------
ALTER TABLE "public"."requests" ADD CONSTRAINT "request_of" FOREIGN KEY ("employeeid") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
