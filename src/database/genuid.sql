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

 Date: 05/12/2019 19:59:17
*/


-- ----------------------------
-- Table structure for genuid
-- ----------------------------
DROP TABLE IF EXISTS "public"."genuid";
CREATE TABLE "public"."genuid" (
  "id" int4 NOT NULL,
  "index" int4,
  "count" int8
)
;

-- ----------------------------
-- Records of genuid
-- ----------------------------
INSERT INTO "public"."genuid" VALUES (2, 2, 52);
INSERT INTO "public"."genuid" VALUES (3, 2, 12);
INSERT INTO "public"."genuid" VALUES (1, 5, 5);
