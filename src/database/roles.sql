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

 Date: 02/10/2019 00:03:13
*/


-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."roles";
CREATE TABLE "public"."roles" (
  "id" int4 NOT NULL,
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" int8,
  "updated_at" int8
)
;

-- ----------------------------
-- Primary Key structure for table roles
-- ----------------------------
ALTER TABLE "public"."roles" ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");
