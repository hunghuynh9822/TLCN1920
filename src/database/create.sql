CREATE TABLE IF NOT EXISTS "public"."employees" (
  "id" int8 NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default",
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" int8 NOT NULL,
  "updated_at" int8,
  "first_name" varchar(255) COLLATE "pg_catalog"."default",
  "middle_name" varchar(255) COLLATE "pg_catalog"."default",
  "last_name" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Primary Key structure for table employees
-- ----------------------------
ALTER TABLE "public"."employees" ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("id");

CREATE TABLE IF NOT EXISTS "public"."roles" (
  "id" int4 NOT NULL,
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" int8,
  "updated_at" int8
)
;
ALTER TABLE "public"."roles" ADD CONSTRAINT "Roles_pkey" PRIMARY KEY ("id");
-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO "public"."roles" VALUES (1,'ROLE_ADMIN', 1567937957503, NULL);
INSERT INTO "public"."roles" VALUES (2,'ROLE_EMPLOYEE', 1567937962314, NULL);

CREATE TABLE IF NOT EXISTS "public"."employee_roles" (
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


CREATE TABLE IF NOT EXISTS "public"."genuid" (
  "id" int4 NOT NULL,
  "index" int4,
  "count" int8
)
;

-- ----------------------------
-- Records of genuid
-- ----------------------------
INSERT INTO "public"."genuid" VALUES (1, 0, 0);
