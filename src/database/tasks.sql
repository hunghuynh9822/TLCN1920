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

 Date: 05/12/2019 20:00:54
*/


-- ----------------------------
-- Table structure for tasks
-- ----------------------------
DROP TABLE IF EXISTS "public"."tasks";
CREATE TABLE "public"."tasks" (
  "id" int8 NOT NULL,
  "project_id" int8,
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "started_at" int8,
  "duration" int4,
  "state" int4,
  "point" int4,
  "employee_creator" int8,
  "description" text COLLATE "pg_catalog"."default",
  "created_at" int8,
  "updated_at" int8,
  "employee_assignee" int8
)
;

-- ----------------------------
-- Records of tasks
-- ----------------------------
INSERT INTO "public"."tasks" VALUES (15752202794018, 15744386380186, 'Test nào', 1575220190855, 4, 0, 0, 15714589149401, '1 2 3 5 test', 1575220279401, 1575220279401, 15746072843063);
INSERT INTO "public"."tasks" VALUES (15752272193295, 15744386380186, 'Test drag', 1575227166556, NULL, 0, 0, 15714589149401, '2h sáng anh gọi em không bắt máy', 1575227219329, 1575227219329, 15746072843063);
INSERT INTO "public"."tasks" VALUES (15752273449756, 15744386380186, 'Thêm task cho nhân viên', 1575227312779, 3, 0, 0, 15714589149401, 'Tạo một task mới này', 1575227344975, 1575227344975, 15746071512232);
INSERT INTO "public"."tasks" VALUES (15752201914757, 15744386380186, 'Test add task', 1575219940333, 2, 0, 0, 15714589149401, 'Hơn 12h rồi', 1575220191485, 1575232592577, 15746071512232);

-- ----------------------------
-- Primary Key structure for table tasks
-- ----------------------------
ALTER TABLE "public"."tasks" ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("id");
