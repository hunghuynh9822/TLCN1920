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

 Date: 23/11/2019 15:30:13
*/


-- ----------------------------
-- Table structure for perofproject
-- ----------------------------
DROP TABLE IF EXISTS "public"."perofproject";
CREATE TABLE "public"."perofproject" (
  "pro_id" int8 NOT NULL,
  "employee_id" int8 NOT NULL,
  "role" int4
)
;

-- ----------------------------
-- Records of perofproject
-- ----------------------------
INSERT INTO "public"."perofproject" VALUES (15744386380186, 15714589149401, 0);
INSERT INTO "public"."perofproject" VALUES (15744386794017, 15714589149401, 0);
INSERT INTO "public"."perofproject" VALUES (15744386934538, 15714589149401, 0);
INSERT INTO "public"."perofproject" VALUES (15744393005229, 15714589149401, 0);

-- ----------------------------
-- Primary Key structure for table perofproject
-- ----------------------------
ALTER TABLE "public"."perofproject" ADD CONSTRAINT "perofproject_pkey" PRIMARY KEY ("pro_id", "employee_id");

-- ----------------------------
-- Foreign Keys structure for table perofproject
-- ----------------------------
ALTER TABLE "public"."perofproject" ADD CONSTRAINT "employee_project" FOREIGN KEY ("employee_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."perofproject" ADD CONSTRAINT "project_constraint" FOREIGN KEY ("pro_id") REFERENCES "public"."projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
