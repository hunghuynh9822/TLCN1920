/*
 Navicat Premium Data Transfer

 Source Server         : Home
 Source Server Type    : PostgreSQL
 Source Server Version : 100011
 Source Host           : localhost:5432
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 100011
 File Encoding         : 65001

 Date: 23/11/2019 15:22:35
*/


-- ----------------------------
-- Table structure for projects
-- ----------------------------
DROP TABLE IF EXISTS "public"."projects";
CREATE TABLE "public"."projects" (
  "id" int8 NOT NULL,
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "description" text COLLATE "pg_catalog"."default",
  "state" int4,
  "created_at" int8,
  "updated_at" int8
)
;

-- ----------------------------
-- Records of projects
-- ----------------------------
INSERT INTO "public"."projects" VALUES (15744386380186, 'Test', 'Test Postman', 0, 1574438638025, 1574438638025);
INSERT INTO "public"."projects" VALUES (15744386794017, 'Test 1', 'Test Postman 1', 0, 1574438679401, 1574438679401);
INSERT INTO "public"."projects" VALUES (15744386934538, 'Test 2', 'Test Postman 2', 0, 1574438693453, 1574438693453);
INSERT INTO "public"."projects" VALUES (15744393005229, 'Test 2', 'Test Postman 2', 0, 1574439300544, 1574439300544);

-- ----------------------------
-- Primary Key structure for table projects
-- ----------------------------
ALTER TABLE "public"."projects" ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");
