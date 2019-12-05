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

 Date: 05/12/2019 19:59:53
*/


-- ----------------------------
-- Table structure for positions
-- ----------------------------
DROP TABLE IF EXISTS "public"."positions";
CREATE TABLE "public"."positions" (
  "id" int4 NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" int8,
  "updated_at" int8
)
;

-- ----------------------------
-- Records of positions
-- ----------------------------
INSERT INTO "public"."positions" VALUES (1, 'Management', 1567937957503, NULL);
INSERT INTO "public"."positions" VALUES (2, 'Team Leader', 1567937957503, NULL);
INSERT INTO "public"."positions" VALUES (3, 'Human Resource', 1567937957503, NULL);
INSERT INTO "public"."positions" VALUES (4, 'Staff', 1567937957503, NULL);

-- ----------------------------
-- Primary Key structure for table positions
-- ----------------------------
ALTER TABLE "public"."positions" ADD CONSTRAINT "positions_pkey" PRIMARY KEY ("id");
