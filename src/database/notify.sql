/*
 Navicat Premium Data Transfer

 Source Server         : TLCN_SERVER
 Source Server Type    : PostgreSQL
 Source Server Version : 100010
 Source Host           : 192.168.200.1:5432
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 100010
 File Encoding         : 65001

 Date: 05/12/2019 19:59:27
*/


-- ----------------------------
-- Table structure for notify
-- ----------------------------
DROP TABLE IF EXISTS "public"."notify";
CREATE TABLE "public"."notify" (
  "id" int8 NOT NULL,
  "create_id" int8,
  "create_name" varchar(255) COLLATE "pg_catalog"."default",
  "create_time" int8,
  "content" varchar(255) COLLATE "pg_catalog"."default",
  "receive_id" int8,
  "view" bool
)
;

-- ----------------------------
-- Records of notify
-- ----------------------------
INSERT INTO "public"."notify" VALUES (15752214634511, 15751881480165, 'Thai Thanh  Liem', 1575221463127, 'dcdcdc', 15714589149401, 'f');
INSERT INTO "public"."notify" VALUES (15752214635352, 15751881480165, 'Thai Thanh  Liem', 1575221463127, 'dcdcdc', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15752214635533, 15751881480165, 'Thai Thanh  Liem', 1575221463127, 'dcdcdc', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15752214635694, 15751881480165, 'Thai Thanh  Liem', 1575221463127, 'dcdcdc', 15751881480165, 'f');
INSERT INTO "public"."notify" VALUES (15752539228037, 15751881480165, 'Thai Thanh  Liem', 1575253921355, 'Di hoc', 15714589149401, 'f');
INSERT INTO "public"."notify" VALUES (15752539228978, 15751881480165, 'Thai Thanh  Liem', 1575253921355, 'Di hoc', 15746072843063, 'f');
INSERT INTO "public"."notify" VALUES (15752539230199, 15751881480165, 'Thai Thanh  Liem', 1575253921355, 'Di hoc', 15746071512232, 'f');
INSERT INTO "public"."notify" VALUES (15752539231110, 15751881480165, 'Thai Thanh  Liem', 1575253921355, 'Di hoc', 15751881480165, 'f');

-- ----------------------------
-- Primary Key structure for table notify
-- ----------------------------
ALTER TABLE "public"."notify" ADD CONSTRAINT "notify_pkey" PRIMARY KEY ("id");
