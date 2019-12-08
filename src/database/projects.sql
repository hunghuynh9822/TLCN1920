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

 Date: 05/12/2019 20:00:10
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
INSERT INTO "public"."projects" VALUES (15745069787281, 'Test web', 'This project to test on web', 0, 1574506978738, 1574506978738);
INSERT INTO "public"."projects" VALUES (15745097951082, '1', 'AAAAAAAA', 0, 1574509795108, 1574509795108);
INSERT INTO "public"."projects" VALUES (15745121365703, 'Test goto project', 'Test after create goto project', 0, 1574512136570, 1574512136570);
INSERT INTO "public"."projects" VALUES (15745122326794, 'Test goto project 2', 'Fix response get project id', 0, 1574512232679, 1574512232679);
INSERT INTO "public"."projects" VALUES (15745123562105, 'Test goto project 3', 'Test history go', 0, 1574512356211, 1574512356211);
INSERT INTO "public"."projects" VALUES (15745127207896, 'Test 4', '1 2 3 4', 0, 1574512720789, 1574512720789);
INSERT INTO "public"."projects" VALUES (15745681890267, 'Test 4', 'asddsafdfdsafaaddasf', 0, 1574568189037, 1574568189037);
INSERT INTO "public"."projects" VALUES (15747901151112, 'Test 4', 'czxzxvzxczx', 0, 1574790115117, 1574790115117);

-- ----------------------------
-- Primary Key structure for table projects
-- ----------------------------
ALTER TABLE "public"."projects" ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");
