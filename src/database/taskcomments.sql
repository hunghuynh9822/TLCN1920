/*
 Navicat Premium Data Transfer

 Source Server         : TLCN_SERVER
 Source Server Type    : PostgreSQL
 Source Server Version : 100011
 Source Host           : 192.168.200.1:5432
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 100011
 File Encoding         : 65001

 Date: 01/01/2020 11:46:33
*/


-- ----------------------------
-- Table structure for taskcomments
-- ----------------------------
DROP TABLE IF EXISTS "public"."taskcomments";
CREATE TABLE "public"."taskcomments" (
  "id" int8 NOT NULL,
  "task_id" int8,
  "employee_id" int8,
  "comment" text COLLATE "pg_catalog"."default",
  "created_at" int8,
  "updated_at" int8
)
;

-- ----------------------------
-- Primary Key structure for table taskcomments
-- ----------------------------
ALTER TABLE "public"."taskcomments" ADD CONSTRAINT "taskcomments_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table taskcomments
-- ----------------------------
ALTER TABLE "public"."taskcomments" ADD CONSTRAINT "comment_of_employee" FOREIGN KEY ("employee_id") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."taskcomments" ADD CONSTRAINT "comment_of_task" FOREIGN KEY ("task_id") REFERENCES "public"."tasks" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
