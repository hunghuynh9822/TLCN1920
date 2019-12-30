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

 Date: 05/12/2019 19:59:42
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
INSERT INTO "public"."perofproject" VALUES (15744386794017, 15714589149401, 0);
INSERT INTO "public"."perofproject" VALUES (15744386934538, 15714589149401, 0);
INSERT INTO "public"."perofproject" VALUES (15744393005229, 15714589149401, 0);
INSERT INTO "public"."perofproject" VALUES (15745069787281, 15714589149401, 0);
INSERT INTO "public"."perofproject" VALUES (15745097951082, 15714589149401, 0);
INSERT INTO "public"."perofproject" VALUES (15745121365703, 15714589149401, 0);
INSERT INTO "public"."perofproject" VALUES (15745122326794, 15714589149401, 0);
INSERT INTO "public"."perofproject" VALUES (15745123562105, 15714589149401, 0);
INSERT INTO "public"."perofproject" VALUES (15745127207896, 15714589149401, 0);
INSERT INTO "public"."perofproject" VALUES (15745681890267, 15714589149401, 0);
INSERT INTO "public"."perofproject" VALUES (15744386380186, 15746072843063, 0);
INSERT INTO "public"."perofproject" VALUES (15747901151112, 15714589149401, 0);
INSERT INTO "public"."perofproject" VALUES (15744386380186, 15746071512232, 1);

-- ----------------------------
-- Primary Key structure for table perofproject
-- ----------------------------
ALTER TABLE "public"."perofproject" ADD CONSTRAINT "perofproject_pkey" PRIMARY KEY ("pro_id", "employee_id");

-- ----------------------------
-- Foreign Keys structure for table perofproject
-- ----------------------------
ALTER TABLE "public"."perofproject" ADD CONSTRAINT "employee_project" FOREIGN KEY ("employee_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."perofproject" ADD CONSTRAINT "project_constraint" FOREIGN KEY ("pro_id") REFERENCES "public"."projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
