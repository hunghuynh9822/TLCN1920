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

 Date: 05/12/2019 20:01:05
*/


-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_roles";
CREATE TABLE "public"."user_roles" (
  "user_id" int8 NOT NULL,
  "role_id" int4 NOT NULL,
  "created_at" int8 NOT NULL,
  "updated_at" int8
)
;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
INSERT INTO "public"."user_roles" VALUES (15714589149401, 1, 1571458915069, 1571458915069);
INSERT INTO "public"."user_roles" VALUES (15714589149401, 3, 1571458915069, 1571458915069);
INSERT INTO "public"."user_roles" VALUES (15714589149401, 2, 1571458915069, 1571458915069);
INSERT INTO "public"."user_roles" VALUES (15714589149401, 4, 1571458915069, 1571458915069);
INSERT INTO "public"."user_roles" VALUES (15746072843063, 3, 1574785905117, 1574785905117);
INSERT INTO "public"."user_roles" VALUES (15746072843063, 2, 1574785905118, 1574785905118);
INSERT INTO "public"."user_roles" VALUES (15746071512232, 2, 1574789578705, 1574789578705);
INSERT INTO "public"."user_roles" VALUES (15751881480165, 1, 1575188192653, 1575188192653);
INSERT INTO "public"."user_roles" VALUES (15751881480165, 2, 1575188192655, 1575188192655);
INSERT INTO "public"."user_roles" VALUES (15751881480165, 3, 1575188192656, 1575188192656);
INSERT INTO "public"."user_roles" VALUES (15751881480165, 4, 1575188192656, 1575188192656);

-- ----------------------------
-- Primary Key structure for table user_roles
-- ----------------------------
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "employee_roles_pkey" PRIMARY KEY ("user_id", "role_id");

-- ----------------------------
-- Foreign Keys structure for table user_roles
-- ----------------------------
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "role_id" FOREIGN KEY ("role_id") REFERENCES "public"."roles" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
