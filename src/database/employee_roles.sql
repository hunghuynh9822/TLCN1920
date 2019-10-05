/*
 Navicat Premium Data Transfer

 Source Server         : Heroku
 Source Server Type    : PostgreSQL
 Source Server Version : 110005
 Source Host           : ec2-174-129-227-205.compute-1.amazonaws.com:5432
 Source Catalog        : dfhgvfgs5qcedi
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 110005
 File Encoding         : 65001

 Date: 05/10/2019 22:29:51
*/


-- ----------------------------
-- Table structure for employee_roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."employee_roles";
CREATE TABLE "public"."employee_roles" (
  "employee_id" int8 NOT NULL,
  "role_id" int4 NOT NULL,
  "create_at" int8 NOT NULL,
  "update_at" int8
)
;

-- ----------------------------
-- Primary Key structure for table employee_roles
-- ----------------------------
ALTER TABLE "public"."employee_roles" ADD CONSTRAINT "employee_roles_pkey" PRIMARY KEY ("employee_id", "role_id");

-- ----------------------------
-- Foreign Keys structure for table employee_roles
-- ----------------------------
ALTER TABLE "public"."employee_roles" ADD CONSTRAINT "employee_id" FOREIGN KEY ("employee_id") REFERENCES "public"."employees" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."employee_roles" ADD CONSTRAINT "role_id" FOREIGN KEY ("role_id") REFERENCES "public"."roles" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
