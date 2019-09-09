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

 Date: 09/09/2019 11:34:47
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
-- Records of roles
-- ----------------------------
INSERT INTO "public"."roles" VALUES (5, 'ROLE_ADMIN', 1567937957503, NULL);
INSERT INTO "public"."roles" VALUES (6, 'ROLE_EMPLOYEE', 1567937962314, NULL);
