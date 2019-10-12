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

 Date: 12/10/2019 00:39:55
*/


-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int8 NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "phone" varchar(10) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" int8,
  "updated_at" int8
)
;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES (15708149825552, 'huuhung9822@gmail.com', '0938781162', '$2a$10$IE0Q6rJqizja3IlDQrw//uhuNZ08Ac7jv6EsfXojGQodIgN4RByvu', 1570814982677, NULL);

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
