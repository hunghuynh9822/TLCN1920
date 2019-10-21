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

 Date: 22/10/2019 01:11:03
*/


-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_roles";
CREATE TABLE "public"."user_roles" (
  "user_id" int8 NOT NULL,
  "role_id" int4 NOT NULL,
  "create_at" int8 NOT NULL,
  "update_at" int8
)
;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
INSERT INTO "public"."user_roles" VALUES (15714589149401, 1, 1571458915069, NULL);

-- ----------------------------
-- Primary Key structure for table user_roles
-- ----------------------------
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "employee_roles_pkey" PRIMARY KEY ("user_id", "role_id");

-- ----------------------------
-- Foreign Keys structure for table user_roles
-- ----------------------------
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "role_id" FOREIGN KEY ("role_id") REFERENCES "public"."roles" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
