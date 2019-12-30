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

 Date: 05/12/2019 19:59:03
*/


-- ----------------------------
-- Table structure for employees
-- ----------------------------
DROP TABLE IF EXISTS "public"."employees";
CREATE TABLE "public"."employees" (
  "id" int8 NOT NULL,
  "created_at" int8 NOT NULL,
  "updated_at" int8,
  "first_name" varchar(255) COLLATE "pg_catalog"."default",
  "middle_name" varchar(255) COLLATE "pg_catalog"."default",
  "last_name" varchar(255) COLLATE "pg_catalog"."default",
  "id_number" varchar(64) COLLATE "pg_catalog"."default",
  "id_created" int8,
  "id_location" text COLLATE "pg_catalog"."default",
  "address" text COLLATE "pg_catalog"."default",
  "position_id" int4,
  "bank_number" varchar(255) COLLATE "pg_catalog"."default",
  "bank_name" varchar(255) COLLATE "pg_catalog"."default",
  "bank_branch" varchar(255) COLLATE "pg_catalog"."default",
  "birthday" int8,
  "start_time" int8
)
;

-- ----------------------------
-- Records of employees
-- ----------------------------
INSERT INTO "public"."employees" VALUES (15714589149401, 1571458915080, NULL, 'Huỳnh', 'Lê Hữu', 'Hưng', '025699321', 1354406400000, 'CA Hồ Chí Minh', 'Số 05 đường 3643A Phạm Thế Hiển, P7, Q8, Tp HCM', 1, '1234 5678 91011', 'BIDV', 'CN Quận 8', 888105600000, 1561939200000);
INSERT INTO "public"."employees" VALUES (15746071512232, 1574607151401, 1574607151401, 'Nguyễn', 'Văn', 'Nhân Viên', '090912345678', 1574607032670, 'CA Tp Hồ Chí Minh', 'So 234 Nguyen Huu Tien', 4, '0909123456789', 'BIDV', 'CN Đông Sài Gòn', 1574607032670, 1574607032670);
INSERT INTO "public"."employees" VALUES (15746072843063, 1574607284409, 1574607284409, 'Nguyễn', 'Văn', 'Trưởng Nhóm', '090945612378', 1574607174704, 'CA Tp Hồ Chí Minh', 'So 234 Nguyen Huu Tien', 2, '0909456123789', 'BIDV', 'CN Đông Sài Gòn', 1574607174704, 1574607174704);
INSERT INTO "public"."employees" VALUES (15746074348584, 1574607434958, 1574607434958, 'Nguyễn', 'Thị', 'Nhân Viên', '090965432178', 1574607299894, 'CA Tp Hồ Chí Minh', 'So 234 Nguyen Huu Tien', 4, '0909654321789', 'BIDV', 'CN Đông Sài Gòn', 1574607299894, 1574607299894);
INSERT INTO "public"."employees" VALUES (15751881480165, 1575188148423, 1575254245212, 'Thai', 'Thanh ', 'Liem', '123456789', 1575188038182, 'tphcm quan 6 p13', 'Quận 6', 2, '123456789', 'saccombank', 'phu lam', 1520064780000, 1575188038182);

-- ----------------------------
-- Foreign Keys structure for table employees
-- ----------------------------
ALTER TABLE "public"."employees" ADD CONSTRAINT "employee_position" FOREIGN KEY ("position_id") REFERENCES "public"."positions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."employees" ADD CONSTRAINT "user_id" FOREIGN KEY ("id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
