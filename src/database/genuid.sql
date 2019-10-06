/*
 Navicat Premium Data Transfer

 Source Server         : Home
 Source Server Type    : PostgreSQL
 Source Server Version : 100010
 Source Host           : localhost:5432
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 100010
 File Encoding         : 65001

 Date: 06/10/2019 21:01:26
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
INSERT INTO "public"."genuid" VALUES (1, 0, 0);
